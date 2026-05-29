import PropTypes from "prop-types";

const Detail = ({ label, value, editable = false, onClick }) => (
  <div className="flex">
    <p className=" text-sm">{label} : </p>
    <p className={` ms-1 text-sm `}>{value || "-"}</p>
    {editable && (
      <button
        className=" ms-5 underline underline-offset-4  text-sm text-blue-500  "
        onClick={onClick}
      >
        تغيير
      </button>
    )}
  </div>
);

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Detail;
