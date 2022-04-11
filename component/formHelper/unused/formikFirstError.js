export function firstErrorVal(formik) {
  if (formik.touched[Object.keys(formik.errors)[0]] == true)
    return formik.errors[Object.keys(formik.errors)[0]];
}

export function firstErrorKey(error, attr) {
  return Object.keys(error)[0] == attr;
}
