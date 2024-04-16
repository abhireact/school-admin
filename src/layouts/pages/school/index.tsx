import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import { Grid, Avatar } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Icon from "@mui/material/Icon";

const token = Cookies.get("token");

function SchoolShowPage() {
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
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
  }, []);

  if (!schoolData) return <>loading...</>;

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
                variant="body2"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <PhoneIcon sx={{ marginRight: 1 }} />
                {schoolData.mobile_number}
              </MDTypography>

              <MDTypography
                variant="body2"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <EmailIcon sx={{ marginRight: 1 }} />
                {schoolData.email_id}
              </MDTypography>
              <MDTypography
                variant="body2"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <b>Reg. No.:</b> &nbsp;
                {schoolData.reg_num}
              </MDTypography>
              <MDTypography
                variant="body2"
                component="div"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <ApartmentIcon sx={{ marginRight: 1 }} />
                {schoolData.address_line1},{schoolData.address_line2}
              </MDTypography>

              <MDTypography
                variant="body2"
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
              <MDAvatar bgColor="dark" size="sm">
                <ModeEditOutlineIcon />
              </MDAvatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default SchoolShowPage;
