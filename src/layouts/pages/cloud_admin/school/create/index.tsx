import MDInput from "components/MDInput";
import { Field, useFormik } from "formik";
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
import Rbac from "layouts/pages/rbac/rbac";
import CloudAdminRbac from "../../rbac";
interface FormValues {
  school_name: string;
  subdomain: "";
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
  grading_system: string;
  school_logo: File | null; // Adjust the type according to your requirement
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
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
  const arrayOfObjects = [{ key1: "value1" }, { key2: "value2" }];

  const xytz = JSON.stringify(arrayOfObjects);
  const { setOpen, fetchData } = props;
  useEffect(() => {
    FetchModule();
  }, []);
  const [moduleData, setModuleData] = useState([]);
  const initialValues: FormValues = {
    school_name: "",
    school_code: "",
    start_time: "",
    end_time: "",
    affiliated_to: "",
    reg_num: "",
    mg_leave_calendar_start_date: "",
    address_line1: "",
    address_line2: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    mobile_number: "",
    fax_number: "000000000000",
    email_id: "",
    timezone: "IST",
    currency_type: "INR",
    grading_system: "CGPA",
    school_logo: null,
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    // Dynamically initialize check properties based on moduleData
    moduleAccess: moduleData.map((module) => ({
      module_name: module.name,
      start_date: "",
      end_date: "",
      checked: false,
    })),
    ...moduleData.reduce((acc, module) => {
      acc[module.name] = false;
      return acc;
    }, {}),
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,

      enableReinitialize: true,
      onSubmit: async (values: any, action) => {
        try {
          const models = JSON.stringify(values.moduleAccess);
          const sendData = {
            ...values,
            xytz,
            models,
          };
          const response = await axios.post("http://10.0.20.200:8000/mg_school", sendData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status == 200) {
            message.success("Created Leave Succesfully");
          }
          action.resetForm();
        } catch (error) {
          message.success("Error Occurred");
        }
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
  const FetchModule = () => {
    axios
      .get(`http://10.0.20.200:8000/mg_models`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setModuleData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox>
            <Grid container p={4}>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h4" pt={2}>
                  Create School
                </MDTypography>
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="school_name"
                  label="School Name"
                  value={values.school_name}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12} mt={2}>
                <MDTypography variant="body2"> School Logo </MDTypography>
              </Grid>
              <Grid item sm={6} xs={12} mt={2}>
                <MDInput
                  type="file"
                  accept="image/*"
                  name="school_logo"
                  onChange={handleImage}
                  sx={{ width: "84%" }}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="school_code"
                  label="School Code"
                  value={values.school_code}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="subdomain"
                  label="School Subdomain"
                  value={values.subdomain}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="mobile_number"
                  label="Mobile Number"
                  value={values.mobile_number}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="email_id"
                  label="Email Id"
                  value={values.email_id}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="fax_number"
                  label="Fax Number"
                  value={values.fax_number}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="grading_system"
                  label="Grading System"
                  value={values.grading_system}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="timezone"
                  label="Time Zone"
                  value={values.timezone}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  autoComplete="off"
                  variant="standard"
                  name="currency_type"
                  label="Currency Type"
                  value={values.currency_type}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>

              <Grid item sm={3} xs={12}>
                <MDInput
                  placeholder="eg. 9:00 AM"
                  autoComplete="off"
                  variant="standard"
                  name="start_time"
                  label="Start Time"
                  value={values.start_time}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  placeholder="eg. 5:00 PM"
                  autoComplete="off"
                  variant="standard"
                  name="end_time"
                  label="End Time"
                  value={values.end_time}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="affiliated_to"
                  label="Affiliated To"
                  value={values.affiliated_to}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="reg_num"
                  label="Registration Number"
                  value={values.reg_num}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  placeholder="eg. 2018-19"
                  autoComplete="off"
                  variant="standard"
                  name="mg_leave_calendar_start_date"
                  label="Leave Calendar Date"
                  value={values.mg_leave_calendar_start_date}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="landmark"
                  label="Landmark"
                  value={values.landmark}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="address_line1"
                  label="Address Line 1"
                  value={values.address_line1}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="address_line2"
                  label="Address Line 2"
                  value={values.address_line2}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="street"
                  label="Street"
                  value={values.street}
                  onChange={handleChange}
                  sx={{ width: "70%" }}
                  mb={10}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
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
                  sx={{ width: "70%" }}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Autocomplete
                  sx={{ width: "70%" }}
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
              <Grid item sm={3} xs={12}>
                <MDInput
                  required
                  variant="standard"
                  name="pin_code"
                  label="Pin_code"
                  value={values.pin_code}
                  onChange={handleChange}
                  mb={10}
                  sx={{ width: "70%" }}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <MDInput
                  variant="standard"
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  mb={10}
                  sx={{ width: "70%" }}
                />
              </Grid>
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MDTypography variant="h4" pt={2}>
                  Give Permission
                </MDTypography>
              </Grid>
              {/* {moduleData.map((module, index) => (
              <Grid item sm={12} xs={12} container>
                <Grid key={index} item xs={12} pt={2} sm={3}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name={`radio-buttons-group-${module && module.name}`} // Using module.name as the name
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values && values[module && module.name]} // Assuming values is an object with keys corresponding to module names
                            name={module && module.name}
                            onChange={handleChange}
                          />
                        }
                        label={
                          <MDTypography variant="button">{module && module.name}</MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid>
                  {" "}
                  <MDInput
                    required
                    variant="standard"
                    name="start_date"
                    label="Start Date"
                    value={values.start_date}
                    onChange={handleChange}
                    mb={10}
                    sx={{ width: "70%" }}
                  />
                </Grid>
                <Grid>
                  {" "}
                  <MDInput
                    required
                    variant="standard"
                    name="end_date"
                    label="End Date"
                    value={values.end_date}
                    onChange={handleChange}
                    mb={10}
                    sx={{ width: "70%" }}
                  />
                </Grid>
              </Grid>
            ))} */}
              {/* {moduleData.map((module, index) => (
                <Grid key={index} item sm={12} xs={12} container>
                  <Grid item xs={12} sm={3}>
                    <FormControl>
                      <Checkbox
                        checked={values.moduleAccess.some(
                          (access: { module_name: any }) => access.module_name === module.name
                        )} // Check if module is in moduleAccess array
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          if (isChecked) {
                            // Add module access object if checked
                            setFieldValue("moduleAccess", [
                              ...values.moduleAccess,
                              { module_name: module.name, start_date: "", end_date: "" },
                            ]);
                          } else {
                            // Remove module access object if unchecked
                            setFieldValue(
                              "moduleAccess",
                              values.moduleAccess.filter(
                                (access: { module_name: any }) => access.module_name !== module.name
                              )
                            );
                          }
                        }}
                      />
                      <label>{module.name}</label>
                    </FormControl>
                  </Grid>
                  {values.moduleAccess.some(
                    (access: { module_name: any }) => access.module_name === module.name
                  ) && ( // Only render start and end date fields if the module is checked
                    <>
                      <Grid>
                        <MDInput
                          type="date" inputMode="none"
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="standard"
                          name={`moduleAccess[${index}].start_date`}
                          label="Start Date"
                          value={
                            values.moduleAccess.find(
                              (access: { module_name: any }) => access.module_name === module.name
                            )?.start_date || ""
                          }
                          onChange={(event: { target: { value: any } }) => {
                            const { value } = event.target;
                            setFieldValue(`moduleAccess[${index}].start_date`, value);
                          }}
                          mb={10}
                          sx={{ width: "70%" }}
                        />
                      </Grid>
                      <Grid>
                        <MDInput
                          required
                          type="date" inputMode="none"
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                          name={`moduleAccess[${index}].end_date`}
                          label="End Date"
                          value={
                            values.moduleAccess.find(
                              (access: { module_name: any }) => access.module_name === module.name
                            )?.end_date || ""
                          }
                          onChange={(event: { target: { value: any } }) => {
                            const { value } = event.target;
                            setFieldValue(`moduleAccess[${index}].end_date`, value);
                          }}
                          mb={10}
                          sx={{ width: "70%" }}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              ))} */}
              <Grid
                sm={3}
                xs={12}
                sx={{ display: "flex", spacing: 3 }}
                py={2}
                justifyContent={"flex-center"}
              >
                <MDButton color="info" type="submit">
                  Submit&nbsp;-&gt;
                </MDButton>
              </Grid>
            </Grid>
            <CloudAdminRbac school_code={values.subdomain} school_name={values.school_name} />
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default Create;
