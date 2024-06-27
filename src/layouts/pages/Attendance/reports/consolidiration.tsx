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
};
interface Column {
  Header: string;
  accessor: string;
}

interface Row {
  [key: string]: any; // Adjust this based on the actual structure of your rows
}
export default function Consolidiration() {
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const [studentData, setStudentData] = useState([]);
  const [coloum, setColoum] = useState([]);
  const [absentData, setAbsentData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [monthdays, setMonthdays] = useState(0);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: async () => {
      axios
        .post("http://10.0.20.200:8000/mg_student_attendance/student_attendance_report", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAbsentData(response.data);
          message.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          message.error(error.response?.data?.detail || "An error occurred");
        });
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(
          `http://10.0.20.200:8000/mg_student_attendance/Consolidate_student_attendance_report`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setAttendanceData(response.data);
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          message.error(error.response?.data?.detail || "An error occurred");
        });
    };
    if (values.class_name != "" && values.section_name != "") {
      fetchData();
    }
  }, [values.class_name, values.section_name]);

  // Check if attendanceData[0]?.monthly_attendance exists and is not null
  const monthlyAttendanceKeys = attendanceData[0]?.monthly_attendance
    ? Object.keys(attendanceData[0].monthly_attendance)
    : [];

  const columnsFromAttendanceData = monthlyAttendanceKeys.map((item) => ({
    Header: item,
    accessor: item,
  }));

  const Consolidate: {
    columns: Column[];
    rows: Row[];
  } = {
    columns: [
      {
        Header: "Student Name",
        accessor: "st_name",
      },
      {
        Header: "Admission Number",
        accessor: "admission_number",
      },
      {
        Header: "Roll Number",
        accessor: "roll_number",
      },
      {
        Header: "User Id",
        accessor: "user_id",
      },
      {
        Header: "Total Days of Attendance",
        accessor: "total_days",
      },
      {
        Header: "Present",
        accessor: "present",
      },
      {
        Header: "Absent",
        accessor: "absent",
      },
      ...columnsFromAttendanceData,
    ],
    rows: attendanceData.map((data) => {
      const row: Row = {
        st_name: data.student_name,
        admission_number: data.admission_number,
        roll_number: data.roll_number,
        user_id: data.user_id,
        total_days: data.total_days_of_attendance,
        present: data.present,
        absent: data.absent,
      };

      // Loop through each key in monthly_attendance and add to row
      monthlyAttendanceKeys.forEach((timing) => {
        row[timing] = data.monthly_attendance[timing];
      });

      return row;
    }),
  };

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
                    Student Consolidate
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={4}>
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Card>
              <DataTable table={Consolidate} canSearch />
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
