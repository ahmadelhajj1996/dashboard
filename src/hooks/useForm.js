import { useRef, useEffect, useCallback } from "react";

export const useForm = ({ onSubmit, initialValues, validationSchema }) => {
  const formRef = useRef();

  const handleConfirm = useCallback(() => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  }, []);

  const formikProps = {
    innerRef: formRef,
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  };

  // Optional: reset form when initialValues change
  useEffect(() => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, [initialValues]);

  return { formikProps, handleConfirm };
};