import React from "react";

const Types = ({ types }) => {
  const typeColors = {
    fire: "bg-orange-600",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-500",
    dragon: "bg-indigo-500",
    dark: "bg-gray-800",
    fairy: "bg-pink-200",
    normal: "bg-gray-400",
    fighting: "bg-red-700",
    flying: "bg-blue-300",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    rock: "bg-yellow-700",
    bug: "bg-green-700",
    ghost: "bg-purple-900",
    steel: "bg-gray-500",
  };
  return (
    <>
      {types.map((type, i) => {
        const typeClass = typeColors[type.type.name] || "bg-gray-200";
        console.log(typeClass);
        return (
          <p
            className={`typeName mx-1 capitalize ${typeClass} text-white py-0.5 px-1 rounded`}
            key={i}
          >
            {type.type.name}
          </p>
        );
      })}
    </>
  );
};

export default Types;
