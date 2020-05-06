import { useState, useEffect } from "react";

export const usePagination = (dataEntries, elementsOnPage = 50) => {
  const [actualPageIdx, setActualPage] = useState(2);
  const [lastPageIdx, setLastPage] = useState(null);
  const [isBusy, setBusy] = useState(false);
  const [entriesOnSelectedPage, setEntries] = useState([]);

  useEffect(() => {
    const numbersOfPages = Math.ceil(dataEntries.length / elementsOnPage);
    setLastPage(numbersOfPages - 1);
  }, [dataEntries, elementsOnPage]);

  useEffect(() => {
    setBusy(true);
    const busyMode = setTimeout(() => {
      setBusy(false);
    }, 333);

    const dataForCurrentPage = dataEntries.slice(
      actualPageIdx * elementsOnPage,
      actualPageIdx * elementsOnPage + elementsOnPage
    );

    setEntries(dataForCurrentPage);
    return () => {
      clearTimeout(busyMode);
    };
  }, [actualPageIdx, dataEntries, elementsOnPage]);

  const goTo = (number) => {
    setActualPage(number);
  };

  const paginationActions = {
    goToFirstPage: () => goTo(0),
    goToLastPage: () => goTo(lastPageIdx),
    goToNextPage: () => goTo(actualPageIdx + 1),
    goToPrevPage: () => goTo(actualPageIdx - 1),
    goToPage: (number) => goTo(number - 1),
  };
  const paginationState = {
    actualPageIdx,
    lastPageIdx,
    isBusy,
    entriesOnSelectedPage,
  };

  return [paginationState, paginationActions];
};
