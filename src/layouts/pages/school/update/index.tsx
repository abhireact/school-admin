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

const Create = (props: any) => {
  const { schoolData, handleClose, fetchData } = props;
  const initialValues: FormValues = {
    school_name: schoolData.school_name || "",
    school_code: schoolData.school_code || "",
    start_time: schoolData.start_time || "",
    end_time: schoolData.end_time || "",
    // affilicated_to: schoolData.affilicated_to || "",
    reg_num: schoolData.reg_num || "",
    mg_leave_calendar_start_date: schoolData.mg_leave_calendar_start_date || "",
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
              <MDTypography color="info" variant="h5" py={2}>
                Update School Info
              </MDTypography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="school_name"
                label="School Name"
                value={values.school_name}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12} mt={2}>
              <MDTypography variant="body2">Upload School Logo</MDTypography>
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
                name="mobile_number"
                label="Mobile Number"
                value={values.mobile_number}
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
              <MDInput
                required
                autoComplete="off"
                variant="standard"
                name="currency_type"
                label="Currency Type"
                value={values.currency_type}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <MDInput
                placeholder="eg. 9:00 AM"
                autoComplete="off"
                variant="standard"
                name="start_time"
                label="Start Time"
                value={values.start_time}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MDInput
                placeholder="eg. 5:00 PM"
                autoComplete="off"
                variant="standard"
                name="end_time"
                label="End Time"
                value={values.end_time}
                onChange={handleChange}
                sx={{ width: "90%" }}
                mb={10}
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
                    label="States"
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
              ml={2}
              sm={12}
              xs={12}
              sx={{ display: "flex", spacing: 3 }}
              py={2}
              justifyContent={"flex-center"}
            >
              <MDButton color="info" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;