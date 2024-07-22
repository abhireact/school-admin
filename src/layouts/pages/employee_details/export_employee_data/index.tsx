import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Checkbox } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useReactToPrint } from "react-to-print";
import { fetchStudent } from "layouts/pages/redux/dataSlice";
import TablePdfGenerator from "layouts/pages/student_details/student_table_pdf";
import * as XLSX from "xlsx";
export default function ExportEmployeeData() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        department: "",
        category: "",

        // Array to store particulars
      },

      enableReinitialize: true,
      onSubmit: async (values, action) => {},
    });
  const [empDepartment, setEmpDepartment] = useState([]);
  const [empCategory, setEmpCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpDepartment(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employee_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmpCategory(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [data, setData] = useState([]);
  const fetchExportEmployeeData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees/export_employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.filter((item: any) => item.emp_dept === values.department));

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchExportEmployeeData();
  }, [values]);

  const [isExporting, setIsExporting] = useState(false);
  const exportToExcel = () => {
    // Convert data to worksheet
    setIsExporting(true);
    const modifiedData = data.map((item) => ({
      USERNAME: item.employee_number,
      NAME: item.name,
      GENDER: item.gender,
      DOB: item.dob,
      CATEGORY: item.emp_category,
      POSITION: item.emp_position,
      TYPE: item.emp_type,
      DEPARTMENT: item.emp_dept,
      GRADE: item.emp_grade,
      MOBILE_NO: item.ph_num,
      EMAIL: item.email,
      JOINING_DATE: item.joining_date,
    }));
    const ws = XLSX.utils.json_to_sheet(modifiedData);

    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "students_data.xlsx");
    setIsExporting(false);
  };
  const tableRef = useRef();
  const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Employee Data Extract
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.category}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "category", value },
                    });
                  }}
                  options={empCategory?.map((info: any) => info.category_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      required
                      InputLabelProps={{ shrink: true }}
                      name="category"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Employee Category
                        </MDTypography>
                      }
                      value={values.category}
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.category && Boolean(errors.category)}
                      success={values.category && !errors.category}
                      helperText={touched.category && errors.category}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.department}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "department", value },
                    });
                  }}
                  options={empDepartment?.map((info: any) => info.dept_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="department"
                      required
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Department
                        </MDTypography>
                      }
                      value={values.department}
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.department && Boolean(errors.department)}
                      success={values.department && !errors.department}
                      helperText={touched.department && errors.department}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Grid item>
                  {data.length > 0 && (
                    <>
                      <MDButton
                        variant="contained"
                        disabled={data.length < 1}
                        color="dark"
                        type="submit"
                        onClick={exportToExcel}
                      >
                        {isExporting ? "Exporting..." : "Export to Excel"}
                      </MDButton>
                    </>
                  )}
                </Grid>
                <Grid item ml={2}>
                  {data.length > 0 && (
                    <MDButton color="info" onClick={handlePrint}>
                      {"employee list pdf"}&nbsp;
                      <Icon>file_download</Icon>
                    </MDButton>
                  )}
                </Grid>
              </Grid>
              <div ref={tableRef} className="report-hidden-text">
                <TablePdfGenerator
                  data={data}
                  hiddenText={hiddenText}
                  isPdfMode={true}
                  additionalInfo={undefined}
                />
              </div>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
