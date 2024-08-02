import React, { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Switch from "@mui/material/Switch";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import studentLogo from "assets/images/studentLogo.jpeg";
import { message } from "antd";

interface SettingsState {
  [key: string]: boolean;
}
const getDummyData = (inputName: string): string => {
  switch (inputName) {
    case "name":
      return "John Doe";
    case "motherName":
      return "Jane Doe";
    case "fatherName":
      return "James Doe";
    case "dob":
      return "15 August 2000";
    case "nationality":
      return "Indian";
    case "religion":
      return "Hindu";
    case "casteCategory":
      return "General";
    case "isFailed":
      return "No";
    case "lastClass":
      return "10";
    case "isQualified":
      return "Yes";
    case "duesPaid":
      return "March 2024";
    case "feeConcession":
      return "No";
    case "nccCadet":
      return "No";
    case "admissionDate":
      return "1 April 2020";
    case "studentConduct":
      return "Good";
    case "leavingReason":
      return "Parent's Wish";
    case "certificateDate":
      return "30 March 2024";
    case "remarks":
      return "Excellent academic performance";
    case "school_no":
      return "12345";
    case "book_no":
      return "67";
    case "serial_number":
      return "89012";
    case "pen":
      return "PEN123456";
    case "admission_number":
      return "ADM20240001";
    case "affiliation_no":
      return "AFF987654";
    case "renewed_upto":
      return "31 March 2025";
    case "school_status":
      return "Permanent";
    case "lastClassResult":
      return "Passed with 85% marks";
    case "struckoffName":
      return "15 March 2024";
    case "subjectsOffered":
      return "English, Mathematics, Science, Social Studies, Hindi";
    case "attendedSchool":
      return "220 out of 240 days";
    case "schoolCategory":
      return "Independent";
    case "extraCurricular":
      return "Cricket, Debate Club, School Band";
    default:
      return "N/A";
  }
};

const TransferCertificateSettings: React.FC = () => {
  const [schoolLogo, setSchoolLogo] = useState("");

  useEffect(() => {
    fetch("/schoolLogo.txt")
      .then((response) => response.text())
      .then((text) => setSchoolLogo(text))
      .catch((error) => console.error("Error fetching the Base64 image:", error));
  }, []);
  const [settings, setSettings] = useState<SettingsState>({
    school_no: true,
    book_no: true,
    admission_number: true,
    serial_number: true,
    pen: true,
    affiliation_no: true,
    renewed_upto: true,
    school_status: true,
    name: true,
    motherName: true,
    fatherName: true,
    dob: true,
    nationality: true,
    religion: true,
    casteCategory: true,
    isFailed: true,
    lastClass: true,
    isQualified: true,
    duesPaid: true,
    feeConcession: true,
    nccCadet: true,
    admissionDate: true,
    studentConduct: true,
    leavingReason: true,
    certificateDate: true,
    remarks: true,
    backgroundSchoolLogo: true,
    studentImage: true,
    preparedBy: true,
    checkedBy: true,
    principalSign: true,
    registration_no: true,
    lastClassResult: true,
    struckoffName: true,
    subjectsOffered: true,
    attendedSchool: true,
    schoolCategory: true,
    extraCurricular: true,
  });
  useEffect(() => {
    const savedSettings = localStorage.getItem("transferCertificateSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // useEffect(() => {
  //   // Save settings to localStorage whenever they change
  //   localStorage.setItem("transferCertificateSettings", JSON.stringify(settings));
  // }, [settings]);

  const handleToggle = (field: string): void => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: !prevSettings[field],
    }));
  };

  const saveSettings = (): void => {
    // Save settings to localStorage
    localStorage.setItem("transferCertificateSettings", JSON.stringify(settings));
    message.success("Transfer Certificate Settings Saved");
    console.log("Settings saved to localStorage:", settings);
  };

  const renderSettingToggle = (field: string, label: string): JSX.Element => (
    <Grid item xs={12} sm={12} md={12} key={field}>
      <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="button" color="body3">
          {label}
        </MDTypography>
        <Switch checked={settings[field]} onChange={() => handleToggle(field)} color="primary" />
      </MDBox>
    </Grid>
  );
  const formFields = [
    { label: "School No.", inputName: "school_no" },
    { label: "Book No.", inputName: "book_no" },
    { label: "S R No.", inputName: "serial_number" },
    { label: "PEN", inputName: "pen" },
    { label: "Admission Number", inputName: "admission_number" },
    { label: "Affiliation No.", inputName: "affiliation_no" },
    { label: "Renewed Upto", inputName: "renewed_upto" },
    { label: "Status of School", inputName: "school_status" },
  ].filter((field) => settings[field.inputName] !== false);

  const certificateFields = [
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
          <Grid container spacing={3}>
            <Grid item container sm={4} style={{ border: "1px solid #dddd" }}>
              <Grid item sm={12}>
                <MDTypography variant="h4" mb={4} color="info">
                  Transfer Certificate Settings
                </MDTypography>
              </Grid>
              {renderSettingToggle("school_no", "School No.")}
              {renderSettingToggle("book_no", "Book No.")}
              {renderSettingToggle("admission_number", "Admission Number")}
              {renderSettingToggle("serial_number", "S R No.")}
              {renderSettingToggle("pen", "PEN")}
              {renderSettingToggle("affiliation_no", "Affiliation No.")}
              {renderSettingToggle("renewed_upto", "Renewed Upto")}
              {renderSettingToggle("school_status", "Status of School")}
              {renderSettingToggle("registration_no", "Registration Number")}
              {renderSettingToggle("studentImage", "Student Image")}
              {renderSettingToggle("backgroundSchoolLogo", "Background School Logo")}
              {renderSettingToggle("name", "Name of the student")}
              {renderSettingToggle("motherName", "Mother's Name")}
              {renderSettingToggle("fatherName", "Father's Name")}
              {renderSettingToggle(
                "dob",
                "Date of Birth according to Admission Register(in figures and words):"
              )}
              {renderSettingToggle("nationality", "Nationality")}
              {renderSettingToggle("religion", "Religion")}
              {renderSettingToggle("casteCategory", "Caste Category")}
              {renderSettingToggle("isFailed", "Whether the student is failed")}
              {renderSettingToggle("subjectsOffered", "Subjects offered")}
              {renderSettingToggle("attendedSchool", "No. of school days the student attended")}
              {renderSettingToggle(
                "extraCurricular",
                "Games played or extra curricular activities in which the pupil usually took part"
              )}
              {renderSettingToggle(
                "schoolCategory",
                "Whether school is under Govt./Minority/Independent Category"
              )}
              {renderSettingToggle(
                "lastClass",
                "Class in which student last studied(in figures and words)"
              )}
              {renderSettingToggle(
                "lastClassResult",
                "School/Board Annual examination last taken with result"
              )}
              {renderSettingToggle(
                "struckoffName",
                "Date on which the student's name was struck off the rolls of the school"
              )}
              {renderSettingToggle(
                "isQualified",
                "Whether qualified for promotion to the higher class"
              )}
              {renderSettingToggle("duesPaid", "Months up to which the college dues paid")}
              {renderSettingToggle(
                "feeConcession",
                "Any fee concession availed of, nature of concession"
              )}
              {renderSettingToggle("nccCadet", "The student is NCC cadet/ Boy Scout/ Girl Scout")}
              {renderSettingToggle("admissionDate", "Date of Admission in the college")}
              {renderSettingToggle("studentConduct", "General Conduct of the student")}
              {renderSettingToggle("leavingReason", "Reason of leaving the School")}
              {renderSettingToggle("certificateDate", "Date of issue of certificate")}
              {renderSettingToggle("remarks", "Any other remarks:")}

              {renderSettingToggle("preparedBy", "Prepared By")}
              {renderSettingToggle("checkedBy", "Checked By")}
              {renderSettingToggle("principalSign", "Principal's Signature")}
            </Grid>
            <Grid item sm={8}>
              <Grid item sm={12}>
                <MDTypography variant="h4" mb={4} color="info">
                  Preview
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
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
                        {field.label}: {getDummyData(field.inputName)}
                      </MDTypography>
                    </Grid>
                  ))}{" "}
                  {settings.registration_no !== false && (
                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="button" fontWeight="bold" color="body3">
                        Registration No. of the Candidate (in case Class I to II) : 9864367
                      </MDTypography>
                    </Grid>
                  )}
                  {/* <Grid item xs={6} sm={6}>
                    <MDTypography variant="button" color="body3" fontWeight="bold">
                      T.C. No. 1
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDTypography variant="button" color="body3" fontWeight="bold">
                      S.R. No. 12345
                    </MDTypography>
                  </Grid> */}
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
                            {getDummyData(item.inputName)}
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
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={4} spacing={2}>
            <Grid item>
              <MDButton
                color="dark"
                onClick={() =>
                  setSettings({
                    school_no: true,
                    book_no: true,
                    admission_number: true,
                    serial_number: true,
                    pen: true,
                    affiliation_no: true,
                    renewed_upto: true,
                    school_status: true,
                    name: true,
                    motherName: true,
                    fatherName: true,
                    dob: true,
                    nationality: true,
                    religion: true,
                    casteCategory: true,
                    isFailed: true,
                    lastClass: true,
                    isQualified: true,
                    duesPaid: true,
                    feeConcession: true,
                    nccCadet: true,
                    admissionDate: true,
                    studentConduct: true,
                    leavingReason: true,
                    certificateDate: true,
                    remarks: true,
                    backgroundSchoolLogo: true,
                    studentImage: true,
                    preparedBy: true,
                    checkedBy: true,
                    principalSign: true,
                    registration_no: true,
                  })
                }
              >
                Reset to Default
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton color="info" onClick={saveSettings}>
                Save Settings
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default TransferCertificateSettings;
