import React from "react";

const Loadmore = ({ showMorePokemon, visible, totalPokemon }) => {
  if (visible >= totalPokemon) {
    return <p>All Pokémon data is displayed!</p>;
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={showMorePokemon}
      >
        Load More
      </button>
    </div>
  );
};

export default Loadmore;
