// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ForwardIcon from "@mui/icons-material/Forward";
// // import VerticalTabs from "./tablepanal";
// import { useState } from "react";
// import { Drawer } from "antd";
// import PropTypes from "prop-types";

// import { Grid, Tab, Tabs } from "@mui/material";
// import { AppBar } from "@mui/material";
// import theme from "assets/theme";
// import SwipeableViews from "react-swipeable-views";

// import Templates from "./templates";
// import Gateway from "./gateway";
// import SentEmail from "./sentemail";
// function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <MDBox sx={{ p: 3 }}>
//           <MDTypography>{children}</MDTypography>
//         </MDBox>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const EmailSetting = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(0);

//   const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
//     setValue(newValue);
//   };
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox p={3}>
//         <Grid container spacing={3}>
//           <Grid
//             sm={12}
//             py={2}
//             sx={{
//               display: "flex",
//               justifyContent: "flex-start",
//               borderBottom: "2px solid #3873E8",
//             }}
//           >
//             <MDTypography variant="h4" color="info" px={2}>
//               Email Management Tool{" "}
//             </MDTypography>
//           </Grid>
//           <Grid p={2} sm={12}>
//             <MDTypography variant="caption" fontWeight={"bold"}>
//               This tool allow you to configure email gateway and enable application to send email. |
//             </MDTypography>
//           </Grid>
//           <Grid px={2} sm={12}>
//             <MDTypography variant="caption" fontWeight={"bold"}>
//               What you can do using this tool
//             </MDTypography>
//           </Grid>
//           <Grid px={2} sm={12}>
//             <MDTypography variant="caption">1. Configure email gateway</MDTypography>
//           </Grid>
//           <Grid px={2} sm={12}>
//             <MDTypography variant="caption">2. Set email templates</MDTypography>
//           </Grid>{" "}
//           <Grid px={2} sm={12}>
//             <MDTypography variant="caption">3. check sent email log</MDTypography>
//           </Grid>
//           <Grid p={2} sm={12}>
//             <MDButton
//               variant="outlined"
//               color="info"
//               //   onClick={toggleDrawer(true)}
//               onClick={showDrawer}
//             >
//               Start <ForwardIcon fontSize={"large"} />
//             </MDButton>
//           </Grid>
//         </Grid>

//         <Drawer
//           //   zIndex={5}
//           title="Email Management Tool"
//           placement="right"
//           onClose={onClose}
//           open={open}
//           width={900}
//           style={{ paddingTop: "10%" }}
//         >
//           {/* verticle table bar  */}
//           <MDBox
//             sx={{
//               bgcolor: "background.paper",
//               // width: 500,
//               position: "relative",
//               minHeight: 200,
//             }}
//           >
//             <AppBar position="static" color="default">
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 indicatorColor="primary"
//                 textColor="primary"
//                 variant="fullWidth"
//                 aria-label="action tabs example"
//               >
//                 <Tab label="Gateway" {...a11yProps(0)} />
//                 <Tab label="Templates" {...a11yProps(1)} />
//                 <Tab label="Sent Email" {...a11yProps(2)} />
//               </Tabs>
//             </AppBar>
//             <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value}>
//               <TabPanel value={value} index={0} dir={theme.direction}>
//                 <Gateway />
//               </TabPanel>
//               <TabPanel value={value} index={1} dir={theme.direction}>
//                 <Templates />
//               </TabPanel>
//               <TabPanel value={value} index={2} dir={theme.direction}>
//                 <SentEmail />{" "}
//               </TabPanel>
//             </SwipeableViews>
//           </MDBox>
//         </Drawer>
//       </MDBox>
//     </DashboardLayout>
//   );
// };

// export default EmailSetting;

import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import { useFormik } from "formik";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface EmailGatewayConfig {
  email_gateway: string;
  email_address: string;
  outgoing_smtp: string;
  server_port: string;
  username: string;
  password: string;
  active: boolean;
  use_ssl_tls: boolean;
}
const EmailSetting = () => {
  const [emailConfigData, setEmailConfigData] = useState<EmailGatewayConfig>({
    email_gateway: "Other",
    email_address: "",
    outgoing_smtp: "",
    server_port: "587",
    username: "",
    password: "",
    active: false,
    use_ssl_tls: false,
  });
  const [isEdit, setIsEdit] = useState("");
  const gatewayOption = ["Gmail", "Yahoo", "Other"];
  const initialValues =
    isEdit == "edit"
      ? emailConfigData
      : {
          email_gateway: "Other",
          email_address: "",
          outgoing_smtp: "",
          server_port: "587",
          username: "",
          password: "",
          active: false,
          use_ssl_tls: false,
        };
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      const putvalue = { ...values, old_email_address: emailConfigData.email_address };
      if (isEdit == "edit") {
        axios
          .put("http://10.0.20.200:8000/email_service", putvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
            action.resetForm();
          })
          .catch((error) => {
            message.error(error.response.data.detail);
          });
      } else {
        axios
          .post("http://10.0.20.200:8000/email_service", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
            action.resetForm();
          })
          .catch((error) => {
            message.error(error.response.data.detail);
          });
      }
    },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/email_service`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmailConfigData(response.data[0]);
        setIsEdit("edit");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleGatewayChange = (event: any, value: any) => {
    handleChange({ target: { name: "email_gateway", value } });
    switch (value) {
      case "Gmail":
        handleChange({
          target: { name: "outgoing_smtp", value: "smtp.gmail.com" },
        });
        handleChange({ target: { name: "server_port", value: "587" } });
        break;
      case "Yahoo":
        handleChange({
          target: { name: "outgoing_smtp", value: "smtp.mail.yahoo.com" },
        });
        handleChange({ target: { name: "server_port", value: "587" } });
        break;
      default:
        handleChange({ target: { name: "outgoing_smtp", value: "" } });
        handleChange({ target: { name: "server_port", value: 0 } });
        break;
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Email Configuration
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item sm={4}>
                <Autocomplete
                  value={values.email_gateway}
                  defaultValue="Other"
                  onChange={handleGatewayChange}
                  options={gatewayOption}
                  renderInput={(params) => (
                    <MDInput
                      required
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Email Gateway
                        </MDTypography>
                      }
                      InputLabelProps={{ shrink: true }}
                      name="email_gateway"
                      placeholder="Select Email gateway"
                      onChange={handleChange}
                      value={values.email_gateway}
                      {...params}
                      onBlur={handleBlur}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <MDInput
                  required
                  sx={{ minWidth: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Email Address
                    </MDTypography>
                  }
                  type="email"
                  variant="standard"
                  name="email_address"
                  placeholder="Enter Email Address"
                  value={values.email_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email_address && Boolean(errors.email_address)}
                  helperText={touched.email_address && errors.email_address}
                />
              </Grid>
              <Grid item sm={4}>
                <MDInput
                  required
                  sx={{ minWidth: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Outgoing SMTP
                    </MDTypography>
                  }
                  type="text"
                  variant="standard"
                  name="outgoing_smtp"
                  placeholder="Outgoing SMTP"
                  value={values.outgoing_smtp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.outgoing_smtp && Boolean(errors.outgoing_smtp)}
                  helperText={touched.outgoing_smtp && errors.outgoing_smtp}
                />
              </Grid>
              <Grid item sm={4}>
                <MDInput
                  required
                  sx={{ minWidth: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Server Port
                    </MDTypography>
                  }
                  type="number"
                  variant="standard"
                  name="server_port"
                  placeholder="Server Port"
                  value={values.server_port}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.server_port && Boolean(errors.server_port)}
                  helperText={touched.server_port && errors.server_port}
                />
              </Grid>
              <Grid item sm={4}>
                <MDInput
                  required
                  sx={{ minWidth: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Username
                    </MDTypography>
                  }
                  type="text"
                  variant="standard"
                  name="username"
                  placeholder="Enter Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid item sm={4}>
                <MDInput
                  required
                  sx={{ minWidth: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Password
                    </MDTypography>
                  }
                  type="password"
                  variant="standard"
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item sm={4}>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={values.use_ssl_tls}
                      onChange={handleChange}
                      name="use_ssl_tls"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Use SSL/TLS
                    </MDTypography>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item sm={4}>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox checked={values.active} onChange={handleChange} name="active" />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Active
                    </MDTypography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
            <Grid container px={3} pb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item ml={2}>
                <MDButton color="info" type="submit" variant="contained">
                  SAVE
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default EmailSetting;
