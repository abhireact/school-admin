import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import { Grid, Avatar, Dialog } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Icon from "@mui/material/Icon";
import { message } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

const token = Cookies.get("token");

function SchoolShowPage() {
  const [schoolData, setSchoolData] = useState({
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
    logo: null,
  });
  const fetchSchoolInfo = () => {
    axios
      .get("http://10.0.20.121:8000/mg_school", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchoolData(response.data[0]);
        console.log(response.data[0], "school information");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  if (!schoolData) return <>loading...</>;

  const initialValues = {
    school_name: schoolData.school_name || "",
    school_code: schoolData.school_code || "",
    start_time: schoolData.start_time || "",
    end_time: schoolData.end_time || "",
    affiliated_to: schoolData.affiliated_to || "",
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
    grading_system: schoolData.grading_system || "CGPA",
    logo: "",
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,

      enableReinitialize: true,
      onSubmit: async (values: any, action) => {
        try {
          const sendData = {
            ...values,
          };
          const response = await axios.put("http://10.0.20.121:8000/mg_school", sendData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status == 200) {
            message.success("Updated Succesfully");
            handleClose();
            fetchSchoolInfo();
          }
          action.resetForm();
        } catch (error) {
          message.error("Error Occurred");
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
        setFieldValue("logo", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* Image Section */}
            <Grid item xs={12} sm={4}>
              <MDAvatar
                alt="School Logo"
                src={schoolData.logo}
                sx={{ width: "65%", height: "auto", borderRadius: "50%" }}
              />
            </Grid>

            {/* School Information Section */}
            <Grid item xs={12} sm={6} mt={2}>
              <MDTypography variant="h5" component="div" gutterBottom>
                {schoolData.school_name.toUpperCase()}
              </MDTypography>

              <MDTypography
                variant="button"
                fontWeight="bold"
                color="secondary"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <PhoneIcon sx={{ marginRight: 1 }} />
                {schoolData.mobile_number}
              </MDTypography>

              <MDTypography
                variant="button"
                fontWeight="bold"
                color="secondary"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <EmailIcon sx={{ marginRight: 1 }} />
                {schoolData.email_id}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color="secondary"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <b>Reg. No.:</b> &nbsp;
                {schoolData.reg_num}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color="secondary"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <ApartmentIcon sx={{ marginRight: 1 }} />
                {schoolData.address_line1},{schoolData.address_line2}
              </MDTypography>

              <MDTypography
                variant="button"
                fontWeight="bold"
                color="secondary"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                &nbsp;
                {schoolData.pin_code},{schoolData.city},{schoolData.state}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={2} mt={2}>
              <MDAvatar bgColor="dark" size="sm" onClick={() => handleOpen()}>
                <ModeEditOutlineIcon />
              </MDAvatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <Card>
          {" "}
          <form onSubmit={handleSubmit}>
            <Card>
              <MDBox>
                <Grid container p={4}>
                  <Grid item sm={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <MDTypography variant="h5" fontWeight="bold" color="secondary" pt={2}>
                      Update School Info
                    </MDTypography>
                  </Grid>

                  <Grid item sm={6} xs={12} mt={2}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {" "}
                      School Logo .:
                    </MDTypography>
                  </Grid>
                  <Grid item sm={6} xs={12} mt={2}>
                    <MDInput
                      type="file"
                      accept="image/*"
                      name="logo"
                      onChange={handleImage}
                      sx={{ width: "80%" }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12} mt={2}>
                    <MDInput
                      required
                      autoComplete="off"
                      variant="standard"
                      name="mobile_number"
                      label="Mobile Number"
                      value={values.mobile_number}
                      onChange={handleChange}
                      sx={{ width: "80%" }}
                      mb={10}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} mt={2}>
                    <MDInput
                      required
                      autoComplete="off"
                      variant="standard"
                      name="email_id"
                      label="Email Id"
                      value={values.email_id}
                      onChange={handleChange}
                      sx={{ width: "80%" }}
                      mb={10}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12} mt={2}>
                    <MDInput
                      placeholder="eg. 9:00 AM"
                      type="time"
                      autoComplete="off"
                      variant="standard"
                      name="start_time"
                      label="Start Time"
                      value={values.start_time}
                      onChange={handleChange}
                      sx={{ width: "80%" }}
                      mb={10}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} mt={2}>
                    <MDInput
                      placeholder="eg. 5:00 PM"
                      type="time"
                      autoComplete="off"
                      variant="standard"
                      name="end_time"
                      label="End Time"
                      value={values.end_time}
                      onChange={handleChange}
                      sx={{ width: "80%" }}
                      mb={10}
                    />
                  </Grid>

                  <Grid
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", spacing: 3 }}
                    pr={5}
                    pt={4}
                    justifyContent={"flex-end"}
                  >
                    <MDButton color="info" variant="outlined" type="submit">
                      UPDATE
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </form>
        </Card>
      </Dialog>
    </DashboardLayout>
  );
}

export default SchoolShowPage;
