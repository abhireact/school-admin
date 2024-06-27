import React, { useRef, useState } from "react";
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
import * as XLSX from "xlsx";
import PdfGenerator from "layouts/pages/student_details/student_pdf/PdfGenerator";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

let cookies_academic_year = Cookies.get("academic_year");
interface StudentData {
  roll_number: string;
  student_name: string;
  class_name: string;
  section: string;
  gender: string;
  admission_number: string;
  admission_date: string;
  date_of_birth: string;
  blood_group: string | null;
  religion: string;
  aadhar_number: string | null;
  caste: string | null;
  caste_category: string;
  phone_number: string;
  father_name: string;
  mother_name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  country: string;
  is_archive: boolean;
}
interface Column {
  key: keyof StudentData;
  label: string;
}

const columns: Column[] = [
  { key: "roll_number", label: "Roll Number" },
  { key: "student_name", label: "Student Name" },
  { key: "class_name", label: "Class" },
  { key: "section", label: "Section" },
  { key: "gender", label: "Gender" },
  { key: "admission_number", label: "Admission Number" },
  { key: "admission_date", label: "Date of Admission" },
  { key: "date_of_birth", label: "Date of Birth" },
  { key: "religion", label: "Religion" },
  { key: "phone_number", label: "Mobile Number" },
  { key: "father_name", label: "Father's Name" },
  { key: "mother_name", label: "Mother's Name" },
  { key: "address_line1", label: "Address" },
  { key: "caste_category", label: "Caste Category" },
];
function filterData(data: any, columns: any) {
  return data.map((student: any) => {
    const filteredStudent: any = {};
    columns.forEach((column: any) => {
      if (student.hasOwnProperty(column)) {
        filteredStudent[column] = student[column];
      }
    });
    return filteredStudent;
  });
}
function sortData(data: any, sortColumns: any) {
  return data.sort((a: any, b: any) => {
    for (let column of sortColumns) {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
    }
    return 0;
  });
}

export default function StudentReport() {
  const [data, setData] = useState([]);
  const initialValues = {
    academic_year: cookies_academic_year,
    class_name: "",
    section_name: "",
    no_of_empty_columns: 0,
    is_archive: false, // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {},
    });

  const handleShowData = () => {
    if (selectedColumns.length < 1) {
      message.error("Select Atleast One Column");
      return;
    }
    const sendData = {
      academic_year: values.academic_year,
      class_name: values.class_name,
      section_name: values.section_name,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_student/student_class_list`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "Student for this  Academic Year,Class and Section");
        if (response.data.length < 1) {
          message.error("No Student found  for this Academic Year ,Class and Section ");
          setData([]);
          return;
        }
        let archive_or_unarchive = values.is_archive
          ? response.data
          : response.data.filter((student: any) => student.is_archive === false);
        let filteredColumnsData = filterData(archive_or_unarchive, selectedColumns);
        console.log(filteredColumnsData, "filtered columnsData");
        let sortedData = sortData(filteredColumnsData, sortColumns);
        console.log(sortedData, "sorted columnsData");

        setData(sortedData);
      })
      .catch((error: any) => {
        setData([]);
        console.log(error, "error");
        message.error(error.response.data.detail);
      });
  };

  const [selectedColumns, setSelectedColumns] = useState([]);

  // let MaxSelectedColumns = 6;
  const handleColumnChange = (key: keyof StudentData) => {
    // if (
    //   selectedColumns.length + values.no_of_empty_columns >= MaxSelectedColumns &&
    //   !selectedColumns.includes(key)
    // ) {
    //   message.error(`You can select up to ${MaxSelectedColumns} columns.`);
    //   return;
    // }
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(key)) {
        return prevSelectedColumns.filter((col) => col !== key);
      } else {
        return [...prevSelectedColumns, key];
      }
    });

    console.log(selectedColumns, "selected columns");
  };

  const [sortColumns, setSortColumns] = useState([]);

  const handleSortChange = (key: keyof StudentData) => {
    setSortColumns((prevSortColumns) => {
      if (prevSortColumns.includes(key)) {
        return prevSortColumns.filter((col) => col !== key);
      } else {
        return [...prevSortColumns, key];
      }
    });
    console.log(sortColumns, "sort columns");
  };
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Student Class List
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.academic_year}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "academic_year", value } });
                    setFieldValue("class_name", "");
                    setFieldValue("section_name", "");
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
                      success={values.academic_year && !errors.academic_year}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
                          Class
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
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
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
                          Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.section_name && Boolean(errors.section_name)}
                      success={values.section_name && !errors.section_name}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} mt={2}>
                <input
                  type="checkbox"
                  checked={values.is_archive}
                  onChange={handleChange}
                  name="is_archive"
                />
                &nbsp;
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Archive Student
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                            COLUMN NAME
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
                            SELECT COLUMN
                          </MDTypography>
                        </td>
                        <td
                          style={{
                            padding: "10px",
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
                            SORT BY
                          </MDTypography>
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
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #f0f2f5",
                            }}
                          >
                            {" "}
                            {col.key !== "section" && col.key !== "class_name" && (
                              <input
                                type="checkbox"
                                checked={sortColumns.includes(col.key)}
                                onChange={() => handleSortChange(col.key)}
                                disabled={!selectedColumns.includes(col.key)}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.no_of_empty_columns}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "no_of_empty_columns", value },
                    });
                    // if (selectedColumns + value <= MaxSelectedColumns) {
                    //   handleChange({
                    //     target: { name: "no_of_empty_columns", value },
                    //   });
                    // } else {
                    //   message.error(`You can select up to ${MaxSelectedColumns} columns.`);
                    //   return;
                    // }
                  }}
                  options={[0, 1, 2, 3, 4, 5]}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="no_of_empty_columns"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          No. of Empty Columns
                        </MDTypography>
                      }
                      value={values.no_of_empty_columns}
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.no_of_empty_columns && Boolean(errors.no_of_empty_columns)}
                      success={values.no_of_empty_columns && !errors.no_of_empty_columns}
                      helperText={touched.no_of_empty_columns && errors.no_of_empty_columns}
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
                  <MDButton
                    color="info"
                    variant="contained"
                    onClick={() => {
                      handleShowData();
                    }}
                  >
                    Show Data
                  </MDButton>
                </Grid>
                <Grid item>
                  {data.length > 0 && (
                    <>
                      <MDButton color="info" onClick={handlePrint}>
                        Generate PDF &nbsp;<Icon>picture_as_pdf</Icon>
                      </MDButton>
                      &nbsp;&nbsp;
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
              </Grid>
            </Grid>
          </MDBox>
        </Card>
        <div ref={tableRef}>
          <PdfGenerator
            emptycolumns={values.no_of_empty_columns}
            data={data}
            hiddenText={hiddenText}
            isPdfMode={true}
            additionalInfo={undefined}
          />
        </div>
      </form>
    </DashboardLayout>
  );
}
