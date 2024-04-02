import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import { getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import CenterLoading from "./components/Loading/CenterLoading.js";
import Search from "./components/Search/Search.js";

function App() {
  const [page, setPage] = useState(1); // Update fetching Pokemon URL
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

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
  const [centerLoading, setCenterLoading] = useState(true); // Center Loadig
  const [pokemonData, setPokemonData] = useState([]); // Pokemon Data for displaying
  const [query, setQuery] = useState(""); // Query for search Pokemon
  const [activeType, setActiveType] = useState(pokemonTypes); // Pokemon Types

  const offset = `${30 * (page - 1)}`;

  useEffect(() => {
    let mount = true;

    if (offset > 1025) {
      return;
    }

    setLoading(true);
    const fetchPokemonData = async () => {
      // Update Pokemon URL

      const fetchPokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`;

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
            let pokemonRecord = getPokemon(pokemon.url); // The result from calling API
            return pokemonRecord;
          })
        );
        if (mount) {
          setPokemonData((prevPokemonData) => [
            ...prevPokemonData,
            ..._pokemonData,
          ]);
          setLoading(false);
        }

        console.log("_pokemonData");
        console.log(_pokemonData);
      };

      getEachPokemonData(res.results);
      console.log(res.results);
      setCenterLoading(false);
    };
    fetchPokemonData();
    return () => {
      mount = false;
    };
  }, [page, offset]);

  const displayablePokemonArray = pokemonData.filter((pokemon) => {
    // Fister Pokemon by Keyword Search
    return (
      pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
      pokemon.types.some((type) => activeType.includes(type.type.name))
    );
  });

  const handleInputChange = (newQuery) => {
    // Get Key word for Search from Search box
    setQuery(newQuery);
  };
  const handleAllTypes = () => {
    // Pokemon Types All ON / All Off
    if (activeType.length >= 1) {
      console.log("All Off");
      setActiveType([]);
    } else {
      console.log("All On");
      setActiveType(pokemonTypes);
    }
  };
  const handleTypeClick = (clickedType) => {
    // Update active types by clicked type
    setActiveType((prevActiveType) => {
      if (prevActiveType.includes(clickedType)) {
        return prevActiveType.filter((type) => type !== clickedType); // As they are
      } else {
        return [...prevActiveType, clickedType]; // Add the type
      }
    });
  };
  // console.log(activeType);

  // console.log(pokemonData);

  return (
    <>
      {centerLoading ? (
        <CenterLoading />
      ) : (
        <div className="h-full bg-blue-100">
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
              <div className="pokemonCardContainer grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-0 gap-y-4 mt-8 sm:mt-14 pt-6 mb-4">
                {displayablePokemonArray.map((pokemon, index) => {
                  return (
                    <Card
                      key={index}
                      pokemon={pokemon}
                      ref={
                        index === displayablePokemonArray.length - 1
                          ? lastItemRef
                          : null
                      }
                    />
                  );
                })}
              </div>
              {loading && offset <= 1025 && <p>Loading...</p>}
              {displayablePokemonArray.length === 0 && (
                <p>
                  No Pokémon were found under these conditions.
                  <br />
                  Try adjusting the Pokémon name or types to see different
                  results.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
