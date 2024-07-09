import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  Dialog,
  Avatar,
} from "@mui/material";
import UpdateEmployee from "./update";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");

const ShowUpdate = (props: any) => {
  const { handleClose, username, fetchData } = props;
  const validationSchema = Yup.object().shape({
    employee_dob: Yup.date()
      .test("year-range", "Incorrect format", function (value) {
        if (value) {
          const year = value.getFullYear();
          return year >= 2000 && year <= 3000;
        }
        return true;
      })
      .required("Required *"),
    admission_number: Yup.string(),
    fee_code: Yup.string(),
    first_name: Yup.string().required("Required *"),
    middle_name: Yup.string(),
    last_name: Yup.string(),
    aadhaar_number: Yup.string().matches(/^[0-9]{12}$/, "Incorrect Format"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Incorrect Format")
      .required("Required *"),
    phone_number: Yup.string().matches(/^[0-9]{10}$/, "Incorrect Format"),

    email: Yup.string().email("Incorrect Format"),
  });
  const [empCategory, setEmpCategory] = useState([]);
  const [empGrade, setEmpGrade] = useState([]);
  const [empProfile, setEmpProfile] = useState([]);
  const [empType, setEmpType] = useState([]);
  const [empDep, setEmpDep] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState<any>({});
  const fetchEmployeeInfo = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_employees/retrive`,
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
        setEmployeeInfo(response.data);
        console.log("student info data", response.data);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpDep(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employee_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpCategory(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_empgrd`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpGrade(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_emptype`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpType(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_role`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpProfile(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetchEmployeeInfo();
  }, []);
  const [referred, setReferred] = useState(
    employeeInfo.refered_by || employeeInfo.designation ? true : false
  );
  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        user_name: username,
        joining_date: employeeInfo.joining_date || "",
        first_name: employeeInfo.first_name || "",
        middle_name: employeeInfo.middle_name || "",
        last_name: employeeInfo.last_name || "",
        gender: employeeInfo.gender || "",
        employee_dob: employeeInfo.employee_dob || "",
        role_name: employeeInfo.role_name || "",
        employee_category: employeeInfo.employee_category || "",
        employee_department: employeeInfo.employee_department || "",
        job_title: employeeInfo.job_title || "",
        qualification: employeeInfo.qualification || "",
        total_yrs_experience: employeeInfo.total_yrs_experience || 0,
        total_month_experience: employeeInfo.total_month_experience || 0,
        max_no_of_class: employeeInfo.max_no_of_class || 0,
        employee_type: employeeInfo.employee_type || "",
        ltc_applicable: employeeInfo.ltc_applicable || false,
        employee_grade: employeeInfo.employee_grade || "",
        status: employeeInfo.status || "",
        aadhar_number: employeeInfo.aadhar_number || "",

        last_working_day: employeeInfo.last_working_day || "",
        esi_number: employeeInfo.esi_number || "",
        una_number: employeeInfo.una_number || "",
        phone_number: employeeInfo.phone_number || "",
        employee_notification: employeeInfo.employee_notification || "",
        employee_subscription: employeeInfo.employee_subscription || "",
        employee_email_notificaton: employeeInfo.employee_email_notificaton || "",
        employee_email_subscription: employeeInfo.employee_email_subscription || "",
        emergency_contact_name: employeeInfo.emergency_contact_name || "",
        emergency_contact_number: employeeInfo.emergency_contact_number || "",
        hobby: employeeInfo.hobby || "",
        sport_activity: employeeInfo.sport_activity || "",
        sport_activity_files: employeeInfo.sport_activity_files || [],
        extra_curricular: employeeInfo.extra_curricular || "",
        extra_curricular_files: employeeInfo.extra_curricular_files || [],

        bank_name: employeeInfo.bank_name || "",
        account_name: employeeInfo.account_name || "",
        branch_name: employeeInfo.branch_name || "",
        ifsc_number: employeeInfo.ifsc_number || "",
        martial_status: employeeInfo.martial_status || "",
        mother_name: employeeInfo.mother_name || "",
        father_name: employeeInfo.father_name || "",
        blood_group: employeeInfo.blood_group || "",
        refered_by: employeeInfo.refered_by || "",
        is_refered: employeeInfo.is_refered || false,
        designation: employeeInfo.designation || "",
        address_line1: employeeInfo.address_line1 || "",
        address_line2: employeeInfo.address_line2 || "",
        pin_code: employeeInfo.pin_code || "",
        city: employeeInfo.city || "",
        state: employeeInfo.state || "",
        country: employeeInfo.country || "",
        landmark: employeeInfo.landmark || "",
        pr_landmark: employeeInfo.pr_landmark || "",
        pr_address_line1: employeeInfo.pr_address_line1 || "",
        pr_address_line2: employeeInfo.pr_address_line2 || "",
        pr_pin_code: employeeInfo.pr_pin_code || "",
        pr_city: employeeInfo.pr_city || "",
        pr_state: employeeInfo.pr_state || "",
        pr_country: employeeInfo.pr_country || "",
        mobile_number: employeeInfo.mobile_number || "",
        email: employeeInfo.email || "",
        employee_img: employeeInfo.employee_img || null,
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        setLoading(true);

        let sendData = {
          ...values,
          total_yrs_experience: values.total_yrs_experience.toString(),
          total_month_experience: values.total_month_experience.toString(),
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_employees`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setLoading(false);
            fetchData();
            message.success("Updated Successfully!");
            action.resetForm();
          })
          .catch((error: any) => {
            setLoading(false);
            message.error(error.response.data.detail);
          });
      },
    });
  const [checkAddress, setCheckedAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("pr_landmark", values.landmark);
      setFieldValue("pr_address_line1", values.address_line1);
      setFieldValue("pr_address_line2", values.address_line2);
      setFieldValue("pr_pin_code", values.pin_code);
      setFieldValue("pr_city", values.city);
      setFieldValue("pr_state", values.state);
      setFieldValue("pr_country", values.country);
    }
  };
  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        e.target.value = "";
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue("employee_img", reader.result); // Set Base124 string
        };
        reader.readAsDataURL(file);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
        e.target.value = "";
        return;
      }
    }
  };
  const handleSportActivity = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        e.target.value = "";
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.sport_activity_files.push(e.target.files[0]);
        setFieldValue("sport_activity", file.name);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
        e.target.value = "";
        return;
      }
    }
  };
  const handleExtraCurricular = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        e.target.value = "";
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.extra_curricular_files.push(e.target.files[0]);
        setFieldValue("extra_curricular", file.name);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
        e.target.value = "";
        return;
      }
    }
  };

  const [dialogNumber, setDialogNumber] = useState(0);
  const [dialogbox, setDialogbox] = useState(false);
  const handleDialogbox = () => {
    setDialogbox(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item>
            <Sidenav
              item={[
                { icon: "person", label: "Employee Info", href: "1" },
                { icon: "call", label: "Contact Info", href: "2" },
                { icon: "account_balance", label: "Account Info", href: "3" },
                { icon: "gite", label: "Address", href: "4" },
                { icon: "sports_martial_arts", label: "Activities", href: "5" },
              ]}
              brandName={""}
              routes={[]}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              <Grid item sm={12} id="1">
                <Card>
                  <MDBox p={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography
                          color="info"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="18px"
                        >
                          EMPLOYEE DETAILS
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => {
                            setDialogbox(true);
                            setDialogNumber(1);
                          }}
                          // variant="circle"
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
                      </Grid>
                      {employeeInfo.employee_img ? (
                        <Grid item xs={12} sm={12}>
                          <Avatar
                            alt="student"
                            src={employeeInfo.employee_img}
                            sx={{ width: 84, height: 84 }}
                          />
                        </Grid>
                      ) : (
                        <></>
                      )}
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          First Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Middle Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Last Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Date of Birth
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.first_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.middle_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.last_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.employee_dob}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Joining Date
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Last Working Day
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Gender
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Job Title
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.joining_date}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.last_working_day}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.gender}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.job_title}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Qualification
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Max Class Per Day
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Total Year Experience
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Total Month Experience
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.qualification}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.max_no_of_class}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.total_yrs_experience}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.total_month_experience}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Aadhar Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Mother Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Father Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Marital Status
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.aadhar_number}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.mother_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.father_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.martial_status}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Blood Group
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Department
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Employee Category
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Employee Profile
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.blood_group}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.employee_department}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.employee_category}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.role_name}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Employee Type
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Employee Grade
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          LTC Applicable
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.employee_type}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.employee_grade}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.ltc_applicable ? "YES" : "NO"}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Referred
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Referred By
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Designation
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.is_refered ? "YES" : "NO"}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.refered_by}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.designation}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item sm={12} id="2">
                <Card>
                  <MDBox p={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography
                          color="info"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="18px"
                        >
                          CONTACT DETAILS
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => {
                            setDialogbox(true);
                            setDialogNumber(2);
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Mobile Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Alternate Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Email
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to make it 4 columns */}
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.mobile_number}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.phone_number}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.email}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to make it 4 columns */}
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item sm={12} id="3">
                <Card>
                  <MDBox p={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography
                          color="info"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="18px"
                        >
                          ACCOUNT DETAILS
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => {
                            setDialogbox(true);
                            setDialogNumber(3);
                          }}
                          // variant="circle"
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Bank Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Account Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Branch Name
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          IFSC Code
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.bank_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.account_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.branch_name}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.ifsc_number}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          ESI Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          UNA Number
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.esi_number}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.una_number}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>

              <Grid item sm={12} id="4">
                <Card>
                  <MDBox p={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography
                          color="info"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="18px"
                        >
                          ADDRESS
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => {
                            setDialogbox(true);
                            setDialogNumber(4);
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
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
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Address Line 1
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Address Line 2
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Pincode
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          City
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.address_line1}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.address_line2}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pin_code}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.city}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          State
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Country
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.state}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.country}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={12}>
                        <MDTypography
                          color="secondary"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="14px"
                        >
                          PERMANENT ADDRESS
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Address Line 1
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Address Line 2
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Pincode
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          City
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_address_line1}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_address_line2}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_pin_code}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_city}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          State
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Country
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_state}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2" fontWeight="bold">
                          {values.pr_country}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                      <Grid item xs={12} sm={3}></Grid>{" "}
                      {/* Add an empty Grid item to maintain 4-column layout */}
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item sm={12} id="5">
                <Card>
                  <MDBox p={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography
                          color="info"
                          variant="body2"
                          fontWeight="bold"
                          fontSize="18px"
                        >
                          ACTIVITIES
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => {
                            setDialogbox(true);
                            setDialogNumber(5);
                          }}
                          // variant="circle"
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Hobbies
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid item xs={12} sm={4}>
                        <MDTypography variant="button" fontWeight="bold">
                          {values.hobby}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                py={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Back
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Dialog open={dialogbox} onClose={handleDialogbox} maxWidth="md">
        <UpdateEmployee
          dialogNumber={dialogNumber}
          handleClose={handleDialogbox}
          username={username}
          fetchData={fetchEmployeeInfo}
        />
      </Dialog>
    </>
  );
};

export default ShowUpdate;
