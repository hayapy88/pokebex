import { useEffect, useState } from "react";
import "./App.css";
import { getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import Loading from "./components/Loading/Loading.js";
import Search from "./components/Search/Search.js";
import InfiniteScroll from "./components/Pagination/InfiniteScroll.js";

function App() {
  // const totalPokemon = 493;
  const [page, setPage] = useState(1);

  const pokemonTypes = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState(pokemonTypes);

  useEffect(() => {
    let mount = true;
    const fetchPokemonData = async () => {
      // Update Pokemon URL
      const fetchPokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${
        30 * (page - 1)
      }`;

      // Get Pokemon name and URL from limited fetchPokemonURL.
      // eg) [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }, {}, {}, ...]
      let res = await getPokemon(fetchPokemonURL);
      console.log("res");
      console.log(res);

      // Get each Pokemon data
      const getEachPokemonData = async (data) => {
        let _pokemonData = await Promise.all(
          data.map((pokemon) => {
            console.log(pokemon);
            let pokemonRecord = getPokemon(pokemon.url);
            return pokemonRecord;
          })
        );
        if (mount) {
          setPokemonData((prevPokemonData) => [
            ...prevPokemonData,
            ..._pokemonData,
          ]);
        }

        console.log("_pokemonData");
        console.log(_pokemonData);
      };

      getEachPokemonData(res.results);
      console.log(res.results);
      if (mount) setLoading(false);
    };
    fetchPokemonData();
    return () => {
      mount = false;
    };
  }, [page]);

  const displayablePokemonArray = pokemonData.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
      pokemon.types.some((type) => activeType.includes(type.type.name))
    );
  });

  const handleInputChange = (newQuery) => {
    setQuery(newQuery);
  };
  const handleAllTypes = () => {
    if (activeType.length >= 1) {
      console.log("All Off");
      setActiveType([]);
    } else {
      console.log("All On");
      setActiveType(pokemonTypes);
    }
  };
  const handleTypeClick = (newType) => {
    setActiveType((prevActiveType) => {
      if (prevActiveType.includes(newType)) {
        return prevActiveType.filter((type) => type !== newType);
      } else {
        return [...prevActiveType, newType];
      }
    });
  };
  // console.log(activeType);

  // console.log(pokemonData);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-blue-100">
          <Navbar />
          <div className="text-center py-12">
            <div className="container mx-auto">
              <Search
                onSearchChange={handleInputChange}
                onTypeClick={handleTypeClick}
                activeType={activeType}
                pokemonTypes={pokemonTypes}
                handleAllTypes={handleAllTypes}
              />
              <div className="pokemonCardContainer grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-0 gap-y-4 sm:mt-14 pt-6 mb-4">
                {displayablePokemonArray.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
              </div>
              <button onClick={() => setPage((prev) => prev + 1)}>Load</button>
              <InfiniteScroll />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
