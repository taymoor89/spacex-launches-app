import { useMemo } from "react";

const getSortedItems = (a, b) => a.name.localeCompare(b.name);

const useSortedData = ({ data, sortOrder }) =>
  useMemo(() => {
    if (!sortOrder) {
      return data;
    }
    return Array.from(data).sort((a, b) =>
      sortOrder === "ASC" ? getSortedItems(a, b) : getSortedItems(b, a)
    );
  }, [data, sortOrder]);

export default useSortedData;
