import * as Yup from "yup";
export const admissionformschema = Yup.object({
  academic_year: Yup.string().required("Please enter Academiv year"),
  class_name: Yup.string().required("Please enter Class Name"),
  section_name: Yup.string().required("Please enter Section Name"),
});
