import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div className="card mx-3 sm:mx-2 p-8 border rounded shadow-lg">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" className="mx-auto" />
      </div>
      <h3 className="cardName text-xl font-bold">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>Type</div>
        {pokemon.types.map((type, i) => {
          return (
            <span className="typeName" key={i}>
              {type.type.name}
            </span>
          );
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
