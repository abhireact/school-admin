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
import DataTable from "examples/Tables/DataTable";
const token = Cookies.get("token");

const Certificates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user_name } = location.state || {};
  const [studentInfo, setStudentInfo] = useState<any>({});
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
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
  const fetchStudentInfoTable = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/certificates`,
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
        setTableData({
          columns: [
            { Header: "Certificate", accessor: "certificate" },
            { Header: "Date of Issue", accessor: "date_of_issue" },
            { Header: "NO OF TIMES ISSUED", accessor: "no_of_isue" },
          ],
          rows: response.data.map((item: any, index: number) => ({
            certificate: item.certificate,
            date_of_issue: item.date_of_issue,
            no_of_isue: item.no_of_isue,
          })),
        });
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchStudentInfoTable();
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

  const handleBonafideCertificate = (item: any) => {
    // const main_data = data[index];
    navigate("/pages/student_details/student/certificates/bonafide_certificates", {
      state: {
        studentInfo,
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
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton
                variant="contained"
                color="dark"
                onClick={() => navigate("/student/student_details")}
              >
                Back
              </MDButton>
            </Grid>
          </Grid>
          <MDBox p={3}>
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
                  User ID:&nbsp;
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
            <Grid item xs={12} sm={12}>
              {tabledata.rows.length > 0 ? (
                <MDBox pt={3}>
                  <DataTable
                    table={tabledata}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                  />
                </MDBox>
              ) : (
                ""
              )}
            </Grid>
          </MDBox>
          <Grid container py={2}>
            <Grid item sm={4}>
              <MDButton color="info" variant="outlined" onClick={handleBonafideCertificate}>
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
