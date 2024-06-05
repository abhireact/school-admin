import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

const SectionSubject = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container spacing={3} p={3} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Subject
            </MDTypography>
          </Grid>
          <Grid item>
            <MDButton variant="outlined" color="info">
              + New Subject
            </MDButton>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default SectionSubject;
