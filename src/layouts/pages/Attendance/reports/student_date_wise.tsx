import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
  section_name: "",
  start_date: "",
  end_date: "",
  student_user_id: "",
};

export default function StudentAttendanceDateWiseReport() {
  const { classes, student } = useSelector((state: any) => state);
  const [studentData, setStudentData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  console.log(attendanceData, "studentdata");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: async () => {},
  });
  useEffect(() => {
    const fetchData = async () => {
      const str = values.student_user_id;
      const match = str.match(/\(([^)]+)\)/);
      const result = match ? match[1] : null;

      const submitValue = {
        ...values,
        student_user_id: result,
      };
      console.log(submitValue, "values ADte");
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/mg_student_attendance/Date_wise_absent_detail`,
          submitValue,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          //   message.success(response.data);
          console.log(response.data, "response data");
          setAttendanceData(response.data);
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          message.error(error.response?.data?.detail || "An error occurred");
        });
    };

    if (
      values.start_date != "" &&
      values.end_date != "" &&
      values.class_name != "" &&
      values.section_name != "" &&
      values.student_user_id != ""
    ) {
      fetchData();
    }
  }, [
    values.start_date,
    values.end_date,
    values.class_name,
    values.section_name,
    values.student_user_id,
  ]);

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
  console.log(studentData, "days");
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Student Date Wise Attendance Report
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    disabled
                    defaultValue={Cacademic_year}
                    name="academic_year"
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                    value={values.academic_year}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
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
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="start_date"
                    onChange={handleChange}
                    value={values.start_date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Start Date
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDInput
                    required
                    sx={{ width: "100%" }}
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="end_date"
                    onChange={handleChange}
                    value={values.end_date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        End Date
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "student_user_id", value } });
                    }}
                    value={values.student_user_id}
                    options={
                      studentData.length > 0
                        ? studentData.map(
                            (item: any) =>
                              `${item.first_name} ${item.middle_name} ${item.last_name}(${item.user_id})`
                          )
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="student_user_id"
                        onChange={handleChange}
                        value={values.student_user_id}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Select Student
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {attendanceData.length > 0 && (
            <Grid item xs={12} sm={12}>
              <Card>
                <Grid container spacing={3} p={3}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      {`${values.student_user_id}'s Abdent Details In between ${values.start_date} to ${values.end_date}`}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      ACADEMIC YEAR :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].academic_year}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      ROLL NO. :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].roll_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      NAME :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].student_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      CLASS & SECTIONS :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 &&
                        `${attendanceData[0].class_name}-${attendanceData[0].section_name}`}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      ADMISSION NUMBER :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].admission_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      NO OF DAYS ABSENT :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].admission_number}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      ABSENT DATES :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold">
                      {" "}
                      {attendanceData.length > 0 && attendanceData[0].absent_dates.length > 0
                        ? attendanceData[0].absent_dates.join(", ")
                        : "All Present"}
                    </MDTypography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </form>
    </DashboardLayout>
  );
}
