import React from "react";
import { useTranslation } from "react-i18next";
import Types from "./Types";

const Card = React.forwardRef(({ pokemon }, ref) => {
  // `index`は使用しないため削除
  const { t } = useTranslation();
  const meterHeight = pokemon.height / 10;
  const kgWeight = pokemon.weight / 10;

  return (
    <div
      className="card mx-3 sm:mx-2 p-8 bg-blue-50 border rounded-lg shadow-lg"
      ref={ref} // `key`は親コンポーネントで使用するため削除
    >
      <div className="cardImg">
        {pokemon.image ? (
          <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />
        ) : (
          <p>{t("messages.imageNotAvailable")}</p> // 画像がない場合の代替テキスト
        )}
      </div>
      <h3 className="cardName mb-3 text-2xl font-bold capitalize">
        {pokemon.name}
      </h3>
      <div className="cardTypes flex justify-center">
        <p className="font-bold">No: {pokemon.no}</p>
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
            {t("classification")}: {pokemon.genes}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Card;
