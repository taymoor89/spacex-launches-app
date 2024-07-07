import PropTypes from "prop-types";

import { launch } from "../../utils/propTypes";
import Launch from "../Launch";

function Launches({ launches }) {
  return launches.map((launch) => <Launch key={launch.id} launch={launch} />);
}

Launches.propTypes = {
  launches: PropTypes.arrayOf(launch).isRequired,
};

export default Launches;
