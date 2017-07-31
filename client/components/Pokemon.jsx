import React from 'react';

export default class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state   = {};
        this.cardDom = null;
        $(window).on("resize", this.setSpinnerPosition.bind(this));
    }

    setSpinnerPosition () {
        var h, w, l, t, el;

        if(this.cardDom !== null){
            el = $(this.cardDom).find(".pokemon-spinner"),
            h  = el.outerHeight(true),
            w  = el.outerWidth(true);

            t = h / 2 - (el.find(".fa-spin").outerHeight(true) / 2);
            l = w / 2 - (el.find(".fa-spin").outerWidth(true) / 2) + 20;

            el.find(".fa-spin").css({top: t + "px", left: l + "px"});

            el.removeClass("hidden-vis");
        }
    }

    setData(data) {
      this.setState({pokemon:data});
    }

    loadPokemonFromServer() {
        $.ajax({
            url  : this.props.pokemon.url
        }).then(
            this.setData.bind(this)
        );
    }

    componentWillMount() {
        this.loadPokemonFromServer();
    }

    componentDidMount() {
        this.setSpinnerPosition();
    }

    componentDidUpdate() {
        this.setSpinnerPosition();
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
                <a href="#" className="poke-card card">
                    <div className="thumbnail" ref={(cardDom) => { this.cardDom = cardDom; }}>
                        <div className="pokemon-spinner hidden-vis">
                            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                        </div>
                        <div className="pokemon-info hidden">
                            <img className="card-img-top" src={this.state.pokemon.sprites.front_shiny}
                                 onLoad={this.ShowImgOnLoad.bind(this)}>
                                 </img>
                            <h4 className="caption">{this.state.pokemon.name}</h4>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
};