import FormikSelect from "./Formikselect";
import { useFormikContext } from "formik";
import { useMemo } from "react";
export function AttributeOptionSelect({
  attributeId,
  attributesdata,
  index,
}) {
  const { values, setFieldValue } = useFormikContext();

  const attributeOptionsOptions = useMemo(() => {
    if (!attributeId || !attributesdata) return [];

    const selectedAttribute = attributesdata?.find(
      (attr) => String(attr.id) === String(attributeId),
    );

    if (!selectedAttribute?.options) return [];

    return selectedAttribute.options.map((opt) => ({
      label: opt.value,
      value: String(opt.id),
    }));
  }, [attributeId, attributesdata]);

  return (
    <FormikSelect
      name={`attributes.${index}.attribute_option_id`}
      label="اختر القيمة"
      options={attributeOptionsOptions}
    />
  );
}