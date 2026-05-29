  export default function toFormData(values = {}, options = {}) {
  const formData = new FormData();

  const {
    booleanFields = [],
    fileFields = [],
    ignoreNull = true,
  } = options;

  Object.entries(values).forEach(([key, value]) => {
    if (
      ignoreNull &&
      (value === null || value === undefined )
    ) {
      return;
    }

    if (booleanFields.includes(key)) {
      formData.append(key, value ? 1 : 0);
      return;
    }

    if (fileFields.includes(key)) {
      if (value instanceof File) {
        formData.append(key, value);
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "") {
          formData.append(`${key}[]`, item);
        }
      });
      return;
    }

    formData.append(key, value);
  });

  return formData;
}