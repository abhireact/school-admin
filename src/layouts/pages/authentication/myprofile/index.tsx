import axios from "axios";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDAvatar from "components/MDAvatar";
import Cookies from "js-cookie";

const MYProfile = () => {
  const token = Cookies.get("token");
  const [schoolName, setSchoolName] = useState("");
  const [data, setData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });
  const fetchTasks = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchoolName(response.data[0].school_name);
      })
      .catch((error) => console.log(error));
  };
  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item container sm={12} marginBottom={2}>
              <Grid item sm={1}>
                <MDAvatar size="lg" bgColor="dark" />
              </Grid>

              <Grid item sm={6}>
                <Grid item sm={5}>
                  <MDTypography variant="subtitle1">{data.user_name}</MDTypography>
                </Grid>
                <Grid item sm={5}>
                  <MDTypography variant="subtitle2">{data.email}</MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="body2">Name</MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="body2">Email</MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="h4" fontWeight="regular" marginBottom={0.5}>
                {data?.first_name.toUpperCase()} {data.middle_name?.toUpperCase()}{" "}
                {data.last_name?.toUpperCase()}
              </MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="h4" fontWeight="regular" marginBottom={0.5}>
                {data?.email}
              </MDTypography>
            </Grid>

            <Grid item sm={5}>
              <MDTypography variant="body2">Role</MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="body2">School Name</MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="h4" fontWeight="regular" marginBottom={0.5}></MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="h4" fontWeight="regular" marginBottom={0.5}>
                {schoolName}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default MYProfile;
