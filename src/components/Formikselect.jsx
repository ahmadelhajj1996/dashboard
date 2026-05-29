import PropTypes from "prop-types";
import { useField } from "formik";
import Select from "./Select";

export default function FormikSelect({
  name,
  ...props
}) {
  const [field, meta, helpers] = useField(name);

  return (
    <Select
      {...props}
      name={name}
      value={field.value}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      error={
        meta.touched && meta.error
          ? meta.error
          : ""
      }
    />
  );
}

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,

  // Optional Select props
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
    })
  ),
};

//   const { options} = useSelect(() => {
//     return [
//       { label: "Admin", value: "admin" },
//       { label: "User", value: "user" },
//     ];
//   });

//   return (
//     <div>
//       <div className="grid grid-cols-3 ">
//         <Formik
//           initialValues={{
//             role: "",
//           }}
//           validationSchema={schema}
//           onSubmit={(values) => console.log(values)}
//         >
//           <Form>
//             <FormikSelect name="role" label="Role" options={options} />

//             <button type="submit">Submit</button>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// }