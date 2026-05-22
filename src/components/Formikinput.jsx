import PropTypes from "prop-types";
import { useField } from "formik";
import Input from "./Input";

export default function FormikInput({
  name,
  type='textp',
  ...props
}) {
  const [field, meta, helpers] = useField(name);
  return (
    <Input
      {...props}
      type={type}
      name={name}
      value={field.value}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
}

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

// import {
//   Formik,
//   Form,
// } from "formik";

// import FormikInput from "../components/Formikinput";

// import { loginSchema } from "../utils/validator";

// export default function UserForm() {
//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         email: "",
//       }}
//       validationSchema={loginSchema}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       <Form className="space-y-4 w-1/4">
//         <FormikInput
//           name="name"
//           label="Name"
//           placeholder="Enter name"
//         />

//         <FormikInput
//           name="email"
//           type="email"
//           label="Email"
//           placeholder="Enter email"
//         />

//         <button
//           type="submit"
//           className="btn-primary"
//         >
//           Submit
//         </button>
//       </Form>
//     </Formik>
//   );
// }
