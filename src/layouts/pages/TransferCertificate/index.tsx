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

  const formFields = [
    { label: { en: "School No.", hi: "स्कूल संख्या" }, inputName: "school_no" },
    { label: { en: "Book No.", hi: "पुस्तक संख्या" }, inputName: "book_no" },
    { label: { en: "S R No.", hi: "एस आर संख्या" }, inputName: "serial_number" },
    { label: { en: "PEN", hi: "पेन" }, inputName: "pen" },
    { label: { en: "Admission Number", hi: "प्रवेश संख्या" }, inputName: "admission_number" },
    { label: { en: "Affiliation No.", hi: "संबद्धता संख्या" }, inputName: "affiliation_no" },
    { label: { en: "Renewed Upto", hi: "नवीनीकृत तिथि" }, inputName: "renewed_upto" },
    { label: { en: "Status of School", hi: "स्कूल की स्थिति" }, inputName: "school_status" },
  ].filter((field) => settings[field.inputName] !== false);

  const certificateFields = [
    { label: { en: "Name of the student", hi: "छात्र का नाम" }, inputName: "name" },
    { label: { en: "Mother's Name", hi: "मां का नाम" }, inputName: "motherName" },
    { label: { en: "Father's Name", hi: "पिता का नाम" }, inputName: "fatherName" },
    {
      label: {
        en: "Date of Birth according to Admission Register(in figures and words):",
        hi: "प्रवेश रजिस्टर के अनुसार जन्म तिथि (अंकों और शब्दों में):",
      },
      inputName: "dob",
    },
    { label: { en: "Nationality", hi: "राष्ट्रीयता" }, inputName: "nationality" },
    { label: { en: "Religion", hi: "धर्म" }, inputName: "religion" },
    { label: { en: "Caste Category", hi: "जाति श्रेणी" }, inputName: "casteCategory" },
    {
      label: { en: "Whether the student is failed", hi: "क्या छात्र अनुत्तीर्ण हुआ है" },
      inputName: "isFailed",
    },
    { label: { en: "Subjects offered", hi: "प्रस्तावित विषय" }, inputName: "subjectsOffered" },
    {
      label: {
        en: "No. of school days the student attended",
        hi: "छात्र द्वारा उपस्थित स्कूल के दिनों की संख्या",
      },
      inputName: "attendedSchool",
    },
    {
      label: {
        en: "Games played or extra curricular activities in which the pupil usually took part",
        hi: "खेले गए खेल या अतिरिक्त पाठ्यक्रम गतिविधियाँ जिनमें छात्र ने आमतौर पर भाग लिया",
      },
      inputName: "extraCurricular",
    },
    {
      label: {
        en: "Whether school is under Govt./Minority/Independent Category",
        hi: "क्या स्कूल सरकारी/अल्पसंख्यक/स्वतंत्र श्रेणी के अंतर्गत आता है",
      },
      inputName: "schoolCategory",
    },
    {
      label: {
        en: "Class in which student last studied(in figures and words)",
        hi: "वह कक्षा जिसमें छात्र ने अंतिम बार अध्ययन किया (अंकों और शब्दों में)",
      },
      inputName: "lastClass",
    },
    {
      label: {
        en: "School/Board Annual examination last taken with result",
        hi: "स्कूल/बोर्ड वार्षिक परीक्षा अंतिम परिणाम के साथ",
      },
      inputName: "lastClassResult",
    },
    {
      label: {
        en: "Date on which the student's name was struck off the rolls of the school",
        hi: "जिस तारीख को छात्र का नाम स्कूल के रजिस्टर से हटाया गया था",
      },
      inputName: "struckoffName",
    },
    {
      label: {
        en: "Whether qualified for promotion to the higher class",
        hi: "क्या उच्च कक्षा में पदोन्नति के लिए योग्य है",
      },
      inputName: "isQualified",
    },
    {
      label: {
        en: "Months up to which the college dues paid",
        hi: "जिस महीने तक कॉलेज की फीस भरी गई है",
      },
      inputName: "duesPaid",
    },
    {
      label: {
        en: "Any fee concession availed of, nature of concession",
        hi: "किसी भी शुल्क रियायत का लाभ, रियायत का प्रकार",
      },
      inputName: "feeConcession",
    },
    {
      label: {
        en: "The student is NCC cadet/ Boy Scout/ Girl Scout",
        hi: "छात्र एनसीसी कैडेट/ बॉय स्काउट/ गर्ल स्काउट है",
      },
      inputName: "nccCadet",
    },
    {
      label: { en: "Date of Admission in the college", hi: "कॉलेज में प्रवेश की तारीख" },
      inputName: "admissionDate",
    },
    {
      label: { en: "General Conduct of the student", hi: "छात्र का सामान्य आचरण" },
      inputName: "studentConduct",
    },
    {
      label: { en: "Reason of leaving the School", hi: "स्कूल छोड़ने का कारण" },
      inputName: "leavingReason",
    },
    {
      label: { en: "Date of issue of certificate", hi: "प्रमाण पत्र जारी करने की तारीख" },
      inputName: "certificateDate",
    },
    { label: { en: "Any other remarks", hi: "अन्य कोई टिप्पणी" }, inputName: "remarks" },
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
                      {field.label.en}
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
                      {item.label.en}
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
                      {field.label.en}: {values[field.inputName] || ""}
                    </MDTypography>
                  </Grid>
                ))}
                {settings.registration_no !== false && (
                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      Registration No. of the Candidate (in case {values.class_from} to{" "}
                      {values.class_to}) :
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="bold" color="body3">
                      {values.registration_no}
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
                          {item.label.en}
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
