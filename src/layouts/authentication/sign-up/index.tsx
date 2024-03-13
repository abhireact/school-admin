import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
// import { isEmail, isLength } from "validator";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import Cookies from "js-cookie";
import { message } from "antd";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
// import {
//   updateAcademicName,
//   updateClassName,
//   updateName,
//   updateSectionName,
// } from "../../Redux/action/dummyDataActions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  email: "",
  username: "",
  password: "",
  ph_num: "",
  school_name: "",
  role_name: "Admin",
};
function Cover() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });

  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log("my token ", token);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleFormSubmit = async () => {
    console.log(values, "formdata");
    try {
      const response = await axios.post("http://122.166.211.176:8000/register", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        message.success(" Created Admin  Successfully");
        navigate("/dashboards");

        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="name"
                label="Username"
                name="username"
                value={values.username}
                placeholder="Enter Your username"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && touched.username}
                success={values.username.length && !errors.username}
              />
              {errors.username && touched.username ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.username}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="name"
                label="Email"
                name="email"
                value={values.email}
                placeholder="Enter Your email"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                success={values.email.length && !errors.email}
              />
              {errors.email && touched.email ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.email}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="name"
                label="Password"
                name="password"
                value={values.password}
                placeholder="Enter Your password"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                success={values.password.length && !errors.password}
              />
              {errors.password && touched.password ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.password}
                </MDTypography>
              ) : null}
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="name"
                label="School Name"
                name="school_name"
                value={values.school_name}
                placeholder="Enter Your school_name"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.school_name && touched.school_name}
                success={values.school_name.length && !errors.school_name}
              />
              {errors.school_name && touched.school_name ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.school_name}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch required checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                I agree the Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                // to="/page/template1/create"
                onClick={handleFormSubmit}
                color="info"
                fullWidth
                type="submit"
              >
                Register
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
