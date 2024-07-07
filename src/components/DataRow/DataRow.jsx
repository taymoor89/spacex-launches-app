import React from "react";

import "./DataRow.css";

function DataRow({ label, children, className }) {
  return (
    <div className={`data_row ${className}`}>
      {label && <strong>{label}</strong>}
      <div>{children}</div>
    </div>
  );
}

export default DataRow;
