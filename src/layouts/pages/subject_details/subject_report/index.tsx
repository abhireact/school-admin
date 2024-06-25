import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete, Checkbox, Tooltip } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import MDBox from "components/MDBox";
import * as Yup from "yup";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import autoTable from "jspdf-autotable";

const token = Cookies.get("token");
const cookies_academic_year = Cookies.get("academic_year");

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

export default function SubjectReport() {
  const [data, setData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  const initialValues = {
    academic_year: cookies_academic_year,
    class_name: "",
    section_name: "",
  };

  const { classes } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        let { academic_year } = values;
        const sendValue = { academic_year };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_subject/subject_report`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.length < 1) {
              setData([]);
              message.error("No Data Available");
              return;
            }
            setData(
              response.data.filter(
                (item: any) =>
                  item.class_name === values.class_name && item.section_name === values.section_name
              )
            );
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });

  const dataTableData = {
    columns: [
      { Header: "Subject Name", accessor: "subject_name" },
      { Header: "Subject Code", accessor: "subject_code" },
      { Header: "Class Name", accessor: "class_name" },
      { Header: "Class Code", accessor: "class_code" },
      { Header: "Section Name", accessor: "section_name" },
      { Header: "Employee Name", accessor: "employee_name" },
    ],
    rows: data.map((row) => ({
      subject_code: row.subject_code,
      subject_name: row.subject_name,
      class_name: row.class_name,
      class_code: row.class_code,
      section_name: row.section_name,
      employee_name: row.employee_name,
    })),
  };

  const handleExport = () => {
    setIsExporting(true);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `subject_report.xlsx`);
    setIsExporting(false);
  };

  const downloadPDF = () => {
    setIsPdf(true);
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Academic Year",
          "Class Name",
          "Class Code",
          "Section Name",
          "Subject Name",
          "Subject Code",
          "Employee Name",
        ],
      ],
      body: data.map((row) => [
        row.academic_year,
        row.class_name,
        row.class_code,
        row.section_name,
        row.subject_name,
        row.subject_code,
        row.employee_name,
      ]),
      startY: 20,
      styles: { halign: "left", fontSize: 8 },
      margin: { horizontal: 7 },
      didDrawPage: (dataArgsPages) => {
        const str = `Page ${dataArgsPages.pageNumber}`;
        doc.text(str, dataArgsPages.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
      },
      headStyles: { fillColor: [0, 0, 0] },
      footStyles: { fillColor: [0, 0, 0] },
      didParseCell: (data) => {
        if (data.row.index % 2 === 0) {
          data.cell.styles.fillColor = [36, 152, 209]; // Skyblue color
        }
      },
    });
    doc.save("subject_report.pdf");
    setIsPdf(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Section Subject Report
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.academic_year}
                  onChange={(_, value) => setFieldValue("academic_year", value)}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="academic_year"
                      label="Academic Year"
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.academic_year && Boolean(errors.academic_year)}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.class_name}
                  onChange={(_, value) => setFieldValue("class_name", value)}
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
                      label="Class"
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_name && Boolean(errors.class_name)}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.section_name}
                  onChange={(_, value) => setFieldValue("section_name", value)}
                  options={
                    values.class_name !== ""
                      ? classes
                          .find(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.class_name === values.class_name
                          )
                          ?.section_data.map((item: any) => item.section_name) || []
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="section_name"
                      label="Section Name"
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.section_name && Boolean(errors.section_name)}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>
                  <MDButton color="info" variant="contained" type="submit">
                    Show Data
                  </MDButton>
                </Grid>
              </Grid>
              {data.length > 0 && (
                <>
                  <DataTable table={dataTableData} canSearch />
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                    mr={2}
                  >
                    <Grid item mr={2}>
                      <MDButton
                        variant="contained"
                        color="info"
                        onClick={handleExport}
                        disabled={isExporting}
                      >
                        Generate Excel
                      </MDButton>
                    </Grid>
                    <Grid item mr={2}>
                      <MDButton
                        variant="contained"
                        color="info"
                        onClick={downloadPDF}
                        disabled={isPdf}
                      >
                        Generate PDF
                      </MDButton>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
