import React from 'react';

export default class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setData(data) {
      this.setState({pokemon:data});
    }

    loadPokemonFromServer() {
        $.ajax({
            url    : this.props.pokemon.url,
            method : "GET"
        }).then(
            this.setData.bind(this)
        );
    }

    componentWillMount() {
        this.loadPokemonFromServer();
    }

    ShowImgOnLoad() {
        setTimeout(function() {
            $(this.cardDom).find(".pokemon-spinner")
                .addClass("hidden");

            $(this.cardDom).find(".pokemon-info")
                .removeClass("hidden");
        }.bind(this), 800);
    }

    render() {

        if($.isEmptyObject(this.state)){
            return (
                <div></div>
            );
        }

        return (
            <div className="col-md-3 col-sm-4 col-xs-12">
                <div className="poke-card card">
                    <div className="thumbnail" ref={(cardDom) => { this.cardDom = cardDom; }}>
                        <div className="pokemon-spinner">
                            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                        </div>
                        <div className="pokemon-info hidden">
                            <img className="card-img-top" src={this.state.pokemon.sprites.front_shiny}
                                 onLoad={this.ShowImgOnLoad.bind(this)}>
                                 </img>
                            <h4 className="caption">{this.state.pokemon.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};