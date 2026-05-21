import PropTypes from "prop-types";
import clsx from "clsx";



export default function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = " ",
  error,
  disabled = false,
  loading = false,
  className = "",
  name,
}) {
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={name}
          className=" label flex justify-start"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value, e)}
        disabled={disabled || loading}
        className={clsx(
          "field",
          className
        )}
      >
        <option value="">
          {loading ? "جاري التحميل" : "اختر واحدا  ..."}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className=" field px-2"
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      disabled: PropTypes.bool,
    })
  ),

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  onChange: PropTypes.func,

  placeholder: PropTypes.string,

  error: PropTypes.string,

  disabled: PropTypes.bool,

  loading: PropTypes.bool,

  className: PropTypes.string,

  name: PropTypes.string,
};
 


          {/* <Select
          label="Category"
          value={category}
          onChange={(value) => {
            setCategory(value);
            console.log("done", value);
          }}
          options={[
            { label: "Electronics", value: "electronics" },
            { label: "Clothes", value: "clothes" },
          ]}
        /> */}