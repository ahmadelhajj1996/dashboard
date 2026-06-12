import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useField, useFormikContext } from "formik";

export default function Formikimage({
  name,
  label,
  multiple = false,
  accept = "image/*",
  
  preview = true,
  className = "",
  disabled = false,
  chooseText = "Choose File",
  emptyText = "No file chosen",
  maxFiles = 10,
  imageUrlField = "featured_image_url",
  removeField = "remove_featured_image",
}) {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();
  const [localPreviews, setLocalPreviews] = useState([]);

  const inputRef = useRef(null);

  const previewSrc = useMemo(() => {
    // New uploaded file
    if (field.value instanceof File) {
      return URL.createObjectURL(field.value);
    }

    // Existing backend image
    if (values[imageUrlField]) {
      return values[imageUrlField];
    }

    return null;
  }, [field.value, values, imageUrlField]);

  useEffect(() => {
    return () => {
      if (field.value instanceof File && previewSrc?.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [field.value, previewSrc]);

const removeImage = () => {
  helpers.setValue(null);

  setFieldValue(imageUrlField, "");

  setFieldValue(removeField, 1);

  if (inputRef.current) {
    inputRef.current.value = "";
  }
};

const fileText = useMemo(() => {
  if (field.value instanceof File) {
    return field.value.name;
  }

  if (values[imageUrlField]) {
    return "Current image";
  }

  return emptyText;
}, [field.value, values, imageUrlField, emptyText]);


  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    helpers.setValue(file);

    // remove old url preview
    setFieldValue(imageUrlField, "");

    // cancel remove flag
    setFieldValue(removeField, 0);

    // e.target.value = null;
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="label flex justify-start">
          {label}
        </label>
      )}

      {/* Hidden Native Input */}
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />

      {/* Custom Upload UI */}
      <div
        className={clsx(
          "flex items-center overflow-hidden rounded border",
          meta.touched && meta.error && "border-red-500",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="border-r bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          {chooseText}
        </button>

        <div className="truncate px-3 text-sm text-gray-600">{fileText}</div>
      </div>

      {preview && previewSrc && (
        <div className="mt-4">
          <div className="relative h-[50px] w-[50px] overflow-hidden rounded border">
            <img
              src={previewSrc}
              alt="preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute right-[1px] top-[1px] danger rounded-full px-1 py-[2px] text-[10px] text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {meta.touched && meta.error && (
        <p className="error-message">{meta.error}</p>
      )}
    </div>
  );
}

Formikimage.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  maxFiles: PropTypes.number,
  preview: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  chooseText: PropTypes.string,
  emptyText: PropTypes.string,
};
