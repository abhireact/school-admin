import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import SaveIcon from "@mui/icons-material/Save";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
const token = Cookies.get("token");

const Update = (props: any) => {
  const [referred, setReferred] = useState(false);

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

    last_name: Yup.string(),
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
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employee_positions`, {
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

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        joining_date: employeeInfo.joining_date || "",
        first_name: employeeInfo.first_name || "",
        middle_name: employeeInfo.middle_name || "",
        last_name: employeeInfo.last_name || "",
        gender: employeeInfo.gender || "",
        employee_dob: employeeInfo.employee_dob || "",
        empoy_profile: employeeInfo.empoy_profile || "",
        employee_category: employeeInfo.employee_category || "",
        employee_department: employeeInfo.employee_department || "",
        job_title: employeeInfo.job_title || "",
        qualification: employeeInfo.qualification || "",
        total_yrs_experience: employeeInfo.total_yrs_experience || 0,
        total_month_experience: employeeInfo.total_month_experience || 0,
        employee_type: employeeInfo.employee_type || "",
        ltc_applicable: employeeInfo.ltc_applicable || false,
        employee_grade: employeeInfo.employee_grade || "None",
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
        let dob = values.employee_dob;
        let sendData = { ...values };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_employees`, sendData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setLoading(false);
            fetchData();
            message.success("Created Successfully!");
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
        setFieldValue("employee_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
        e.target.value = "";
        return;
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
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item>
          <Sidenav
            item={[
              { icon: "person", label: "Employee Info", href: "1" },

              { icon: "call", label: "Contact Info", href: "2" },
              { icon: "account_balance", label: "Account Info", href: "3" },
              { icon: "gite", label: "Address", href: "4" },
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        EMPLOYEE DETAILS
                      </MDTypography>
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <MDInput
                        required
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            First Name
                          </MDTypography>
                        }
                        name="first_name"
                        value={values.first_name}
                        onChange={(event: { target: { value: any } }) => {
                          handleChange({
                            target: { name: "first_name", value: event.target.value },
                          });
                        }}
                        onBlur={handleBlur}
                        error={touched.first_name && Boolean(errors.first_name)}
                        success={values.first_name && !errors.first_name}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Middle Name
                          </MDTypography>
                        }
                        name="middle_name"
                        value={values.middle_name}
                        onChange={(event: { target: { value: any } }) => {
                          handleChange({
                            target: { name: "middle_name", value: event.target.value },
                          });
                        }}
                        onBlur={handleBlur}
                        error={touched.middle_name && Boolean(errors.middle_name)}
                        success={values.middle_name && !errors.middle_name}
                        helperText={touched.middle_name && errors.middle_name}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        success={values.last_name && !errors.last_name}
                        helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        type="date"
                        required
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "90%" }}
                        variant="standard"
                        name="employee_dob"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Date of Birth
                          </MDTypography>
                        }
                        value={values.employee_dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employee_dob && Boolean(errors.employee_dob)}
                        helperText={touched.employee_dob && errors.employee_dob}
                        success={values.employee_dob && !errors.employee_dob}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        type="date"
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "90%" }}
                        variant="standard"
                        name="joining_date"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Joining Date
                          </MDTypography>
                        }
                        value={values.joining_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.joining_date && Boolean(errors.joining_date)}
                        helperText={touched.joining_date && errors.joining_date}
                        success={values.joining_date && !errors.joining_date}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        type="date"
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "90%" }}
                        variant="standard"
                        name="last_working_day"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Last Working Day
                          </MDTypography>
                        }
                        value={values.last_working_day}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_working_day && Boolean(errors.last_working_day)}
                        helperText={touched.last_working_day && errors.last_working_day}
                        success={values.last_working_day && !errors.last_working_day}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
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
                            InputLabelProps={{ shrink: true }}
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
                            success={values.gender && !errors.gender}
                            helperText={touched.gender && errors.gender}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Job Title
                          </MDTypography>
                        }
                        name="job_title"
                        value={values.job_title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.job_title && Boolean(errors.job_title)}
                        helperText={touched.job_title && errors.job_title}
                        success={values.job_title && !errors.job_title}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Qualification
                          </MDTypography>
                        }
                        name="qualification"
                        value={values.qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.qualification && Boolean(errors.qualification)}
                        helperText={touched.qualification && errors.qualification}
                        success={values.qualification && !errors.qualification}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        type="number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Total Year Experience
                          </MDTypography>
                        }
                        name="total_yrs_experience"
                        value={values.total_yrs_experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.total_yrs_experience && Boolean(errors.total_yrs_experience)}
                        helperText={touched.total_yrs_experience && errors.total_yrs_experience}
                        success={values.total_yrs_experience && !errors.total_yrs_experience}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        type="number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Total Month Experience
                          </MDTypography>
                        }
                        name="total_month_experience"
                        value={values.total_month_experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.total_month_experience && Boolean(errors.total_month_experience)
                        }
                        helperText={touched.total_month_experience && errors.total_month_experience}
                        success={values.total_month_experience && !errors.total_month_experience}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Mother Name
                          </MDTypography>
                        }
                        name="mother_name"
                        value={values.mother_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.mother_name && Boolean(errors.mother_name)}
                        helperText={touched.mother_name && errors.mother_name}
                        success={values.mother_name && !errors.mother_name}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Father Name
                          </MDTypography>
                        }
                        name="father_name"
                        value={values.father_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.father_name && Boolean(errors.father_name)}
                        helperText={touched.father_name && errors.father_name}
                        success={values.father_name && !errors.father_name}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.martial_status}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "martial_status", value },
                          });
                        }}
                        options={["Single", "Married", "Divorced", "Widowed"]}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="martial_status"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Martial Status
                              </MDTypography>
                            }
                            value={values.martial_status}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.martial_status && Boolean(errors.martial_status)}
                            success={values.martial_status && !errors.martial_status}
                            helperText={touched.martial_status && errors.martial_status}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.blood_group}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "blood_group", value },
                          });
                        }}
                        options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="blood_group"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Blood Group
                              </MDTypography>
                            }
                            value={values.blood_group}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.blood_group && Boolean(errors.blood_group)}
                            success={values.blood_group && !errors.blood_group}
                            helperText={touched.blood_group && errors.blood_group}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.employee_department}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "employee_department", value },
                          });
                        }}
                        options={empDep?.map((info: any) => info.dept_name)}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="employee_department"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Department
                              </MDTypography>
                            }
                            value={values.employee_department}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={
                              touched.employee_department && Boolean(errors.employee_department)
                            }
                            success={values.employee_department && !errors.employee_department}
                            helperText={touched.employee_department && errors.employee_department}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.employee_category}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "employee_category", value },
                          });
                        }}
                        options={empCategory?.map((info: any) => info.category_name)}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="employee_category"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Employee Category
                              </MDTypography>
                            }
                            value={values.employee_category}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.employee_category && Boolean(errors.employee_category)}
                            success={values.employee_category && !errors.employee_category}
                            helperText={touched.employee_category && errors.employee_category}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.empoy_profile}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "empoy_profile", value },
                          });
                        }}
                        options={empProfile?.map((info: any) => info.position_name)}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="empoy_profile"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Employee Profile
                              </MDTypography>
                            }
                            value={values.empoy_profile}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.empoy_profile && Boolean(errors.empoy_profile)}
                            success={values.empoy_profile && !errors.empoy_profile}
                            helperText={touched.empoy_profile && errors.empoy_profile}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.employee_type}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "employee_type", value },
                          });
                        }}
                        options={empType?.map((info: any) => info.employee_type)}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="employee_type"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Employee Type
                              </MDTypography>
                            }
                            value={values.employee_type}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.employee_type && Boolean(errors.employee_type)}
                            success={values.employee_type && !errors.employee_type}
                            helperText={touched.employee_type && errors.employee_type}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Autocomplete
                        disableClearable
                        sx={{ width: "90%" }}
                        value={values.employee_grade}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "employee_grade", value },
                          });
                        }}
                        options={empGrade?.map((info: any) => info.employee_grade)}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="employee_grade"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Employee Grade
                              </MDTypography>
                            }
                            value={values.employee_grade}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.employee_grade && Boolean(errors.employee_grade)}
                            success={values.employee_grade && !errors.employee_grade}
                            helperText={touched.employee_grade && errors.employee_grade}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
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
                        success={values.hobby && !errors.hobby}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2} mt={2}>
                      <MDTypography variant="body2" fontWeight="bold">
                        Upload Image
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} mt={2}>
                      <MDInput
                        sx={{ width: "90%" }}
                        type="file"
                        accept="image/*"
                        name="employee_img"
                        onChange={handleImage}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item sm={12} id="2">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
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
                        name="phone_number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone_number && Boolean(errors.phone_number)}
                        helperText={touched.phone_number && errors.phone_number}
                        success={values.phone_number && !errors.phone_number}
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
              </Card>
            </Grid>
            <Grid item sm={12} id="3">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        ACCOUNT DETAILS
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Bank Name
                          </MDTypography>
                        }
                        name="bank_name"
                        value={values.bank_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bank_name && Boolean(errors.bank_name)}
                        helperText={touched.bank_name && errors.bank_name}
                        success={values.bank_name && !errors.bank_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Account Number
                          </MDTypography>
                        }
                        name="account_name"
                        value={values.account_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.account_name && Boolean(errors.account_name)}
                        helperText={touched.account_name && errors.account_name}
                        success={values.account_name && !errors.account_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Branch Name
                          </MDTypography>
                        }
                        name="branch_name"
                        value={values.branch_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.branch_name && Boolean(errors.branch_name)}
                        helperText={touched.branch_name && errors.branch_name}
                        success={values.branch_name && !errors.branch_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            IFSC code
                          </MDTypography>
                        }
                        name="ifsc_number"
                        value={values.ifsc_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.ifsc_number && Boolean(errors.ifsc_number)}
                        helperText={touched.ifsc_number && errors.ifsc_number}
                        success={values.ifsc_number && !errors.ifsc_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            ESI Number
                          </MDTypography>
                        }
                        name="esi_number"
                        value={values.esi_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.esi_number && Boolean(errors.esi_number)}
                        helperText={touched.esi_number && errors.esi_number}
                        success={values.esi_number && !errors.esi_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            UNA Number
                          </MDTypography>
                        }
                        name="una_number"
                        value={values.una_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.una_number && Boolean(errors.una_number)}
                        helperText={touched.una_number && errors.una_number}
                        success={values.una_number && !errors.una_number}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            <Grid item sm={12} id="4">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={2} id="4">
                    <Grid item xs={12} sm={12}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
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
              </Card>{" "}
            </Grid>
            <Grid item xs={12} sm={12} py={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item mr={2}>
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
              <Grid item>
                {loading ? (
                  <MDButton color="info" variant="contained" type="submit" disabled>
                    Loading ...
                  </MDButton>
                ) : (
                  <MDButton color="info" variant="contained" type="submit">
                    Save &nbsp;
                    <SaveIcon />
                  </MDButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Update;
