import React, { useContext } from "react";
import InputEmail from "component/formHelper/inputEmail";
import InputPass from "component/formHelper/inputPassword";
import InputText from "component/formHelper/inputText";
import InputNumber from "component/formHelper/inputNumber";
import InputHidden from "component/formHelper/inputHidden";
import InputSelect from "component/formHelper/inputSelect";
import InputRole from "component/formHelper/inputRole";
import InputProduct from "component/formHelper/inputProduct";
import InputCustomer from "component/formHelper/inputCustomer";

import axios from "axios";
import BtnSubmit from "component/formHelper/btnSubmit";

import Context from "component/provider/context";
import { useRouter } from "next/router";

export default function useForm(model = "", routecallback = null) {
  const router = useRouter();
  const { setisLoading } = React.useContext(Context);
  const [payload, setpayload] = React.useState({});

  function handleInput(v) {
    setpayload({ ...payload, ...v });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setisLoading(true);
    await fetcher({
      url: `/api/${model}`,
      method: "post",
      data: payload,
    });
    setisLoading(false);
    router.push(routecallback ? `/${routecallback}` : `/${model}`);
  }

  return {
    payload,
    setpayload,
    handleInput,
    handleSubmit,
  };
}

export const Input = {
  Email: InputEmail,
  Pass: InputPass,
  Submit: BtnSubmit,
  Text: InputText,
  Number: InputNumber,
  Hidden: InputHidden,
  Select: InputSelect,
  Role: InputRole,
  Product: InputProduct,
  Customer: InputCustomer,
};

export const fetcher = async (param) => {
  try {
    const res = await axios(param);
    return res.data;
  } catch (error) {
    return error;
  }
};
