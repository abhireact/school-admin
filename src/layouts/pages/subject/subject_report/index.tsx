import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Checkbox, Tooltip } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "js-cookie";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
import * as Yup from "yup";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});
export default function SubjectReport() {
  const [data, setData] = useState([]);
  const initialValues = {
    academic_year: "",
    class_name: "",
    section_name: "",
    // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("submit");

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
            //action.resetForm();
            //message.success("Student Section Changed Successfully");
            console.log(response.data, "Subject Info");
            setData(
              response.data.filter(
                (item: any) =>
                  item.class_name == values.class_name && item.section_name == values.section_name
              )
            );
          })
          .catch((error: any) => {
            console.log(error, "error");
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

    rows: data.map((row, index) => ({
      subject_code: row.subject_code,
      subject_name: row.subject_name,

      class_name: row.class_name,
      class_code: row.class_code,
      section_name: row.section_name,
      employee_name: row.employee_name,
    })),
  };
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = () => {
    setIsExporting(true);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `subject_report.xlsx`, { bookType: "xlsx", type: "binary" });

    setIsExporting(false);
    console.log("export excel data", data);
  };
  const [isPdf, setIsPdf] = useState(false);

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   const maxRowsPerPage = 10; // Set the maximum number of rows per page

  //   // Create an HTML table string
  //   let tableHtml = `<table>
  //     <thead>
  //       <tr>
  //         <th>Academic Year</th>
  //         <th>Class Name</th>
  //         <th>Class Code</th>
  //         <th>Section Name</th>
  //         <th>Subject Name</th>
  //         <th>Subject Code</th>
  //         <th>Employee Name</th>
  //       </tr>
  //     </thead>
  //     <tbody>`;

  //   // Add table rows
  //   data.forEach((row) => {
  //     tableHtml += `<tr>
  //       <td>${row.academic_year}</td>
  //       <td>${row.class_name}</td>
  //       <td>${row.class_code}</td>
  //       <td>${row.section_name}</td>
  //       <td>${row.subject_name}</td>
  //       <td>${row.subject_code}</td>
  //       <td>${row.employee_name}</td>
  //     </tr>`;
  //   });

  //   tableHtml += `</tbody></table>`;

  //   doc.autoTable({
  //     html: tableHtml,
  //     startY: 20,
  //     styles: { halign: "left", fontSize: 8 },
  //     margin: { horizontal: 7 },
  //     didDrawPage: (dataArgsPages) => {
  //       const str = `Page ${dataArgsPages.pageCount}`;
  //       doc.text(str, dataArgsPages.settings.margin.left, doc.internal.pageSize.getHeight() - 5);
  //     },
  //     headStyles: { fillColor: [0, 0, 0] },
  //     footStyles: { fillColor: [0, 0, 0] },
  //     didParseCell: (data) => {
  //       if (data.row.index % 2 === 0) {
  //         data.cell.styles.fillColor = [230, 230, 230];
  //       }
  //     },
  //     maxRowsPerPage: maxRowsPerPage, // Set the maximum number of rows per page
  //   });
  //   doc.save("table.pdf");
  // };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Section Subject Report
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.academic_year}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "academic_year", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="academic_year"
                      //onChange={handleChange}
                      value={values.academic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.academic_year && Boolean(errors.academic_year)}
                      success={values.academic_year.length && !errors.academic_year}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
                      // onChange={handleChange}
                      value={values.class_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Class
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_name && Boolean(errors.class_name)}
                      success={values.class_name.length && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.section_name}
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
                      //  onChange={handleChange}
                      value={values.section_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section Name
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.section_name && Boolean(errors.section_name)}
                      success={values.section_name.length && !errors.section_name}
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
                    {" "}
                    <Grid item mr={2}>
                      <MDButton
                        variant="contained"
                        color="info"
                        onClick={() => {
                          handleExport();
                        }}
                        disable={isExporting}
                      >
                        Generate Excel
                      </MDButton>
                    </Grid>
                    <Grid item mr={2}>
                      <MDButton
                        variant="contained"
                        color="info"
                        // onClick={() => {
                        //   downloadPDF();
                        // }}
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
