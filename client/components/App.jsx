import React from 'react';
import Pokemons from './Pokemons.jsx';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pokemons: []};
    }

    loadPokemonFromServer() {
        var self = this;
        $.ajax({
          url: "http://pokeapi.co/api/v2/pokemon/",
          method: "GET"
        }).then((data) => {
          self.setState({pokemons: data.results});
        });
    }

    componentDidMount() {
        this.loadPokemonFromServer();
    }

    render() {
        return (
            <Pokemons pokemons={this.state.pokemons}/>
        );
    }
}

