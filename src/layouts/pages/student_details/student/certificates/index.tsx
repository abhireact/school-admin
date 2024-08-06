import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
const token = Cookies.get("token");

const Certificates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user_name } = location.state || {};
  const [studentInfo, setStudentInfo] = useState<any>({});
  const fetchStudentInfo = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/retrive`,
        {
          user_name: user_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStudentInfo(response.data);
        console.log("student info data", response.data);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const handleCharacterCertificate = () => {
    // const main_data = data[index];
    navigate("/pages/student_details/student/certificates/Character_Certificate", {
      state: {
        studentInfo,
      },
    });
  };
  const handleTransferCertificate = () => {
    // const main_data = data[index];
    navigate("/pages/student_details/student/tc_create", {
      state: {
        studentInfo,
        user_name,
      },
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "end" }}>
              <MDButton color="dark" type="submit" onClick={() => navigate(-1)}>
                back
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Student Certificates
              </MDTypography>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            {tabledata.rows.length > 0 ? (
              <MDBox pt={3}>
                <DataTable
                  table={tabledata}
                  // isSorted={false}
                  // entriesPerPage={false}
                  // showTotalEntries={false}
                />
              </MDBox>
            ) : (
              <MDTypography>No data Avialble</MDTypography>
            )}
          </Grid> */}
          <MDBox p={4}>
            <Grid container>
              <Grid item sm={12}>
                <MDTypography variant="button" fontWeight="bold" color="body3">
                  Name:&nbsp;
                </MDTypography>
                <MDTypography variant="button" color="body3">
                  {studentInfo.first_name} {studentInfo.middle_name} {studentInfo.last_name}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <MDTypography variant="button" fontWeight="bold" color="body3">
                  UserID:&nbsp;
                </MDTypography>
                <MDTypography variant="button" color="body3">
                  {user_name}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <MDTypography variant="button" fontWeight="bold" color="body3">
                  Class and Section:&nbsp;
                </MDTypography>
                <MDTypography variant="button" color="body3">
                  {studentInfo.class_name}-{studentInfo.section_name}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <MDTypography variant="button" fontWeight="bold" color="body3">
                  Admission Number:&nbsp;
                </MDTypography>
                <MDTypography variant="button" color="body3">
                  {studentInfo.admission_number}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <Grid container py={2}>
            <Grid item sm={4}>
              <MDButton color="info" variant="outlined">
                Generate Bonafide Certificate
              </MDButton>
            </Grid>
            <Grid item sm={4}>
              <MDButton color="info" variant="outlined" onClick={handleCharacterCertificate}>
                Generate Character Certificate
              </MDButton>
            </Grid>
            <Grid item sm={4}>
              <MDButton color="info" variant="outlined" onClick={handleTransferCertificate}>
                Generate Transfer Certificate
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default Certificates;
