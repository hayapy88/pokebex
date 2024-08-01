import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import CenterLoading from "./components/Loading/CenterLoading.js";
import Search from "./components/Search/Search.js";
import "./App.css";

const App = () => {
  const { t, i18n } = useTranslation(); // i18next
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [pageLang, setPageLang] = useState(i18n.language); // To observe page language
  const [pokemonData, setPokemonData] = useState({ en: [], ja: [] }); // Pokemon Data for display
  const [query, setQuery] = useState(""); // Query for search Pokemon
  const [isReady, setIsReady] = useState(false); // Finished update of pokemonData
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
  const [activeType, setActiveType] = useState(pokemonTypes); // Selected Pokemon types
  const [filteredPokemons, setFilteredPokemons] = useState({ en: [], ja: [] }); // Filtered Pokemon for display

  useEffect(() => {
    // Handle i18next initialization
    const handleInit = () => {
      console.log("i18n initialized");
    };

    if (i18n.isInitialized) {
      setTimeout(() => {
        handleInit();
      }, 2000);
    } else {
      i18n.on("initialized", handleInit);
      i18n.on("loaded", handleInit);
      i18n.on("init", handleInit);

      // Cleanup
      return () => {
        i18n.off("initialized", handleInit);
        i18n.off("loaded", handleInit);
        i18n.off("init", handleInit);
      };
    }
  }, [i18n]);

  // Update current language
  useEffect(() => {
    setPageLang(i18n.language);
  }, [i18n.language]);

  /**
   * Fetch Pokemon Data
   * 1. Create API URL to fetch pokemon data - Poke API: https://pokeapi.co/
   * 2. Fetch pokemon data
   * 3. Store pokemon data for each language into the pokemonData state
   */
  const fetchPokemonData = useCallback(async () => {
    // Display loading messages
    setIsLoading(true);

    const fetchPokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const response = await getPokemon(fetchPokemonURL);
    console.log("API response:", response);

    const receivedPokemonsArray = response.results;
    console.log("receivedPokemonsArray", receivedPokemonsArray);

    /**
     * Store each Pokemon's data in the pokemonData state
     * 1. Process Pokemon's data:
     * - Extract attributes: name, no, types, genus, weight, height, image
     * 2. Add them to corresponding landing array in pokemonData
     *
     * @param {array} receivedRawPokemonData - _rawPokemonData[{},{}]
     */
    const _pokemonData = {
      en: [],
      ja: [],
    };
    const putPokemonDataForEachLang = async (receivedRawPokemonData) => {
      for (const pokemon of receivedRawPokemonData) {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();

        // Fetch Name
        const nameEN = speciesData.names.find(
          (entry) => entry.language.name === "en"
        );
        const nameJA = speciesData.names.find(
          (entry) => entry.language.name === "ja"
        );

        /**
         * Translate English types into Japanese
         * 1. Set translation mapping as typeTranslations object
         * 2. Find the type in typeTranslations object
         * 3. Set the translated Japanese type to typesJaArray
         *
         * @param {array} typesEnArray - Pokemon's fetched English types array
         * @returns {array} translatedTypesJaArray - Translated Japanese types array
         */
        // Fetch Types
        const typesEnArray = [];
        for (const type of pokemon.types) {
          const fetchedType = type.type.name;
          typesEnArray.push(fetchedType);
        }
        const typeTranslations = {
          bug: "むし",
          dark: "あく",
          dragon: "ドラゴン",
          electric: "でんき",
          fairy: "フェアリー",
          fighting: "かくとう",
          fire: "ほのお",
          flying: "ひこう",
          ghost: "ゴースト",
          grass: "くさ",
          ground: "じめん",
          ice: "こおり",
          normal: "ノーマル",
          poison: "どく",
          psychic: "エスパー",
          rock: "いわ",
          steel: "はがね",
          water: "みず",
        };
        const translateTypes = (typesEnArray) => {
          const translatedTypesJaArray = typesEnArray.map(
            (type) => typeTranslations[type]
          );
          return translatedTypesJaArray;
        };
        const typesJaArray = translateTypes(typesEnArray);

        // Fetch Genus
        const genusEnEntry = await speciesData.genera.find(
          (entry) => entry.language.name === "en"
        );
        const genusJaEntry = await speciesData.genera.find(
          (entry) => entry.language.name === "ja"
        );
        const genusEn = genusEnEntry ? genusEnEntry.genus : null;
        const genusJa = genusJaEntry ? genusJaEntry.genus : null;

        // Fetch image
        const pokemonImage = await pokemon.sprites.front_default;

        // Fetch No - no: pokemon.id
        // Fetch Height - height: pokemon.height
        // Fetch Weight - weight: pokemon.weight

        // Push data
        if (nameEN) {
          _pokemonData.en.push({
            name: nameEN.name,
            no: pokemon.id,
            types: typesEnArray,
            genes: genusEn,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemonImage,
          });
          // console.log("_pokemonData.en", _pokemonData.en);
        }
        if (nameJA) {
          _pokemonData.ja.push({
            name: nameJA.name,
            no: pokemon.id,
            types: typesJaArray,
            genes: genusJa,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemonImage,
          });
          // console.log("_pokemonData.ja", _pokemonData.ja);
        }
      }

      // Update pokemonData
      setPokemonData((prevPokemonData) => ({
        en: [...prevPokemonData.en, ..._pokemonData.en],
        ja: [...prevPokemonData.ja, ..._pokemonData.ja],
      }));
      console.log("_pokemonData: ", _pokemonData);

      // Hide loading messages
      setIsLoading(false);

      // Ready to display
      setIsReady(true);
    };

    /**
     * Fetch detailed data for each Pokemon
     * 1. Retrieve data for each Pokemon one by one
     * (Data includes abilities, height, weight, types, species(detailed information), sprites(images), etc.)
     * 2. Store the fetched data in _rawPokemonData array
     *
     * @param {array} receivedPokemons - receivedPokemonsArray
     * @returns {Promise<void>} - Updates the state with fetched data
     */
    const getEachPokemonData = async (receivedPokemons) => {
      let _rawPokemonData = await Promise.all(
        receivedPokemons.map((pokemon) => {
          return getPokemon(pokemon.url);
        })
      );
      console.log("_rawPokemonData", _rawPokemonData);
      putPokemonDataForEachLang(_rawPokemonData);
    };
    await getEachPokemonData(receivedPokemonsArray);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchPokemonData().then(() => {
      if (isMounted) {
        // Hide loading messages
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchPokemonData]);

  useEffect(() => {
    setFilteredPokemons(pokemonData);
  }, [pokemonData]);

  /**
   * Filter Pokemons for display
   * - Filter by name and types
   *
   * @param {string} query - The value in Pokemon name search box
   * @param {array} activeType - Array of active types
   *
   * @dependencies
   * - i18n.language: When language is changes
   * - pokemonData.en: When pokemonData.en is changed
   * - pokemonData.ja: When pokemonData.ja is changed
   * - isReady: After finishing creating arrays to display
   */
  const filterPokemons = useCallback(
    (query, activeType) => {
      // Mapping types between Japanese and English
      const typeTranslations = {
        むし: "bug",
        あく: "dark",
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

      if (query.length === 0 && activeType.length === 18 && !isReady) {
        console.log("No search condition in the beginning.");
        return;
      } else if (i18n.language === "en" && pokemonData.en && isReady) {
        // Filter by name and types for English
        const filteredEnPokemon = pokemonData.en.filter((pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
            pokemon.types.some((aTypes) =>
              activeType.includes(aTypes.toLowerCase())
            )
          );
        });
        // Update filteredPokemons for English
        setFilteredPokemons({ en: filteredEnPokemon });
      } else if (i18n.language === "ja" && pokemonData.ja && isReady) {
        // Filter by name and types for Japanese
        const filteredJaPokemon = pokemonData.ja.filter((pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
            pokemon.types.some((aTypes) =>
              activeType.includes(typeTranslations[aTypes])
            )
          );
        });
        // Update filteredPokemons for Japanese
        setFilteredPokemons({ ja: filteredJaPokemon });
      }
    },
    [i18n.language, pokemonData.en, pokemonData.ja, isReady]
  );
  // Filter pokemons when query or activeTypes is changed
  useEffect(() => {
    filterPokemons(query, activeType);
    console.log("activeType: ", activeType);
  }, [query, activeType, filterPokemons]);

  // For checking the contents of filteredPokemons
  useEffect(() => {
    if (filteredPokemons.length > 0)
      console.log("filteredPokemons: ", filteredPokemons);
  }, [filteredPokemons]);

  /**
   * Update query which is the keyword to filter by name
   * 1. Get Key word from Pokemon name Search box
   * 2. Update query by the keyword
   *
   * @param {string} newQuery - the value in Pokemon name search box
   */
  const handleInputChange = (newQuery) => {
    setQuery(newQuery);
    filterPokemons(query, activeType);
  };

  /**
   * Switch active types by All types On or Off button clicking
   * - Get click event on the #allTypes button element
   */
  const handleAllTypes = () => {
    if (activeType.length >= 1) {
      console.log("All inactivated");
      setActiveType([]); // Cancel all active types
    } else {
      console.log("All activated");
      setActiveType(pokemonTypes); // Set all active types
    }
  };
  /**
   * Update active types to filter pokemon by types
   * - 1. Get click event on each type
   * - 2. Update the type
   *
   * @param {string} clickedType - The type the user clicked
   */
  const handleTypeClick = (clickedType) => {
    setActiveType((prevActiveType) => {
      if (prevActiveType.includes(clickedType)) {
        return prevActiveType.filter((type) => type !== clickedType); // As they are
      } else {
        return [...prevActiveType, clickedType]; // Add the type
      }
    });
  };

  return (
    <>
      {!isReady ? (
        <CenterLoading t={t} />
      ) : (
        <div className="h-full bg-blue-100">
          <Navbar t={t} i18n={i18n} />
          <div className="text-center py-12">
            <div className="container mx-auto">
              <Search
                handleInputChange={handleInputChange}
                handleTypeClick={handleTypeClick}
                activeType={activeType}
                pokemonTypes={pokemonTypes}
                handleAllTypes={handleAllTypes}
                t={t}
              />
              <div className="pokemonCardContainer grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-0 gap-y-4 mt-8 sm:mt-14 pt-6 mb-4">
                {filteredPokemons[pageLang] &&
                  filteredPokemons[pageLang].map((pokemon, index) => {
                    return <Card key={index} pokemon={pokemon} t={t} />;
                  })}
              </div>
              <div>
                {!isLoading && filteredPokemons[pageLang].length === 0 && (
                  <p>
                    {t("messages.noFound1")}
                    <br />
                    {t("messages.noFound2")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
