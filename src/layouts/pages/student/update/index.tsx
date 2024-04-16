import { Card, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Guardian from "layouts/pages/student/guardian/update";
import Activity from "layouts/pages/student/activities/update";
import Student from "layouts/pages/student/studentdetails/update";
import MDButton from "components/MDButton";
import { useState } from "react";

const Update = (props: any) => {
  const { editData } = props;

  return (
    <Card>
      <Student editData={editData} />
      <Guardian
        student_guardian={
          editData.first_name + " " + editData.middle_name + " " + editData.last_name
        }
        student_first_name={editData.first_name}
        student_middle_name={editData.middle_name}
        student_last_name={editData.last_name}
        student_dob={editData.dob}
      />
      <Activity
        student_guardian={
          editData.first_name + " " + editData.middle_name + " " + editData.last_name
        }
        student_first_name={editData.first_name}
        student_middle_name={editData.middle_name}
        student_last_name={editData.last_name}
        student_dob={editData.dob}
      />
    </Card>
  );
};

export default Update;
