import PropTypes from "prop-types";
import { useField } from "formik";
import Checkbox from "./Checkbox";

export default function FormikCheckbox({
  name,
  ...props
}) {
  const [field, meta, helpers] =
    useField({
      name,
      type: "checkbox",
    });

  return (
    <Checkbox
      {...props}
      name={name}
      checked={field.value}
      onChange={(checked) => {
        helpers.setValue(checked);
      }}
      error={
        meta.touched && meta.error
          ? meta.error
          : ""
      }
    />
  );
}

FormikCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
};

// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// import FormikCheckbox from "../components/FormikCheckbox";

// const initialValues = {
//   acceptTerms: false,
// };

// const validationSchema = Yup.object({
//   acceptTerms: Yup.boolean().oneOf(
//     [true],
//     "You must accept terms"
//   ),
// });

// export default function RegisterPage() {
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       <Form className="max-w-md p-6 space-y-4">
//         <FormikCheckbox
//           name="acceptTerms"
//           label="Accept Terms"
//           description="You agree to our policy"
//         />

//         <button
//           type="submit"
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           Submit
//         </button>
//       </Form>
//     </Formik>
//   );
// }