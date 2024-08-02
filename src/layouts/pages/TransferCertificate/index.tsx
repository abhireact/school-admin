import React, { useRef, useState, useEffect } from "react";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import studentLogo from "assets/images/studentLogo.jpeg";

import { useReactToPrint } from "react-to-print";
function formatDate(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const currentDate = new Date();
const formattedDate = formatDate(currentDate); // 01 August 2024
function getCurrentDateFormatted(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

const token = Cookies.get("token");

interface FormValues {
  admission_number: string;
  name: string;
  motherName: string;
  fatherName: string;
  nationality: string;
  religion: string;
  casteCategory: string;
  dob: string;
  isFailed: string;
  lastClass: string;
  lastClassResult: string;
  isQualified: string;
  duesPaid: string;
  feeConcession: string;
  nccCadet: string;
  admissionDate: string;
  studentConduct: string;
  leavingReason: string;
  remarks: string;
  certificateDate: string;
  class_from?: string;
  class_to?: string;
  registration_no?: string;
  pen?: string;
  [key: string]: string | undefined;
}

interface FieldConfig {
  label: string;
  inputName: string;
}

interface Settings {
  [key: string]: boolean;
}

const TransferCertificate: React.FC = () => {
  const [schoolLogo, setSchoolLogo] = useState("");

  useEffect(() => {
    fetch("/schoolLogo.txt")
      .then((response) => response.text())
      .then((text) => setSchoolLogo(text))
      .catch((error) => console.error("Error fetching the Base64 image:", error));
  }, []);
  const tableRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    const savedSettings = localStorage.getItem("transferCertificateSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik<FormValues>(
    {
      initialValues: {
        admission_number: "1234",
        serial_number: "1234",
        pen: "",
        registration_no: "",
        name: "",
        motherName: "",
        fatherName: "",
        nationality: "INDIAN",
        religion: "",
        casteCategory: "",
        dob: "",
        isFailed: "No",
        lastClass: "",
        isQualified: "Yes",
        duesPaid: getCurrentDateFormatted(),
        feeConcession: "No",
        nccCadet: "No",
        admissionDate: "",
        studentConduct: "Good",
        leavingReason: "Parent's wish",
        remarks: "N/A",
        certificateDate: formattedDate,
        lastClassResult: "",
        struckoffName: "",
        subjectsOffered: "",
        attendedSchool: "",
        schoolCategory: "",
        extraCurricular: "",
      },
      onSubmit: (values, action) => {
        axios
          .post("http://10.0.20.200:8000/transfer_certificate", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success("Fetched Data Successfully!");
            action.resetForm();
          })
          .catch(() => {
            message.error("Error on fetching data !");
          });
      },
    }
  );

  const formFields: FieldConfig[] = [
    { label: "School No.", inputName: "school_no" },
    { label: "Book No.", inputName: "book_no" },
    { label: "S R No.", inputName: "serial_number" },
    { label: "PEN", inputName: "pen" },
    { label: "Admission Number", inputName: "admission_number" },
    { label: "Affiliation No.", inputName: "affiliation_no" },
    { label: "Renewed Upto", inputName: "renewed_upto" },
    { label: "Status of School", inputName: "school_status" },
  ].filter((field) => settings[field.inputName] !== false);

  const certificateFields: FieldConfig[] = [
    { label: "Name of the student", inputName: "name" },
    { label: "Mother's Name", inputName: "motherName" },
    { label: "Father's Name", inputName: "fatherName" },
    {
      label: "Date of Birth according to Admission Register(in figures and words):",
      inputName: "dob",
    },
    { label: "Nationality", inputName: "nationality" },
    { label: "Religion", inputName: "religion" },
    { label: "Caste Category", inputName: "casteCategory" },
    { label: "Whether the student is failed", inputName: "isFailed" },
    {
      label: "Subjects offered",
      inputName: "subjectsOffered",
    },
    {
      label: "No. of school days the student attended",
      inputName: "attendedSchool",
    },
    {
      label: "Games played or extra curricular activities in which the pupil usually took part",
      inputName: "extraCurricular",
    },
    {
      label: "Whether school is under Govt./Minority/Independent Category",
      inputName: "schoolCategory",
    },
    { label: "Class in which student last studied(in figures and words)", inputName: "lastClass" },
    {
      label: "School/Board Annual examination last taken with result",
      inputName: "lastClassResult",
    },
    {
      label: "Date on which the student's name was struck off the rolls of the school",
      inputName: "struckoffName",
    },
    { label: "Whether qualified for promotion to the higher class", inputName: "isQualified" },
    { label: "Months up to which the college dues paid", inputName: "duesPaid" },
    { label: "Any fee concession availed of, nature of concession", inputName: "feeConcession" },
    { label: "The student is NCC cadet/ Boy Scout/ Girl Scout", inputName: "nccCadet" },
    { label: "Date of Admission in  the college", inputName: "admissionDate" },
    { label: "General Conduct of the student", inputName: "studentConduct" },
    { label: "Reason of leaving the School", inputName: "leavingReason" },
    { label: "Date of issue of certificate", inputName: "certificateDate" },
    { label: "Any other remarks:", inputName: "remarks" },
  ].filter((field) => settings[field.inputName] !== false);

  return (
    <DashboardLayout>
      <Card>
        <MDBox p={4}>
          <Grid container style={{ border: "1px solid #ffff" }}>
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
              <MDTypography variant="h4">Transfer Certificate</MDTypography>
            </Grid>
            {formFields.map((field, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <MDInput
                  sx={{ width: "80%" }}
                  name={field.inputName}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {field.label}
                    </MDTypography>
                  }
                  onChange={handleChange}
                  value={values[field.inputName] || ""}
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched[field.inputName] && Boolean(errors[field.inputName])}
                  success={Boolean(values[field.inputName]?.length) && !errors[field.inputName]}
                  helperText={touched[field.inputName] && errors[field.inputName]}
                />
              </Grid>
            ))}
            <Grid container mt={2} spacing={2} direction="row" alignItems="center">
              {settings.studentImage !== false && (
                <>
                  <Grid item xs={3} sm={3}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Registration No. of the Candidate
                    </MDTypography>
                  </Grid>
                  <Grid item xs={0.5} sm={0.5}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      (
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1.5} sm={1.5}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      in case Class
                    </MDTypography>
                  </Grid>
                  <Grid item xs={0.5} sm={0.5}>
                    <MDInput
                      sx={{ width: "100%" }}
                      name="class_from"
                      onChange={handleChange}
                      value={values.class_from || ""}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_from && Boolean(errors.class_from)}
                      // success={Boolean(values.class_from?.length) && !errors.class_from}
                      helperText={touched.class_from && errors.class_from}
                    />
                  </Grid>
                  <Grid item xs={0.5} sm={0.5}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      to
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1.5} sm={0.5}>
                    <MDInput
                      sx={{ width: "100%" }}
                      name="class_to"
                      onChange={handleChange}
                      value={values.class_to || ""}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_to && Boolean(errors.class_to)}
                      // success={Boolean(values.class_to?.length) && !errors.class_to}
                      helperText={touched.class_to && errors.class_to}
                    />
                  </Grid>
                  <Grid item xs={0.5} sm={0.5}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      )
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2.5} sm={2.5}>
                    <MDInput
                      sx={{ width: "100%" }}
                      name="registration_no"
                      onChange={handleChange}
                      value={values.registration_no || ""}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.registration_no && Boolean(errors.registration_no)}
                      success={Boolean(values.registration_no?.length) && !errors.registration_no}
                      helperText={touched.registration_no && errors.registration_no}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Grid container spacing={2} sx={{ border: "1px solid #dddddd", mt: 2, mb: 1 }}>
              {certificateFields.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    sx={{
                      borderBottom: "1px solid #dddddd",
                      borderRight: "1px solid #dddddd",
                      p: 0.25,
                      paddingLeft: 2,
                    }}
                  >
                    <MDTypography variant="button" color="body3">
                      {index + 1}
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={5.5}
                    sm={5.5}
                    sx={{
                      borderBottom: "1px solid #dddddd",
                      borderRight: "1px solid #dddddd",
                      p: 0.25,
                      pl: 2,
                    }}
                  >
                    <MDTypography variant="button" color="body3">
                      {item.label}
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={5.5}
                    sm={5.5}
                    sx={{ borderBottom: "1px solid #dddddd", p: 0.25, pl: 2 }}
                  >
                    <MDInput
                      fullWidth
                      name={item.inputName}
                      type={
                        item.inputName === "duesPaid"
                          ? "month"
                          : item.inputName === "dob" || item.inputName === "admissionDate"
                          ? "date"
                          : "text"
                      }
                      onChange={handleChange}
                      value={values[item.inputName] || ""}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched[item.inputName] && Boolean(errors[item.inputName])}
                      success={Boolean(values[item.inputName]?.length) && !errors[item.inputName]}
                      helperText={touched[item.inputName] && errors[item.inputName]}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>

            <Grid item sm={12} py={2}>
              <MDButton color="info" type="submit" onClick={() => handleSubmit()}>
                save
              </MDButton>
              &nbsp; &nbsp;
              <MDButton color="dark" onClick={handlePrint}>
                Generate pdf
              </MDButton>
            </Grid>
          </Grid>
          <Grid className="report-hidden-text" ref={tableRef}>
            <MDBox p={2}>
              <Grid container style={{ border: "1px solid #ffff" }}>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography variant="h4">Transfer Certificate</MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {settings.studentImage !== false && (
                    <img
                      src={studentLogo}
                      alt="Student Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                  )}
                </Grid>
                {formFields.map((field, index) => (
                  <Grid item xs={4} sm={4} key={index}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      {field.label}: {values[field.inputName] || ""}
                    </MDTypography>
                  </Grid>
                ))}
                {settings.registration_no !== false && (
                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      Registration No. of the Candidate (in case {values.class_from} to{" "}
                      {values.class_to}) :{values.registration_no}
                    </MDTypography>
                  </Grid>
                )}
                <Grid
                  container
                  sx={{
                    border: "1px solid #dddddd",
                    backgroundImage:
                      settings.backgroundSchoolLogo !== false
                        ? `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),url(${schoolLogo})`
                        : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    position: "relative",
                  }}
                >
                  {certificateFields.map((item, index) => (
                    <React.Fragment key={index}>
                      <Grid
                        item
                        xs={1}
                        sm={1}
                        sx={{
                          borderBottom: "1px solid #dddddd",
                          borderRight: "1px solid #dddddd",
                          p: 0.25,
                          paddingLeft: 2,
                        }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="body3">
                          {index + 1}
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={5.5}
                        sm={5.5}
                        sx={{
                          borderBottom: "1px solid #dddddd",
                          borderRight: "1px solid #dddddd",
                          p: 0.25,
                          paddingLeft: 2,
                        }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="body3">
                          {item.label}
                        </MDTypography>
                      </Grid>
                      <Grid
                        item
                        xs={5.5}
                        sm={5.5}
                        sx={{ borderBottom: "1px solid #dddddd", p: 0.25, paddingLeft: 2 }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="body3">
                          {values[item.inputName] || ""}
                        </MDTypography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
                {settings.preparedBy !== false && (
                  <Grid item xs={4} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      Prepared By
                    </MDTypography>
                    <br />
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      (Name and Designation )
                    </MDTypography>
                  </Grid>
                )}
                {settings.checkedBy !== false && (
                  <Grid item xs={4} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      Checked By
                    </MDTypography>
                    <br />
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      (Name and Designation )
                    </MDTypography>
                  </Grid>
                )}
                {settings.principalSign !== false && (
                  <Grid item xs={4} sm={4}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      Signature of Principal
                    </MDTypography>
                    <br />
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      (With Official Seal )
                    </MDTypography>
                  </Grid>
                )}
              </Grid>
            </MDBox>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};
export default TransferCertificate;
