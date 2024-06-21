import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip, Autocomplete, Card, Fab } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
  section_name: "",
  date: new Date(),
};
interface Column {
  Header: string;
  accessor: string;
}

interface Row {
  [key: string]: any; // Adjust this based on the actual structure of your rows
}
export default function StudentAttendance() {
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const [studentData, setStudentData] = useState([]);
  const [classTiming, setClassTiming] = useState([]);
  const [absentOpen, setAbsentOpen] = useState(false);
  const [absentData, setAbsentData] = useState([]);
  const [editValue, setEditValue] = useState({});
  const [resion, setResion] = useState("");
  const fetchData = async () => {};
  console.log(studentData, "student data");
  console.log(absentData, "Absent student data");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: async () => {
      console.log(values.date, "values ADte");
      axios
        .post("http://10.0.20.200:8000/mg_student_attendance/retrieve", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data, "response filter data");
          setAbsentData(response.data.student_attendance);
          setClassTiming(
            response.data.weekday_class_timings.week_timings.map(
              (item: any) => `${item.start_time}-${item.end_time}`
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  });
  const filteredStudentData = useMemo(() => {
    if (values.academic_year && values.class_name && values.section_name) {
      return student.filter(
        (item: any) =>
          item.academic_year === values.academic_year &&
          item.class_name === values.class_name &&
          item.section_name === values.section_name
      );
    }
    return [];
  }, [values.academic_year, values.class_name, values.section_name, student]);
  useEffect(() => {
    setStudentData(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data");
  }, [filteredStudentData]);
  const handleClickOpenAbsent = (data: any, timing: any) => {
    const [startTime, endTime] = timing.split("-");
    const value = {
      student_name: data.user_id,
      academic_year: data.academic_year,
      class_name: data.class_name,
      section_name: data.section_name,
      is_halfday: false,
      is_afternoon: false,
      attendance: "absent",
      reason: "gggg",
      absent_date: values.date,
      start_time: startTime.substring(0, 5),
      end_time: endTime.substring(0, 5),
    };
    setEditValue(value);
    setAbsentOpen(true);
  };
  const handleClickCloseAbsent = () => {
    setAbsentOpen(false);
  };
  const handleEdit = () => {
    axios
      .post("http://10.0.20.200:8000/mg_student_attendance", [editValue], {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const feeConcessionData: {
    columns: Column[];
    rows: Row[];
  } = {
    columns: [
      {
        Header: "Student Name",
        accessor: "st_name",
      },
      {
        Header: "Full Day",
        accessor: "full_day",
      },
      ...classTiming.map((item) => ({
        Header: item,
        accessor: item,
      })),
    ],
    rows: studentData.map((data) => {
      const absentStudent = absentData.find((item) => item.student_user_name === data.user_id);
      const absent_timing =
        absentStudent?.timings.map((item: any) => `${item.start_time}-${item.end_time}`) || [];
      console.log(absent_timing, "absent student", classTiming, "classtiming");
      const allPresent = absent_timing.every((elem: any) => classTiming.includes(elem));
      const row: Row = {
        st_name: data.first_name,
        full_day: (
          <Fab
            color={allPresent ? "info" : "error"}
            size="small"
            onClick={() => handleClickOpenAbsent(data, "all")}
          >
            {allPresent ? "H" : "A"}
          </Fab>
        ),
      };

      classTiming.forEach((timing) => {
        row[timing] = (
          <Fab
            color={absent_timing.includes(timing) ? "error" : "success"}
            size="small"
            onClick={() => handleClickOpenAbsent(data, timing)}
          >
            {absent_timing.includes(timing) ? "A" : "P"}
          </Fab>
        );
      });

      return row;
    }),
  };
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Dialog open={absentOpen} onClose={handleClickCloseAbsent}>
          <Card>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} sm={12}>
                <MDInput
                  required
                  sx={{ width: "100%" }}
                  onChange={(event: any) => setResion(event.target.value)}
                  value={resion}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Reson
                    </MDTypography>
                  }
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton variant="text" color="info" onClick={handleEdit}>
                  submit
                </MDButton>
                <MDButton variant="text" color="info" onClick={handleClickCloseAbsent}>
                  cancel
                </MDButton>
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Student Attendance
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={3}>
                  <MDInput
                    required
                    disabled
                    defaultValue={Cacademic_year}
                    name="academic_year"
                    onChange={handleChange}
                    value={values.academic_year}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "class_name", value } });
                    }}
                    options={
                      values.academic_year !== ""
                        ? classes
                            .filter((item: any) => item.academic_year === values.academic_year)
                            .map((item: any) => item.class_name)
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="class_name"
                        onChange={handleChange}
                        value={values.class_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Class
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "section_name", value } });
                    }}
                    options={
                      values.class_name !== ""
                        ? classes
                            .filter(
                              (item: any) =>
                                item.academic_year === values.academic_year &&
                                item.class_name === values.class_name
                            )[0]
                            .section_data.map((item: any) => item.section_name)
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="section_name"
                        onChange={handleChange}
                        value={values.section_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Section
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDInput
                    required
                    sx={{ width: "100%" }}
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Select Date
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  ml={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <MDButton color="info" variant="contained" type="submit">
                    Show Data
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Card>
              <DataTable
                table={feeConcessionData}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
              />
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
