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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/pages/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
function Cover(): JSX.Element {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://10.0.20.200:8000/mg_reset_password",
        {
          old_password: old_password,
          //   email: sanitizedEmail,
          new_password: new_password,
          //   ph_num: phone,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );
      console.log(res, "response");

      if (res.data.access_token) {
        // setTokendata(res.data.access_token);
        // Cookies.set("token", res.data.access_token, { httpOnly: true });
        const token = res.data.access_token;
        Cookies.set("token", token, { expires: 7 });
        navigate("/dashboards/analytics");
        message.success("Reset Successful");
      } else {
        message.error("Invalid  Password");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}></MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  label="Password"
                  variant="standard"
                  value={old_password}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                    setOldPassword(e.target.value)
                  }
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  label="New Password"
                  variant="standard"
                  value={new_password}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                    setNewPassword(e.target.value)
                  }
                  fullWidth
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth>
                  reset
                </MDButton>
              </MDBox>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
