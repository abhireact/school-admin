import { Avatar, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import Dialog from "@mui/material/Dialog";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MDAvatar from "components/MDAvatar";
import { SetStateAction, useEffect, useState } from "react";
import EditAdmission from "./update";
import axios from "axios";
import Cookies from "js-cookie";

const ShowAdmission = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const token = Cookies.get("token");
  const [studentInfo, setStudentInfo] = useState<any>({});
  const [dialogNumber, setDialogNumber] = useState(0);
  const [dialogbox, setDialogbox] = useState(false);

  const handleDialogbox = () => {
    setDialogbox(false);
  };

  const handleEditDialogOpen = (dialogNum: SetStateAction<number>) => {
    setDialogNumber(dialogNum);
    setDialogbox(true);
  };

  const fetchStudentInfo = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admissions/retrive`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStudentInfo(response.data);
        console.log("student info data", response.data);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

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
          username={id}
          setOpenupdate={props.setOpenupdate}
          fetchStudentInfo={fetchStudentInfo}
          studentInfo={studentInfo}
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
              {studentInfo.upload_candidate_photo ? (
                <Grid item xs={12} sm={12}>
                  <Avatar
                    alt="student"
                    src={studentInfo.upload_candidate_photo}
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
                        {studentInfo.admission_date}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.form_number}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.academic_year}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.class_name}
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
                        {studentInfo.candidate_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.candidate_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.candidate_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.gender}
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
                        {studentInfo.date_of_birth}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.religion}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.category}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.blood_group}
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
                        {studentInfo.father_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_qualification}
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
                        {studentInfo.father_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_place_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_designation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.father_number}
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
                        {studentInfo.father_email_id}
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
                        {studentInfo.mother_first_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_middle_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_last_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_qualification}
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
                        {studentInfo.mother_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_place_occupation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_designation}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.mother_number}
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
                        {studentInfo.mother_email_id}
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
                        {studentInfo.address_line_1}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.address_line_2}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.pin_code}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.district}
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
                        {studentInfo.country}
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
                        {studentInfo.correspondence_address_line_1}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.correspondence_address_line_2}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.correspondence_pin_code}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.correspondence_district}
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
                        {studentInfo.correspondence_country}
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
                        {studentInfo.sibling_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="body2" fontWeight="bold">
                        {studentInfo.sibling_class}
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
