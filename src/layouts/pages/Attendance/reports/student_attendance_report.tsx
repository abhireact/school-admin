import { useState } from "react";
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
const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
  section_name: "",
  date: new Date(),
};
export default function StudentAttendanceReport() {
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const [studentData, setStudentData] = useState([]);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: async () => {
      console.log(values.date, "values ADte");
    },
  });
  const AttendanceData = {
    //
    columns: [
      { Header: "Academic Year", accessor: "academic_year" },

      { Header: "FEE CATEGORY", accessor: "fee_category" },
      { Header: "FEE PARTICULAR", accessor: "fee_perticular" },
      { Header: "CLASS-SECTION", accessor: "section" },
      { Header: "AMOUNT", accessor: "amount" },
      { Header: "ACtion", accessor: "action" },
    ],
    rows: studentData.map((row, index) => ({
      fee_category: row.fee_category,
      academic_year: row.academic_year,
      fee_perticular: row.fee_particular,
      section: `${row.class_name} - ${row.section_name}`,
      amount: row.amount,
    })),
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
                    Student Attendance Report
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={3}>
                  <MDInput
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
                        Select month
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
                table={AttendanceData}
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
