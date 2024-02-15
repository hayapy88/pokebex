import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  useEffect(() => {
    const fetchPokemonData = async () => {
      // All Pokemon Data
      let res = await getAllPokemon(initialURL);
      // Get Pokemon data in detail
      loadPokemon(res.results);
      // console.log(res.next);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log(data);
    loadPokemon(data.results);
    setLoading(false);
  };
  const prevPage = () => {};

  return (
    <>
      <Navbar />
      <div className="App mx-1 mt-16 mb-10">
        {loading ? (
          <h1 className="mt-20">Now Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-0 gap-y-4 my-4">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="pager">
              <button onClick={prevPage}>Prev</button>
              <button onClick={nextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
