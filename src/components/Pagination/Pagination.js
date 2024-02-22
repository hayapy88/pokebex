import React from "react";

const Pagination = (handlePrevPage, handleNextPage) => {
  return (
    <>
      <div className="pagination">
        <div className="inline-flex my-4">
          <button
            type="button"
            onClick={handlePrevPage}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
