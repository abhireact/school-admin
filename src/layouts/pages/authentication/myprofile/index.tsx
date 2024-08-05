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
    default:
      return "N/A";
  }
};

const MYProfile: React.FC = () => {
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
    { label: "Class in which student last studied(in figures and words)", inputName: "lastClass" },
    { label: "Whether qualified for promotion to the higher class", inputName: "isQualified" },
    { label: "Months up to which the college dues paid", inputName: "duesPaid" },
    { label: "Any fee concession availed of nature of concession", inputName: "feeConcession" },
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
          <Grid container>
            <Grid item sm={4}>
              <MDTypography variant="h4" mb={4} color="info">
                Transfer Certificate Settings
              </MDTypography>
            </Grid>
            <Grid item sm={8}>
              <MDTypography variant="h4" mb={4} color="info">
                Certificate Preview
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item container sm={4} style={{ border: "1px solid #dddd" }}>
              {renderSettingToggle("school_no", "School No.")}
              {renderSettingToggle("book_no", "Book No.")}
              {renderSettingToggle("admission_number", "Admission Number")}
              {renderSettingToggle("affiliation_no", "Affiliation No.")}
              {renderSettingToggle("renewed_upto", "Renewed Upto")}
              {renderSettingToggle("school_status", "Status of School")}
              {renderSettingToggle("name", "Name of the student")}
              {renderSettingToggle("motherName", "Mother's Name")}
              {renderSettingToggle("fatherName", "Father's Name")}
              {renderSettingToggle("dob", "Date of Birth")}
              {renderSettingToggle("nationality", "Nationality")}
              {renderSettingToggle("religion", "Religion")}
              {renderSettingToggle("casteCategory", "Caste Category")}
              {renderSettingToggle("isFailed", "Whether the student is failed")}
              {renderSettingToggle("lastClass", "Last Class")}
              {renderSettingToggle("isQualified", "Qualified for promotion")}
              {renderSettingToggle("duesPaid", "Dues Paid")}
              {renderSettingToggle("feeConcession", "Fee Concession")}
              {renderSettingToggle("nccCadet", "NCC Cadet/Scout")}
              {renderSettingToggle("admissionDate", "Date of Admission")}
              {renderSettingToggle("studentConduct", "Student Conduct")}
              {renderSettingToggle("leavingReason", "Reason for Leaving")}
              {renderSettingToggle("certificateDate", "Certificate Date")}
              {renderSettingToggle("remarks", "Remarks")}
              {renderSettingToggle("backgroundSchoolLogo", "Background School Logo")}
              {renderSettingToggle("studentImage", "Student Image")}
              {renderSettingToggle("preparedBy", "Prepared By Designation")}
              {renderSettingToggle("checkedBy", "Checked By Designation")}
              {renderSettingToggle("principalSign", "Principal's Signature")}
            </Grid>
            <Grid item sm={8}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <MDTypography variant="h4">Transfer Certificate</MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={6}></Grid>

                  <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {settings.studentImage !== false && (
                      <img
                        src={studentLogo}
                        alt="Student Logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <MDTypography variant="button" color="body3" fontWeight="bold">
                      T.C. No. 1
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDTypography variant="button" color="body3" fontWeight="bold">
                      S.R. No. 12345
                    </MDTypography>
                  </Grid>
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

export default MYProfile;
