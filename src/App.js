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
  const [prevURL, setPrevURL] = useState("");
  useEffect(() => {
    const fetchPokemonData = async () => {
      // All Pokemon Data
      let res = await getAllPokemon(initialURL);
      // Get Pokemon data in detail
      loadPokemon(res.results);
      // console.log(res.next);
      setNextURL(res.next);
      setPrevURL(res.previous); // Null
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
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const prevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

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
            <div className="pager inline-flex">
              <button
                type="button"
                onClick={prevPage}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={nextPage}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
