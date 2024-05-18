import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Types from "./Types";

const Card = React.forwardRef(({ pokemon }, ref) => {
  // `index`は使用しないため削除
  const { t, i18n } = useTranslation();
  const meterHeight = pokemon.height / 10;
  const kgWeight = pokemon.weight / 10;

  const initialPokemonName = () => {
    if (!pokemon || !pokemon.names) {
      return "";
    }
    const initialEntry = pokemon.names.find(
      (entry) => entry.language.name === i18n.language
    );
    return initialEntry ? initialEntry.name : pokemon.name;
  };
  const [localisedName, setLocalisedName] = useState(initialPokemonName());
  const [localisedAbility, setLocalisedAbility] = useState("");

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      if (!pokemon || !pokemon.species || !pokemon.species.url) {
        console.log("Pokemon species data is missing");
        return;
      }
      try {
        const response = await fetch(pokemon.species.url);
        const pokemonSpecies = await response.json();
        const nameEntry = pokemonSpecies.names.find(
          (entry) => entry.language.name === i18n.language
        );
        if (nameEntry) {
          setLocalisedName(nameEntry.name);
        }
      } catch (error) {
        console.log("Failed to fetch pokemon species:", error);
      }
    };

    const fetchPokemonAbility = async () => {
      if (
        !pokemon ||
        !pokemon.abilities ||
        pokemon.abilities.length === 0 ||
        !pokemon.abilities[0].ability.url
      ) {
        console.log("Pokemon abilities data is missing");
        return;
      }
      try {
        const response = await fetch(pokemon.abilities[0].ability.url);
        const pokemonAbility = await response.json();
        const abilityEntry = pokemonAbility.names.find(
          (entry) => entry.language.name === i18n.language
        );
        if (abilityEntry) {
          setLocalisedAbility(abilityEntry.name);
        }
      } catch (error) {
        console.log("Failed to fetch pokemon ability:", error);
      }
    };

    fetchPokemonSpecies();
    fetchPokemonAbility();
  }, [pokemon, i18n.language]);

  return (
    <div
      className="card mx-3 sm:mx-2 p-8 bg-blue-50 border rounded-lg shadow-lg"
      ref={ref} // `key`は親コンポーネントで使用するため削除
    >
      <div className="cardImg">
        {pokemon.sprites && pokemon.sprites.front_default ? (
          <img
            src={pokemon.sprites.front_default}
            alt={localisedName}
            className="mx-auto"
          />
        ) : (
          <p>{t("messages.imageNotAvailable")}</p> // 画像がない場合の代替テキスト
        )}
      </div>
      <h3 className="cardName mb-3 text-2xl font-bold capitalize">
        {localisedName}
      </h3>
      <div className="cardTypes flex justify-center">
        <p className="font-bold">No: {pokemon.id}</p>
      </div>
      <div className="cardTypes flex justify-center">
        <p className="font-bold">{t("type")}:</p>
        <Types types={pokemon.types} />
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="font-bold">
            {t("height")}: {meterHeight}m
          </p>
        </div>
        <div className="cardData">
          <p className="font-bold">
            {t("weight")}: {kgWeight}kg
          </p>
        </div>
        <div className="cardData">
          <p className="font-bold capitalize">
            {t("ability")}: {localisedAbility}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Card;
