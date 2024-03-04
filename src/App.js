import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import Loading from "./components/Loading/Loading.js";
import Loadmore from "./components/Pagination/Loadmore.js";
import Search from "./components/Search/Search.js";
// import Pagination from "./components/Pagination/Pagination.js";
// import Search from "./components/Search/Search.js";

function App() {
  const totalPokemon = 493;
  const initialURL = "https://pokeapi.co/api/v2/pokemon?limit=" + totalPokemon;
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [visible, setVisible] = useState(30);
  const [query, setQuery] = useState("");
  // const [nextURL, setNextURL] = useState("");
  // const [prevURL, setPrevURL] = useState("");
  useEffect(() => {
    const fetchPokemonData = async () => {
      // All Pokemon Data
      let res = await getAllPokemon(initialURL);
      // Get Pokemon data in detail
      loadPokemon(res.results);
      // console.log(res.next);
      // setNextURL(res.next);
      // setPrevURL(res.previous); // Null
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchPokemonData();
  }, [initialURL]);
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
  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  const handleInputChange = (newQuery) => {
    setQuery(newQuery);
  };

  // console.log(pokemonData);

  // const handleNextPage = async () => {
  //   setLoading(true);
  //   let data = await getAllPokemon(nextURL);
  //   console.log(data);
  //   await loadPokemon(data.results);
  //   setNextURL(data.next);
  //   setPrevURL(data.previous);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 800);
  // };
  // const handlePrevPage = async () => {
  //   if (!prevURL) return;
  //   setLoading(true);
  //   let data = await getAllPokemon(prevURL);
  //   console.log(data);
  //   await loadPokemon(data.results);
  //   setNextURL(data.next);
  //   setPrevURL(data.previous);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // };

  const showMorePokemon = () => {
    setVisible((prevValue) => prevValue + 30);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-blue-100">
          <Navbar />
          <div className="text-center py-14">
            <div className="container mx-auto">
              <Search onSearchChange={handleInputChange} />
              <div className="pokemonCardContainer grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-0 gap-y-4 my-4">
                {filteredPokemonData.slice(0, visible).map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
              </div>

              <Loadmore
                showMorePokemon={showMorePokemon}
                visible={visible}
                totalPokemon={totalPokemon}
              />
              {/* <Pagination
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
