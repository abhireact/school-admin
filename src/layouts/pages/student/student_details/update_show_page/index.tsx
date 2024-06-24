import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UpdateGuardian from "../guardian/update";
import CreateGuardian from "../guardian/create";
import editStudentImage from "./assetss/edit_student.png";

import Tooltip from "@mui/material/Tooltip";
import {
  FormControlLabel,
  Autocomplete,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import MDAvatar from "components/MDAvatar";
import UpdateStudent from "./update_student";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";

const validationSchema = Yup.object().shape({
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),

  admission_date: Yup.date().test("year-range", "Incorrect format", function (value) {
    if (value) {
      const year = value.getFullYear();
      return year >= 2000 && year <= 3000;
    }
    return true;
  }),
  dob: Yup.date()
    .required("Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
  admission_number: Yup.string(),
  fee_code: Yup.string(),
  first_name: Yup.string().required("Required *"),
  last_name: Yup.string(),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  alt_phone_number: Yup.string().matches(/^[0-9]{10}$/, "Incorrect Format *"),
  pen_number: Yup.string().matches(/^\d+$/, "Incorrect Format *"),
  aadhaar_number: Yup.string().matches(/^[0-9]{12}$/, "Incorrect Format *"),
  email: Yup.string().email("Incorrect Format *"),
});

const Update = (props: any) => {
  const { username, setOpenupdate, fetchData } = props;
  const [studentInfo, setStudentInfo] = useState<any>({});
  const [guardianInfo, setGuardianInfo] = useState([]);

  const [studentAvailable, setStudentAvailable] = useState(false);
  const [guardianAvailable, setGuardianAvailable] = useState(false);

  const fetchGuardian = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_guardian/manage`,
        { student_user_name: username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setGuardianInfo(response.data);
        console.log(guardianInfo, "guardian info");
      })
      .catch((error) => {
        console.error("Error fetching guardian data:", error);
      });
  };
  const fetchStudentInfo = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/retrive`,
        {
          user_name: username,
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
    fetchGuardian();
    fetchStudentInfo();
  }, []);
  const [guardianData, setGuardianData] = useState({});

  const [open, setOpen] = useState(false);
  const handleCloseGuardian = () => {
    setOpen(false);
  };
  const handleOpenGuardian = (data: any) => {
    setOpen(true);
    const main_data = data;
    console.log(main_data, "Guardian edit Data");

    setGuardianData(main_data);
  };
  const [createOpen, setCreateOpen] = useState(false);
  const handleCloseCreate = () => {
    setCreateOpen(false);
  };
  const handleOpenCreate = () => {
    setCreateOpen(true);
  };
  // const { studentInfo, username, setOpenupdate, guardianInfo, fetchData, fetchGuardian } = props;

  const handleClose = () => {
    setOpenupdate(false);
  };
  console.log(studentInfo, "student info update");
  console.log(guardianInfo, "guardian info data");

  const token = Cookies.get("token");

  const [casteData, setCasteData] = useState([]);
  const [castecategoryData, setCastecategoryData] = useState([]);
  const [studentcategoryData, setStudentcategoryData] = useState([]);
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_house_detail`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "housedetailsssssssssss");
        setHouseData(response.data);

        console.log(response.data, "House data");
      })
      .catch((error) => {
        console.error("Error fetching House data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_studcategory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudentcategoryData(response.data);

        console.log(response.data, "Student Category data");
      })
      .catch((error) => {
        console.error("Error fetching Student Category data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_castes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "caste");
        setCasteData(response.data);

        console.log(response.data, "caste category data");
      })
      .catch((error) => {
        console.error("Error fetching Caste Category data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_caste_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCastecategoryData(response.data);

        console.log(response.data, "caste category data");
      })
      .catch((error) => {
        console.error("Error fetching Caste data:", error);
      });
  }, []);
  const { classes, account, studentcategory } = useSelector((state: any) => state);
  //formik
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        user_name: username,

        admission_date: studentInfo.admission_date || "",
        admission_number: studentInfo.admission_number || "",
        fee_code: studentInfo.fee_code || "",
        first_name: studentInfo.first_name || "",
        middle_name: studentInfo.middle_name || "",
        last_name: studentInfo.last_name || "",
        academic_year: studentInfo.academic_year || "",
        class_name: studentInfo.class_name || "",
        section_name: studentInfo.section_name || "",
        dob: studentInfo.dob || "",
        gender: studentInfo.gender || "",
        birth_place: studentInfo.birth_place || "",
        blood_group: studentInfo.blood_group || "",
        aadhaar_number: studentInfo.aadhaar_number || "",
        religion: studentInfo.religion || "",
        mother_tongue: studentInfo.mother_tongue || "",
        pen_number: studentInfo.pen_number || "",
        house_details: studentInfo.house_details || "",
        student_category: studentInfo.student_category || "",
        caste_category: studentInfo.caste_category || "",
        caste: studentInfo.caste || "",
        address_line1: studentInfo.address_line1 || "",
        address_line2: studentInfo.address_line2 || "",
        pin_code: studentInfo.pin_code || "",
        city: studentInfo.city || "",
        state: studentInfo.state || "",
        country: studentInfo.country || "",
        pr_address_line1: studentInfo.pr_address_line1 || "",
        pr_address_line2: studentInfo.pr_address_line2 || "",
        pr_pin_code: studentInfo.pr_pin_code || "",
        pr_city: studentInfo.pr_city || "",
        pr_state: studentInfo.pr_state || "",
        pr_country: studentInfo.pr_country || "",
        quota: studentInfo.quota || "",
        mobile_number: studentInfo.mobile_number || "",
        alt_phone_number: studentInfo.alt_phone_number || "",
        email: studentInfo.email || "",
        hobby: studentInfo.hobby || "",
        prev_school_name: studentInfo.prev_school_name || "",
        prev_class_name: studentInfo.prev_class_name || "",
        year: studentInfo.year || "",
        marks_obtained: studentInfo.marks_obtained || "",
        total_marks: studentInfo.total_marks || "",
        grade_percentage: studentInfo.grade_percentage || "",
        sibling: studentInfo.sibling || false,
        sibling_name: studentInfo.sibling_name || "",
        sibling_relationship: studentInfo.sibling_relationship || "",
        sibling_class: studentInfo.sibling_class || "",
        sibling_section: studentInfo.sibling_section || "",
        sibling_roll_number: studentInfo.sibling_roll_number || "",
        sibling_date_of_admission: studentInfo.sibling_date_of_admission || "",
        sibling_admission_number: studentInfo.sibling_admission_number || "",

        birth_certificate: studentInfo.birth_certificate,
        character_certificate: studentInfo.character_certificate,
        transfer_certificate: studentInfo.transfer_certificate,
        stud_img: null,
        sport_activity: studentInfo.sport_activity,
        extra_curricular: studentInfo.extra_curricular,
        health_record: studentInfo.health_record,
        class_record: studentInfo.class_record,
        sport_activity_files: [],
        extra_curricular_files: [],
        health_record_files: [],
        class_record_files: [],
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        // action.resetForm();
        const sendValues = {
          ...values,
          sibling:
            values.sibling_name ||
            values.sibling_relationship ||
            values.sibling_class ||
            values.sibling_section ||
            values.sibling_roll_number ||
            values.sibling_date_of_admission ||
            values.sibling_admission_number
              ? true
              : false,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_student`, sendValues, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Student Updated Successfully!");
            //fetchData();
            handleClose();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  const handleImage = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("stud_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [transferCertificate, setTransferCertificate] = useState(false);
  const handleTransferCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("transfer_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [characterCertificate, setCharacterCertificate] = useState(false);
  const handleCharacterCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("character_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

  const [birthCertificate, setBirthCertificate] = useState(false);
  const handleBirthCertificate = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("birth_certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleSportActivity = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.sport_activity_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleExtraCurricular = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.extra_curricular_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleHealthRecord = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.health_record_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleClassRecord = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.class_record_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const [checkAddress, setCheckedAddress] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("pr_address_line1", values.address_line1);
      setFieldValue("pr_address_lin2", values.address_line2);

      setFieldValue("pr_pin_code", values.pin_code);
      setFieldValue("pr_city", values.city);
      setFieldValue("pr_state", values.state);
      setFieldValue("pr_country", values.country);
    }
  };
  const [previousEducation, setPreviousEducation] = useState(false);
  console.log(casteData, "caste dataaaaaa");
  const [activityRecord, setActivityRecord] = useState(false);

  const handleDeleteGuardian = async (name: any) => {
    console.log(name, "guardian delete data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_guardian`, {
        data: { guardian_user_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted SuccessFully");
        // Filter out the deleted user from the data
        fetchGuardian();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const [editstudentdetails, setEditstudentdetails] = useState(false);
  const [dialogNumber, setDialogNumber] = useState(0);
  const [dialogbox, setDialogbox] = useState(false);
  const handleDialogbox = () => {
    setDialogbox(false);
  };
  const [imageSrc, setImageSrc] = useState("");

  return (
    <>
      <Dialog open={createOpen} onClose={handleCloseCreate} maxWidth="md">
        <CreateGuardian
          setCreateOpen={setCreateOpen}
          username={username}
          fetchGuardian={fetchGuardian}
        />
      </Dialog>
      <Dialog open={open} onClose={handleCloseGuardian} maxWidth="md">
        <UpdateGuardian
          guardianData={guardianData}
          setOpen={setOpen}
          fetchGuardian={fetchGuardian}
        />
      </Dialog>
      <Dialog open={dialogbox} onClose={handleDialogbox} maxWidth="md">
        <UpdateStudent
          dialogNumber={dialogNumber}
          handleClose={handleDialogbox}
          username={username}
          setOpenupdate={setOpenupdate}
          fetchStudentInfo={fetchStudentInfo}
        />
      </Dialog>
      <Grid container spacing={3}>
        <Grid item>
          <Sidenav
            item={[
              { icon: "person", label: "Student Info", href: "1" },
              { icon: "family_restroom", label: "Guardian Info", href: "2" },
              { icon: "call", label: "Contact Info", href: "5" },
              { icon: "sports_martial_arts", label: "Activities", href: "3" },
              { icon: "gite", label: "Address", href: "4" },
            ]}
            brandName={""}
            routes={[]}
          />
        </Grid>

        <Grid container item xs={12} sm={9} spacing={3}>
          <Grid item sm={12} id="1">
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
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(1);
                      }}
                      // variant="circle"
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid>
                  {studentInfo.stud_img_data ? (
                    <Grid item xs={12} sm={12}>
                      <Avatar
                        alt="student"
                        src={studentInfo.stud_img_data}
                        sx={{ width: 84, height: 84 }}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
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
                      Fee Code
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.first_name}
                    </MDTypography>
                  </Grid>{" "}
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.middle_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.last_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.fee_code}
                    </MDTypography>
                  </Grid>
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
                      {values.admission_date}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.admission_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.academic_year}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.class_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Section Name
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Date of Birth
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Birth Place
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Blood Group
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.section_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.dob}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.birth_place}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.blood_group}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Aadhaar Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Mother Tongue
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Hobby
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Religion
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.aadhaar_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.mother_tongue}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.hobby}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.religion}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Caste
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Caste Category
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Student Category
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      House Details
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.caste}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.caste_category}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.student_category}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.house_details}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      PEN Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Gender
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pen_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.gender}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          <Grid item sm={12}>
            <Card>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                      SIBLING
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDAvatar
                      bgColor="secondary"
                      size="sm"
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(2);
                      }}
                      // variant="circle"
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Sibling Name
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Section
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Relation
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_class}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_section}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_relationship}
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Roll Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Date of Admission
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Admission Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_roll_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_date_of_admission}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.sibling_admission_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          <Grid item sm={12}>
            <Card>
              <MDBox p={4}>
                <Grid container spacing={1} id="5">
                  <Grid item xs={12} sm={6}>
                    <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                      CONTACT DETAILS
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDAvatar
                      bgColor="secondary"
                      size="sm"
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(3);
                      }}
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Mobile Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Alternate Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Email
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to make it 4 columns */}
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.mobile_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.alt_phone_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.email}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to make it 4 columns */}
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          <Grid item sm={12} id="2">
            <Card>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} id="guardian-info">
                    <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                      GUARDIAN INFO
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  ></Grid>
                  {guardianInfo.map((guardianinfo: any, index: any) => (
                    <>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="button" fontWeight="bold" color="info">
                          Guardian {index + 1}
                        </MDTypography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={3}
                        py={1}
                        key={index + "delete"}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {guardianInfo.length > 1 && (
                          <Tooltip title="Delete Guardian" placement="top">
                            <IconButton
                              onClick={() => handleDeleteGuardian(guardianinfo.user_name)}
                            >
                              {guardianinfo.guardian_user_name}
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        py={1}
                        key={index + "edit"}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <MDAvatar
                          bgColor="secondary"
                          size="sm"
                          onClick={() => handleOpenGuardian(guardianinfo)}
                          // variant="circle"
                        >
                          <ModeEditOutlineIcon />
                        </MDAvatar>
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "first_name"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              First Name
                            </MDTypography>
                          }
                          value={guardianinfo.first_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "middle_name"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Middle Name
                            </MDTypography>
                          }
                          value={guardianinfo.middle_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "last_name"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Last Name
                            </MDTypography>
                          }
                          value={guardianinfo.last_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "relationship"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Relation
                            </MDTypography>
                          }
                          value={guardianinfo.relationship}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "email"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Email
                            </MDTypography>
                          }
                          value={guardianinfo.email_id}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "date_of_birth"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Date of Birth
                            </MDTypography>
                          }
                          value={guardianinfo.date_of_birth}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "occupation"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Occupation
                            </MDTypography>
                          }
                          value={guardianinfo.occupation}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={4} key={index + "qualification"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    }
                    value={guardianinfo.qualification}
                  />
                </Grid>
                <Grid item xs={12} sm={4} key={index + "designation"}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    disabled
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    }
                    value={guardianinfo.designation}
                  />
                </Grid> */}

                      <Grid item xs={12} sm={4} key={index + "income"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Annual Income
                            </MDTypography>
                          }
                          value={guardianinfo.income}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "education"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Education
                            </MDTypography>
                          }
                          value={guardianinfo.education}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "adharnumber"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Aadhar Number
                            </MDTypography>
                          }
                          value={guardianinfo.adharnumber}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4} key={index + "mobile_number"}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          disabled
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Mobile Number
                            </MDTypography>
                          }
                          value={guardianinfo.mobile_number}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "SPACE"}></Grid>
                      {/* <Grid item xs={12} mt={2} sm={4} key={index + "notification"}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={guardianinfo.notification} onChange={handleChange} />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Notification
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={2} sm={4} key={index + "subscription"}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={guardianinfo.subscription} onChange={handleChange} />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Subscription
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>    <Grid item xs={12} sm={4} key={index + "space"}></Grid>*/}

                      <Grid item xs={12} sm={4} key={index + "login_access"} mt={2}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Login Access : {guardianinfo.login_access ? "Yes" : "No"}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={4} key={index + "primary_contact"} mt={2}>
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Primary Contact : {guardianinfo.primary_contact ? "Exist" : "Not Exist"}
                        </MDTypography>
                      </Grid>
                    </>
                  ))}
                  <Grid item xs={12} sm={12}>
                    <MDButton color="dark" onClick={() => handleOpenCreate()}>
                      ADD Guardian +
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item sm={12}>
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
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(5);
                      }}
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
                      City
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.address_line1}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.address_line2}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pin_code}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.city}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      State
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Country
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.state}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.country}
                    </MDTypography>
                  </Grid>
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
                      City
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_address_line1}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_address_line2}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_pin_code}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_city}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      State
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Country
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_state}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.pr_country}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                  <Grid item xs={12} sm={3}></Grid>{" "}
                  {/* Add an empty Grid item to maintain 4-column layout */}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item sm={12}>
            <Card>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                      PREVIOUS EDUCATION
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDAvatar
                      bgColor="secondary"
                      size="sm"
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(6);
                      }}
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      School Name
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class
                    </MDTypography>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Year
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Marks Obtained
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.prev_school_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.prev_class_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.year}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.marks_obtained}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Total Marks
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Percentage
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.total_marks}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="body2" fontWeight="bold">
                      {values.grade_percentage}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>{" "}
          </Grid>
          <Grid item sm={12} id="3">
            <Card>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography color="info" variant="body2" fontWeight="bold" fontSize="18px">
                      ACTIVITIES
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDAvatar
                      bgColor="secondary"
                      size="sm"
                      onClick={() => {
                        setDialogbox(true);
                        setDialogNumber(7);
                      }}
                    >
                      <ModeEditOutlineIcon />
                    </MDAvatar>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid mr={6} item>
          <MDButton
            color="dark"
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            Back
          </MDButton>
        </Grid>
        {/* <Grid item>
            <MDButton color="info" variant="contained" type="submit">
              Save &nbsp;
              <SaveIcon />
            </MDButton>
          </Grid> */}
      </Grid>
    </>
  );
};

export default Update;
