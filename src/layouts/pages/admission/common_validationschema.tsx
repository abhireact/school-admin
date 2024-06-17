import * as Yup from "yup";
export const admissionformschema = Yup.object({
  first_name: Yup.string().required("Please enter First Name"),
  class_name: Yup.string().required("Please enter Class Name"),
  father_first_name: Yup.string().required("Please Enter First Name"),
  father_qualification: Yup.string().required("Please Enter the Qualification"),
  father_occupation: Yup.string().required("Please Enter the Occuption"),
  father_number: Yup.string()
    .required("Please Enter the Phone Number")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  father_email_id: Yup.string()
    .required("Please Enter the Email ID")
    .email("Invalid email address"),

  mother_first_name: Yup.string().required("Please Enter First Name"),
  mother_qualification: Yup.string().required("Please Enter the Qualification"),
  mother_occupation: Yup.string().required("Please Enter the Occuption"),
  mother_number: Yup.string()
    .required("Please Enter the Phone Number")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  mother_email_id: Yup.string()
    .required("Please Enter the Email ID")
    .email("Invalid email address"),

  guardian_first_name: Yup.string().required("Please Enter First Name"),
  relation_with_candidate: Yup.string().required("Mandatory Field"),
  guardian_number: Yup.string()
    .required("Please Enter the Phone Number")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  guardian_email_id: Yup.string()
    .required("Please Enter the Email ID")
    .email("Invalid email address"),

  pin_code: Yup.string()
    .required("Please Enter the Pincode")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  correspondence_pincode: Yup.string()
    .required("Please Enter the Pincode")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  alumni: Yup.string().required("Please select an option"),
  from_year: Yup.string().matches(/^[0-9]{4}$/, "Year must be exactly 4 digits"),
  to_year: Yup.string().matches(/^[0-9]{4}$/, "Year must be exactly 4 digits"),
});
