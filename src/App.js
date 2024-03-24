import { useEffect, useState, useRef } from "react";
import "./App.css";
import { getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import CenterLoading from "./components/Loading/CenterLoading.js";
import Search from "./components/Search/Search.js";

function App() {
  const [page, setPage] = useState(1); // Update fetching Pokemon URL
  const loader = useRef(null);

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
  const [centerLoading, setCenterLoading] = useState(false); // Center Loadig
  const [pokemonData, setPokemonData] = useState([]); // Pokemon Data for displaying
  const [query, setQuery] = useState(""); // Query for search Pokemon
  const [activeType, setActiveType] = useState(pokemonTypes); // Pokemon Types

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCenterLoading(true);
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
      if (mount) setCenterLoading(false);
    };
    fetchPokemonData();
    return () => {
      mount = false;
    };
  }, [page]);

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
                  return (
                    <Card
                      key={i}
                      pokemon={pokemon}
                      // ref={i === pokemon.length - 1 ? lastItemRef : null}
                    />
                  );
                })}
              </div>
              {/* <button onClick={() => setPage((prev) => prev + 1)}>Load</button> */}
              <div ref={loader} style={{ height: "100px", margin: "30px" }}>
                <span>Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
