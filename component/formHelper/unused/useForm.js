import { useState } from "react";
import * as yup from "yup";

const dataInit = {
  password: "",
  name: "",
  language: [],
  birthday: null,
  occupation: "",
  address: "",
  about: "",
};

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  birthday: yup
    .date("Birthdate is required")
    .required("Birthdate is required")
    .nullable(),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  pp: yup.string("Enter your password").required("Profile picture required"),
  occupation: yup.string("").required("Occupation required"),
  language: yup.array("").min(1, "Select at least 1 language"),
  address: yup.string("").required("Address required"),
  about: yup.string("").required("About required"),
});

const initError = {
  isError: false,
  whatError: "",
  whichError: "",
};

export default function useForm(defaultVal) {
  const [data, setdata] = useState(defaultVal ? defaultVal : dataInit);
  const [error, seterror] = useState(initError);

  //not applicable for datepicker, swithc, button
  function formHandleChange(field) {
    setdata({ ...data, [field.target.name]: field.target.value });
  }

  async function isValid(field) {
    return await validationSchema
      .validateAt(field, {
        [field]: data[field],
      })
      .then((e) => {
        seterror(initError);
        return true;
      })
      .catch((e) => {
        seterror({
          isError: true,
          whatError: e.errors,
          whichError: field,
        });
        return false;
      });
  }

  return {
    data,
    setdata,
    error,
    seterror,
    formHandleChange,
    isValid,
  };
}
