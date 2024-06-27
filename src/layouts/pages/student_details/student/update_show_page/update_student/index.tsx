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
import UpdateGuardian from "../../guardian/update";
import CreateGuardian from "../../guardian/create";

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
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import MDAvatar from "components/MDAvatar";

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

const UpdateStudent = (props: any) => {
  const { username, setOpenupdate, fetchStudentInfo, dialogNumber } = props;
  const [studentInfo, setStudentInfo] = useState<any>({});
  const [guardianInfo, setGuardianInfo] = useState([]);

  const fetchGuardian = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_guardian/manage`,
        { student_user_name: username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setGuardianInfo(response.data);
        console.log(guardianInfo, "guardian info");
      })
      .catch((error) => {
        console.error("Error fetching guardian data:", error);
      });
  };
  const fetchStudentByUsername = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/retrive`,
        {
          user_name: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStudentInfo(response.data);
        console.log("student info data", response.data);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };

  useEffect(() => {
    fetchGuardian();
    fetchStudentByUsername();
  }, []);
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
  // const { studentInfo, username, setOpenupdate, guardianInfo, fetchData, fetchGuardian } = props;

  const handleClose = () => {
    setOpenupdate(false);
  };
  console.log(studentInfo, "student info update");
  console.log(guardianInfo, "guardian info data");

  const token = Cookies.get("token");

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
  }, []);
  const { classes, account, studentcategory } = useSelector((state: any) => state);
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
        quota: studentInfo.quota || "",
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
        sibling: studentInfo.sibling || false,
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
        const sendValues = {
          ...values,
          sibling:
            values.sibling_name ||
            values.sibling_relationship ||
            values.sibling_class ||
            values.sibling_section ||
            values.sibling_roll_number ||
            values.sibling_date_of_admission ||
            values.sibling_admission_number
              ? true
              : false,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_student`, sendValues, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Student Updated Successfully!");
            fetchStudentInfo();
            props.handleClose();
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
        message.success("Deleted SuccessFully");
        // Filter out the deleted user from the data
        fetchGuardian();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const [editstudentdetails, setEditstudentdetails] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {dialogNumber == 1 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      STUDENT DETAILS
                    </MDTypography>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <MDAvatar
                      bgColor="secondary"
                      size="sm"
                      onClick={() => setEditstudentdetails(!editstudentdetails)}
                      variant="square"
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid> */}

                  <Grid item xs={12} sm={4}>
                    <MDInput
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
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

                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      value={values.quota}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "quota", value },
                        });
                      }}
                      disableClearable
                      options={studentcategoryData.map((acd) => acd.category_name)}
                      renderInput={(params: any) => (
                        <MDInput
                          name="quota"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Quota
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.quota}
                          {...params}
                          variant="standard"
                          error={touched.quota && Boolean(errors.quota)}
                          helperText={touched.quota && errors.quota}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      disableClearable
                      value={values.gender}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "gender", value },
                        });
                      }}
                      options={["Male", "Female", "Other"]}
                      renderInput={(params: any) => (
                        <MDInput
                          required
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
                  <Grid item xs={12} sm={2} mt={2}>
                    <MDTypography variant="body2" color="secondary" fontWeight="bold">
                      {values.stud_img ? "Change Image" : "Upload Image"}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4} mt={2}>
                    <MDInput
                      sx={{ width: "100%" }}
                      type="file"
                      accept="image/*"
                      name="stud_img"
                      onChange={handleImage}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          )}
          {dialogNumber == 2 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      SIBLING
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.sibling_name && Boolean(errors.sibling_name)}
                      helperText={touched.sibling_name && errors.sibling_name}
                      success={values.sibling_name && !errors.sibling_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "90%" }}
                      value={values.sibling_class}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "sibling_class", value } });
                      }}
                      options={
                        values.academic_year !== ""
                          ? classes
                              .filter((item: any) => item.academic_year === values.academic_year)
                              .map((item: any) => item.class_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          name="sibling_class"
                          // onChange={handleChange}
                          value={values.sibling_class}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Class
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.sibling_class && Boolean(errors.sibling_class)}
                          success={values.sibling_class.length && !errors.sibling_class}
                          helperText={touched.sibling_class && errors.sibling_class}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "90%" }}
                      value={values.sibling_section}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "sibling_section", value } });
                      }}
                      options={
                        values.sibling_class !== ""
                          ? classes
                              .filter(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.sibling_class
                              )[0]
                              .section_data.map((item: any) => item.section_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          name="sibling_section"
                          //  onChange={handleChange}
                          value={values.sibling_section}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Section
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.sibling_section && Boolean(errors.sibling_section)}
                          success={values.sibling_section.length && !errors.sibling_section}
                          helperText={touched.sibling_section && errors.sibling_section}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.sibling_relationship && Boolean(errors.sibling_relationship)}
                      helperText={touched.sibling_relationship && errors.sibling_relationship}
                      success={values.sibling_relationship && !errors.sibling_relationship}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.sibling_roll_number && Boolean(errors.sibling_roll_number)}
                      helperText={touched.sibling_roll_number && errors.sibling_roll_number}
                      success={values.sibling_roll_number && !errors.sibling_roll_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                      sx={{ width: "90%" }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Date of Admission
                        </MDTypography>
                      }
                      name="sibling_date_of_admission"
                      value={values.sibling_date_of_admission}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.sibling_date_of_admission &&
                        Boolean(errors.sibling_date_of_admission)
                      }
                      helperText={
                        touched.sibling_date_of_admission && errors.sibling_date_of_admission
                      }
                      success={
                        values.sibling_date_of_admission && !errors.sibling_date_of_admission
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={
                        touched.sibling_admission_number && Boolean(errors.sibling_admission_number)
                      }
                      helperText={
                        touched.sibling_admission_number && errors.sibling_admission_number
                      }
                      success={values.sibling_admission_number && !errors.sibling_admission_number}
                    />
                  </Grid>
                </Grid>
              </MDBox>{" "}
            </Grid>
          )}

          {dialogNumber == 3 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      CONTACT DETAILS
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      required
                      sx={{ width: "90%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Mobile Number
                        </MDTypography>
                      }
                      name="mobile_number"
                      value={values.mobile_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobile_number && Boolean(errors.mobile_number)}
                      helperText={touched.mobile_number && errors.mobile_number}
                      success={values.mobile_number && !errors.mobile_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Alternate Number
                        </MDTypography>
                      }
                      name="alt_phone_number"
                      value={values.alt_phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.alt_phone_number && Boolean(errors.alt_phone_number)}
                      helperText={touched.alt_phone_number && errors.alt_phone_number}
                      success={values.alt_phone_number && !errors.alt_phone_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Email ID
                        </MDTypography>
                      }
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      success={values.email && !errors.email}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          )}

          {dialogNumber == 4 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} mt={2} id="guardian-info">
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      GUARDIAN INFO
                    </MDTypography>
                  </Grid>
                  {guardianInfo.map((guardianinfo: any, index: any) => (
                    <>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="button" fontWeight="bold" color="info">
                          Guardian {index + 1}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={6} py={1} key={index + "space"}>
                        <Tooltip title="Edit  Guardian" placement="top">
                          <IconButton onClick={() => handleOpenGuardian(guardianinfo)}>
                            <CreateRoundedIcon />
                          </IconButton>
                        </Tooltip>

                        {guardianInfo.length > 1 && (
                          <Tooltip title="Delete Guardian" placement="top">
                            <IconButton
                              onClick={() => handleDeleteGuardian(guardianinfo.user_name)}
                            >
                              {guardianinfo.guardian_user_name}
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
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
                              Relation
                            </MDTypography>
                          }
                          value={guardianinfo.relationship}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "email"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Email
                            </MDTypography>
                          }
                          value={guardianinfo.email_id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "date_of_birth"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Date of Birth
                            </MDTypography>
                          }
                          value={guardianinfo.date_of_birth}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "occupation"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Occupation
                            </MDTypography>
                          }
                          value={guardianinfo.occupation}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={4} key={index + "qualification"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    }
                    value={guardianinfo.qualification}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "designation"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    }
                    value={guardianinfo.designation}
                  />
                </Grid> */}

                      <Grid item xs={12} sm={4} key={index + "income"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Annual Income
                            </MDTypography>
                          }
                          value={guardianinfo.income}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "education"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Education
                            </MDTypography>
                          }
                          value={guardianinfo.education}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "adharnumber"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Aadhar Number
                            </MDTypography>
                          }
                          value={guardianinfo.adharnumber}
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
                      <Grid item xs={12} sm={4} key={index + "SPACE"}></Grid>
                      {/* <Grid item xs={12} mt={2} sm={4} key={index + "notification"}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={guardianinfo.notification} onChange={handleChange} />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Notification
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={2} sm={4} key={index + "subscription"}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={guardianinfo.subscription} onChange={handleChange} />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Subscription
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>    <Grid item xs={12} sm={4} key={index + "space"}></Grid>*/}

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
                    </>
                  ))}
                  <Grid item xs={12} sm={12}>
                    <MDButton color="dark" onClick={() => handleOpenCreate()}>
                      ADD Guardian +
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          )}
          {dialogNumber == 5 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      ADDRESS
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="14px"
                    >
                      CURRENT ADDRESS
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      success={values.address_line1 && !errors.address_line1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      success={values.address_line2 && !errors.address_line2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      type="number"
                      sx={{ width: "90%" }}
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
                      success={values.pin_code && !errors.pin_code}
                      helperText={touched.pin_code && errors.pin_code}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      success={values.city && !errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      success={values.state && !errors.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      success={values.country && !errors.country}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} mt={2}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="14px"
                    >
                      PERMANENT ADDRESS
                    </MDTypography>
                  </Grid>
                  {/* <Grid item xs={12} sm={4.1} mb={-2}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Same as Current Address
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6} mb={-2}>
                  <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
                </Grid> */}
                  <Grid item xs={12} sm={12}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Same as Current Address
                            </MDTypography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_address_line1 && Boolean(errors.pr_address_line1)}
                      helperText={touched.pr_address_line1 && errors.pr_address_line1}
                      success={values.pr_address_line1 && !errors.pr_address_line1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_address_line2 && Boolean(errors.pr_address_line2)}
                      helperText={touched.pr_address_line2 && errors.pr_address_line2}
                      success={values.pr_address_line2 && !errors.pr_address_line2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_pin_code && Boolean(errors.pr_pin_code)}
                      helperText={touched.pr_pin_code && errors.pr_pin_code}
                      success={values.pr_pin_code && !errors.pr_pin_code}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_city && Boolean(errors.pr_city)}
                      helperText={touched.pr_city && errors.pr_city}
                      success={values.pr_city && !errors.pr_city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_state && Boolean(errors.pr_state)}
                      helperText={touched.pr_state && errors.pr_state}
                      success={values.pr_state && !errors.pr_state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "90%" }}
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
                      error={touched.pr_country && Boolean(errors.pr_country)}
                      helperText={touched.pr_country && errors.pr_country}
                      success={values.pr_country && !errors.pr_country}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          )}

          {dialogNumber == 6 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      PREVIOUS EDUCATION
                    </MDTypography>
                  </Grid>
                  <>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.prev_school_name && Boolean(errors.prev_school_name)}
                        helperText={touched.prev_school_name && errors.prev_school_name}
                        success={values.prev_school_name && !errors.prev_school_name}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.prev_class_name && Boolean(errors.prev_class_name)}
                        helperText={touched.prev_class_name && errors.prev_class_name}
                        success={values.prev_class_name && !errors.prev_class_name}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.year && Boolean(errors.year)}
                        helperText={touched.year && errors.year}
                        success={values.year && !errors.year}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.marks_obtained && Boolean(errors.marks_obtained)}
                        helperText={touched.marks_obtained && errors.marks_obtained}
                        success={values.marks_obtained && !errors.marks_obtained}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.total_marks && Boolean(errors.total_marks)}
                        helperText={touched.total_marks && errors.total_marks}
                        success={values.total_marks && !errors.total_marks}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        error={touched.grade_percentage && Boolean(errors.grade_percentage)}
                        helperText={touched.grade_percentage && errors.grade_percentage}
                        success={values.grade_percentage && !errors.grade_percentage}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }}>
                      <MDTypography variant="caption" fontWeight="bold">
                        Transfer Certificate
                      </MDTypography>
                      <FormControl>
                        <MDInput
                          sx={{ width: "90%" }}
                          type="file"
                          accept="image/*"
                          name="transfer_certificate"
                          onChange={handleTransferCertificate}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }}>
                      <MDTypography variant="caption" fontWeight="bold">
                        Character Certificate
                      </MDTypography>
                      <FormControl>
                        <MDInput
                          sx={{ width: "90%" }}
                          type="file"
                          accept="image/*"
                          name="character_certificate"
                          onChange={handleCharacterCertificate}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }}>
                      <MDTypography variant="caption" fontWeight="bold">
                        Birth Certificate
                      </MDTypography>
                      <FormControl>
                        <MDInput
                          sx={{ width: "90%" }}
                          type="file"
                          accept="image/*"
                          name="birth_certificate"
                          onChange={handleBirthCertificate}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                    </Grid>
                  </>
                </Grid>
              </MDBox>{" "}
            </Grid>
          )}
          {dialogNumber == 7 && (
            <Grid item sm={12}>
              <MDBox p={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography
                      color="secondary"
                      variant="body2"
                      fontWeight="bold"
                      fontSize="18px"
                    >
                      ACTIVITIES
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Sport Activity
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "90%" }}
                      type="file"
                      accept="image/*"
                      name="sport_activity_files"
                      onChange={handleSportActivity}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Extra Curricular
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "90%" }}
                      type="file"
                      accept="image/*"
                      name="extra_curricular_files"
                      onChange={handleExtraCurricular}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class Record
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "90%" }}
                      type="file"
                      accept="image/*"
                      name="class_record_files"
                      onChange={handleClassRecord}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Health Record
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "90%" }}
                      type="file"
                      accept="image/*"
                      name="health_record_files"
                      onChange={handleHealthRecord}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          mb={1}
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          mr={5}
        >
          <Grid item mr={2}>
            <MDButton
              color="dark"
              variant="contained"
              onClick={() => {
                props.handleClose();
              }}
            >
              Back
            </MDButton>
          </Grid>{" "}
          <Grid item>
            <MDButton color="info" variant="contained" type="submit">
              Save &nbsp;
              <SaveIcon />
            </MDButton>
          </Grid>
        </Grid>
      </form>
      {/* <Dialog open={createOpen} onClose={handleCloseCreate} maxWidth="md">
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
      </Dialog> */}
    </>
  );
};

export default UpdateStudent;
