import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// import VerticalTabs from "./tablepanal";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";

const SentEmail = () => {
  return (
    <MDBox p={3}>
      <Grid container spacing={3}>
        <Grid
          sm={12}
          py={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid #3873E8",
          }}
        >
          <Grid item xs={12} sm={9} display="flex" justifyContent="flex-start">
            <MDTypography variant="h5" color="info" px={2}>
              Sent Email Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <MDButton
              variant="gradient"
              color="info"
              type="submit"
              //   onClick={() => {
              //     handleFormSubmit();
              //   }}
            >
              {/* <MDTypography variant="caption" fontWeight="bold">
                  {" "}
                  <NotificationsActiveIcon />
                  Set Reminder
                </MDTypography> */}
              Submit
            </MDButton>
          </Grid>
        </Grid>
        <Grid sm={4}>
          <MDTypography></MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default SentEmail;
