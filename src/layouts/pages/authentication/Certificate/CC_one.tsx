import axios from "axios";
import { useState, useEffect, useRef } from "react";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDAvatar from "components/MDAvatar";
import studentLogo from "assets/images/studentLogo.jpeg";
import BGImage from "assets/images/bg_image.png";
import Cookies from "js-cookie";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { message, Switch } from "antd";
import MDButton from "components/MDButton";
import { useReactToPrint } from "react-to-print";
const token = Cookies.get("token");
const initialValues = {
  studentname: "",
  class_name: "",
};
interface SettingsState {
  [key: string]: boolean;
}

const CC_one = () => {
  const [schoolLogo, setSchoolLogo] = useState("");
  const [settings, setSettings] = useState<SettingsState>({
    backgroundSchoolLogo: true,
    studentImage: true,
    adm_no: true,
  });
  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values, action) => {},
    });

  useEffect(() => {
    fetch("/schoolLogo.txt")
      .then((response) => response.text())
      .then((text) => setSchoolLogo(text))
      .catch((error) => console.error("Error fetching the Base64 image:", error));
  }, []);

  useEffect(() => {
    const savedSettings = localStorage.getItem("transferCertificateSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

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
    <Grid item xs={12} sm={6} md={8} key={field}>
      <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="button" color="body3">
          {label}
        </MDTypography>
        <Switch checked={settings[field]} onChange={() => handleToggle(field)} />
      </MDBox>
    </Grid>
  );

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} px={3}>
        <Grid container spacing={3} mb={2}>
          <Grid item sm={4}>
            {renderSettingToggle("backgroundSchoolLogo", "Background School Logo")}
          </Grid>
          <Grid item sm={4}>
            {renderSettingToggle("studentImage", "Student Image")}
          </Grid>
          <Grid item sm={4}>
            {renderSettingToggle("adm_no", "Sr. Number")}
          </Grid>
        </Grid>

        <Card>
          <Grid container>
            <Grid
              sx={{
                //   border: "1px solid #dddddd",
                backgroundImage:
                  settings.backgroundSchoolLogo !== false
                    ? `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),url(${BGImage})`
                    : "none",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                position: "relative",
                height: "500px",
              }}
            >
              <MDBox py={3} px={3}>
                <MDBox mb={7}>
                  <MDTypography variant="h5" textAlign="center" sx={{ fontStyle: "italic" }}>
                    Character Certificate
                  </MDTypography>
                  <MDBox display="flex" justifyContent="flex-end">
                    {settings.studentImage !== false && (
                      <img
                        src={studentLogo}
                        alt="Student Logo"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </MDBox>
                  <MDBox display="flex" justifyContent="flex-end">
                    {settings.adm_no !== false && (
                      <MDTypography variant="button" color="body3" fontWeight="bold">
                        S.R. No. 12345
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>

                <Grid container>
                  <Grid item xs={12}>
                    <MDTypography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontStyle: "italic",
                      }}
                    >
                      This is to certify that
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Master"
                        />
                      </MDBox>
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Aashvi"
                        />
                      </MDBox>
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="D"
                        />
                      </MDBox>
                      /o/
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Rajesh Kumar"
                        />
                      </MDBox>
                      and{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Seema Singh"
                        />
                      </MDBox>
                      is/was a bonifide student of class{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="L.K.G."
                        />
                      </MDBox>
                      in the session
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="2024-2025"
                        />
                      </MDBox>
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    // marginLeft={4}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    <MDTypography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontStyle: "italic",
                      }}
                    >
                      As far as i know{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="he/she"
                        />
                      </MDBox>
                      bears{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="good"
                        />
                      </MDBox>
                      moral character and durings{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="his/her"
                        />
                      </MDBox>
                      stay has not violated any rules and regulations of this institution.
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    <MDTypography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontStyle: "italic",
                      }}
                    >
                      I wish{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="him/her"
                        />
                      </MDBox>
                      all success in{" "}
                      <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                        <MDInput
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="studentname"
                          value={values.studentname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="his/her"
                        />
                      </MDBox>{" "}
                      future.
                    </MDTypography>
                  </Grid>
                </Grid>

                <MDBox mt={10} display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6">Date: 31/07/2024</MDTypography>
                  <MDTypography variant="h6">Principal</MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>

        <Grid
          item
          mt={4}
          container
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item mt={2}>
            <MDButton color="info" variant="contained" onClick={handlePrint}>
              Generate Pdf
            </MDButton>
          </Grid>
          <Grid item mt={2} ml={2}>
            <MDButton
              color="dark"
              variant="contained"
              // type="submit"
              // onClick={() => navigate("/pages/admission/Fee")}
              // onClick={() => navigate("/pages/admission/studentAdmission")}
              // navigate("/pages/admission/Fee");
            >
              Cancel
            </MDButton>
          </Grid>
        </Grid>
        <MDBox>
          <Card>
            <MDBox
              marginTop={"160px"}
              className="report-hidden-text"
              ref={componentRef}
              py={3}
              px={3}
            >
              <Grid
                container
                sx={{
                  //   border: "1px solid #dddddd",
                  backgroundImage:
                    settings.backgroundSchoolLogo !== false
                      ? `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),url(${BGImage})`
                      : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  position: "relative",
                  height: "500px",
                }}
              >
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <MDTypography variant="h3" fontWeight="bold" textAlign="center">
                      Character Certificate
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="flex-end">
                    {settings.studentImage !== false && (
                      <img
                        src={studentLogo}
                        alt="Student Logo"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </MDBox>
                  <MDBox display="flex" justifyContent="flex-end">
                    {settings.adm_no !== false && (
                      <MDTypography variant="button" color="body3" fontWeight="bold">
                        S.R. No. 12345
                      </MDTypography>
                    )}
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDTypography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    This is to certify that {values.studentname} {values.studentname}{" "}
                    {values.studentname} /o/ {values.studentname} and {values.studentname} is/was a
                    bonafide student of class {values.studentname} in the session{" "}
                    {values.studentname}.<br /> As far as I know {values.studentname} bears{" "}
                    {values.studentname} moral character and during {values.studentname} stay has
                    not violated any rules and regulations of this institution. <br />{" "}
                    <MDBox sx={{ textAlign: "center", width: "100%" }}>
                      I wish {values.studentname} all success in {values.studentname} future.
                    </MDBox>
                  </MDTypography>
                </Grid>

                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={6}
                    px={3}
                  >
                    <MDTypography variant="h6">Date: 31/07/2024</MDTypography>
                    <MDTypography variant="h6">Principal</MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};

export default CC_one;
