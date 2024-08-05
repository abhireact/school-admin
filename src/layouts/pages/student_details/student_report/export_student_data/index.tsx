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
import StudentCardPDF from "layouts/pages/student_details/student_card_pdf";
import TablePdfGenerator from "layouts/pages/student_details/student_table_pdf";
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

export default function ExportStudentData() {
  const [data, setData] = useState([]);
  const initialValues = {
    academic_year: cookies_academic_year,
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
      onSubmit: async (values, action) => {},
    });

  const handleShowData = (a: any, b: any, c: any) => {
    const sendData = {
      academic_year: a,
      class_name: b,
      section_name: c,
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
          message.error("No Student found  for this Academic Year,Class and Section ");
          setData([]);
          return;
        }

        setData(response.data);
      })
      .catch((error: any) => {
        setData([]);
        console.log(error, "error");
        message.error(error.response.data.detail);
      });
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
  const [profilepdf, setProfilepdf] = useState(false);
  let handleProfilepdf = () => {
    setProfilepdf(!profilepdf);
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
                  Student Data Extract
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "90%" }}
                  value={values.section_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "section_name", value } });
                    if (values.academic_year && values.class_name && value) {
                      handleShowData(values.academic_year, values.class_name, value);
                    }
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

              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>
                  {data.length > 0 && (
                    <>
                      <MDButton
                        color={profilepdf ? "info" : "secondary"}
                        onClick={() => {
                          setProfilepdf(false);
                        }}
                      >
                        Show Student list
                      </MDButton>
                      &nbsp;&nbsp;
                      <MDButton
                        color={profilepdf ? "secondary" : "info"}
                        onClick={() => {
                          setProfilepdf(true);
                        }}
                      >
                        Show Student profile
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
                <Grid item>
                  {data.length > 0 && (
                    <MDButton color="dark" onClick={handlePrint}>
                      {profilepdf ? "student profile pdf" : "student list pdf"}&nbsp;
                      <Icon>file_download</Icon>
                    </MDButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
        <div ref={tableRef}>
          {profilepdf ? (
            <StudentCardPDF data={data} />
          ) : (
            <TablePdfGenerator
              data={data}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={undefined}
            />
          )}
        </div>
      </form>
    </DashboardLayout>
  );
}
