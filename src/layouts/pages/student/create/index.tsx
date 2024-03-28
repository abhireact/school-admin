import { Card, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Guardian from "layouts/pages/student/guardian/create";
import Activity from "layouts/pages/student/activities/create";
import Student from "layouts/pages/student/studentdetails/create";
import MDButton from "components/MDButton";
import { useState } from "react";

const Create = (props: any) => {
  const { setShowpage } = props;
  const [studentname, setStudentname] = useState("");

  return (
    <Card>
      <Student setStudentname={setStudentname} />
      <Guardian student_guardian={studentname} />
      <Activity student_guardian={studentname} />
    </Card>
  );
};

export default Create;
