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
// import { useDispatch, useSelector } from "react-redux";
function CoverLogin() {
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [tokendata, setTokendata] = useState("");
  //   const dispatched = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log("myname", token);
  //storing token

  console.log(data, typeof data, "academic data");
  // storing acdemic data

  //   useEffect(() => {
  //     dispatched(updateAcademicName(data));
  //     // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  //   }, [dispatched, data]);
  // storing class data
  console.log(classData, typeof classData, "academic classData");
  //   useEffect(() => {
  //     dispatched(updateClassName(classData));
  //     // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  //   }, [dispatched, classData]);
  //   useEffect(() => {
  //     dispatched(updateSectionName(sectionData));
  //     // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  //   }, [dispatched, sectionData]);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  //   const academicdata = useSelector((state: any) => state.academicName);
  //   console.log("academicdata", academicdata);
  //   const classdata = useSelector((state: any) => state.className);
  //   console.log("classdata", classdata);
  //   const sectiondata = useSelector((state: any) => state.sectionName);
  //   console.log("sectiondata", sectiondata);
  //   useEffect(() => {
  //     fetchAPI(); // Fetch data from API on component mount
  //   }, []);

  //   const fetchAPI = async () => {
  //     try {
  //       const response = await fetch("http://web:8000/mg_academic_year", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = await response.json();

  //       setData(data);
  //       console.log(data, typeof data);
  //       //   decryptData(data[0].encrypted_data);
  //       //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
  //     } catch (error) {
  //       console.log("Error fetching data:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchAPIClass(); // Fetch data from API on component mount
  //   }, []);

  //   const fetchAPIClass = async () => {
  //     try {
  //       const response = await fetch("http://10.0.20.133:8001/mg_class", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const classdata = await response.json();

  //       setClassData(classdata);
  //       console.log(classdata, typeof classdata);
  //       //   decryptData(data[0].encrypted_data);
  //       //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
  //     } catch (error) {
  //       console.log("Error fetching classdata:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchAPISection(); // Fetch data from API on component mount
  //   }, []);

  //   const fetchAPISection = async () => {
  //     try {
  //       const response = await fetch("http://10.0.20.133:8001/mg_section", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const sectiondata = await response.json();

  //       setSectionData(sectiondata);
  //       console.log(sectiondata, typeof sectiondata);
  //       //   decryptData(data[0].encrypted_data);
  //       //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
  //     } catch (error) {
  //       console.log("Error fetching classdata:", error);
  //     }
  //   };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rememberMe, "rememrmber me");
    try {
      // Input validation using validator.js
      const errors = {};

      if (!isEmail(email)) {
        // errors.email = "Invalid email address";
        alert("Invalid email address");
      }

      if (!isLength(password, { min: 8 })) {
        // errors.password = "Password must be at least 8 characters long";
        alert("Password must be at least 8 characters long");
      }

      if (Object.keys(errors).length > 0) {
        // Handle validation errors, e.g., display error messages to the user
        console.log(errors);
        return;
      }

      const sanitizedEmail = email.replace(/[<>"]/g, ""); // Remove <, >, and " characters
      const sanitizedPassword = password.replace(/[<>"]/g, "");

      const res = await axios.post(
        "http://122.166.211.176:8000/login",
        {
          username: sanitizedEmail,
          //   email: sanitizedEmail,
          password: sanitizedPassword,
          //   ph_num: phone,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );
      console.log(res, "hubhcdasssssssssssssssl");

      if (res.data.access_token) {
        // setTokendata(res.data.access_token);
        // Cookies.set("token", res.data.access_token, { httpOnly: true });
        const token = res.data.access_token;
        Cookies.set("token", token, { expires: 7 });
        navigate("/pages/organisations/new-organisation");
        message.success("Login Successful");
      } else {
        message.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
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
            Sign In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                required
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
              />
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
                Remember Me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                // to="/page/template1/create"
                color="info"
                fullWidth
                type="submit"
              >
                Sign In
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Dont have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/page/template1/create"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default CoverLogin;
