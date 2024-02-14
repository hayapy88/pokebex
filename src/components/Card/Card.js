import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>Type</div>
        {pokemon.types.map((type) => {
          return <span classNmae="typeName">{type.type.name}</span>;
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>Height: {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p>Weight: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p>Ability: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
