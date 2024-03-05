import { React } from "react";
const typeIcons = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fight",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
];

function importTypeIconsAll(r) {
  return r.keys().map(r);
}

const icons = importTypeIconsAll(
  require.context("../../images/", false, /\.png/)
);

const handleToggleTypes = () => {
  const typeIcons = document.getElementById("typeIcons");
  if (typeIcons.classList.contains("hidden")) {
    typeIcons.classList.remove("hidden");
    typeIcons.classList.add("flex");
  } else {
    typeIcons.classList.add("hidden");
  }
};

const IconsGallery = ({ icons, typeIcons }) => (
  <div className="absolute top-2.5 right-3 sm:top-auto w-20 sm:w-72 py-1.5 bg-slate-500 sm:bg-transparent rounded">
    <button className="text-white sm:hidden" onClick={handleToggleTypes}>
      Type ▼
    </button>
    <div
      id="typeIcons"
      className="hidden sm:flex items-center justify-center flex-wrap mt-1"
    >
      {icons.map((icon, index) => (
        <img
          className="w-6 h-6 my-0.5 mx-1 sm:ml-2 sm:mr-0"
          key={index}
          src={icon}
          alt={`Type: ${typeIcons[index]}`}
        />
      ))}
    </div>
  </div>
);

const Search = ({ onSearchChange }) => {
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
        <IconsGallery icons={icons} typeIcons={typeIcons} />
      </div>
    </>
  );
};

export default Search;
