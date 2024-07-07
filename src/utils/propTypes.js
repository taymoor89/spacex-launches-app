import PropTypes from "prop-types";

export const launch = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string,
  date_local: PropTypes.string.isRequired,
  success: PropTypes.bool,
  links: PropTypes.shape({
    patch: PropTypes.shape({
      small: PropTypes.string,
    }).isRequired,
    webcast: PropTypes.string,
  }),
});
