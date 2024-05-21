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
  const typeTranslations = {
    むし: "bug",
    やみ: "dark",
    ドラゴン: "dragon",
    でんき: "electric",
    フェアリー: "fairy",
    かくとう: "fighting",
    ほのお: "fire",
    ひこう: "flying",
    ゴースト: "ghost",
    くさ: "grass",
    じめん: "ground",
    こおり: "ice",
    ノーマル: "normal",
    どく: "poison",
    エスパー: "psychic",
    いわ: "rock",
    はがね: "steel",
    みず: "water",
  };

  if (!types || types.length === 0) {
    return <p>{t("messages.noTypes")}</p>; // タイプがない場合の代替メッセージ
  }

  return (
    <>
      {types.map((type, i) => {
        if (!type) {
          return null; // typeがundefinedの場合は無視
        }
        const englishType = typeTranslations[type] || type.toLowerCase();
        const typeClass = typeColors[englishType] || "bg-gray-400";
        return (
          <p
            className={`typeName mx-1 capitalize ${typeClass} text-white py-0.5 px-1 rounded-md`}
            key={i}
          >
            {type}
          </p>
        );
      })}
    </>
  );
};

export default Types;
