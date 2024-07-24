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
import DataTable from "examples/Tables/DataTable";
export default function ExportEmployeeData() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        start_date: "",
        end_date: "",

        // Array to store particulars
      },

      enableReinitialize: true,
      onSubmit: async (values, action) => {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/employee_archive`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.length < 1) {
              message.error("No Archived Employee Found");
              return;
            }
            let startDate = new Date(values.start_date);
            let endDate = new Date(values.end_date);
            let filterData = response.data.filter((item: any) => {
              const archiveDate = new Date(item.archive_date);
              return archiveDate >= startDate && archiveDate <= endDate;
            });
            const modifiedData = filterData.map((item: any) => ({
              user_name: item.user_name,
              employee_name: item.employee_name,
              position: item.position,
              department: item.department,
              archive_date: item.archive_date,
              joining_date: item.joining_date,
            }));
            console.log(modifiedData, "data only");

            setData(modifiedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });

  const [data, setData] = useState([]);

  const [isExporting, setIsExporting] = useState(false);
  const exportToExcel = () => {
    // Convert data to worksheet
    setIsExporting(true);
    const modifiedData = data.map((item) => ({
      USERNAME: item.user_name,
      NAME: item.employee_name,
      POSITION: item.position,
      DEPARTMENT: item.department,
      ARCHIVE_DATE: item.archive_date,
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
  //const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const dataTableData = {
    columns: [
      { Header: "Employee Name", accessor: "employee_name" },

      { Header: "Position", accessor: "position" },
      { Header: "Department", accessor: "department" },
      { Header: "User Name", accessor: "user_name" },
      { Header: "Archive Date", accessor: "archive_date" },
      { Header: "Joining Date", accessor: "joining_date" },
    ],

    rows: data.map((row, index) => ({
      user_name: row.user_name,
      employee_name: row.employee_name,
      position: row.position,
      department: row.department,
      archive_date: row.archive_date,
      joining_date: row.joining_date,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Export Archive Employee Data
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "90%" }}
                  name="start_date"
                  type="date"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Start Date
                    </MDTypography>
                  }
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  value={values.start_date}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.start_date && Boolean(errors.start_date)}
                  success={values.start_date && !errors.start_date}
                  helperText={touched.start_date && errors.start_date}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "90%" }}
                  name="end_date"
                  type="date"
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      End Date
                    </MDTypography>
                  }
                  value={values.end_date}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.end_date && Boolean(errors.end_date)}
                  success={values.end_date && !errors.end_date}
                  helperText={touched.end_date && errors.end_date}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDButton variant="contained" color="info" type="submit">
                  Submit
                </MDButton>
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
                  hiddenText={""}
                  isPdfMode={true}
                  additionalInfo={undefined}
                />
              </div>
            </Grid>
          </MDBox>
          {data.length > 0 && <DataTable table={dataTableData} canSearch />}
        </Card>
      </form>
    </DashboardLayout>
  );
}
