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
interface FormValues {
  school_name: string;
  school_code: string;
  start_time: string;
  end_time: string;
  affiliated_to: string;
  reg_num: string;
  mg_leave_calendar_start_date: string;
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

  logo: File | null; // Adjust the type according to your requirement
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
  const { editData, handleClose, fetchData } = props;
  console.log(props, "props Data ");

  const initialValues: FormValues = {
    school_name: editData.school_name || "",
    school_code: editData.school_code || "",
    start_time: editData.start_time || "",
    end_time: editData.end_time || "",
    // affilicated_to: editData.affilicated_to || "",
    reg_num: editData.reg_num || "",
    mg_leave_calendar_start_date: editData.mg_leave_calendar_start_date || "",
    address_line1: editData.address_line1 || "",
    address_line2: editData.address_line2 || "",
    street: editData.street || "",
    landmark: editData.landmark || "",
    city: editData.city || "",
    state: editData.state || "",
    pin_code: editData.pin_code || "",
    country: editData.country || "",
    mobile_number: editData.mobile_number || "",
    fax_number: editData.fax_number || "000000000000",
    email_id: editData.email_id || "",
    timezone: editData.timezone || "IST",
    currency_type: editData.currency_type || "INR",

    logo: null,
    affiliated_to: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,

      enableReinitialize: true,
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
        setFieldValue("logo", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox>
          <Grid container p={4} spacing={2}>
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <MDTypography color="secondary" fontWeight="bold" variant="h4" py={2}>
                Update School Info
              </MDTypography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="school_name"
                label="School Name"
                value={values.school_name}
                onChange={handleChange}
                sx={{ width: "95%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12} mt={2}>
              <MDTypography color="secondary" fontWeight="bold" variant="body2">
                Upload School Logo
              </MDTypography>
            </Grid>
            <Grid item sm={6} xs={12} mt={2}>
              <MDInput
                type="file"
                accept="image/*"
                name="logo"
                onChange={handleImage}
                variant="standard"
                sx={{ width: "90%" }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="school_code"
                label="School Code"
                value={values.school_code}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="school_code"
                label="School Code"
                value={values.school_code}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>{" "}
            <MDInput
              required
              autoComplete="off"
              variant="standard"
              name="mobile_number"
              label="Mobile Number"
              value={values.mobile_number}
              onChange={handleChange}
              sx={{ width: "90%" }}
              mb={10}
            />
            <Grid item sm={6} xs={12}></Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="email_id"
                label="Email Id"
                value={values.email_id}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="fax_number"
                label="Fax Number"
                value={values.fax_number}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="timezone"
                label="Time Zone"
                value={values.timezone}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Autocomplete
                sx={{ width: "90%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "currency_type", value },
                  });
                }}
                value={values.state}
                options={currencytypes}
                renderInput={(params: any) => (
                  <FormField
                    label="Currency Type"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="currency_type"
                    onChange={handleChange}
                    value={values.currency_type}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="affilicated_to"
                label="Affiliated To"
                value={values.affiliated_to}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="reg_num"
                label="Registration Number"
                value={values.reg_num}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
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
                    value={values.start_time}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
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
                    value={values.end_time}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                placeholder="eg. 2018-19"
                autoComplete="off"
                variant="standard"
                name="mg_leave_calendar_start_date"
                label="Leave Calendar Date"
                value={values.mg_leave_calendar_start_date}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="landmark"
                label="Landmark"
                value={values.landmark}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="address_line1"
                label="Address Line 1"
                value={values.address_line1}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="address_line2"
                label="Address Line 2"
                value={values.address_line2}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                autoComplete="off"
                variant="standard"
                name="street"
                label="Street"
                value={values.street}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                mb={10}
                mt={10}
                sx={{ width: "90%" }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Autocomplete
                sx={{ width: "90%" }}
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
                    value={values.state}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                required
                variant="standard"
                name="pin_code"
                label="Pin_code"
                value={values.pin_code}
                onChange={handleChange}
                mb={10}
                sx={{ width: "90%" }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                variant="standard"
                name="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
                mb={10}
                sx={{ width: "90%" }}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
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
