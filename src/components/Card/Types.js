import React from "react";
import { useTranslation } from "react-i18next";

const Types = ({ types }) => {
  const { t } = useTranslation();
  const typeColors = {
    bug: "bg-lime-500/80",
    dark: "bg-gray-800/80",
    dragon: "bg-blue-700/90",
    electric: "bg-yellow-300",
    fairy: "bg-pink-300",
    fighting: "bg-red-600/90",
    fire: "bg-orange-400",
    flying: "bg-blue-300",
    ghost: "bg-purple-900/70",
    grass: "bg-green-500",
    ground: "bg-yellow-600",
    ice: "bg-teal-500/60",
    normal: "bg-gray-400",
    poison: "bg-purple-500",
    psychic: "bg-rose-500/80",
    rock: "bg-yellow-500/60",
    steel: "bg-teal-700/70",
    water: "bg-blue-500/90",
  };
  return (
    <>
      {types.map((type, i) => {
        const typeClass = typeColors[type.type.name] || "bg-gray-200";
        return (
          <p
            className={`typeName mx-1 capitalize ${typeClass} text-white py-0.5 px-1 rounded-md`}
            key={i}
          >
            {t("types." + type.type.name)}
          </p>
        );
      })}
    </>
  );
};

export default Types;
