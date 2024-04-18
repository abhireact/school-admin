import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect, Key, ChangeEvent } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox, Card } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import DataTable from "examples/Tables/DataTable";
const token = Cookies.get("token");

const Guardian = (props: any) => {
  const { student_guardian } = props;
  const [guardianInfo, SetGuardianInfo] = useState([]);
  const [editGuardian, setEditGuardian] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      student_name: student_guardian,
      first_name: "",
      middle_name: "",
      last_name: "",
      relation: "",
      date_of_birth: "",
      occupation: "",
      annual_income: "",
      education: "",
      aadhaar_number: "",
      mobile_number: "",
      email: "",
      img: "",
    },

    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      if (editGuardian) {
        axios
          .put("http://10.0.20.121:8000/mg_guardian", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Guardian added successfully!");
            setEditGuardian(false);

            fetchStudentGuardian();
          })
          .catch(() => {
            message.error("Error on adding Guardian!");
          });
      } else {
        axios
          .post(
            "http://10.0.20.121:8000/mg_guardian",
            { ...values, student_name: student_guardian },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            message.success("Guardian added successfully!");
            setEditGuardian(false);

            fetchStudentGuardian();
          })
          .catch(() => {
            message.error("Error on adding Guardian!");
          });
      }
      action.resetForm();
    },
  });
  const handleUpdate = (index: number) => {
    const guardiandata = guardianInfo[index];
    setEditGuardian(true);
    console.log(guardiandata, "guardian data");
    setFieldValue("first_name", guardiandata.first_name);
    setFieldValue("middle_name", guardiandata.middle_name);
    setFieldValue("last_name", guardiandata.last_name);
    setFieldValue("relation", guardiandata.relation);
    setFieldValue("date_of_birth", guardiandata.date_of_birth);
    setFieldValue("occupation", guardiandata.occupation);
    setFieldValue("annual_income", guardiandata.annual_income);
    setFieldValue("education", guardiandata.education);
    setFieldValue("aadhaar_number", guardiandata.aadhaar_number);
    setFieldValue("mobile_number", guardiandata.mobile_number);
    setFieldValue("email", guardiandata.email);
    setFieldValue("img", null);
  };
  const handleDelete = async (guardian_name: string) => {
    try {
      const response = await axios.delete("http://10.0.20.121:8000/mg_guardian", {
        data: { stud_name: student_guardian, guardian_name: guardian_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = guardianInfo.filter((row) => row.username !== guardian_name);
        SetGuardianInfo(updatedData); // Update the state with the new data
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };

  const fetchStudentGuardian = () => {
    axios
      .post(
        `http://10.0.20.121:8000/mg_guardian`,
        { student_first_name: "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // message.success(" Guardiand successfully!");
        SetGuardianInfo(response.data);
        console.log(response.data, "student Guardian data");
      })
      .catch(() => {
        console.error("Error on getting guardian details !");
      });
  };
  useEffect(() => {
    fetchStudentGuardian();
  }, []);
  //formik
  const dataTableData = {
    columns: [
      { Header: "Guardian Name", accessor: "fullname" },

      { Header: "Relation", accessor: "relation" },
      { Header: "Mobile Number", accessor: "mobile_number" },
      { Header: "Email", accessor: "email" },
      { Header: "Occupation", accessor: "occupation" },
      { Header: "Action", accessor: "action" },
    ],

    rows: guardianInfo.map((row, index) => ({
      fullname: (
        <MDTypography variant="p">
          {row.first_name + " " + row.middle_name + " " + row.last_name}
        </MDTypography>
      ),
      relation: <MDTypography variant="p">{row.relation}</MDTypography>,
      mobile_number: <MDTypography variant="p">{row.mobile_number}</MDTypography>,
      email: <MDTypography variant="p">{row.email}</MDTypography>,
      occupation: <MDTypography variant="p">{row.occupation}</MDTypography>,

      action: (
        <MDTypography variant="p">
          {" "}
          <IconButton
            onClick={() => {
              handleUpdate(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(row.first_name + " " + row.middle_name + " " + row.last_name);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };
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
        setFieldValue("img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card id="guardian-info">
        <MDBox px={4}>
          <Grid container>
            {guardianInfo.length !== 0 ? (
              <>
                <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                    Guardian Details
                  </MDTypography>
                </Grid>
                <DataTable table={dataTableData} entriesPerPage={false} showTotalEntries={false} />
              </>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={12} mt={2}>
              {editGuardian ? (
                <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                  Edit Guardian Information
                </MDTypography>
              ) : (
                <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                  Add Guardian Information
                </MDTypography>
              )}
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">First Name</MDTypography>}
                name="first_name"
                value={values.first_name}
                onChange={editGuardian ? undefined : handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Middle Name</MDTypography>}
                name="middle_name"
                value={values.middle_name}
                onChange={editGuardian ? undefined : handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Last Name</MDTypography>}
                name="last_name"
                onChange={editGuardian ? undefined : handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Relation</MDTypography>}
                name="relation"
                value={values.relation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Occupation</MDTypography>}
                name="occupation"
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Annual Income</MDTypography>}
                name="annual_income"
                value={values.annual_income}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Education</MDTypography>}
                name="education"
                value={values.education}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Aadhaar Number</MDTypography>}
                name="aadhaar_number"
                value={values.aadhaar_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Mobile Number</MDTypography>}
                name="mobile_number"
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Email</MDTypography>}
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                type="date"
                sx={{ width: "80%" }}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label={<MDTypography variant="body2">Date Of Birth</MDTypography>}
                name="date_of_birth"
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4} mt={2}>
              <MDInput
                mb={2}
                type="file"
                accept="image/*"
                name="img"
                onChange={handleImage}
                sx={{ width: "80%" }}
                variant="standard"
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              py={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
              mr={5}
            >
              {editGuardian ? (
                <MDButton color="info" variant="text" type="submit" style={{ fontSize: "16px" }}>
                  Update &nbsp;
                </MDButton>
              ) : (
                <MDButton color="info" variant="text" type="submit" style={{ fontSize: "16px" }}>
                  ADD &nbsp;+
                </MDButton>
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Guardian;
