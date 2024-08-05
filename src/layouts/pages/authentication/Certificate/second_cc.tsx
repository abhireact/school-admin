import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDAvatar from "components/MDAvatar";
import Cookies from "js-cookie";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { message } from "antd";
import MDButton from "components/MDButton";
import { useReactToPrint } from "react-to-print";
const token = Cookies.get("token");
const initialValues = {
  studentname: "",
  class_name: "",
  his: "",
};

const Second_CC = () => {
  const [profileData, setProfileData] = useState(null);
  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values, action) => {},
    });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} px={3}>
        <Card>
          <MDBox py={3} px={3}>
            <MDBox mb={5}>
              <MDTypography variant="h5" textAlign="center" sx={{ fontStyle: "italic" }}>
                Character Certificate
              </MDTypography>
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
                  Certified that
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Miss"
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
                      placeholder="Kajal"
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
                  /o
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ananat"
                    />
                  </MDBox>
                  and
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Seema"
                    />
                  </MDBox>
                  is/was a bonifide student of{" "}
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" St. Fidelis College, Vikas Nagar, Lucknow"
                    />
                  </MDBox>
                  from
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="07-07-2024"
                    />
                  </MDBox>
                  to{" "}
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="07-07-2024"
                    />
                  </MDBox>
                  {values.his}
                  date of birth according to the Admission Register is
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="07-07-2001"
                    />
                  </MDBox>
                  {values.his} conduct has been {values.his}
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="2009"
                    />
                  </MDBox>
                  passed the
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </MDBox>
                  Examination in
                  <MDBox sx={{ width: "auto", marginLeft: 1, flexShrink: 0 }}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="studentname"
                      value={values.studentname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </MDBox>
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                mt={2}
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
                  During {values.his} stay in this college {values.his} took part in the Sports
                  activities: Athlete, Swimming, Debate, Dance, Singing, Elocution, Dramatics,
                  Creative Writing. As far as {values.his} is known to me
                  {values.his} bears a good moral character.
                </MDTypography>
              </Grid>
              <Grid
                item
                // marginLeft={4}
                mt={2}
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
                  We wish
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
                  success in {values.his} future endeavours.
                </MDTypography>
              </Grid>
            </Grid>

            <MDBox mt={12} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6">Date: 31/07/2024</MDTypography>
              <MDTypography variant="h6">Principal</MDTypography>
            </MDBox>
          </MDBox>
        </Card>
        <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
        <Card>
          <MDBox className="report-hidden-text" ref={componentRef} py={3} px={3}>
            <MDBox mb={5}>
              <MDTypography variant="h5" textAlign="center">
                Character Certificate
              </MDTypography>
            </MDBox>
            <Grid container>
              <Grid item xs={12}>
                <MDTypography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  Certified that {values.studentname} {values.studentname}
                  {values.studentname}
                  /o
                  {values.studentname}
                  and
                  {values.studentname}
                  is/was a bonifide student of {values.studentname}
                  from
                  {values.studentname}
                  to {values.studentname}
                  {values.his}
                  date of birth according to the Admission Register is
                  {values.studentname}
                  {values.his} conduct has been {values.his}
                  {values.studentname}
                  passed the
                  {values.studentname}
                  Examination in
                  {values.studentname}
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                mt={2}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <MDTypography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  During {values.his} stay in this college {values.his} took part in the Sports
                  activities: Athlete, Swimming, Debate, Dance, Singing, Elocution, Dramatics,
                  Creative Writing. As far as {values.his} is known to me
                  {values.his} bears a good moral character.
                </MDTypography>
              </Grid>
              <Grid
                item
                // marginLeft={4}
                mt={2}
                xs={12}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <MDTypography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  We wish {values.studentname} success in {values.his} future endeavours.
                </MDTypography>
              </Grid>
            </Grid>

            <MDBox mt={12} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6">Date: 31/07/2024</MDTypography>
              <MDTypography variant="h6">Principal</MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
};

export default Second_CC;
