import React, { useEffect, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import TablePdfGenerator from "layouts/pages/student_details/student_table_pdf";
import { useReactToPrint } from "react-to-print";
import * as Yup from "yup";
const token = Cookies.get("token");
const columns = [
  { key: "section_name", label: "SECTION NAME" },
  { key: "boys", label: "BOYS" },
  { key: "girls", label: "GIRLS" },
  { key: "section_total", label: "SECTION TOTAL" },
  { key: "tc", label: "TC" },
  { key: "dropout", label: "DROP OUT" },
  { key: "new", label: "NEW" },
];
function filterData(datainfo: any, columns: any) {
  return datainfo.map((student: any) => {
    const filteredStudent: any = {};
    columns.forEach((column: any) => {
      if (student.hasOwnProperty(column)) {
        filteredStudent[column] = student[column];
      }
    });
    return filteredStudent;
  });
}
const validationSchema = Yup.object().shape({
  heading: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

export default function OverViewStudent() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: Cacademic_year,
        class_name: "",
        heading: "List of All Student",
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values, action) => {
        if (selectedColumns.length < 1) {
          message.error("No Column  Selected ");
          return;
        }
        console.log(values);

        const submit_value = {
          academic_year: values.academic_year,
          class_name: values.class_name,
        };
        console.log(submit_value, "submit value");
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/mg_student/student_data_overview`,
            submit_value,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.length < 1) {
              message.error("No Data Available for given Academic Year/Class/Section ");
              setTableData([]);
              setData([]);
              return;
            } else {
              setTableData(response.data[0].section_list);

              let filteredColumnsData = filterData(response.data[0].section_list, selectedColumns);
              console.log(filteredColumnsData, "overview student data");
              setData(filteredColumnsData);
            }
          })
          .catch((error) => {
            setData([]);
            message.error(error.response.data.detail);
            console.error("Error fetching data:", error);
          });
      },
    });
  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const tableRef = useRef();
  const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const [isExporting, setIsExporting] = useState(false);
  const exportToExcel = () => {
    // Convert data to worksheet
    setIsExporting(true);
    const ws = XLSX.utils.json_to_sheet(data);

    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "students_data.xlsx");
    setIsExporting(false);
  };
  const overviewdata_list = {
    columns: [
      { Header: "sl.no", accessor: "sl_no" },
      { Header: "section name", accessor: "section_name" },
      { Header: "boys", accessor: "boys" },
      { Header: "girls", accessor: "girls" },
      { Header: "section total", accessor: "section_total" },
      { Header: "tc", accessor: "tc" },
      { Header: "drop out", accessor: "dropout" },
      { Header: "new", accessor: "new" },
    ],
    rows: tableData.map((row: any, index: any) => ({
      sl_no: index + 1,
      section_name: row.section_name,
      section_total: row.section_total,
      boys: row.boys,
      girls: row.girls,
      tc: row.tc,
      dropout: row.dropout,
      new: row.new,
    })),
  };
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnChange = (key: any) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(key)) {
        return prevSelectedColumns.filter((col) => col !== key);
      } else {
        return [...prevSelectedColumns, key];
      }
    });

    console.log(selectedColumns, "selected columns");
  };
  const handleSelectAll = () => {
    setSelectedColumns(columns.map((col: any) => col.key));
  };
  const handleSelectNone = () => {
    setSelectedColumns([]);
  };
  const handleFetchData = () => {
    const submit_value = {
      academic_year: values.academic_year,
      class_name: values.class_name,
    };
    console.log(submit_value, "submit value");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_student/student_data_overview`, submit_value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.length < 1) {
          message.error("No Data Available for given Academic Year/Class/Section ");
          setTableData([]);
          setData([]);
          return;
        } else {
          setTableData(response.data[0].section_list);

          let filteredColumnsData = filterData(response.data[0].section_list, selectedColumns);
          console.log(filteredColumnsData, "overview student data");
          setData(filteredColumnsData);
        }
      })
      .catch((error) => {
        setData([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    if (values.class_name) {
      handleFetchData();
    }
  }, [values, selectedColumns]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Overview of Student Data
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  value={values.academic_year}
                  sx={{ width: "90%" }}
                  disabled
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
                      onChange={handleChange}
                      value={values.academic_year || Cacademic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.academic_year && Boolean(errors.academic_year)}
                      success={values.academic_year && !errors.academic_year}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.class_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "class_name", value } });
                    setFieldValue("section_name", "");
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
                          Class Name
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_name && Boolean(errors.class_name)}
                      success={values.class_name && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  required
                  sx={{ width: "90%" }}
                  name="heading"
                  onChange={handleChange}
                  value={values.heading}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Heading
                    </MDTypography>
                  }
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.heading && Boolean(errors.heading)}
                  success={values.heading && !errors.heading}
                  helperText={touched.heading && errors.heading}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                {" "}
                <div style={{ maxHeight: "200px", overflowY: "auto", position: "relative" }}>
                  <table
                    style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
                  >
                    <thead
                      style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
                    >
                      <tr>
                        <td
                          style={{
                            padding: "2px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            SELECT COLUMN
                          </MDTypography>
                        </td>
                        <td
                          style={{
                            padding: "2px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            SELECT
                          </MDTypography>
                          &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectAll()}
                          >
                            All
                          </MDButton>
                          &nbsp; &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectNone()}
                          >
                            None
                          </MDButton>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {columns.map((col, index) => (
                        <tr key={"columns" + index}>
                          <td
                            key={col.key}
                            style={{
                              padding: "2px",
                              textAlign: "left",
                              border: "1px solid #f0f2f5",
                            }}
                          >
                            <MDTypography
                              variant="caption"
                              fontWeight="bold"
                              // color="secondary"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {col.label}
                            </MDTypography>{" "}
                          </td>{" "}
                          <td
                            key={col.key}
                            style={{
                              padding: "2px",
                              textAlign: "left",
                              border: "1px solid #f0f2f5",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedColumns.includes(col.key)}
                              onChange={() => handleColumnChange(col.key)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>
                  {/* <MDButton color="info" variant="contained" type="submit">
                    confirm
                  </MDButton> */}
                </Grid>
                <Grid item>
                  <>
                    <MDButton
                      color="info"
                      onClick={handlePrint}
                      disabled={selectedColumns.length < 1 || data.length < 1}
                    >
                      Generate PDF &nbsp;<Icon>picture_as_pdf</Icon>
                    </MDButton>
                    &nbsp;&nbsp;
                    <MDButton
                      variant="contained"
                      color="dark"
                      disabled={selectedColumns.length < 1 || data.length < 1}
                      type="submit"
                      onClick={exportToExcel}
                    >
                      {isExporting ? "Exporting..." : "Export to Excel"}
                    </MDButton>
                  </>
                </Grid>
              </Grid>
              {tableData.length > 0 && (
                <DataTable table={overviewdata_list} canSearch={true} isSorted={false} />
              )}
            </Grid>
          </MDBox>
          <MDBox className="report-hidden-text" ref={tableRef}>
            <TablePdfGenerator
              data={data}
              heading={values.heading}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={undefined}
            />
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
