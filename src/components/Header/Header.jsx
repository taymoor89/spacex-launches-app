import React, { useCallback, useMemo } from "react";
import { ReactComponent as SortIcon } from "../../images/sort.svg";
import { ReactComponent as AscendingOrderIcon } from "../../images/asc.svg";
import { ReactComponent as DescendingOrderIcon } from "../../images/desc.svg";

import "./Header.css";
import IconButton from "../IconButton";

function Header({ sortOrder, onSort, onSearch }) {
  const handleOnSearch = useCallback(
    (e) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  const icon = useMemo(() => {
    switch (sortOrder) {
      case "ASC":
        return <AscendingOrderIcon height={14} width={14} />;
      case "DESC":
        return <DescendingOrderIcon height={14} width={14} />;
      default:
        return <SortIcon height={14} width={14} />;
    }
  }, [sortOrder]);

  return (
    <div className="header">
      <div>
        <input
          aria-label="search"
          type="text"
          placeholder="Search..."
          onChange={handleOnSearch}
        />
      </div>
      <div>
        <IconButton icon={icon} onClick={onSort} aria-label="sortByName">
          Name
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
