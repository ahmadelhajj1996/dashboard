import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useField } from "formik";

export default function Formikimagem({
  name,
  label,
  accept = "image/*",
  maxFiles = 10,
  preview = true,
  className = "",
  disabled = false,
  chooseText = "Choose Files",
  emptyText = "No files selected",
}) {
  const [field, meta, helpers] = useField(name);

  const inputRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Files
  |--------------------------------------------------------------------------
  */

  const files = useMemo(() => {
    return Array.isArray(field.value) ? field.value : [];
  }, [field.value]);

  /*
  |--------------------------------------------------------------------------
  | Previews
  |--------------------------------------------------------------------------
  */

  const previews = useMemo(() => {
    return files.map((item) => ({
      preview: item.preview,
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);
  /*
  |--------------------------------------------------------------------------
  | File Text
  |--------------------------------------------------------------------------
  */

  const fileText = useMemo(() => {
    if (files.length > 0) {
      return `${files.length} صور تم اختيارها`;
    }

    return emptyText;
  }, [files, emptyText]);

  /*
  |--------------------------------------------------------------------------
  | Handle Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const limitedFiles = selectedFiles.slice(0, maxFiles).map((file) => ({
      file, // 👈 REAL FILE (IMPORTANT)
      preview: URL.createObjectURL(file),
      existing: false,
    }));

    helpers.setValue(limitedFiles);
  };

  /*
  |--------------------------------------------------------------------------
  | Remove File
  |--------------------------------------------------------------------------
  */

  const removeImage = (index) => {
    const updated = [...files];

    updated.splice(index, 1);

    helpers.setValue(updated);

    if (updated.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="label flex justify-start">
          {label}
        </label>
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />

      {/* Upload UI */}
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

      {/* Preview */}
      {preview && previews.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {previews.map((item, index) => (
            <div
              key={`${item?.file?.name}-${index}`}
              className="relative h-24 w-24 overflow-hidden rounded border"
            >
              <img
                src={item.preview}
                alt="preview"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1 top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {meta.touched && meta.error && (
        <p className="error-message">{meta.error}</p>
      )}
    </div>
  );
}

Formikimagem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  accept: PropTypes.string,
  maxFiles: PropTypes.number,
  preview: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  chooseText: PropTypes.string,
  emptyText: PropTypes.string,
};
