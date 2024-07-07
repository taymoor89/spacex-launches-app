import React from "react";

import "./IconButton.css";

const IconButton = ({ icon, children, onClick, ...rest }) => {
  return (
    <div className="icon_button" role="button" onClick={onClick} {...rest}>
      <div className="icon">{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default IconButton;
