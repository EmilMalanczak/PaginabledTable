import React, { useState } from "react";

const Pagination = ({ paginationState, paginationActions }) => {
  const {
    goToFirstPage,
    goToPrevPage,
    goToPage,
    goToNextPage,
    goToLastPage,
  } = paginationActions;

  const { isBusy, actualPageIdx, lastPageIdx } = paginationState;
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    if (e.target.value <= lastPageIdx + 1 && e.target.value > 0) {
      setInput(e.target.value);
      setError("");
    } else {
      setError("Plese select existing page");
    }
  };

  const changePage = (e) => {
    e.preventDefault();
    if (!error) goToPage(input);
  };

  return (
    <>
      <div>
        <button
          disabled={isBusy || actualPageIdx === 0}
          onClick={goToFirstPage}
        >
          first
        </button>
        <button disabled={isBusy || actualPageIdx === 0} onClick={goToPrevPage}>
          prev
        </button>
        <button
          disabled={isBusy || actualPageIdx === lastPageIdx}
          onClick={goToNextPage}
        >
          next
        </button>
        <button
          disabled={isBusy || actualPageIdx === lastPageIdx}
          onClick={goToLastPage}
        >
          last
        </button>
        <form onSubmit={changePage}>
          <input type="number" onChange={handleInput} />
          <p>{error ? error : null}</p>
        </form>
      </div>
      <div>
        {actualPageIdx > 0 && <button onClick={goToFirstPage}>1</button>}
        {actualPageIdx > 1 && <button onClick={() => goToPage(2)}>2</button>}
        {actualPageIdx > 2 && "..."}
        <button style={{ fontWeight: "bold", backgroundColor: "red" }}>
          {actualPageIdx + 1}
        </button>
        {actualPageIdx < lastPageIdx - 2 && "..."}
        {actualPageIdx < lastPageIdx - 1 && (
          <button onClick={() => goToPage(lastPageIdx)}>{lastPageIdx}</button>
        )}
        {actualPageIdx < lastPageIdx && (
          <button onClick={goToLastPage}>{lastPageIdx + 1}</button>
        )}
      </div>
    </>
  );
};

export default Pagination;
