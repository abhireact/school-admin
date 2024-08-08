import { Card, Grid, Switch } from "@mui/material";
import { message } from "antd";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import studentLogo from "assets/images/studentLogo.jpeg";
import BGImage from "assets/images/bg_image.png";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

interface SettingsState {
  [key: string]: boolean;
}

const Character_Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentInfo, user_name } = location.state || {};
  const [currentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const displayDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const [settings, setSettings] = useState<SettingsState>({
    watermark: true,
    student_image: true,
    sr_no: true,
  });
  const initialValues = {
    user_name: user_name,
    s_title:
      studentInfo.gender === "Male"
        ? "Master"
        : studentInfo.gender === "Female"
        ? "Miss"
        : "" || studentInfo.s_title,
    student_name: "" || studentInfo.student_name,
    g_title:
      studentInfo.gender === "Male"
        ? "S"
        : studentInfo.gender === "Female"
        ? "D"
        : "" || studentInfo.g_title,
    guardian_name: "" || studentInfo.guardian_name,
    course: "" || studentInfo.course,
    year: "" || studentInfo.year,
    s1_title:
      studentInfo.gender === "Male"
        ? "he"
        : studentInfo.gender === "Female"
        ? "She"
        : "" || studentInfo.s1_title,
    date_of_birth: "" || studentInfo.date_of_birth,
    date_of_issue: formatDate(currentDate),
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } =
    useFormik({
      initialValues: {
        ...initialValues,
        ...studentInfo,
      },
      onSubmit: (values, action) => {
        const { gender, ...filteredValues } = values;
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/mg_bonified_certificate`,
            { ...filteredValues, date_of_issue: formatDate(currentDate) },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            message.success(response.data.message);
            handlePrint();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });

  const handleToggle = (field: string): void => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [field]: !prevSettings[field],
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/certificate/bonified/settings`, newSettings, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // message.success("Updated Successfully!");
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });

      return newSettings;
    });
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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/certificate/bonified/settings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSettings(response.data);
      })
      .catch((error) => {
        setSettings({
          watermark: true,
          student_image: true,
          sr_no: true,
        });
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleGeneratePdf = () => {
    handleSubmit();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <MDBox py={3} px={3}>
          <Grid container spacing={3} mb={2}>
            <Grid item sm={4}>
              {renderSettingToggle("watermark", "Background School Logo")}
            </Grid>
            <Grid item sm={4}>
              {renderSettingToggle("student_image", "Student Image")}
            </Grid>
            <Grid item sm={4}>
              {renderSettingToggle("sr_no", "Sr. Number")}
            </Grid>
          </Grid>

          <Card>
            <Grid container>
              <Grid
                sx={{
                  //   border: "1px solid #dddddd",
                  backgroundImage:
                    settings.watermark !== false
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
                      TO WHOMSOEVER IT MAY CONCERN
                    </MDTypography>
                    <MDBox display="flex" justifyContent="flex-end">
                      {settings.student_image !== false && (
                        <img
                          src={studentLogo}
                          alt="Student Logo"
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                    </MDBox>
                    <MDBox display="flex" justifyContent="flex-end">
                      {settings.sr_no !== false && (
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
                            name="s_title"
                            value={
                              values.s_title ||
                              (studentInfo.gender === "Male"
                                ? "Master"
                                : studentInfo.gender === "Female"
                                ? "Miss"
                                : "")
                            }
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
                            name="student_name"
                            value={values.student_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Aashvi"
                          />
                        </MDBox>
                        <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="g_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "S"
                                : studentInfo.gender === "Female"
                                ? "D"
                                : "" || values.g_title
                            }
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
                            name="guardian_name"
                            value={values.guardian_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Rajesh Kumar"
                          />
                        </MDBox>
                        is/was a bonifide student of class
                        <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="course"
                            value={values.course}
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
                            name="year"
                            value={values.year}
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
                        <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="s1_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "His"
                                : studentInfo.gender === "Female"
                                ? "Her"
                                : "" || values.s1_title
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="he/she"
                          />
                        </MDBox>{" "}
                        date of birth as per the School Admission Register is
                        <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="date_of_birth"
                            value={values.date_of_birth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="he/she"
                          />
                        </MDBox>
                      </MDTypography>
                    </Grid>
                  </Grid>

                  <MDBox mt={10} display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6">Date: {displayDate(currentDate)}</MDTypography>
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
              <MDButton variant="contained" color="info" onClick={handleGeneratePdf}>
                Generate PDF
              </MDButton>
            </Grid>
            <Grid item mt={2} ml={2}>
              <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
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
                      settings.watermark !== false
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
                        TO WHOMSOEVER IT MAY CONCERN
                      </MDTypography>
                    </MDBox>
                    <MDBox display="flex" justifyContent="flex-end">
                      {settings.student_image !== false && (
                        <img
                          src={studentLogo}
                          alt="Student Logo"
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                    </MDBox>
                    <MDBox display="flex" justifyContent="flex-end">
                      {settings.sr_no !== false && (
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
                      {values.studentname} /o/ {values.studentname} and {values.studentname} is/was
                      a bonafide student of class {values.studentname} in the session{" "}
                      {values.studentname}.
                      <MDBox sx={{ textAlign: "center", width: "100%" }}>
                        {values.studentname} date of birth as per the School Admission Register is
                        {values.studentname}.
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
                      <MDTypography variant="h6">Date: {displayDate(currentDate)}</MDTypography>
                      <MDTypography variant="h6">Principal</MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </MDBox>
        </MDBox>
      </form>
    </DashboardLayout>
  );
};

export default Character_Certificate;
