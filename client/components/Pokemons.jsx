import React from 'react';
import Pokemon from './Pokemon.jsx';

export default class Pokemons extends React.Component {
  render() {
      var rows = [];

      this.props.pokemons.forEach((pokemon) => {
        rows.push(<Pokemon pokemon={pokemon} />);
      });

      return (
        <div className="container">
            <div className="rows justify-content-center">{rows}</div>
        </div>
      );
    }
};