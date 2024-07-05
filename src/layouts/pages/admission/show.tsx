import { Avatar, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { template } from "lodash";
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import Dialog from "@mui/material/Dialog";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MDAvatar from "components/MDAvatar";
import { SetStateAction, useState } from "react";
import EditAdmission from "./update";

const ShowAdmission = (props: any) => {
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState<any>({});
  const navigate = useNavigate();
  const { editData } = location.state;
  const { templateData } = location.state || {};

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [editedItem, setEditedItem] = useState<any>(null);
  const handleEditClick = (item: any) => {
    setEditedItem(item);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditedItem(null);
  };
  const { username, setOpenupdate, fetchData } = props;
  const [dialogNumber, setDialogNumber] = useState(0);
  const [dialogbox, setDialogbox] = useState(false);

  const handleDialogbox = () => {
    setDialogbox(false);
  };

  const handleEditDialogOpen = (dialogNum: SetStateAction<number>) => {
    setDialogNumber(dialogNum);
    setDialogbox(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container mb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid mr={6} item>
          <MDButton
            color="dark"
            variant="contained"
            onClick={() => navigate("/pages/admission/studentAdmission")}
          >
            Back
          </MDButton>
        </Grid>
      </Grid>
      <Dialog open={dialogbox} onClose={handleDialogbox} maxWidth="md">
        <EditAdmission
          dialogNumber={dialogNumber}
          handleClose={handleDialogbox}
          username={props.username}
          setOpenupdate={props.setOpenupdate}
          fetchStudentInfo={props.fetchStudentInfo}
          templateData={templateData}
        />
      </Dialog>
      <form>
        <Grid container spacing={3}>
          <Grid item>
            <Sidenav
              item={[
                { icon: "person", label: "Student Info", href: "1" },
                { icon: "family_restroom", label: "Father's Detail", href: "2" },
                { icon: "family_restroom", label: "Mother's Detail", href: "3" },
                { icon: "gite", label: "Address", href: "4" },
                { icon: "sports_kabaddi_icon", label: "Siblings", href: "5" },
                { icon: "upload_file", label: "Upload Documents", href: "6" },
              ]}
              brandName={""}
              routes={[]}
            />
          </Grid>

          <Grid container item xs={12} sm={9} spacing={3}>
            <Grid item sm={12} id="1">
              {templateData.upload_candidate_photo ? (
                <Grid item xs={12} sm={12}>
                  <Avatar
                    alt="student"
                    src={templateData.upload_candidate_photo}
                    sx={{ width: 84, height: 84 }}
                  />
                </Grid>
              ) : (
                <></>
              )}
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        STUDENT DETAILS
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(1)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    {/* {studentInfo.stud_img_data ? (
                    <Grid item xs={12} sm={12}>
                      <Avatar
                        alt="student"
                        src={studentInfo.stud_img_data}
                        sx={{ width: 84, height: 84 }}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )} */}

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission Date
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission Number
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.admission_date}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.form_number}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.academic_year}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.class_name}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Gender
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.candidate_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.candidate_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.candidate_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.gender}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Date of Birth
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Religion
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Category
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Blood Group
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.date_of_birth}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.religion}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.category}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.blood_group}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            <Grid item sm={12} id="2">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        Father&apos;s Detail
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(2)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_qualification}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Occupation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Place of Occupation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Contact Number
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_place_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_designation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_number}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Email Id
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={4}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.father_email_id}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            <Grid item sm={12} id="3">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        Mother&apos;s Detail
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(3)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_qualification}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Occupation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Place of Occupation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Contact Number
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_place_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_designation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_number}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Email Id
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={4}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.mother_email_id}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            <Grid item sm={12} id="4">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1} id="4">
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        ADDRESS
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(4)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <MDTypography
                        color="secondary"
                        variant="body2"
                        fontWeight="bold"
                        fontSize="14px"
                      >
                        CURRENT ADDRESS
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 1
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 2
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Pincode
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        District
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.address_line_1}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.address_line_2}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.pin_code}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.district}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Country
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        color="secondary"
                      ></MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.country}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={12}>
                      <MDTypography
                        color="secondary"
                        variant="body2"
                        fontWeight="bold"
                        fontSize="14px"
                      >
                        PERMANENT ADDRESS
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 1
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 2
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Pincode
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        District
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.correspondence_address_line_1}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.correspondence_address_line_2}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.correspondence_pin_code}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.correspondence_district}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Country
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.correspondence_country}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                    <Grid item xs={12} sm={3}></Grid>{" "}
                    {/* Add an empty Grid item to maintain 4-column layout */}
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            {/* siblings  */}
            <Grid item sm={12} id="5">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        Siblings
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(5)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Sibling Name
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.sibling_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {templateData.sibling_class}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            {/* upload documents  */}
            <Grid item sm={12} id="6">
              <Card>
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                        Upload Documents
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MDAvatar
                        bgColor="secondary"
                        size="sm"
                        onClick={() => handleEditDialogOpen(6)}
                      >
                        <ModeEditOutlineIcon />
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Father Photo
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Mother Photo
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Father Aadhar
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Mother Aadhar
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Candidate Aadhar
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload DOB Certificate
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default ShowAdmission;
