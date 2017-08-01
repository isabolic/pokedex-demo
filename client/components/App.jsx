import React from 'react';
import Pokemons from './Pokemons.jsx';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pokemons: []};
    }

    loadAllPokemonsFromServer() {
        var self = this;
        $.ajax({
          url: "http://pokeapi.co/api/v2/pokemon/?limit=100"
        }).then((data) => {
          self.setState({pokemons: data.results});
        });
    }

    componentDidMount() {
        this.loadAllPokemonsFromServer();
    }

    render() {
        return (
            <Pokemons pokemons={this.state.pokemons} />
        );
    }
}

