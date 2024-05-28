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
import Update from "./update";

const token = Cookies.get("token");

function SchoolShowPage() {
  const [schoolData, setSchoolData] = useState({
    school_name: "",
    school_code: "",
    start_time: "",
    end_time: "",
    affilicated_to: "",
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

    school_logo: null,
  });
  const fetchSchoolInfo = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchoolData(response.data);
        console.log(response.data, "school information");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  if (!schoolData) return <>loading...</>;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container>
        <Grid container item sm={6} my={2} spacing={1}>
          <Grid item>
            <MDTypography variant="body1" color="secondary" fontWeight="bold">
              Edit
            </MDTypography>
          </Grid>
          <Grid item>
            <MDAvatar bgColor="secondary" size="sm" onClick={() => handleOpen()} variant="square">
              <ModeEditOutlineIcon />
            </MDAvatar>
          </Grid>
        </Grid>

        <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MDAvatar alt="School Logo" size="xxl" src={schoolData?.school_logo} />
        </Grid>
      </Grid>

      <MDBox pt={2}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={12} py={2}>
                <MDTypography variant="h4" color="info" fontWeight="bold">
                  School Details
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography
                  variant="button"
                  color="secondary"
                  fontWeight="bold"
                  component="div"
                  gutterBottom
                >
                  School Name
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  School Code
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Start Time
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.school_name?.toUpperCase()}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.school_code}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.start_time}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  End Time
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Affiliated To
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Affiliation No/Reg No
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.end_time}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.affilicated_to}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.reg_num}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Leave Calendar Start Date
                </MDTypography>
              </Grid>{" "}
              <Grid item sm={4}></Grid>
              <Grid item sm={4}></Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.mg_leave_calendar_start_date}
                </MDTypography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MDBox>

      <MDBox pt={2}>
        {" "}
        <Card>
          <CardContent>
            <Grid container>
              {" "}
              <Grid item sm={12} py={2}>
                <MDTypography variant="h4" color="info" fontWeight="bold">
                  Address Details
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Address Line 1
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Address Line 2
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Street
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.address_line1}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.address_line2}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.street}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  City
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  State
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Pincode
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.city}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.state}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.pin_code}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Landmark
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Country
                </MDTypography>
              </Grid>
              <Grid item sm={4}></Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.landmark}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.country}
                </MDTypography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MDBox>
      <MDBox pt={2}>
        {" "}
        <Card>
          <CardContent>
            <Grid container>
              {" "}
              <Grid item sm={12} py={2}>
                <MDTypography variant="h4" color="info" fontWeight="bold">
                  Contact Details
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Phone Number
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Email
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="button" color="secondary" fontWeight="bold" component="div">
                  Fax Number
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.mobile_number}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.email_id}
                </MDTypography>
              </Grid>
              <Grid item sm={4}>
                <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                  {schoolData?.fax_number}
                </MDTypography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MDBox>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Update schoolData={schoolData} handleClose={handleClose} fetchData={fetchSchoolInfo} />
      </Dialog>
    </DashboardLayout>
  );
}

export default SchoolShowPage;
