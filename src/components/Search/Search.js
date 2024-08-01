import { React } from "react";

/*
 * Import types' images
 * 1. Create the array of the images processed with Base64
 * 2. Execute importTypeIconsAll function and put their data into iconArray
 *
 * @param
 * - {function} requireContextImages - require.context("../../images/", false, /\.png/) - the images settings in images directory
 */
function importTypeIconsAll(requireContextImages) {
  return requireContextImages.keys().map(requireContextImages);
}
const iconsArray = importTypeIconsAll(
  require.context("../../images/", false, /\.png/)
);
// console.log("iconsArray: ", iconsArray);

/*
 * The behavior of clicking Type button
 * Type Button comes out when the screen width < 640px
 * Type drawer - OPENED => Behavior - CLOSED
 * Type drawer - CLOSED => Behavior - OPENED
 */
const handleToggleTypes = () => {
  const typeIconsEl = document.getElementById("typeIcons"); // Type icons area
  const allTypesEl = document.getElementById("allTypes"); // All Types ON/OFF button
  if (
    typeIconsEl.classList.contains("hidden") ||
    allTypesEl.classList.contains("hidden")
  ) {
    typeIconsEl.classList.remove("hidden");
    allTypesEl.classList.remove("hidden");
    typeIconsEl.classList.add("flex");
  } else {
    typeIconsEl.classList.add("hidden");
    allTypesEl.classList.add("hidden");
  }
};

/*
 * IconsGallery functional component
 * - Output Type Icons area
 *
 * @param
 * {Array.<string>} iconsArray - icon images array
 * {Array.<string>} pokemonTypes - Types Pokemon has
 * {function} handleTypeClick - Update active types to filter pokemon by types
 * {Array.<string>} activeType - Update active type
 * {function} handleAllTypes - Switch active types by All types On or Off button clicking
 * {function} t - Translation function
 */
const IconsGallery = ({
  iconsArray,
  pokemonTypes,
  handleTypeClick,
  activeType,
  handleAllTypes,
  t,
}) => (
  <div className="absolute sm:relative top-2.5 right-3 sm:top-auto sm:right-0 flex flex-col sm:flex-row flex-wrap items-center py-1.5 bg-slate-500 sm:bg-transparent rounded-md">
    <button className="text-white sm:hidden px-1" onClick={handleToggleTypes}>
      {t("type")} ▼
    </button>
    <button
      id="allTypes"
      className="hidden sm:block w-14 h-14 mt-1 sm:mt-0 text-xs text-white font-bold leading-tight bg-slate-400 rounded-full"
      onClick={handleAllTypes}
      style={{ whiteSpace: "pre-line" }}
      dangerouslySetInnerHTML={{
        __html:
          activeType.length === 0
            ? t("typesButtonSelect")
            : t("typesButtonDeselect"),
      }}
    ></button>

    <div
      id="typeIcons"
      className="hidden sm:flex items-center justify-center flex-wrap w-20 sm:w-72 mt-1 sm:mt-0"
    >
      {iconsArray.map((icon, index) => (
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
            onClick={(e) => handleTypeClick(e.target.getAttribute("data-type"))}
          />
        </div>
      ))}
    </div>
  </div>
);

const Search = ({
  handleInputChange,
  handleTypeClick,
  activeType,
  pokemonTypes,
  handleAllTypes,
  t,
}) => {
  return (
    <>
      <div className="container fixed top-12 left-1/2 -translate-x-1/2 flex items-center justify-between sm:flex-wrap w-full h-14 sm:h-20 px-3 sm:px-2 bg-blue-100">
        <div className="relative">
          <input
            className="search relative placeholder-slate-400 shadow appearance-none border rounded w-60 h-8 py-2 pl-3 pr-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline)]"
            id="username"
            type="text"
            placeholder={t("search")}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="gray"
            className="absolute right-1 top-1.5 w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <IconsGallery
          iconsArray={iconsArray}
          pokemonTypes={pokemonTypes}
          handleTypeClick={handleTypeClick}
          activeType={activeType}
          handleAllTypes={handleAllTypes}
          t={t}
        />
      </div>
    </>
  );
};

export default Search;
