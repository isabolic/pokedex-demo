import React from 'react';

export default class Pokemon extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.pokemon.name}</div>
        <div>{this.props.pokemon.url}</div>
      </div>);
  }
};