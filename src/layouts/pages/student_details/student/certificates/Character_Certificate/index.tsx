import { Card, Grid, Switch } from "@mui/material";
import { message } from "antd";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import studentLogo from "assets/images/studentLogo.jpeg";
import BGImage from "assets/images/bg_image.png";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";

const token = Cookies.get("token");

interface SettingsState {
  [key: string]: boolean;
}

const Character_Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentInfo, user_name } = location.state || {};
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
    g1_title:
      studentInfo.gender === "Male"
        ? "S"
        : studentInfo.gender === "Female"
        ? "D"
        : "" || studentInfo.g1_title,
    gurdian_name: "" || studentInfo.gurdian_name,
    course: "" || studentInfo.course,
    year: "" || studentInfo.year,
    s1_title:
      studentInfo.gender === "Male"
        ? "he"
        : studentInfo.gender === "Female"
        ? "She"
        : "" || studentInfo.s1_title,
    s2_title: "" || studentInfo.s2_title,
    s3_title:
      studentInfo.gender === "Male"
        ? "his"
        : studentInfo.gender === "Female"
        ? "her"
        : "" || studentInfo.s3_title,
    s4_title:
      studentInfo.gender === "Male"
        ? "him"
        : studentInfo.gender === "Female"
        ? "her  "
        : "" || studentInfo.s4_title,
    s5_title:
      studentInfo.gender === "Male"
        ? "him"
        : studentInfo.gender === "Female"
        ? "her"
        : "" || studentInfo.s5_title,
    date_of_birth: "" || studentInfo.date_of_birth,
    birth_date: "" || studentInfo.birth_date,
    cond: "" || studentInfo.cond,
    passed: "" || studentInfo.passed,
    division: "" || studentInfo.division,
    course_from: "" || studentInfo.course_from,
    course_to: "" || studentInfo.course_to,
    gender: "" || studentInfo.gender,
  };
  const [currentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const displayDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } =
    useFormik({
      initialValues: {
        ...initialValues,
        ...studentInfo,
      },
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/certificate/character/student`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
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
        .post(`${process.env.REACT_APP_BASE_URL}/certificate/character/settings`, newSettings, {
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
      .get(`${process.env.REACT_APP_BASE_URL}/certificate/character/settings`, {
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
                      Character Certificate
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
                            name="g1_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "S"
                                : studentInfo.gender === "Female"
                                ? "D"
                                : "" || values.g1_title
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
                            name="gurdian_name"
                            value={values.gurdian_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Rajesh Kumar"
                          />
                        </MDBox>
                        is/was a bonifide student of class{" "}
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
                        As far as i know{" "}
                        <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="s1_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "he"
                                : studentInfo.gender === "Female"
                                ? "she"
                                : "" || values.s1_title
                            }
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
                            name="s2_title"
                            value={values.s2_title}
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
                            name="s3_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "his"
                                : studentInfo.gender === "Female"
                                ? "her"
                                : "" || values.s3_title
                            }
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
                            name="s4_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "him"
                                : studentInfo.gender === "Female"
                                ? "her  "
                                : "" || values.s4_title
                            }
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
                            name="s5_title"
                            value={
                              studentInfo.gender === "Male"
                                ? "him"
                                : studentInfo.gender === "Female"
                                ? "her"
                                : "" || values.s5_title
                            }
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
                        Character Certificate
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
                      This is to certify that{" "}
                      {values.s_title || studentInfo.gender === "Male" ? "Master" : "Miss"}{" "}
                      {values.student_name}{" "}
                      {values.g1_title || studentInfo.gender === "Male" ? "S" : "D"} /o/{" "}
                      {values.gurdian_name} is/was a bonafide student of class {values.course} in
                      the session {values.year}.<br /> As far as I know{" "}
                      {values.s1_title || studentInfo.gender === "Male" ? "he" : "she"} bears{" "}
                      {values.s2_title} moral character and during{" "}
                      {values.s3_title || studentInfo.gender === "Male" ? "his" : "her"} stay has
                      not violated any rules and regulations of this institution. <br />{" "}
                      <MDBox sx={{ textAlign: "center", width: "100%" }}>
                        I wish {values.s4_title || studentInfo.gender === "Male" ? "him" : "her"}{" "}
                        all success in{" "}
                        {values.s5_title || studentInfo.gender === "Male" ? "his" : "her"} future.
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
