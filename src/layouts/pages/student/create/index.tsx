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
import { useState } from "react";

const Create = (props: any) => {
  const { setShowpage } = props;
  const [studentname, setStudentname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setdob] = useState("");

  return (
    <Card>
      <Student
        setFirsName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setdob={setdob}
      />
      <Guardian
        student_first_name={firstName}
        student_middle_name={middleName}
        student_last_name={lastName}
        student_dob={dob}
      />
      <Activity
        student_guardian={studentname}
        student_first_name={firstName}
        student_middle_name={middleName}
        student_last_name={lastName}
        student_dob={dob}
      />
      <MDBox py={4}>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }} pr={8} pb={2}>
          <MDButton
            color="error"
            variant="text"
            onClick={() => setShowpage(false)}
            style={{ fontSize: "16px" }}
          >
            &lt;- back
          </MDButton>
          <MDButton
            color="info"
            variant="contained"
            onClick={() => {
              setShowpage(false);
              window.location.reload();
            }}
          >
            finish &nbsp; <AssignmentTurnedInIcon />
          </MDButton>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default Create;
