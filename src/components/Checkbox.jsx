import clsx from "clsx";
import PropTypes from "prop-types";

export default function Checkbox({
  label,
  checked = false,
  onChange,
  error,
  disabled = false,
  className = "",
  name,
  value,
  description,
  ...props
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={`${name}-${value}`}
        className={clsx(
          "flex items-start gap-3 cursor-pointer",
          disabled &&
            "opacity-60 cursor-not-allowed"
        )}
      >
        <input
          id={`${name}-${value}`}
          name={name}
          type="checkbox"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) =>
            onChange?.(e.target.checked, e)
          }
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          className={clsx(
            "mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500",
            error && "border-red-500",
            className
          )}
          {...props}
        />

        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}

          {description && (
            <span className="text-sm text-gray-500">
              {description}
            </span>
          )}
        </div>
      </label>

      {error && (
        <p
          id={`${name}-error`}
          className="error-message mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  description: PropTypes.string,
};