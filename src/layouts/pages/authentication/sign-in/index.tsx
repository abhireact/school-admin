// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import axios from "axios";
// // import { isEmail, isLength } from "validator";
// import isLength from "validator/lib/isLength";
// import isEmail from "validator/lib/isEmail";
// import Cookies from "js-cookie";
// import { message } from "antd";

// import CoverLayout from "layouts/pages/authentication/components/CoverLayout";
// import bgImage from "assets/images/bg-sign-in-cover.jpeg";

// import { useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// function CoverLogin() {
//   const [data, setData] = useState([]);
//   const [classData, setClassData] = useState([]);
//   const [sectionData, setSectionData] = useState([]);
//   const [email, setEmail] = useState("");
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [rememberMe, setRememberMe] = useState(true);
//   const [tokendata, setTokendata] = useState("");
//   //   const dispatched = useDispatch();
//   const navigate = useNavigate();

//   //storing token
//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   console.log(rememberMe, "rememrmber me");
//   try {
//     // Input validation using validator.js
//     const errors = {};

//     // if (!isEmail(email)) {
//     //   // errors.email = "Invalid email address";
//     //   alert("Invalid email address");
//     // }

//     if (!isLength(password, { min: 8 })) {
//       // errors.password = "Password must be at least 8 characters long";
//       alert("Password must be at least 8 characters long");
//     }

//     if (Object.keys(errors).length > 0) {
//       // Handle validation errors, e.g., display error messages to the user
//       console.log(errors);
//       return;
//     }

//     const sanitizedEmail = email.replace(/[<>"]/g, ""); // Remove <, >, and " characters
//     const sanitizedPassword = password.replace(/[<>"]/g, "");

//     const res = await axios.post(
//       "http://10.0.20.200:8000/token",
//       {
//         username: email,
//         //   email: sanitizedEmail,
//         password: sanitizedPassword,
//         //   ph_num: phone,
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Accept: "application/json",
//         },
//       }
//     );
//     console.log(res, "login response");

//     if (res.data.access_token) {
//       // setTokendata(res.data.access_token);
//       // Cookies.set("token", res.data.access_token, { httpOnly: true });
//       const token = res.data.access_token;
//       Cookies.set("token", token, { expires: 7 });
//       navigate("/dashboards/analytics");
//       window.location.reload();
//       message.success("Login Successful");
//     } else {
//       message.error("Invalid email or password");
//     }
//   } catch (error) {
//     console.log(error);
//     message.error("Something went wrong");
//   }
// };

//   return (
//     <CoverLayout image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="success"
//           mx={2}
//           mt={-3}
//           p={3}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Sign In
//           </MDTypography>
//           <MDTypography display="block" variant="button" color="white" my={1}>
//             Enter your email and password to Sign In
//           </MDTypography>
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
// <form onSubmit={handleSubmit}>
//   <MDBox mb={2}>
//     <MDInput
//       label="Email"
//       variant="standard"
//       fullWidth
//       required
//       placeholder="john@example.com"
//       InputLabelProps={{ shrink: true }}
//       value={email}
//       onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
//         setEmail(e.target.value)
//       }
//     />
//   </MDBox>
//   <MDBox mb={2}>
//     <MDInput
//       type="password"
//       label="Password"
//       variant="standard"
//       fullWidth
//       required
//       placeholder="************"
//       InputLabelProps={{ shrink: true }}
//       value={password}
//       onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
//         setPassword(e.target.value)
//       }
//     />
//   </MDBox>

//   <MDBox display="flex" alignItems="center" ml={-1}>
//     <Switch required checked={rememberMe} onChange={handleSetRememberMe} />
//     <MDTypography
//       variant="button"
//       fontWeight="regular"
//       color="text"
//       onClick={handleSetRememberMe}
//       sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//     >
//       Remember Me
//     </MDTypography>
//   </MDBox>
//   <MDBox mt={4} mb={1}>
//     <MDButton
//       variant="gradient"
//       // to="/page/template1/create"
//       color="info"
//       fullWidth
//       type="submit"
//     >
//       Sign In
//     </MDButton>
//   </MDBox>
//   <MDBox mt={3} mb={1} textAlign="center">
//     <MDTypography variant="button" color="text">
//       Dont have an account?{" "}
//       <MDTypography
//         component={Link}
//         to="/page/template1/create"
//         variant="button"
//         color="info"
//         fontWeight="medium"
//         textGradient
//       >
//         Sign up
//       </MDTypography>
//     </MDTypography>
//   </MDBox>
// </form>
//         </MDBox>
//       </Card>
//     </CoverLayout>
//   );
// }

// export default CoverLogin;
/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";

// // react-router-dom components
// import { Link } from "react-router-dom";

// // @mui material components
// import Switch from "@mui/material/Switch";

// // Material Dashboard 2 PRO React TS components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// // Authentication layout components

// // Image
// import bgImage from "assets/images/illustrations/schoolimage.jpg";
// import IllustrationLayout from "../components/IllustrationLayout";
// import { Card, Grid } from "@mui/material";

// function CoverLogin(): JSX.Element {
//   const [rememberMe, setRememberMe] = useState<boolean>(false);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

//   return (
//     <Card>
//       <Grid container>
//         <Grid sm={12} sx={{ display: "flex", justifyContent: "center" }}>
//           <h1>Tender Hearts School - Kursi Road</h1>
//         </Grid>
//         <Grid sm={12}>
//           <IllustrationLayout
//             title="Sign In"
//             logo="https://tenderhearts.umantra.co.in/admin/upload/tenderhearts_english_school_logo_tenderhart-logo-color.jpg"
//             description="Enter your Username and password to sign in"
//             illustration={bgImage}
//           >
//             <MDBox component="form" role="form">
//               <MDBox mb={2}>
//                 <MDInput type="email" label="Email" fullWidth />
//               </MDBox>
//               <MDBox mb={2}>
//                 <MDInput type="password" label="Password" fullWidth />
//               </MDBox>
//               <MDBox display="flex" alignItems="center" ml={-1}>
//                 <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//                 <MDTypography
//                   variant="button"
//                   fontWeight="regular"
//                   color="text"
//                   onClick={handleSetRememberMe}
//                   sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//                 >
//                   &nbsp;&nbsp;Remember me
//                 </MDTypography>
//               </MDBox>
//               <MDBox mt={4} mb={1}>
//                 <MDButton variant="gradient" color="info" size="large" fullWidth>
//                   sign in
//                 </MDButton>
//               </MDBox>
//               <MDBox mt={3} textAlign="center">
//                 <MDTypography variant="button" color="text">
//                   Don&apos;t have an account?{" "}
//                   <MDTypography
//                     component={Link}
//                     to="/authentication/sign-up/cover"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Sign up
//                   </MDTypography>
//                 </MDTypography>
//               </MDBox>
//             </MDBox>
//           </IllustrationLayout>
//         </Grid>
//       </Grid>
//     </Card>
//   );
// }

// export default CoverLogin;

/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

// Images
import bgImage from "assets/images/schoolimage.jpg";
import logo from "assets/images/tenderhearts_english_school_logo_tenderhart-logo-color-removebg-preview (1).png";

import BasicLayout from "../components/BasicLayout";
import Cookies from "js-cookie";
import { message } from "antd";
import { isLength } from "validator";
import axios from "axios";
interface LogoData {
  school_logo: string;
  // Add other properties if needed
}
function CoverLogin(): JSX.Element {
  const [username, setUsername] = useState("");
const [logoData, setLogoData] = useState<LogoData | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = window.location.href;

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    try {
      axios
        .post(
          "http://10.0.20.200:8000/mg_school/get_logo",
          {
            url: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          // Assuming your logo data is in response.data
          setLogoData(response.data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rememberMe, "rememrmber me");
    try {
      // Input validation using validator.js
      const errors = {};

      // if (!isEmail(email)) {
      //   // errors.email = "Invalid email address";
      //   alert("Invalid email address");
      // }

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
        `${process.env.REACT_APP_BASE_URL}/token1`,
        {
          username: email,
          url: url,
          password: sanitizedPassword,
          //   ph_num: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(res, "login response");

      if (res.data.access_token) {
        // setTokendata(res.data.access_token);
        // Cookies.set("token", res.data.access_token, { httpOnly: true });
        const token = res.data.access_token;
        Cookies.set("token", token, { expires: 7 });
        navigate("/dashboards/analytics");
        window.location.reload();
        message.success("Login Successful");
      } else {
        message.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  console.log(logoData?.school_logo, "logoData");

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={10}>
              {/* <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography> */}
              <img src={logoData?.school_logo} alt="logo" width="60%" />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
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
    </BasicLayout>
  );
}

export default CoverLogin;
