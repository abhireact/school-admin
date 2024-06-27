import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip, Autocomplete, Card, Fab, Dialog } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable/entrieshundred";
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
  date: "",
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
  const [apiAbsentData, setApiAbsentData] = useState([]);
  const [absentOpen, setAbsentOpen] = useState(false);
  const [absentData, setAbsentData] = useState([]);
  const [resonEditValue, setResonEditValue] = useState("");
  const [resion, setResion] = useState("");

  const submitData = async (values: any) => {
    let submitableData = absentData.flatMap((item) => {
      const {
        student_user_name,
        mg_class_name,
        mg_section_name,
        academic_name,
        reason,
        absent_date,
        timings,
      } = item;

      // Transform timings array into the desired format
      return timings.map((timing: any) => ({
        student_name: student_user_name,
        academic_year: academic_name,
        class_name: mg_class_name,
        section_name: mg_section_name,
        is_halfday: false, // Assuming no afternoon timings mean not a half day
        is_afternoon: false,
        attendance: "absent",
        reason,
        absent_date,
        start_time: timing.start_time,
        end_time: timing.end_time,
      }));
    });
    const presentData = apiAbsentData
      .filter(
        (aObj) =>
          !submitableData.some(
            (bObj) =>
              aObj.start_time === bObj.start_time &&
              aObj.end_time === bObj.end_time &&
              aObj.student_name === bObj.student_name
          )
      )
      .map((item: any) => ({ ...item, attendance: "present" }));
    submitableData.push(...presentData);
    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/mg_student_attendance",
        submitableData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Submitted Successfully ");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: () => {
      // No need to submit here since we moved the logic to handleChange
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://10.0.20.200:8000/mg_student_attendance/retrieve",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ApiAbsentData = response.data.student_attendance.flatMap((item: any) => {
          const {
            student_user_name,
            mg_class_name,
            mg_section_name,
            academic_name,
            reason,
            absent_date,
            timings,
          } = item;

          // Transform timings array into the desired format
          return timings.map((timing: any) => ({
            student_name: student_user_name,
            academic_year: academic_name,
            class_name: mg_class_name,
            section_name: mg_section_name,
            is_halfday: false, // Assuming no afternoon timings mean not a half day
            is_afternoon: false,
            attendance: "absent",
            reason,
            absent_date,
            start_time: timing.start_time,
            end_time: timing.end_time,
          }));
        });
        setApiAbsentData(ApiAbsentData);
        setAbsentData(response.data.student_attendance);
        setClassTiming(
          response.data.weekday_class_timings.week_timings.map(
            (item: any) => `${item.start_time}-${item.end_time}`
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (values.date != "" && values.class_name != "" && values.section_name != "") {
      fetchData();
    }
  }, [values.date, values.class_name, values.section_name]);

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
  }, [filteredStudentData]);

  const handleClickOpenAbsent = (data: any, timing: any, absent: boolean) => {
    setResonEditValue(data.user_id);
    const studentIndex = absentData.findIndex(
      (student: { student_user_name: any }) => student.student_user_name === data.user_id
    );
    if (timing != "all") {
      const [startTime, endTime] = timing.split("-");
      const newTimings = {
        start_time: startTime.substring(0, 5),
        end_time: endTime.substring(0, 5),
      };

      if (studentIndex !== -1) {
        const updatedStudents = [...absentData];
        !absent
          ? (updatedStudents[studentIndex] = {
              ...updatedStudents[studentIndex],
              timings: updatedStudents[studentIndex].timings
                ? [...updatedStudents[studentIndex].timings, newTimings]
                : [newTimings],
            })
          : (updatedStudents[studentIndex] = {
              ...updatedStudents[studentIndex],
              timings: updatedStudents[studentIndex].timings.filter(
                (tdata: any) =>
                  tdata.start_time !== newTimings.start_time &&
                  tdata.end_time !== newTimings.end_time
              ),
            });
        setAbsentData(updatedStudents);
      } else {
        const newStudent = {
          student_name: "New Student",
          student_user_name: data.user_id,
          mg_section_name: data.section_name,
          mg_class_name: data.class_name,
          academic_name: data.academic_year,
          reason: resion,
          absent_date: values.date,
          timings: [newTimings],
        };
        setAbsentData([...absentData, newStudent]);
      }
    } else {
      const newTimings = classTiming.map((range) => {
        const [start_time, end_time] = range.split("-");
        return { start_time, end_time };
      });
      if (studentIndex !== -1) {
        const updatedStudents = [...absentData];
        !absent
          ? (updatedStudents[studentIndex] = {
              ...updatedStudents[studentIndex],
              timings: newTimings,
            })
          : (updatedStudents[studentIndex] = {
              ...updatedStudents[studentIndex],
              timings: [],
            });
        setAbsentData(updatedStudents);
      } else {
        const newStudent = {
          student_name: "New Student",
          student_user_name: data.user_id,
          mg_section_name: data.section_name,
          mg_class_name: data.class_name,
          academic_name: data.academic_year,
          reason: resion,
          absent_date: values.date,
          timings: newTimings,
        };
        setAbsentData([...absentData, newStudent]);
      }
    }
    absent ? null : setAbsentOpen(true);
  };

  const handleClickreason = () => {
    const studentIndex = absentData.findIndex(
      (student: { student_user_name: any }) => student.student_user_name === resonEditValue
    );
    if (studentIndex !== -1) {
      const updatedStudents = [...absentData];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        reason: resion,
      };
      setAbsentData(updatedStudents);
    }
    setResion("");
    setAbsentOpen(false);
  };

  const handleClickCloseAbsent = () => {
    setAbsentOpen(false);
  };

  const attendanceData: {
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
      const row: Row = {
        st_name: data.first_name,
        full_day: (
          <Tooltip title={absentStudent?.reason} placement="top">
            <Fab
              color={
                absent_timing.length === classTiming.length
                  ? "error"
                  : absent_timing.length > 0
                  ? "info"
                  : "success"
              }
              sx={{ width: 34, height: 24 }}
              onClick={() =>
                handleClickOpenAbsent(data, "all", absent_timing.length === classTiming.length)
              }
            >
              <MDTypography variant="caption" fontWeight="bold" style={{ color: "white" }}>
                {absent_timing.length === classTiming.length
                  ? "A"
                  : absent_timing.length > 0
                  ? "H"
                  : "P"}
              </MDTypography>
            </Fab>
          </Tooltip>
        ),
      };

      classTiming.forEach((timing) => {
        row[timing] = (
          <Fab
            color={absent_timing.includes(timing) ? "error" : "success"}
            sx={{ width: 34, height: 24 }}
            onClick={() => handleClickOpenAbsent(data, timing, absent_timing.includes(timing))}
          >
            <MDTypography variant="caption" fontWeight="bold" style={{ color: "white" }}>
              {absent_timing.includes(timing) ? "A" : "P"}
            </MDTypography>
          </Fab>
        );
      });

      return row;
    }),
  };

  return (
    <DashboardLayout>
      <Dialog open={absentOpen} onClose={handleClickCloseAbsent}>
        <Card>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={12}>
              <MDInput
                sx={{ width: "100%" }}
                onChange={(event: any) => setResion(event.target.value)}
                value={resion}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Reason
                  </MDTypography>
                }
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton variant="text" color="info" onClick={handleClickreason}>
                Submit
              </MDButton>
              <MDButton variant="text" color="info" onClick={handleClickCloseAbsent}>
                Cancel
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
                  disabled
                  sx={{ width: "100%" }}
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
                  disableClearable
                  value={values.class_name}
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
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "section_name", value } });
                  }}
                  value={values.section_name}
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
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
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
            </Grid>
          </Card>
        </Grid>
        {values.date && (
          <Grid container item xs={12} sm={12}>
            <Card>
              <Grid item xs={12} sm={12}>
                <DataTable table={attendanceData} canSearch />
              </Grid>
              <Grid item xs={12} sm={12} p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton color="info" variant="contained" onClick={() => submitData(values)}>
                  Save
                </MDButton>
              </Grid>
            </Card>
          </Grid>
        )}
      </Grid>
    </DashboardLayout>
  );
}
