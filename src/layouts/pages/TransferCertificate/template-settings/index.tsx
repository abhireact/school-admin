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
    english_or_hindi: false,
  });
  useEffect(() => {
    const savedSettings = localStorage.getItem("transferCertificateSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    localStorage.setItem("transferCertificateSettings", JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (field: string): void => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: !prevSettings[field],
    }));
  };

  const saveSettings = (): void => {
    // Save in database

    message.success("Transfer Certificate Settings Saved");
    console.log("Settings saved to localStorage:", settings);
  };

  const renderSettingToggle = (field: string, label: string): JSX.Element => (
    <Grid item xs={12} sm={12} md={12} key={field} style={{ borderBottom: "1px solid #dddd" }}>
      <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="button" color="body3">
          {label}
        </MDTypography>
        <Switch checked={settings[field]} onChange={() => handleToggle(field)} color="primary" />
      </MDBox>
    </Grid>
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
          <Grid container spacing={3}>
            <Grid item container sm={4} style={{ border: "1px solid #dddd" }}>
              <Grid item sm={12}>
                <MDTypography variant="h4" mb={4} color="info">
                  Transfer Certificate Settings
                </MDTypography>
              </Grid>
              {renderSettingToggle("studentImage", "Student Image")}
              {renderSettingToggle("backgroundSchoolLogo", "Background School Logo")}
              {renderSettingToggle("school_no", "School No.")}
              {renderSettingToggle("book_no", "Book No.")}
              {renderSettingToggle("admission_number", "Admission Number")}
              {renderSettingToggle("serial_number", "S R No.")}
              {renderSettingToggle("pen", "PEN")}
              {renderSettingToggle("affiliation_no", "Affiliation No.")}
              {renderSettingToggle("renewed_upto", "Renewed Upto")}
              {renderSettingToggle("school_status", "Status of School")}
              {renderSettingToggle("registration_no", "Registration Number")}

              {renderSettingToggle("name", "Name of the student")}
              {renderSettingToggle("motherName", "Mother's Name")}
              {renderSettingToggle("fatherName", "Father's Name")}
              {renderSettingToggle("dob", "Date of Birth")}
              {renderSettingToggle("nationality", "Nationality")}
              {renderSettingToggle("religion", "Religion")}
              {renderSettingToggle("casteCategory", "Caste Category")}
              {renderSettingToggle("isFailed", "Whether the student is failed")}
              {renderSettingToggle("subjectsOffered", "Subjects offered")}
              {renderSettingToggle("attendedSchool", "No. of school days the student attended")}
              {renderSettingToggle(
                "extraCurricular",
                "Games played or extra curricular activities"
              )}
              {renderSettingToggle(
                "schoolCategory",
                "Whether school is under Govt./Minority/Independent Category"
              )}
              {renderSettingToggle("lastClass", "Class in which student last studied")}
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
              <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant="h4" mb={4} color="info">
                  Preview
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" color="body3">
                  Language : {renderSettingToggle("english_or_hindi", "English/Hindi")}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <MDTypography variant="h4">
                      स्थानांतरण प्रमाणपत्र/Transfer Certificate
                    </MDTypography>
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
                  {/* {formFields.map((field, index) => (
                    <Grid item xs={4} sm={4} key={index}>
                      <MDTypography variant="button" fontWeight="bold" color="body3">
                       {field.label.en}: {getDummyData(field.inputName)}
                      </MDTypography>
                    </Grid>
                  ))} */}
                  {formFields.map((field, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <MDTypography variant="button" fontWeight="bold" color="body3">
                        {field.label.hi}/{field.label.en}: {getDummyData(field.inputName)}
                      </MDTypography>
                    </Grid>
                  ))}
                  {settings.registration_no !== false && (
                    <Grid item xs={12} sm={12}>
                      <>
                        <MDTypography variant="button" fontWeight="bold" color="body3">
                          उम्मीदवार का पंजीकरण संख्या/Registration No. of the Candidate (in case
                          Class I to II) :
                        </MDTypography>
                        <MDTypography variant="button" fontWeight="bold" color="body3">
                          9864367
                        </MDTypography>
                      </>
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
                            {item.label.hi}/{item.label.en}
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
                        द्वारा तैयार /Prepared By
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
                        द्वारा जांचा गया /Checked By
                      </MDTypography>
                      <br />
                      <MDTypography variant="button" fontWeight="bold" color="body3">
                        (Name and Designation )
                      </MDTypography>
                    </Grid>
                  )}
                  {settings.principalSign !== false && (
                    <Grid item xs={4} sm={4}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        color="body3"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        प्राचार्य के हस्ताक्षर /Signature of Principal
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
                    lastClassResult: true,
                    struckoffName: true,
                    subjectsOffered: true,
                    attendedSchool: true,
                    schoolCategory: true,
                    extraCurricular: true,
                    english_or_hindi: false,
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
