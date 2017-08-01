import React from 'react';
import Pokemon from './Pokemon.jsx';

export default class PokemonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state   = {};
        this.cardDom = null;
        this.infoDom = null;
        $(window).on("resize", this.setSpinnerPosition.bind(this));
    }

    setSpinnerPosition () {
        var h, w, l, t, el;

        if(this.cardDom !== null){
            el = $(this.cardDom).find(".pokemon-spinner"),
            h  = el.outerHeight(true),
            w  = el.outerWidth(true);

            t = h - (el.find(".fa-spin").outerHeight(true) / 2);
            l = w / 2 - (el.find(".fa-spin").outerWidth(true) / 2) + 20;

            el.find(".fa-spin").css({top: t + "px", left: l + "px"});
            el.removeClass("hidden-vis");

        }
    }

    componentDidMount() {
        this.setSpinnerPosition();
    }

    componentDidUpdate() {
        this.setSpinnerPosition();
    }

    back() {
        this.props.back();
    }

    favorite() {
        let id = this.props.detail.id;

        $.post("/fav/"+id+"/", function( data ) {
            $(this.infoDom)
               .removeClass("hidden");
        }.bind(this))
        .fail(function() {
            alert( "error" );
        });
    }

    ShowImgOnLoad() {
        this.setSpinnerPosition();

        setTimeout(function() {
            $(this.cardDom).find(".pokemon-spinner")
                .addClass("hidden");

            $(this.cardDom).find(".pokemon-info")
                .removeClass("hidden");
        }.bind(this), 800);
    }

    componentWillUnmount(){
        this.cardDom    = null;
        this.state      = {};
        $(window).off("resize", this.setSpinnerPosition.bind(this));
    }

    render() {
        console.log(this.props.detail);
        var abilities = [], moves = [], types = [];

        this.props.detail.abilities.forEach((o) => {
            abilities.push(<li className="list-group-item">
                               <i className="fa fa-fw fa-rebel extra-right" aria-hidden="true"></i>
                                {o.ability.name}
                            </li>);
        });

        this.props.detail.moves.forEach((o) => {
            moves.push(<li className="list-group-item">
                           <i className="fa fa-fw fa-pied-piper-alt extra-right" aria-hidden="true"></i>
                            {o.move.name}
                        </li>);
        });

        this.props.detail.types.forEach((o) => {
            types.push(<li className="list-group-item">
                            <i className="fa fa-fw fa-hand-spock-o extra-right" aria-hidden="true"></i>
                            {o.type.name}
                        </li>);
        });

        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="alert alert-info alert-dismissable fade in hidden root" ref={(info) => { this.infoDom = info; }}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Info!</strong> This pokemon is now your favorite. :D...
                </div>
                <div className="poke-card-detail card">
                    <div className="thumbnail" ref={(cardDom) => { this.cardDom = cardDom; }}>
                        <h3 className="caption">
                            <button className="btn btn-link btn-fav" title="Add/remove favorite.." onClick={this.favorite.bind(this)}>
                                <i className="fa fa-fw fa-star"></i>
                            </button>
                            {this.props.detail.name}
                            <button className="btn btn-link btn-back pull-right" onClick={this.back.bind(this)}>
                                <i className="fa fa-fw fa-angle-double-left"></i>
                                Back
                            </button>

                        </h3>
                        <div className="pokemon-spinner hidden-vis">
                            <i className="fa fa-spin fa-cog fa-3x fa-fw"></i>
                        </div>
                        <div className="pokemon-info hidden">
                            <img className="card-img-top card-img-top-detail"
                                 src={this.props.detail.sprites.front_shiny}
                                 onLoad={this.ShowImgOnLoad.bind(this)}>
                            </img>
                        </div>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-4 col-sm-4 col-xs-12">
                                    <h4>Abilities</h4>
                                    <ul className="list-group abilities">{abilities}</ul>
                                </div>

                                <div className="col-md-4 col-sm-4 col-xs-12">
                                    <h4>Moves</h4>
                                    <ul className="list-group moves">{moves}</ul>
                                </div>

                                <div className="col-md-4 col-sm-4 col-xs-12">
                                    <h4>Types</h4>
                                   <ul className="list-group types">{types}</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}