import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import SaveIcon from "@mui/icons-material/Save";
import { message } from "antd";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox, Icon } from "@mui/material";
const token = Cookies.get("token");

const Create = (props: any) => {
  const { handleClose, fetchData } = props;
  const validationSchema = Yup.object().shape({
    employee_dob: Yup.date()
      .test("year-range", "Incorrect format", function (value) {
        if (value) {
          const year = value.getFullYear();
          return year >= 1900 && year <= 3000;
        }
        return true;
      })
      .required("Required *"),
    admission_number: Yup.string(),
    fee_code: Yup.string(),
    first_name: Yup.string().required("Required *"),
    middle_name: Yup.string(),
    last_name: Yup.string(),
    aadhar_number: Yup.string().matches(/^[0-9]{12}$/, "Incorrect Format"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Incorrect Format")
      .required("Required *"),
    phone_number: Yup.string().matches(/^[0-9]{10}$/, "Incorrect Format"),
    email: Yup.string().email("Incorrect Format").required("Required *"),
    pan_number: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Incorrect Format"),
  });
  const [empCategory, setEmpCategory] = useState([]);
  const [empGrade, setEmpGrade] = useState([]);
  const [empProfile, setEmpProfile] = useState([]);
  const [empType, setEmpType] = useState([]);
  const [empDep, setEmpDep] = useState([]);
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
  }, []);
  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        joining_date: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        employee_dob: "",
        role_name: "",
        employee_category: "",
        employee_department: "",
        job_title: "",
        qualification: "",
        total_yrs_experience: 0,
        total_month_experience: 0,
        max_no_of_class: 0,
        employee_type: "",
        ltc_applicable: false,
        employee_grade: "",
        status: "",
        aadhar_number: "",
        last_working_day: "",
        esi_number: "",
        una_number: "",
        phone_number: "",
        employee_notification: false,
        employee_subscription: false,
        employee_email_notificaton: false,
        employee_email_subscription: false,
        emergency_contact_name: "",
        emergency_contact_number: "",
        hobby: "",
        sport_activity: "",
        sport_activity_files: "",
        extra_curricular: "",
        extra_curricular_files: "",
        bank_name: "",
        account_name: "",
        branch_name: "",
        ifsc_number: "",
        martial_status: "",
        mother_name: "",
        father_name: "",
        blood_group: "",
        is_refered: false,
        refered_by: "",
        designation: "",
        address_line1: "",
        address_line2: "",
        pin_code: "",
        city: "",
        state: "",
        country: "",
        landmark: "",
        pr_landmark: "",
        pr_address_line1: "",
        pr_address_line2: "",
        pr_pin_code: "",
        pr_city: "",
        pr_state: "",
        pr_country: "",
        mobile_number: "",
        email: "",
        employee_img: null,
        language: [],
        adhar_card: "",
        pan_number: "",
        bank_account_details: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        setLoading(true);

        let sendData = {
          ...values,
          total_yrs_experience: values.total_yrs_experience.toString(),
          total_month_experience: values.total_month_experience.toString(),
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_employees`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setLoading(false);
            fetchData();
            handleClose();
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
  const ImageRef = useRef(null);
  const handleImageChangeButton = () => {
    ImageRef.current.click();
  };
  const handleImageChange = (e: any) => {
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
          setFieldValue("employee_img", reader.result); // Set Base64 string
        };
        reader.readAsDataURL(file);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
        e.target.value = "";
        return;
      }
    }
  };
  const FileChangeRef = useRef(null);

  const handleFileChangeButton = () => {
    FileChangeRef.current.click();
  };
  const AccountDetailsRef = useRef(null);
  const handleAccountChangeButton = () => {
    AccountDetailsRef.current.click();
  };

  const handleAccountChange = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) {
      message.error("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      message.error("File must be a PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size exceeds 5 MB limit.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFieldValue("bank_account_details", result);
      } else {
        console.error("Error: reader.result is not a string.");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) {
      message.error("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      message.error("File must be a PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size exceeds 5 MB limit.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFieldValue("adhar_card", result);
      } else {
        console.error("Error: reader.result is not a string.");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };
  const SportActivityRef = useRef(null);
  const handleSportActivityButton = () => {
    SportActivityRef.current.click();
  };
  const handleSportActivity = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) {
      message.error("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      message.error("File must be a PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size exceeds 5 MB limit.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFieldValue("sport_activity_files", result);
      } else {
        console.error("Error: reader.result is not a string.");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };
  const ExtraCurricularRef = useRef(null);
  const handleExtraCurricularButton = () => {
    ExtraCurricularRef.current.click();
  };
  const handleExtraCurricular = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) {
      message.error("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      message.error("File must be a PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size exceeds 5 MB limit.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFieldValue("extra_curricular_files", result);
      } else {
        console.error("Error: reader.result is not a string.");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
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
              { icon: "workspace_premium", label: "Certification", href: "5" },
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
                        required
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
                            Max Class Per Day
                          </MDTypography>
                        }
                        name="max_no_of_class"
                        value={values.max_no_of_class}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.max_no_of_class && Boolean(errors.max_no_of_class)}
                        helperText={touched.max_no_of_class && errors.max_no_of_class}
                        success={values.max_no_of_class && !errors.max_no_of_class}
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
                            Aadhar Number
                          </MDTypography>
                        }
                        name="aadhar_number"
                        value={values.aadhar_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.aadhar_number && Boolean(errors.aadhar_number)}
                        helperText={touched.aadhar_number && errors.aadhar_number}
                        success={values.aadhar_number && !errors.aadhar_number}
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
                            required
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
                            required
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
                        value={values.role_name}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "role_name", value },
                          });
                        }}
                        options={empProfile?.map((info: any) => info.role_name)}
                        renderInput={(params: any) => (
                          <MDInput
                            required
                            InputLabelProps={{ shrink: true }}
                            name="role_name"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Employee Profile
                              </MDTypography>
                            }
                            value={values.role_name}
                            {...params}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.role_name && Boolean(errors.role_name)}
                            success={values.role_name && !errors.role_name}
                            helperText={touched.role_name && errors.role_name}
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
                            required
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
                        options={empGrade?.map((info: any) => info.grade_name)}
                        renderInput={(params: any) => (
                          <MDInput
                            required
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
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Hobbies
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
                    <Grid item xs={12} sm={4} mt={2}>
                      <input
                        type="checkbox"
                        checked={values.ltc_applicable}
                        onChange={handleChange}
                        name="ltc_applicable"
                      />
                      &nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        LTC Applicable
                      </MDTypography>
                    </Grid>

                    {values.is_refered ? (
                      <>
                        <Grid item xs={6} sm={4}>
                          <MDInput
                            sx={{ width: "90%" }}
                            variant="standard"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Referred By
                              </MDTypography>
                            }
                            name="refered_by"
                            value={values.refered_by}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.refered_by && Boolean(errors.refered_by)}
                            helperText={touched.refered_by && errors.refered_by}
                            success={values.refered_by && !errors.refered_by}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <MDInput
                            sx={{ width: "90%" }}
                            variant="standard"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Designation
                              </MDTypography>
                            }
                            name="designation"
                            value={values.designation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.designation && Boolean(errors.designation)}
                            helperText={touched.designation && errors.designation}
                            success={values.designation && !errors.designation}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12} sm={4} mt={2}>
                          <input
                            type="checkbox"
                            checked={values.is_refered}
                            onChange={handleChange}
                            name="is_refered"
                          />
                          &nbsp;
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Referred
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={4}></Grid>
                        <Grid item xs={12} sm={4}></Grid>
                      </>
                    )}

                    <Grid
                      item
                      xs={12}
                      sm={4.1}
                      container
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <MDButton
                        variant="text"
                        color="dark"
                        onClick={handleImageChangeButton}
                        sx={{ width: "90%" }}
                      >
                        {values.employee_img ? "Re-Upload" : "Upload"} Employee Image
                        <Icon>cloud_upload</Icon>
                      </MDButton>

                      <input
                        type="file"
                        ref={ImageRef}
                        accept="image/*"
                        name="employee_img"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4.1}>
                      <MDButton
                        variant="text"
                        color="dark"
                        onClick={handleFileChangeButton}
                        sx={{ width: "90%" }}
                      >
                        {values.adhar_card ? "Re-Upload" : "Upload"}&nbsp;
                        <Icon>cloud_upload</Icon>
                      </MDButton>
                      <input
                        type="file"
                        ref={FileChangeRef}
                        accept="application/pdf"
                        name="adhar_card"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
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
                    <Grid item xs={12} sm={4} mt={2}>
                      <input
                        type="checkbox"
                        checked={values.employee_notification}
                        onChange={handleChange}
                        name="employee_notification"
                      />
                      &nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Notification
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} mt={2}>
                      <input
                        type="checkbox"
                        checked={values.employee_subscription}
                        onChange={handleChange}
                        name="employee_subscription"
                      />
                      &nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Subscription
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        required
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
                    <Grid item xs={12} sm={4} mt={2}>
                      <input
                        type="checkbox"
                        checked={values.employee_email_notificaton}
                        onChange={handleChange}
                        name="employee_email_notificaton"
                      />
                      &nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Notification
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} mt={2}>
                      <input
                        type="checkbox"
                        checked={values.employee_email_subscription}
                        onChange={handleChange}
                        name="employee_email_subscription"
                      />
                      &nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Subscription
                      </MDTypography>
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
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        sx={{ width: "90%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            PAN Number
                          </MDTypography>
                        }
                        name="pan_number"
                        value={values.pan_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.pan_number && Boolean(errors.pan_number)}
                        helperText={touched.pan_number && errors.pan_number}
                        success={values.pan_number && !errors.pan_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} mt={2}>
                      <MDButton
                        variant="text"
                        color="dark"
                        onClick={handleAccountChangeButton}
                        sx={{ width: "90%" }}
                      >
                        {values.bank_account_details ? "Re-Upload" : "Upload"}&nbsp;
                        <Icon>cloud_upload</Icon>
                      </MDButton>
                      <input
                        type="file"
                        ref={AccountDetailsRef}
                        accept="application/pdf"
                        name="bank_account_details"
                        onChange={handleAccountChange}
                        style={{ display: "none" }}
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
                        //type="number"
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
                      <input type="checkbox" checked={checkAddress} onChange={handleCheckAddress} />
                      &nbsp;&nbsp;
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Same as Current Address
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
            <Grid item sm={12} id="5">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        CERTIFICATION
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <MDButton
                        variant="text"
                        color="dark"
                        onClick={handleSportActivityButton}
                        sx={{ width: "90%" }}
                      >
                        {values.sport_activity_files ? "Re-Upload" : "Upload"} Experience
                        Certificate&nbsp;&nbsp;
                        <Icon>cloud_upload</Icon>
                      </MDButton>
                      <input
                        type="file"
                        ref={SportActivityRef}
                        accept="application/pdf"
                        name="sport_activity_files"
                        onChange={handleSportActivity}
                        style={{ display: "none" }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <MDButton
                        variant="text"
                        color="dark"
                        onClick={handleExtraCurricularButton}
                        sx={{ width: "90%" }}
                      >
                        {values.extra_curricular_files ? "Re-Upload" : "Upload"} Other
                        Certificate&nbsp;&nbsp;<Icon>cloud_upload</Icon>
                      </MDButton>
                      <input
                        type="file"
                        ref={ExtraCurricularRef}
                        accept="application/pdf"
                        name="extra_curricular_files"
                        onChange={handleExtraCurricular}
                        style={{ display: "none" }}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
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

export default Create;
