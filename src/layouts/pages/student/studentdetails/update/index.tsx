import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UpdateGuardian from "../guardian/update";
import CreateGuardian from "../guardian/create";

import Tooltip from "@mui/material/Tooltip";
import {
  FormControlLabel,
  Autocomplete,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import Sidenav from "../../sidenav";
const validationSchema = Yup.object().shape({
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),

  admission_date: Yup.date().test("year-range", "Incorrect format", function (value) {
    if (value) {
      const year = value.getFullYear();
      return year >= 2000 && year <= 3000;
    }
    return true;
  }),
  dob: Yup.date()
    .required("Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
  admission_number: Yup.string(),
  fee_code: Yup.string(),
  first_name: Yup.string().required("Required *"),
  last_name: Yup.string(),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  alt_phone_number: Yup.string().matches(/^[0-9]{10}$/, "Incorrect Format *"),
  pen_number: Yup.string().matches(/^\d+$/, "Incorrect Format *"),
  aadhaar_number: Yup.string().matches(/^[0-9]{12}$/, "Incorrect Format *"),
  email: Yup.string().email("Incorrect Format *"),
});

const Update = (props: any) => {
  const [guardianData, setGuardianData] = useState({});

  const [open, setOpen] = useState(false);
  const handleCloseGuardian = () => {
    setOpen(false);
  };
  const handleOpenGuardian = (data: any) => {
    setOpen(true);
    const main_data = data;
    console.log(main_data, "Guardian edit Data");

    setGuardianData(main_data);
  };
  const [createOpen, setCreateOpen] = useState(false);
  const handleCloseCreate = () => {
    setCreateOpen(false);
  };
  const handleOpenCreate = () => {
    setCreateOpen(true);
  };
  const { studentInfo, username, setOpenupdate, guardianInfo, fetchData, fetchGuardian } = props;

  const handleClose = () => {
    setOpenupdate(false);
  };
  console.log(studentInfo, "student info update");
  console.log(guardianInfo, "guardian info data");

  const token = Cookies.get("token");
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  console.log(classdata, "jj");

  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);

  function filterSectionData(data: any, class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }

  console.log(filteredSection, "section nameeeeeeeeee");
  const [casteData, setCasteData] = useState([]);
  const [castecategoryData, setCastecategoryData] = useState([]);
  const [studentcategoryData, setStudentcategoryData] = useState([]);
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_house_detail`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "housedetailsssssssssss");
        setHouseData(response.data);

        console.log(response.data, "House data");
      })
      .catch((error) => {
        console.error("Error fetching House data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_studcategory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudentcategoryData(response.data);

        console.log(response.data, "Student Category data");
      })
      .catch((error) => {
        console.error("Error fetching Student Category data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_castes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "caste");
        setCasteData(response.data);

        console.log(response.data, "caste category data");
      })
      .catch((error) => {
        console.error("Error fetching Caste Category data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_caste_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCastecategoryData(response.data);

        console.log(response.data, "caste category data");
      })
      .catch((error) => {
        console.error("Error fetching Caste data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/mg_section", {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setsectiondata(response.data);

    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //formik
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        user_name: username,

        admission_date: studentInfo.admission_date || "",
        admission_number: studentInfo.admission_number || "",
        fee_code: studentInfo.fee_code || "",
        first_name: studentInfo.first_name || "",
        middle_name: studentInfo.middle_name || "",
        last_name: studentInfo.last_name || "",
        academic_year: studentInfo.academic_year || "",
        class_name: studentInfo.class_name || "",
        section_name: studentInfo.section_name || "",
        dob: studentInfo.dob || "",
        gender: studentInfo.gender || "",
        birth_place: studentInfo.birth_place || "",
        blood_group: studentInfo.blood_group || "",
        aadhaar_number: studentInfo.aadhaar_number || "",
        religion: studentInfo.religion || "",
        mother_tongue: studentInfo.mother_tongue || "",
        pen_number: studentInfo.pen_number || "",
        house_details: studentInfo.house_details || "",
        student_category: studentInfo.student_category || "",
        caste_category: studentInfo.caste_category || "",
        caste: studentInfo.caste || "",
        address_line1: studentInfo.address_line1 || "",
        address_line2: studentInfo.address_line2 || "",
        pin_code: studentInfo.pin_code || "",
        city: studentInfo.city || "",
        state: studentInfo.state || "",
        country: studentInfo.country || "",
        pr_address_line1: studentInfo.pr_address_line1 || "",
        pr_address_line2: studentInfo.pr_address_line2 || "",
        pr_pin_code: studentInfo.pr_pin_code || "",
        pr_city: studentInfo.pr_city || "",
        pr_state: studentInfo.pr_state || "",
        pr_country: studentInfo.pr_country || "",
        quota: studentInfo.quota || "",
        mobile_number: studentInfo.mobile_number || "",
        alt_phone_number: studentInfo.alt_phone_number || "",
        email: studentInfo.email || "",
        hobby: studentInfo.hobby || "",
        prev_school_name: studentInfo.prev_school_name || "",
        prev_class_name: studentInfo.prev_class_name || "",
        year: studentInfo.year || "",
        marks_obtained: studentInfo.marks_obtained || "",
        total_marks: studentInfo.total_marks || "",
        grade_percentage: studentInfo.grade_percentage || "",
        sibling: studentInfo.sibling || "",
        sibling_name: studentInfo.sibling_name || "",
        sibling_relationship: studentInfo.sibling_relationship || "",
        sibling_class: studentInfo.sibling_class || "",
        sibling_section: studentInfo.sibling_section || "",
        sibling_roll_number: studentInfo.sibling_roll_number || "",
        sibling_date_of_admission: studentInfo.sibling_date_of_admission || "",
        sibling_admission_number: studentInfo.sibling_admission_number || "",

        birth_certificate: studentInfo.birth_certificate,
        character_certificate: studentInfo.character_certificate,
        transfer_certificate: studentInfo.transfer_certificate,
        stud_img: null,
        stud_img_data: null,
        sport_activity: studentInfo.sport_activity,
        extra_curricular: studentInfo.extra_curricular,
        health_record: studentInfo.health_record,
        class_record: studentInfo.class_record,
        sport_activity_files: [],
        extra_curricular_files: [],
        health_record_files: [],
        class_record_files: [],
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        // action.resetForm();

        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_student`, values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Student Updated successfully!");
            //fetchData();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  const handleImage = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("stud_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [transferCertificate, setTransferCertificate] = useState(false);
  const handleTransferCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("transfer_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [characterCertificate, setCharacterCertificate] = useState(false);
  const handleCharacterCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("character_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

  const [birthCertificate, setBirthCertificate] = useState(false);
  const handleBirthCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("birth_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleSportActivity = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.sport_activity_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleExtraCurricular = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.extra_curricular_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleHealthRecord = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.health_record_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleClassRecord = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.class_record_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [checkAddress, setCheckedAddress] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("pr_address_line1", values.address_line1);
      setFieldValue("pr_address_lin2", values.address_line2);

      setFieldValue("pr_pin_code", values.pin_code);
      setFieldValue("pr_city", values.city);
      setFieldValue("pr_state", values.state);
      setFieldValue("pr_country", values.country);
    }
  };
  const [previousEducation, setPreviousEducation] = useState(false);
  console.log(casteData, "caste dataaaaaa");
  const [activityRecord, setActivityRecord] = useState(false);

  const handleDeleteGuardian = async (name: any) => {
    console.log(name, "guardian delete data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_guardian`, {
        data: { guardian_user_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        fetchGuardian();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  return (
    <Card id="student-info">
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} px={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                STUDENT DETAILS
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Admission Date
                  </MDTypography>
                }
                name="admission_date"
                value={values.admission_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.admission_date && Boolean(errors.admission_date)}
                helperText={touched.admission_date && errors.admission_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Admission Number
                  </MDTypography>
                }
                name="admission_number"
                value={values.admission_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.admission_number && Boolean(errors.admission_number)}
                helperText={touched.admission_number && errors.admission_number}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                //
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fee Code
                  </MDTypography>
                }
                name="fee_code"
                value={values.fee_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fee_code && Boolean(errors.fee_code)}
                helperText={touched.fee_code && errors.fee_code}
              />
            </Grid>
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                PERSONAL DETAILS
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    First Name
                  </MDTypography>
                }
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Middle Name
                  </MDTypography>
                }
                name="middle_name"
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.middle_name && Boolean(errors.middle_name)}
                helperText={touched.middle_name && errors.middle_name}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Last Name
                  </MDTypography>
                }
                name="last_name"
                value={values.last_name}
                onChange={(event: { target: { value: any } }) => {
                  handleChange({
                    target: { name: "last_name", value: event.target.value },
                  });
                }}
                onBlur={handleBlur}
                error={touched.last_name && Boolean(errors.last_name)}
                helperText={touched.last_name && errors.last_name}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                disabled
                name="academic_year"
                placeholder="eg. 2022-2023"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Academic Year
                  </MDTypography>
                }
                value={values.academic_year}
                variant="standard"
                error={touched.academic_year && Boolean(errors.academic_year)}
                helperText={touched.academic_year && errors.academic_year}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                disabled
                sx={{ width: "100%" }}
                name="class_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Class Name
                  </MDTypography>
                }
                value={values.class_name}
                variant="standard"
                error={touched.class_name && Boolean(errors.class_name)}
                helperText={touched.class_name && errors.class_name}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                disabled
                sx={{ width: "100%" }}
                name="section_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Section Name
                  </MDTypography>
                }
                value={values.section_name}
                variant="standard"
                error={touched.section_name && Boolean(errors.section_name)}
                helperText={touched.section_name && errors.section_name}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                required
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Date of Birth
                  </MDTypography>
                }
                name="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Birth Place
                  </MDTypography>
                }
                name="birth_place"
                value={values.birth_place}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.birth_place && Boolean(errors.birth_place)}
                helperText={touched.birth_place && errors.birth_place}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Blood Group
                  </MDTypography>
                }
                name="blood_group"
                value={values.blood_group}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.blood_group && Boolean(errors.blood_group)}
                helperText={touched.blood_group && errors.blood_group}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Aadhaar Number
                  </MDTypography>
                }
                name="aadhaar_number"
                value={values.aadhaar_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.aadhaar_number && Boolean(errors.aadhaar_number)}
                helperText={touched.aadhaar_number && errors.aadhaar_number}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Mother Tongue
                  </MDTypography>
                }
                name="mother_tongue"
                value={values.mother_tongue}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mother_tongue && Boolean(errors.mother_tongue)}
                helperText={touched.mother_tongue && errors.mother_tongue}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Hobby
                  </MDTypography>
                }
                name="hobby"
                value={values.hobby}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.hobby && Boolean(errors.hobby)}
                helperText={touched.hobby && errors.hobby}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Religion
                  </MDTypography>
                }
                name="religion"
                value={values.religion}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.religion && Boolean(errors.religion)}
                helperText={touched.religion && errors.religion}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
                value={values.caste}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "caste", value },
                  });
                }}
                disableClearable
                options={casteData.map((acd) => acd.name)}
                renderInput={(params: any) => (
                  <MDInput
                    name="caste"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Caste
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.caste}
                    {...params}
                    variant="standard"
                    error={touched.caste && Boolean(errors.caste)}
                    helperText={touched.caste && errors.caste}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
                value={values.caste_category}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "caste_category", value },
                  });
                }}
                disableClearable
                options={castecategoryData.map((acd) => acd.caste_category)}
                renderInput={(params: any) => (
                  <MDInput
                    name="caste_category"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Caste Category
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.caste_category}
                    {...params}
                    variant="standard"
                    error={touched.caste_category && Boolean(errors.caste_category)}
                    helperText={touched.caste_category && errors.caste_category}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
                value={values.student_category}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "student_category", value },
                  });
                }}
                disableClearable
                options={studentcategoryData.map((acd) => acd.category_name)}
                renderInput={(params: any) => (
                  <MDInput
                    name="student_category"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Student Category
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.student_category}
                    {...params}
                    variant="standard"
                    error={touched.student_category && Boolean(errors.student_category)}
                    helperText={touched.student_category && errors.student_category}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
                value={values.house_details}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "house_details", value },
                  });
                }}
                disableClearable
                options={houseData.map((acd) => acd.house_name)}
                renderInput={(params: any) => (
                  <MDInput
                    name="house_details"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        House Details
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.house_details}
                    {...params}
                    variant="standard"
                    error={touched.house_details && Boolean(errors.house_details)}
                    helperText={touched.house_details && errors.house_details}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    PEN Number
                  </MDTypography>
                }
                name="pen_number"
                value={values.pen_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pen_number && Boolean(errors.pen_number)}
                helperText={touched.pen_number && errors.pen_number}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
                value={values.gender}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "gender", value },
                  });
                }}
                options={["Male", "Female"]}
                renderInput={(params: any) => (
                  <MDInput
                    name="gender"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Gender
                      </MDTypography>
                    }
                    value={values.gender}
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.gender && Boolean(errors.gender)}
                    success={values.gender.length && !errors.gender}
                    helperText={touched.gender && errors.gender}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={2} mt={2}>
              <MDTypography variant="body2" fontWeight="bold">
                Upload Image
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={4} mt={2}>
              <MDInput
                sx={{ width: "100%" }}
                type="file"
                accept="image/*"
                name="stud_img"
                onChange={handleImage}
                variant="standard"
              />
            </Grid>
            {values.stud_img_data && (
              <img src={`data:image/png;base64,${values.stud_img_data}`} alt="Base64 Image" />
            )}
            <Grid item xs={6} sm={4} mt={3}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                SIBLING
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={8} mt={2}>
              <Checkbox checked={values.sibling} onChange={handleChange} name="sibling" />
            </Grid>
            {values.sibling && (
              <>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Sibling Name
                      </MDTypography>
                    }
                    name="sibling_name"
                    value={values.sibling_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.sibling_class}
                    onChange={
                      filteredClass.length >= 1
                        ? (event, value) => {
                            handleChange({
                              target: { name: "sibling_class", value },
                            });
                            filterSectionData(sectiondata, value);
                          }
                        : undefined
                    }
                    options={filteredClass}
                    renderInput={(params: any) => (
                      <MDInput
                        name="sibling_class"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Sibling Class
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.sibling_class}
                        {...params}
                        variant="standard"
                        error={touched.sibling_class && Boolean(errors.sibling_class)}
                        helperText={touched.sibling_class && errors.sibling_class}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.sibling_section}
                    onChange={
                      filteredSection.length >= 1
                        ? (event, value) => {
                            handleChange({
                              target: { name: "sibling_section", value },
                            });
                          }
                        : undefined
                    }
                    options={
                      filteredSection[0]
                        ? filteredSection[0].map((sectiondata: any) => sectiondata.section_name)
                        : ""
                    }
                    renderInput={(params: any) => (
                      <MDInput
                        name="sibling_section"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Sibling Section
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.sibling_section}
                        {...params}
                        variant="standard"
                        error={touched.sibling_section && Boolean(errors.sibling_section)}
                        helperText={touched.sibling_section && errors.sibling_section}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Relation
                      </MDTypography>
                    }
                    name="sibling_relationship"
                    value={values.sibling_relationship}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Roll Number
                      </MDTypography>
                    }
                    name="sibling_roll_number"
                    value={values.sibling_roll_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    type="date"
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Date of Admission
                      </MDTypography>
                    }
                    name="sibling_date_of_admission"
                    value={values.sibling_date_of_admission}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission Number
                      </MDTypography>
                    }
                    name="sibling_admission_number"
                    value={values.sibling_admission_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                CONTACT DETAILS
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Mobile Number *
                  </MDTypography>
                }
                name="mobile_number"
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile_number && Boolean(errors.mobile_number)}
                helperText={touched.mobile_number && errors.mobile_number}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Alternate Number
                  </MDTypography>
                }
                name="alt_phone_number"
                value={values.alt_phone_number}
                onChange={(event: { target: { value: any } }) => {
                  if (event.target.value != values.mobile_number) {
                    handleChange({
                      target: { name: "alt_phone_number", value: event.target.value },
                    });
                  }
                }}
                onBlur={handleBlur}
                error={touched.alt_phone_number && Boolean(errors.alt_phone_number)}
                helperText={touched.alt_phone_number && errors.alt_phone_number}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Email ID *
                  </MDTypography>
                }
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={4.1} mt={2} id="guardian-info">
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                GUARDIAN INFO
              </MDTypography>
            </Grid>
            {guardianInfo.map((guardianinfo: any, index: any) => (
              <>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button" fontWeight="bold" color="info">
                    Guardian {index + 1}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4} key={index + "first_name"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    }
                    value={guardianinfo.first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "middle_name"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    }
                    value={guardianinfo.middle_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "last_name"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    }
                    value={guardianinfo.last_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "relationship"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        RelationShip
                      </MDTypography>
                    }
                    value={guardianinfo.relationship}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "mobile_number"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Mobile Number
                      </MDTypography>
                    }
                    value={guardianinfo.mobile_number}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "space"}></Grid>
                <Grid item xs={12} sm={4} key={index + "login_access"} mt={2}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Login Access : {guardianinfo.login_access ? "Yes" : "No"}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4} key={index + "primary_contact"} mt={2}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Primary Contact : {guardianinfo.primary_contact ? "Exist" : "Not Exist"}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={2} py={1} key={index + "space"}>
                  <Tooltip title="Edit  Guardian" placement="top">
                    <IconButton onClick={() => handleOpenGuardian(guardianinfo)}>
                      <CreateRoundedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Guardian" placement="top">
                    <IconButton onClick={() => handleDeleteGuardian(guardianinfo.user_name)}>
                      {guardianinfo.guardian_user_name}
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            ))}
            <Grid item xs={12} sm={2}>
              <Tooltip title="Add Guardian" placement="top">
                <AddIcon fontSize="large" color="info" onClick={() => handleOpenCreate()} />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                CURRENT ADDRESS
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Address Line 1
                  </MDTypography>
                }
                name="address_line1"
                value={values.address_line1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address_line1 && Boolean(errors.address_line1)}
                helperText={touched.address_line1 && errors.address_line1}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Address Line 2
                  </MDTypography>
                }
                name="address_line2"
                value={values.address_line2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address_line2 && Boolean(errors.address_line2)}
                helperText={touched.address_line2 && errors.address_line2}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                type="number"
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Pincode
                  </MDTypography>
                }
                name="pin_code"
                value={values.pin_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pin_code && Boolean(errors.pin_code)}
                helperText={touched.pin_code && errors.pin_code}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    City
                  </MDTypography>
                }
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    State
                  </MDTypography>
                }
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Country
                  </MDTypography>
                }
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                PERMANENT ADDRESS
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={4.1} mt={2}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Same as Current Address
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={6} mt={1}>
              <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Address Line 1
                  </MDTypography>
                }
                name="pr_address_line1"
                value={values.pr_address_line1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Address Line 2
                  </MDTypography>
                }
                name="pr_address_line2"
                value={values.pr_address_line2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Pincode
                  </MDTypography>
                }
                name="pr_pin_code"
                value={values.pr_pin_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    City
                  </MDTypography>
                }
                name="pr_city"
                value={values.pr_city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    State
                  </MDTypography>
                }
                name="pr_state"
                value={values.pr_state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Country
                  </MDTypography>
                }
                name="pr_country"
                value={values.pr_country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4.1} mt={2}>
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                PREVIOUS EDUCATION
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={6} mt={1}>
              <Checkbox
                checked={previousEducation}
                onChange={() => setPreviousEducation(!previousEducation)}
              />
            </Grid>
            {previousEducation && (
              <>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        School Name
                      </MDTypography>
                    }
                    name="prev_school_name"
                    value={values.prev_school_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class
                      </MDTypography>
                    }
                    name="prev_class_name"
                    value={values.prev_class_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Year
                      </MDTypography>
                    }
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Marks Obtained
                      </MDTypography>
                    }
                    name="marks_obtained"
                    value={values.marks_obtained}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Total Marks
                      </MDTypography>
                    }
                    name="total_marks"
                    value={values.total_marks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="number"
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Percentage
                      </MDTypography>
                    }
                    name="grade_percentage"
                    value={values.grade_percentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", flexDirection: "column" }}
                  mt={2}
                >
                  <MDTypography variant="caption" fontWeight="bold">
                    Is Transfer Certificate Produced ?
                  </MDTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={transferCertificate}
                            onChange={() => setTransferCertificate(!transferCertificate)}
                          />
                        }
                        label={
                          <MDTypography variant="caption" fontWeight="bold">
                            Yes
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                    {transferCertificate && (
                      <MDInput
                        sx={{ width: "100%" }}
                        type="file"
                        accept="image/*"
                        name="transfer_certificate"
                        onChange={handleTransferCertificate}
                        variant="standard"
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", flexDirection: "column" }}
                  mt={2}
                >
                  <MDTypography variant="caption" fontWeight="bold">
                    Is Character Certificate Produced ?
                  </MDTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={characterCertificate}
                            onChange={() => setCharacterCertificate(!characterCertificate)}
                          />
                        }
                        label={
                          <MDTypography variant="caption" fontWeight="bold">
                            Yes
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                    {characterCertificate && (
                      <MDInput
                        sx={{ width: "100%" }}
                        type="file"
                        accept="image/*"
                        name="character_certificate"
                        onChange={handleCharacterCertificate}
                        variant="standard"
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", flexDirection: "column" }}
                  mt={2}
                >
                  <MDTypography variant="caption" fontWeight="bold">
                    Is Birth Certificate Produced ?
                  </MDTypography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={birthCertificate}
                            onChange={() => setBirthCertificate(!birthCertificate)}
                          />
                        }
                        label={
                          <MDTypography variant="caption" fontWeight="bold">
                            Yes
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                    {birthCertificate && (
                      <MDInput
                        sx={{ width: "100%" }}
                        type="file"
                        accept="image/*"
                        name="birth_certificate"
                        onChange={handleBirthCertificate}
                        variant="standard"
                      />
                    )}
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={4.1} mt={2} id="activities">
              <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                ACTIVITIES
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={6} mt={1}>
              <Checkbox
                checked={activityRecord}
                onChange={() => setActivityRecord(!activityRecord)}
              />
            </Grid>
            {activityRecord && (
              <>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Sport Activity
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Name
                      </MDTypography>
                    }
                    name="sport_activity"
                    value={values.sport_activity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="file"
                    accept="image/*"
                    name="sport_activity_files"
                    onChange={handleSportActivity}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Extra Curricular
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Name
                      </MDTypography>
                    }
                    name="extra_curricular"
                    value={values.extra_curricular}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="file"
                    accept="image/*"
                    name="extra_curricular_files"
                    onChange={handleExtraCurricular}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Class Record
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Name
                      </MDTypography>
                    }
                    name="class_record"
                    value={values.class_record}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="file"
                    accept="image/*"
                    name="class_record_files"
                    onChange={handleClassRecord}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Health Record
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Name
                      </MDTypography>
                    }
                    name="health_record"
                    value={values.health_record}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="file"
                    accept="image/*"
                    name="health_record_files"
                    onChange={handleHealthRecord}
                    variant="standard"
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={12}
              m={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
              mr={5}
            >
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
              <MDButton color="info" variant="contained" type="submit">
                Save &nbsp;
                <SaveIcon />
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </form>
      <Dialog open={createOpen} onClose={handleCloseCreate} maxWidth="md">
        <CreateGuardian
          setCreateOpen={setCreateOpen}
          username={username}
          fetchGuardian={fetchGuardian}
        />
      </Dialog>
      <Dialog open={open} onClose={handleCloseGuardian} maxWidth="md">
        <UpdateGuardian
          guardianData={guardianData}
          setOpen={setOpen}
          fetchData={fetchData}
          fetchGuardian={fetchGuardian}
        />
      </Dialog>
    </Card>
  );
};

export default Update;
