import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MDAvatar from "components/MDAvatar";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
const token = Cookies.get("token");

function SchoolShowPage() {
  const [schoolData, setSchoolData] = useState(null);
  useEffect(() => {
    axios
      .get("http://10.0.20.128:8000/mg_school", {
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

  // Replace with your actual data fetching logic (e.g., API call)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Grid item>
            {schoolData.logo && (
              <MDAvatar alt={schoolData.school_name} src="" size="lg" bgColor="dark" />
            )}
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {schoolData.school_name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              School Code: {schoolData.school_code}Avatar Avatar
            </Typography>
          </Grid>

          <Grid item>
            <PhoneIcon />
            <Typography variant="body2" display="inline" component="span">
              {schoolData.mobile_number}
            </Typography>
          </Grid>
          <Grid item>
            <EmailIcon />
            <Typography variant="body2" display="inline" component="span">
              {schoolData.email_id}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
}

export default SchoolShowPage;
