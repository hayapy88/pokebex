import { useEffect } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  useEffect(() => {
    const fetchPokemonData = async () => {
      // All Pokemon Data
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
