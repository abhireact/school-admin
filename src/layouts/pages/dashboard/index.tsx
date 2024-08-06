import { Card, Divider, Grid } from "@mui/material";
import {
  fetchWings,
  fetchRbac,
  fetchStudentCategory,
  fetchAcademicYear,
  fetchClasses,
  fetchAccount,
  fetchStudent,
  fetchProfile,
} from "../redux/dataSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Myrbacroutes from "myrbacroutes";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

const MyDashboard = () => {
  const data = useSelector((state: any) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWings() as any);
    dispatch(fetchRbac() as any);
    dispatch(fetchStudentCategory() as any);
    dispatch(fetchClasses() as any);
    dispatch(fetchAcademicYear() as any);
    dispatch(fetchAccount() as any);
    dispatch(fetchStudent() as any);
    dispatch(fetchProfile() as any);
  }, [dispatch]);
  const renderedComponent = <Myrbacroutes />;
  // console.log("Rendered component data:", renderedComponent);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />

        <Card>
          <Grid p={3} container>
            <Grid>
              <MDTypography variant="h4">Dashboard</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  <MDTypography>Work Location</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  <MDTypography
                    component={Link}
                    to="/pages/reports/distributionreport"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {/* <PieChart
                  series={[
                    {
                      // data: locationData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                /> */}
              </Grid>
            </MDBox>
          </Grid>
        </Card>
      </DashboardLayout>
    </>
  );
};

export default MyDashboard;
