import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import React from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Autocomplete,
} from "@mui/material";

const StudentAdmission = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={3}>
          <MDButton
            variant="gradient"
            color="info"
            type="submit"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/pages/admission/AdmissionForm")}
          >
            ADD STUDENT
          </MDButton>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default StudentAdmission;
