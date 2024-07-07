import { useCallback, useState } from "react";
import { isEmpty } from "lodash";

import "./App.css";
import useFetchData from "./hooks/useFetchData";
import useSortedData from "./hooks/useSortedData";
import Header from "./components/Header";
import Pagination from "./components/Pagination/Pagination";
import usePagination from "./hooks/usePagination";
import Launches from "./components/Launches";

const LAUNCHES_URL = "https://api.spacexdata.com/v4/launches";

const getFilteredData = (data, searchTerm) => {
  if (!searchTerm) {
    return data;
  }
  return data.filter((item) => {
    const lookupData = JSON.stringify({
      name: item.name?.toLowerCase(),
      details: item.details?.toLowerCase(),
    });
    return lookupData.indexOf(searchTerm?.toLowerCase()) > -1;
  });
};

function App() {
  const [sortOrder, setSortOrder] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [loading, error, data] = useFetchData({ url: LAUNCHES_URL });
  const sortedData = useSortedData({ data, sortOrder });
  const { pageSize, paginatedData, currentPage, totalPages, setCurrentPage } =
    usePagination(getFilteredData(sortedData, searchTerm));

  const handleSort = useCallback(() => {
    setSortOrder(!sortOrder || sortOrder === "DESC" ? "ASC" : "DESC");
  }, [sortOrder, setSortOrder]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <div>
        <Header
          sortOrder={sortOrder}
          onSort={handleSort}
          onSearch={setSearchTerm}
        />
      </div>
      <div className="list">
        {isEmpty(paginatedData) ? (
          <div>No data.</div>
        ) : (
          <Launches launches={paginatedData} />
        )}
      </div>
      <div className="pagination_container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
