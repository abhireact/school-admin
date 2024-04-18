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

const Activity = (props: any) => {
  const { student_guardian } = props;
  const [activityinfo, setActivityInfo] = useState([]);
  const [editActivities, setEditActivities] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      student_name: student_guardian,
      activity_name: "",

      certificate: "",
    },

    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      if (editActivities) {
        axios
          .put("http://10.0.20.121:8000/mg_activity", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Activity added successfully!");
            setEditActivities(false);
            setFieldValue("certificate", null);

            fetchStudentActivities();
          })
          .catch(() => {
            message.error("Error on adding activity!");
          });
      } else {
        axios
          .post("http://10.0.20.121:8000/mg_activity", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Activity added successfully!");
            setEditActivities(false);
            setFieldValue("certificate", null);

            fetchStudentActivities();
          })
          .catch(() => {
            message.error("Error on adding Activity!");
          });
      }
      action.resetForm();
    },
  });
  const handleUpdate = (index: number) => {
    const activitydata = activityinfo[index];
    setEditActivities(true);
    console.log(activitydata, "Activity Data");
    setFieldValue("activity_name", activitydata.activity_name);

    setFieldValue("certificate", null);
  };
  const handleDelete = async (activity_name: string) => {
    try {
      const response = await axios.delete("http://10.0.20.121:8000/mg_activity", {
        data: { student_name: student_guardian, activity_name: activity_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        setEditActivities(false);
        const updatedData = activityinfo.filter((row) => row.activity_name !== activity_name);
        setActivityInfo(updatedData); // Update the state with the new data
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };

  const fetchStudentActivities = () => {
    axios
      .get(`http://10.0.20.121:8000/mg_activity?student_name=${student_guardian}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // message.success(" Guardiand successfully!");
        setActivityInfo(response.data);
        console.log(response.data, "student Guardian data");
      })
      .catch(() => {
        console.error("Error on getting activity details !");
      });
  };

  //formik
  const dataTableData = {
    columns: [
      { Header: "Activity  Name", accessor: "fullname" },

      { Header: "Action", accessor: "action" },
    ],

    rows: activityinfo.map((row, index) => ({
      fullname: <MDTypography variant="p">{row.activity_name}</MDTypography>,

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
              handleDelete(row.activity_name);
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
        setFieldValue("certificate", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card id="activities">
        {" "}
        <MDBox px={4} pb={2}>
          <Grid container>
            {activityinfo.length !== 0 ? (
              <>
                <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                    Activities
                  </MDTypography>
                </Grid>
                <DataTable table={dataTableData} entriesPerPage={false} showTotalEntries={false} />
              </>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={12} mt={2}>
              {editActivities ? (
                <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                  Edit Activity
                </MDTypography>
              ) : (
                <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                  Add Activity
                </MDTypography>
              )}
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Name of Activity</MDTypography>}
                name="activity_name"
                value={values.activity_name}
                onChange={editActivities ? undefined : handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={6} sm={4} mt={2}>
              <MDInput
                mb={2}
                type="file"
                accept="image/*"
                name="certificate"
                onChange={handleImage}
                sx={{ width: "80%" }}
                variant="standard"
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4} mt={2}>
              <MDButton color="info" variant="text" type="submit" style={{ fontSize: "16px" }}>
                ADD &nbsp;+
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Activity;
