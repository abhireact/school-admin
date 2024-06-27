import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { template } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

const ShowAdmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { templateData } = location.state || {};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form>
        {/* button for submit the form */}
        <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid item m={2}>
            <MDButton
              color="dark"
              variant="contained"
              type="submit"
              onClick={() => navigate("/pages/admission/studentAdmission")}
            >
              Back
            </MDButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={4}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Student Profile
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={3}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                      <strong>Student Admission Reference Id:-</strong> {templateData.form_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                      <strong>Admission Date:-</strong> {templateData.admission_date}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {/* Form for candidate details */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Personal Details
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>First Name:-</strong> {templateData.candidate_first_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Middle Name:-</strong> {templateData.candidate_middle_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Last Name:-</strong> {templateData.candidate_last_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Class Name:-</strong> {templateData.class_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Date of Birth:-</strong> {templateData.date_of_birth}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Gender:-</strong> {templateData.gender}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Religion:-</strong> {templateData.religion}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Category:-</strong> {templateData.category}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for fathers information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Father&apos;s Detail
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>First Name:-</strong> {templateData.father_first_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Middle Name:-</strong> {templateData.father_middle_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Last Name:-</strong> {templateData.father_last_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Qualification:-</strong> {templateData.father_qualification}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Qualification:-</strong> {templateData.father_qualification}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Designation:-</strong> {templateData.father_designation}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Place of Designation:-</strong> {templateData.father_place_occupation}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Contact Number:-</strong> {templateData.father_number}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Email:-</strong> {templateData.father_email_id}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for mothers information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Mother&apos;s Detail
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>First Name:-</strong> {templateData.mother_first_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Middle Name:-</strong> {templateData.mother_middle_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Last Name:-</strong> {templateData.mother_last_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Qualification:-</strong> {templateData.mother_qualification}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Occupation:-</strong> {templateData.mother_occupation}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Designation:-</strong> {templateData.mother_designation}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong> Place Of Designation:-</strong> {templateData.mother_place_occupation}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Contact Number:-</strong> {templateData.mother_number}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Email:-</strong> {templateData.mother_email_id}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for Domicile */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Current Address
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Address Line 1:-</strong> {templateData.address_line_1}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Address Line 2:-</strong> {templateData.address_line_2}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>District:-</strong> {templateData.district}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Country:-</strong> {templateData.country}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Pin Code:-</strong> {templateData.pin_code}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for adress for correspondence */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="h6" color="secondary">
                    Permanent Address
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Address Line 1:-</strong> {templateData.correspondence_address_line_1}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Address Line 2:-</strong> {templateData.correspondence_address_line_2}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>District:-</strong> {templateData.correspondence_district}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Country:-</strong> {templateData.correspondence_country}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDTypography variant="standard" color="text" fontSize="small" textAlign="left">
                    <strong>Pin Code:-</strong> {templateData.correspondence_pin_code}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
      </form>
    </DashboardLayout>
  );
};

export default ShowAdmission;
