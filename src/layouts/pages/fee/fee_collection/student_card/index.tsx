import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Data

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";
import { useState } from "react";
import { Grid } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import burceMars from "assets/images/bruce-mars.jpg";

function StudentCard(props: any): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  console.log(props, "propsfvgff");

  return (
    <Card sx={{ height: "100%", width: "70%" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={5} pl={1} ml={1}>
          <MDAvatar
            src={
              "https://demos.creative-tim.com/material-dashboard-pro-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"
            }
            alt="profile-image"
            size="xxl"
            shadow="sm"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="bold">
            {props.data.first_name} {props.data.middle_name} {props.data.last_name}{" "}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium">
            {props.data.class_name}-{props.data.section_name}
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} sm={5} display="flex" flexDirection="column">
          <MDTypography variant="body" fontWeight="bold">
            User-ID
          </MDTypography>
          <MDTypography variant="body" fontWeight="bold">
            Adm No.
          </MDTypography>
          <MDTypography variant="body" fontWeight="bold">
            Fee Code
          </MDTypography>
          <MDTypography variant="body" fontWeight="bold">
            Fathers Name{" "}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={7} display="flex" flexDirection="column">
          <MDTypography variant="body" fontWeight="bold">
            {props.data.user_id}
          </MDTypography>{" "}
          <MDTypography variant="body" fontWeight="bold">
            {props.data.admission_number}{" "}
          </MDTypography>
          <MDTypography variant="body" fontWeight="bold">
            THS/2324/1586{" "}
          </MDTypography>
          <MDTypography variant="body" fontWeight="bold">
            {props.data.father_name}{" "}
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default StudentCard;
