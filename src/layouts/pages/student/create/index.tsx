import { Card, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Student from "layouts/pages/student/studentdetails/create";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Sidenav from "../sidenav";
import { useFormik } from "formik";
import { useState } from "react";

const Create = (props: any) => {
  const { setShowpage } = props;

  return (
    <MDBox mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Sidenav />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Student setShowpage={setShowpage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Create;
