import PropTypes from "prop-types";

function Formikbtn({ title }) {
  return (
    <button
      className="submit"
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