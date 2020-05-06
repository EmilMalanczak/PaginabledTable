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
    const dataForCurrentPage = dataEntries.slice(
      actualPageIdx * elementsOnPage,
      actualPageIdx * elementsOnPage + elementsOnPage
    );
    setEntries(dataForCurrentPage);
  }, [actualPageIdx, dataEntries, elementsOnPage]);

  const runBusyMode = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
    }, 333);
  };
  const goToFirstPage = () => {
    runBusyMode();
    setActualPage(0);
  };

  const goToPrevPage = () => {
    runBusyMode();
    if (actualPageIdx === 0) return;
    setActualPage(actualPageIdx - 1);
  };

  const goToPage = (number) => {
    runBusyMode();
    setActualPage(number - 1);
  };

  const goToNextPage = () => {
    runBusyMode();
    if (actualPageIdx === lastPageIdx) return;
    setActualPage(actualPageIdx + 1);
  };

  const goToLastPage = () => {
    runBusyMode();
    setActualPage(lastPageIdx);
  };

  const paginationActions = {
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPage,
    goToPrevPage,
  };
  const paginationState = {
    actualPageIdx,
    lastPageIdx,
    isBusy,
    entriesOnSelectedPage,
  };

  return [paginationState, paginationActions];
};
