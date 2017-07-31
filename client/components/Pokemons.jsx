import React from 'react';
import Pokemon from './Pokemon.jsx';
import PokemonDetail from './PokemonDetail.jsx';

export default class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state   = {view:"pokemons"};
    }

    openDetail(pokemon){
        this.setState({view:"pokemonDetail", data: pokemon});
    }

    openPokemons(){
        this.setState({view:"pokemons", data: null});
    }

    render() {
        var rows = [];

        if (this.state.view === "pokemons"){
            this.props.pokemons.forEach((pokemon) => {
                rows.push(<Pokemon pokemon={pokemon} openDetail={this.openDetail.bind(this)}/>);
            });

            return (
                <div className="container">
                    <div className="rows justify-content-center">{rows}</div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="rows justify-content-center">
                        <PokemonDetail detail={this.state.data} back={this.openPokemons.bind(this)}/>
                    </div>
                </div>
            );
        }
    }
};