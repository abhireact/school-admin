export const initialValues = {
  academic_year: "", //required
  class_name: "", //required
  admission_date: "", //required
  form_number: "", //required
  candidate_first_name: "", //required
  candidate_middle_name: "",
  candidate_last_name: "",
  candidate_dob: "", //required
  category: "", //required
  religion: "", //required
  gender: "", //required
  nationality: "", //required
  blood_group: "", //required

  father_first_name: "", //required
  father_middle_name: "",
  father_last_name: "",
  father_qualification: "", //required
  father_occupation: "", //required
  father_designation: "",
  father_place_occupation: "",
  father_number: "", //required
  father_email_id: "", //required

  mother_first_name: "", //required
  mother_middle_name: "",
  mother_last_name: "",
  mother_qualification: "", //required
  mother_occupation: "", //required
  mother_designation: "",
  mother_place_occupation: "",
  mother_number: "", //required
  mother_email_id: "", //required

  guardian_first_name: "",
  guardian_middle_name: "",
  guardian_last_name: "",
  relation_with_candidate: "",
  guardian_number: "",
  guardian_email_id: "",

  address_line_1: "", //required
  address_line_2: "",
  district: "", //required
  country: "", //required
  pin_code: "", //required

  correspondence_address_line_1: "", //required
  correspondence_address_line_2: "",
  correspondence_district: "", //required
  correspondence_country: "", //required
  correspondence_pin_code: "", //required

  alumni: false,
  from_year: "",
  to_year: "",
  from_class: "",
  to_class: "",

  siblings: false, //boolean required
  sibling_data: [{ sibling_name: "", sibling_class: "" }],

  upload_candidate_photo: "", //required
  upload_father_photo: "", //required
  upload_mother_photo: "", //required
  upload_father_aadhar: "", //required
  upload_mother_aadhar: "", //required
  upload_candidate_aadhar: "", //required
  upload_dob_certificate: "", //required
};
