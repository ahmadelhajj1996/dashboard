import PropTypes from "prop-types";
import { useField } from "formik";
import Checkbox from "./Checkbox";

export default function FormikCheckboxGroup({
  name,
  options = [],
}) {
  const [field, meta, helpers] = useField(name);

  const values = field.value || [];

  const handleChange = (checked, value) => {
    if (checked) {
      helpers.setValue([...values, value]);
    } else {
      helpers.setValue(
        values.filter((v) => v !== value)
      );
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          checked={values.includes(option.value)}
          onChange={(checked) =>
            handleChange(
              checked,
              option.value
            )
          }
          error={
            meta.touched && meta.error
              ? meta.error
              : ""
          }
        />
      ))}
    </div>
  );
}

FormikCheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};


// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// import FormikCheckboxGroup from "../components/FormikCheckboxGroup";
 
// const initialValues = {
//   roles: [],
// };

// const validationSchema = Yup.object({
//   roles: Yup.array().min(
//     1,
//     "Select at least one role"
//   ),
// });

// export default function RolesPage() {
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       <Form className="space-y-4 p-6 max-w-md">
//         <FormikCheckboxGroup
//           name="roles"
//           options={[
//             {
//               label: "Admin",
//               value: "admin",
//               description:
//                 "Full system access",
//             },
//             {
//               label: "Editor",
//               value: "editor",
//               description:
//                 "Can edit content",
//             },
//             {
//               label: "Viewer",
//               value: "viewer",
//               description:
//                 "Read only access",
//             },
//           ]}
//         />

//         <button
//           type="submit"
//           className="px-4 py-2 rounded bg-black text-white"
//         >
//           Submit
//         </button>
//       </Form>
//     </Formik>
//   );
// }
