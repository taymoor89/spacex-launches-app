import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

const DEFAULT_PAGE_SIZE = 10;

const getPaginatedData = (data, currentPage) => {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  return data.slice(startIndex, endIndex);
};

const getTotalPages = (data, pageSize) => {
  const pages = Math.ceil(data.length / pageSize);
  return pages < pageSize ? 1 : pages;
};

const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    getTotalPages(data, DEFAULT_PAGE_SIZE)
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    setTotalPages(Math.ceil(data.length / DEFAULT_PAGE_SIZE));
  }, [data]);

  // reset current page if it exceeds total number of pages
  // example: user is on page 5/20 and filters data
  // and the new total number of pages(based on filtered data) are less than 5 then reset current page to 1
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    pageSize: DEFAULT_PAGE_SIZE,
    paginatedData: !isEmpty(data) ? getPaginatedData(data, currentPage) : [],
    currentPage,
    totalPages,
    setCurrentPage,
  };
};

export default usePagination;
