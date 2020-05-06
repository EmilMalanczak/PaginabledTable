import React from "react";
import { dataEntries } from "./data";
import Pagination from "./Pagination";
import { usePagination } from "./usePagination.js";

function PaginatedTable() {
  const [paginationState, paginationActions] = usePagination(dataEntries, 20);
  return (
    <>
      <Pagination
        paginationActions={paginationActions}
        paginationState={paginationState}
      />
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
          </tr>
        </thead>
        <tbody>
          {paginationState.entriesOnSelectedPage.map((entry, i) => (
            <tr key={i}>
              <td>{entry.place}</td>
              <td>
                {entry.name} {entry.surname}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PaginatedTable;
