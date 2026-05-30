import clsx from "clsx";
import PropTypes from "prop-types";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  disabled = false,
  className = "",
  name,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="label flex justify-start">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value, e)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "field min-h-32",
            error && "border-red-500",
            className,
          )}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value, e)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx("field bordered", error && "border-red-500", className)}
          {...props}
        />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
};
