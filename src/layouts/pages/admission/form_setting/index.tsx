import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
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

const FormSetting = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Admission Dates
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item mt={2} ml={2}>
            <MDButton
              color="info"
              variant="contained"
              type="submit"
              onClick={() => navigate("/pages/admission/add_date")}
            >
              ADD DATE
            </MDButton>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default FormSetting;
