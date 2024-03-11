import { React } from "react";

function importTypeIconsAll(r) {
  return r.keys().map(r);
}

const icons = importTypeIconsAll(
  require.context("../../images/", false, /\.png/)
);

const handleToggleTypes = () => {
  const typeIconsElm = document.getElementById("typeIcons");
  const allTypesElm = document.getElementById("allTypes");
  if (
    typeIconsElm.classList.contains("hidden") ||
    allTypesElm.classList.contains("hidden")
  ) {
    typeIconsElm.classList.remove("hidden");
    allTypesElm.classList.remove("hidden");
    typeIconsElm.classList.add("flex");
  } else {
    typeIconsElm.classList.add("hidden");
    allTypesElm.classList.add("hidden");
  }
};

const handleTypeSelect = (e, onTypeClick) => {
  const type = e.target.getAttribute("data-type");
  console.log(type);

  onTypeClick(type);
};

const IconsGallery = ({
  icons,
  pokemonTypes,
  onTypeClick,
  activeType,
  handleAllTypes,
}) => (
  <div className="absolute sm:relative top-2.5 right-3 sm:top-auto sm:right-0 flex flex-col sm:flex-row flex-wrap items-center py-1.5 bg-slate-500 sm:bg-transparent rounded">
    <button className="text-white sm:hidden px-1" onClick={handleToggleTypes}>
      Types ▼
    </button>
    <button
      id="allTypes"
      className="hidden w-14 h-14 mt-1 sm:mt-0 text-xs text-white font-bold leading-tight bg-slate-400 rounded-full"
      onClick={handleAllTypes}
    >
      ALL<br></br>ON/OFF
    </button>
    <div
      id="typeIcons"
      className="hidden sm:flex items-center justify-center flex-wrap w-20 sm:w-72 mt-1 sm:mt-0"
    >
      {icons.map((icon, index) => (
        <div
          className={`typeIcon my-1 mx-1 sm:ml-2 sm:mr-0 cursor-pointer ${
            activeType.includes(pokemonTypes[index]) ? "active" : ""
          }`}
          key={index}
        >
          <img
            className={"typeIconImage w-6 h-6"}
            src={icon}
            alt={`Type: ${pokemonTypes[index]}`}
            data-type={`${pokemonTypes[index]}`}
            onClick={(e) => handleTypeSelect(e, onTypeClick)}
          />
        </div>
      ))}
    </div>
  </div>
);

const Search = ({
  onSearchChange,
  onTypeClick,
  activeType,
  pokemonTypes,
  handleAllTypes,
}) => {
  return (
    <>
      <div className="container fixed top-12 left-1/2 -translate-x-1/2 flex items-center justify-between sm:flex-wrap w-full h-14 sm:h-20 px-3 sm:px-2 bg-blue-100">
        <input
          className="search relative placeholder-slate-400 shadow appearance-none border rounded w-50 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline)]"
          id="username"
          type="text"
          placeholder="Search Pokemon..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <IconsGallery
          icons={icons}
          pokemonTypes={pokemonTypes}
          onTypeClick={onTypeClick}
          activeType={activeType}
          handleAllTypes={handleAllTypes}
        />
      </div>
    </>
  );
};

export default Search;
