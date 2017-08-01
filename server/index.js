"use strict";
(function() {
    const Webpack          = require("webpack");
    const WebpackDevServer = require('webpack-dev-server');
    const webpackConfig    = require("../webpack.config.js");
    const express          = require("express");
    const routes           = require("routes");
    const mkdirp           = require("mkdirp");
    const deferred         = require("deferred");
    const q                = require("q");
    const fs               = require("fs");
    const bodyParser       = require("body-parser");

    const storeDir      = "store";
    const storeFileName = "favoritePokemon.json";
    let   storeFavorite = [];

    const compiler      = Webpack(webpackConfig);
    const server        = new WebpackDevServer(compiler, {
        stats: {
            colors: true
        }
    });

    var app = express.Router();

    app.post("/:id", (req, res) => {
        if (!(req.params.id )) {
            res.send(500, "Missing ID parameter.");
        } else {
            saveFav(req.params.id).done(() => {
                res.json({"successful":true});
            });
        }
    });

    app.post("/:id/remove", (req, res) => {
        if (!(req.params.id )) {
            res.send(500, "Missing ID parameter.");
        }else {
            removeFav(req.params.id).done(() => {
                res.json({"successful":true});
            });
        }
    });

    app.get("/", (req, res) => {
        res.json(storeFavorite);
    });

    server.use("/fav", app);
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    server.use(bodyParser.json());

    server.listen(8080, "localhost", () => {
        console.log("Starting server on http://localhost:8080");
    });

    let saveFav = (id) => {
        let def = deferred(), exist = false;

        for(var i = storeFavorite.length - 1; i >= 0; i--) {
            if(storeFavorite[i] === id) {
               exist = true;
            }
        }

        if (exist === false){
            storeFavorite.push(id);
            createStoreFile().then( ()=> {
                def.resolve();
            });
        } else {
            console.log("id " + id + " already exist...");
            def.resolve();
        }

        return def.promise;
    }

    let removeFav = (id) => {
        let def = deferred();

        for(var i = storeFavorite.length - 1; i >= 0; i--) {
            if(storeFavorite[i] === id) {
               storeFavorite.splice(i, 1);
            }
        }
        createStoreFile().then( ()=> {
            def.resolve();
        });

        return def.promise;
    }

    let createStoreFile = () => {
        let def = deferred();

        fs.writeFile(storeDir + "/" +storeFileName, JSON.stringify(storeFavorite), 'utf8', (err) =>{
            if (err) {
                console.log("err creating store file " + err);
                def.reject();
            } else {

               def.resolve();
            }
        });

        return def.promise;
    }

    let loadStoreFav = () => {
        let def = deferred();

        fs.stat(storeDir + "/" +storeFileName, function(err, stat) {
            if(err == null) {
                storeFavorite = JSON.parse(fs.readFileSync(storeDir + "/" +storeFileName, 'utf8'));
            } else if(err.code == 'ENOENT') {
                // file does not exist
                storeFavorite = [];
            } else {
                console.log("error: ", err.code);
            }
            def.resolve();
        });

        return def.promise;
    }

    let createStoreFolder = () => {
            let def = deferred();

            mkdirp(storeDir, (err) => {

                if (err) {
                    console.log("err creating store folder " + err);
                    def.reject();
                } else {

                   def.resolve();
                }
            });


            return def.promise;
    }

     q.fcall(createStoreFolder)
      .done(loadStoreFav);

})();