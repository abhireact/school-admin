import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MDDropzone from "components/MDDropzone";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, RadioGroup, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { message } from "antd";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  school_name: Yup.string().required("Required *"),
  school_code: Yup.string().required("Required *"),
  address_line1: Yup.string().required("Required *"),
  start_time: Yup.string().required("Required *"),
  end_time: Yup.string().required("Required *"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  email_id: Yup.string().email("Incorrect Format *").required("Required *"),
  city: Yup.string().required("Required *"),
  state: Yup.string().required("Required *"),
  pin_code: Yup.string()
    .matches(/^[0-9]{6}$/, "Incorrect Format *")
    .required("Required *"),
  affilicated_to: Yup.string().required("Required *"),
  fax_number: Yup.string().matches(/^\d+$/, "Incorrect Format *"),
  reg_num: Yup.string().required("Required *"),
  mg_leave_calendar_start_date: Yup.date().test("year-range", "Incorrect format", function (value) {
    if (value) {
      const year = value.getFullYear();
      return year >= 2000 && year <= 3000;
    }
    return true;
  }),
});
interface FormValues {
  school_name: string;
  school_code: string;
  start_time: string;
  end_time: string;
  affilicated_to: string;
  reg_num: string;
  mg_leave_calendar_start_date: any;
  address_line1: string;
  address_line2: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
  mobile_number: string;
  fax_number: string;
  email_id: string;
  timezone: string;
  currency_type: string;

  school_logo: File | null; // Adjust the type according to your requirement
}
const twentyfour = [
  "1:00am",
  "1:30am",
  "2:00am",
  "2:30am",
  "3:00am",
  "3:30am",
  "4:00am",
  "4:30am",
  "5:00am",
  "5:30am",
  "6:00am",
  "6:30am",
  "7:00am",
  "7:30am",
  "8:00am",
  "8:30am",
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
  "5:30pm",
  "6:00pm",
  "6:30pm",
  "7:00pm",
  "7:30pm",
  "8:00pm",
  "8:30pm",
  "9:00pm",
  "9:30pm",
  "10:00pm",
  "10:30pm",
  "11:00pm",
  "11:30pm",
  "12:00am",
  "12:30am",
];
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",

  "Delhi (National Capital Territory of Delhi)",
  "Puducherry",
  "Ladakh",
  "Lakshadweep",
];
const currencytypes = ["$", "₹"];

const Update = (props: any) => {
  const { schoolData, handleClose, fetchData } = props;
  const initialValues: FormValues = {
    school_name: schoolData.school_name || "",
    school_code: schoolData.school_code || "",
    start_time: schoolData.start_time || "",
    end_time: schoolData.end_time || "",
    // affilicated_to: schoolData.affilicated_to || "",
    reg_num: schoolData.reg_num || "",
    mg_leave_calendar_start_date: schoolData.mg_leave_calendar_start_date || Date(),
    address_line1: schoolData.address_line1 || "",
    address_line2: schoolData.address_line2 || "",
    street: schoolData.street || "",
    landmark: schoolData.landmark || "",
    city: schoolData.city || "",
    state: schoolData.state || "",
    pin_code: schoolData.pin_code || "",
    country: schoolData.country || "",
    mobile_number: schoolData.mobile_number || "",
    fax_number: schoolData.fax_number || "000000000000",
    email_id: schoolData.email_id || "",
    timezone: schoolData.timezone || "IST",
    currency_type: schoolData.currency_type || "INR",

    school_logo: null,
    affilicated_to: schoolData.affilicated_to || "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,

      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values: any, action) => {
        const sendData = {
          ...values,
        };
        await axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_school`, sendData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            handleClose();
            fetchData();
            message.success("School Updated Succesfully");
            action.resetForm();
          })
          .catch((error: any) => {
            console.log(error, "school error");
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
        setFieldValue("school_logo", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <MDTypography color="secondary" fontWeight="bold" variant="h4">
                Update School Info
              </MDTypography>
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="school_name"
                label="School Name"
                value={values.school_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.school_name && Boolean(errors.school_name)}
                helperText={touched.school_name && errors.school_name}
                success={values.school_name.length && !errors.school_name}
                sx={{ width: "95%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} mt={2} xs={12}>
              <MDTypography color="secondary" fontWeight="bold" variant="body2">
                Upload School School Logo
              </MDTypography>
            </Grid>
            <Grid item sm={4} mt={2} xs={12}>
              <MDInput
                type="file"
                accept="image/*"
                name="school_logo"
                onChange={handleImage}
                variant="standard"
                sx={{ width: "90%" }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="school_code"
                label="School Code"
                value={values.school_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.school_code && Boolean(errors.school_code)}
                helperText={touched.school_code && errors.school_code}
                success={values.school_code.length && !errors.school_code}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="mobile_number"
                label="Mobile Number"
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile_number && Boolean(errors.mobile_number)}
                helperText={touched.mobile_number && errors.mobile_number}
                success={values.mobile_number.length && !errors.mobile_number}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="email_id"
                label="Email Id"
                value={values.email_id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email_id && Boolean(errors.email_id)}
                helperText={touched.email_id && errors.email_id}
                success={values.email_id.length && !errors.school_code}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="fax_number"
                label="Fax Number"
                value={values.fax_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fax_number && Boolean(errors.fax_number)}
                helperText={touched.fax_number && errors.fax_number}
                success={values.fax_number.length && !errors.fax_number}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="timezone"
                label="Time Zone"
                value={values.timezone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.timezone && Boolean(errors.timezone)}
                helperText={touched.timezone && errors.timezone}
                success={values.timezone.length && !errors.timezone}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Autocomplete
                disableClearable
                sx={{ width: "90%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "currency_type", value },
                  });
                }}
                value={values.currency_type}
                options={currencytypes}
                renderInput={(params: any) => (
                  <FormField
                    label="Currency Type"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="currency_type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currency_type}
                    error={touched.currency_type && Boolean(errors.currency_type)}
                    helperText={touched.currency_type && errors.currency_type}
                    success={values.currency_type.length && !errors.currency_type}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="affilicated_to"
                label="Affiliated To"
                value={values.affilicated_to}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.affilicated_to && Boolean(errors.affilicated_to)}
                helperText={touched.affilicated_to && errors.affilicated_to}
                success={values.affilicated_to.length && !errors.affilicated_to}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="reg_num"
                label="Registration Number"
                value={values.reg_num}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reg_num && Boolean(errors.reg_num)}
                helperText={touched.reg_num && errors.reg_num}
                success={values.reg_num.length && !errors.reg_num}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Autocomplete
                sx={{ width: "90%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "start_time", value },
                  });
                }}
                value={values.start_time}
                options={twentyfour}
                disableClearable
                renderInput={(params: any) => (
                  <FormField
                    label="Start Time"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="start_time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start_time}
                    error={touched.start_time && Boolean(errors.start_time)}
                    helperText={touched.start_time && errors.start_time}
                    success={values.start_time.length && !errors.start_time}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Autocomplete
                sx={{ width: "90%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "end_time", value },
                  });
                }}
                value={values.end_time}
                options={twentyfour}
                disableClearable
                renderInput={(params: any) => (
                  <FormField
                    label="End Time"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="end_time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end_time}
                    error={touched.end_time && Boolean(errors.end_time)}
                    helperText={touched.end_time && errors.end_time}
                    success={values.end_time.length && !errors.end_time}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                name="mg_leave_calendar_start_date"
                label="Leave Calendar Date"
                value={values.mg_leave_calendar_start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.mg_leave_calendar_start_date &&
                  Boolean(errors.mg_leave_calendar_start_date)
                }
                helperText={
                  touched.mg_leave_calendar_start_date && errors.mg_leave_calendar_start_date
                }
                success={
                  values.mg_leave_calendar_start_date.length && !errors.mg_leave_calendar_start_date
                }
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="landmark"
                label="Landmark"
                value={values.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.landmark && Boolean(errors.landmark)}
                helperText={touched.landmark && errors.landmark}
                success={values.landmark.length && !errors.landmark}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="address_line1"
                label="Address Line 1"
                value={values.address_line1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address_line1 && Boolean(errors.address_line1)}
                helperText={touched.address_line1 && errors.address_line1}
                success={values.address_line1.length && !errors.address_line1}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="address_line2"
                label="Address Line 2"
                value={values.address_line2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address_line2 && Boolean(errors.address_line2)}
                helperText={touched.address_line2 && errors.address_line2}
                success={values.address_line2.length && !errors.address_line2}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="street"
                label="Street"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.street && Boolean(errors.street)}
                helperText={touched.street && errors.street}
                success={values.street.length && !errors.street}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                success={values.city.length && !errors.city}
                mb={10}
                mt={10}
                sx={{ width: "90%" }}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Autocomplete
                sx={{ width: "90%" }}
                disableClearable
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "state", value },
                  });
                }}
                value={values.state}
                options={states}
                renderInput={(params: any) => (
                  <FormField
                    label="State"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                    success={values.state.length && !errors.state}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                variant="standard"
                name="pin_code"
                label="Pin Code"
                value={values.pin_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pin_code && Boolean(errors.pin_code)}
                helperText={touched.pin_code && errors.pin_code}
                success={values.pin_code.length && !errors.pin_code}
                mb={10}
                sx={{ width: "90%" }}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MDInput
                variant="standard"
                name="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
                success={values.country.length && !errors.country}
                mb={10}
                sx={{ width: "90%" }}
              />
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
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
              <Grid item mt={2} ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Update;
