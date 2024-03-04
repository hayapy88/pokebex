import { React, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const handleSearch = () => {};
  return (
    <>
      <div className="my-4 mx-2 text-left">
        <input
          className="search relative placeholder-slate-400 shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline)]"
          id="username"
          type="text"
          placeholder="Search Pokemon..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
