import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDTypography from "components/MDTypography";

// Data

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";
import { Grid } from "@mui/material";
import MDAvatar from "components/MDAvatar";

function StudentIDCard3(props: any): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  console.log(props, "propsfvgff");

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign={"center"}
          px={3}
          columnGap={2}
          columnSpacing={2}
        >
          <MDAvatar
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhh_PUJazRGBX1zGtaxJ5dDmFZAhinJvT16g&s"
            }
            alt="school logo"
            size="xl"
            shadow="sm"
          />
          <MDTypography variant="h5" fontWeight="bold" sx={{ justifyContent: "center" }}>
            TENDER HEARTS SCHOOL KURSI ROAD{" "}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="bold">
            GS - 160, VILLAGE - ADHAR KHERA, LUCKNOW-226026
          </MDTypography>
          <MDTypography variant="caption" fontWeight="bold">
            Phone.No-8176063900
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container p={2} pt={3}>
        <Grid item xs={12} sm={4} pl={1}>
          <MDAvatar
            src={
              "https://demos.creative-tim.com/material-dashboard-pro-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"
            }
            alt="profile-image"
            size="xxl"
            shadow="sm"
          />
        </Grid>
        <Grid container spacing={1} sm={8}>
          <Grid item xs={12} sm={5} display="flex" flexDirection="column">
            <MDTypography variant="caption" fontWeight="bold">
              Name{" "}
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              Class{" "}
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              Fathers Name{" "}
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              Academic Year
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              Contact Number{" "}
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              Local Address
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} display="flex" flexDirection="column">
            <MDTypography variant="caption" fontWeight="bold">
              {/* {props.data.father_name}{" "} */}
              VANSHIKA AGARWAL
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              {/* {props.data.father_name}{" "} */}
              X-B
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              {/* {props.data.father_name}{" "} */}
              VINEET AGARWAL
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              2024-2025
            </MDTypography>{" "}
            <MDTypography variant="caption" fontWeight="bold">
              7539518524
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold">
              GEETA VILLA 814, SECTOR C MAHANAGAR , LUCKNOW
            </MDTypography>
          </Grid>
        </Grid>
        <Grid
          sm={8}
          display={"flex"}
          textAlign={"center"}
          justifyContent="center"
          alignItems={"center"}
          pt={6}
          //   style={{
          //     bottom: 0,
          //     width: "100%",
          //     padding: "2.5rem", // Padding of 1rem for the bottom area
          //     textAlign: "center",
          //   }}
        >
          {" "}
          <MDTypography variant="caption" fontWeight="bold">
            Principal Sign{" "}
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default StudentIDCard3;
