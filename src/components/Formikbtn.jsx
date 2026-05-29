import PropTypes from "prop-types";

function Formikbtn({ title }) {
  return (
    <button
      className="button"
      type="submit"
    >
      {title}
    </button>
  );
}

Formikbtn.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Formikbtn;