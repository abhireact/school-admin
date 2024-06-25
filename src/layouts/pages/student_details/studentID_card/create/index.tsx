import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Cookies from "js-cookie";
import MDBox from "components/MDBox";
import { Icon, Tooltip } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const token = Cookies.get("token");

const CreateStudentID = (props: any) => {
  const [data, setData] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">StudentID Card</MDTypography>
        <Tooltip title="UnPaid Fees" placement="bottom" arrow>
          <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>{" "}
      <Grid container px={3} display="flex" justifyContent={"center"}>
        <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}></Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CreateStudentID;
