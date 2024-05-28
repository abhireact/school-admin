import * as Yup from "yup";
export const createschema = Yup.object({
  fee_category_name: Yup.string().min(2).required("Please enter your Fee Category Name"),
});
