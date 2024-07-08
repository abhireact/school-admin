import { useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useReactToPrint } from "react-to-print";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
  start_date: "",
  end_date: "",
};
const AdmissionReport = () => {
  const { classes } = useSelector((state: any) => state);
  const [tabledata, setTableData] = useState([]);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/admission_report`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTableData(response.data);
      }
    } catch (error) {
      setTableData([]);
      message.error("No data for this section");
    }
    setFetchAttempted(true);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: commonacademicyear,
      enableReinitialize: true,
      onSubmit: async () => {
        fetchData();
      },
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const capitalizeFirstLetters = (string: any) => {
    if (!string) return string;
    return string
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const manageTableData = {
    columns: [
      { Header: "SUBMISSION DATE", accessor: "submission_date" },
      { Header: "STUDENT NAME", accessor: "student_name" },
      { Header: "FATHER NAME", accessor: "father_name" },
      { Header: "MOTHER NAME", accessor: "mother_name" },
      { Header: "DATE OF BIRTH", accessor: "dob" },
      { Header: "FORM NO.", accessor: "form_number" },
      { Header: "PAID AMOUNT", accessor: "amount_paid" },
      { Header: "PAYMENT DATE", accessor: "payment_date" },
      { Header: "APPLICATION STATUS", accessor: "application_status" },
    ],
    rows: tabledata.map((data) => ({
      submission_date: formatDate(data.submission_date),
      student_name: capitalizeFirstLetters(data.student_name),
      father_name: capitalizeFirstLetters(data.father_name),
      mother_name: capitalizeFirstLetters(data.mother_name),
      dob: formatDate(data.dob),
      form_number: data.form_number,
      amount_paid: data.amount_paid,
      payment_date: formatDate(data.payment_date),
      application_status: data.application_status,
    })),
  };

  const tableRef = useRef();
  // const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Admission Report
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    defaultValue={Cacademic_year}
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
                        defaultValue={Cacademic_year}
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
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
                  <MDInput
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    required
                    variant="standard"
                    name="start_date"
                    value={values.start_date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Start Date
                      </MDTypography>
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e: any) => e.preventDefault()}
                    inputProps={{ min: values.academic_year }}
                    error={touched.start_date && Boolean(errors.start_date)}
                    helperText={touched.start_date && errors.start_date}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MDInput
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    required
                    variant="standard"
                    name="end_date"
                    value={values.end_date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        End Date
                      </MDTypography>
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e: any) => e.preventDefault()}
                    inputProps={{ min: values.start_date }}
                    error={touched.end_date && Boolean(errors.end_date)}
                    helperText={touched.end_date && errors.end_date}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  ml={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <MDButton color="info" variant="contained" type="submit" onClick={fetchData}>
                    Submit
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12}>
            {fetchAttempted && tabledata.length === 0 ? (
              <MDTypography variant="h6" align="center" p={3}>
                No data available
              </MDTypography>
            ) : (
              tabledata.length > 0 && (
                <Card>
                  <MDBox ref={tableRef} className="hidden-text">
                    <PdfGenerator
                      data={manageTableData.rows}
                      // hiddenText={hiddenText}
                      isPdfMode={true}
                      hiddenText={""}
                      additionalInfo={undefined}
                    />
                  </MDBox>
                  <DataTable table={manageTableData} canSearch />
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    m={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <MDButton color="info" variant="contained" type="submit" onClick={handlePrint}>
                      Download
                    </MDButton>
                  </Grid>
                </Card>
              )
            )}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default AdmissionReport;
