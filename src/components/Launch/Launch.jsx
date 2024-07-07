import React from "react";

import "./Launch.css";
import DataRow from "../DataRow";
import { launch } from "../../utils/propTypes";

function Launch({ launch }) {
  return (
    <div className="launch_card" data-testid="launch-item">
      <div className="launch_image_container">
        <img className="launch_image" src={launch.links.patch.small} alt="" />
      </div>
      <div className="launch_content">
        <DataRow label="Name">{launch.name}</DataRow>
        <DataRow label="Launch date">{launch.date_local}</DataRow>
        <DataRow className={launch.success ? "success" : "failed"}>
          {launch.success ? "Successful" : "Failed"}
        </DataRow>
        {launch.details && (
          <DataRow>
            <p>{launch.details}</p>
          </DataRow>
        )}
        {launch.links.webcast && (
          <DataRow>
            <a href={launch.links.webcast} target="_blank" rel="noreferrer">
              Launch Video
            </a>
          </DataRow>
        )}
      </div>
    </div>
  );
}

Launch.propTypes = {
  launch: launch.isRequired,
};

export default Launch;
