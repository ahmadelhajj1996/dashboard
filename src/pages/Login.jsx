import axios from "axios";
import { Formik, Form  } from "formik";
import { loginSchema } from "../utils/validator";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { adminValues } from "../utils/constants";
import FormikInput from "../components/Formikinput";
import Formikbtn from "../components/Formikbtn";
import notify from "../utils/toastr";
const Login = () => {
  const dispatch = useDispatch();
  const navigatet = useNavigate();

  const login = async (values, { resetForm }) => {
    try {
     
      const response = await axios.post(
        // "http://127.0.0.1:8000/api/admin/login",
        "https://phplaravel-1626350-6427540.cloudwaysapps.com/api/admin/login",
        values,
      );

      dispatch(
        setCredentials({
          token: response.data.access_token,
          admin: response.data.user,
        }),
      );


      navigatet("/home");
      notify("تم تسجيل الدخول", "success");
      resetForm();
      localStorage.setItem('token' , response.data.access_token)

    } catch (error) {
      notify("الايميل او كلمة المرور غير صحيحات", "error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24  p-4">
        <div className="bg-white border border-gray-300 p-6 md:p-8 rounded-lg shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Formik
            initialValues={adminValues}
            validationSchema={loginSchema}
            onSubmit={login}
          >
            <Form className="flex flex-col gap-6">
              <FormikInput
                name="email"
                label="الايميل :"
                placeholder="الايميل "
              />
              <FormikInput
                name="password"
                type="password"
                label=" كلمة المرور :"
                placeholder="ادخل كلمة المرور"
              />
              <Formikbtn title='تسجيل الدخول' />                
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
