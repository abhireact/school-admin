import { Card, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Guardian from "layouts/pages/student/guardian/create";
import Activity from "layouts/pages/student/activities/create";
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
            {/* <Grid item xs={12} sm={12}>
              <Guardian
                student_first_name={firstName}
                student_middle_name={middleName}
                student_last_name={lastName}
                student_dob={dob}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12}>
              <Activity
                student_guardian={studentname}
                student_first_name={firstName}
                student_middle_name={middleName}
                student_last_name={lastName}
                student_dob={dob}
              />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      <MDBox mt={4}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
          pr={8}
          pb={2}
          mt={-2}
        >
          <MDButton
            color="error"
            variant="text"
            onClick={() => setShowpage(false)}
            style={{ fontSize: "16px" }}
          >
            &lt;- back
          </MDButton>
          {/* <MDButton color="info" variant="contained">
            finish &nbsp; <AssignmentTurnedInIcon />
          </MDButton> */}
        </Grid>
      </MDBox>
    </MDBox>
  );
};

export default Create;
