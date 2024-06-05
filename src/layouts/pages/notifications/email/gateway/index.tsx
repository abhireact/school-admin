// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // import VerticalTabs from "./tablepanal";
// import { Autocomplete, Card, Grid } from "@mui/material";
// import MDButton from "components/MDButton";
// import MDInput from "components/MDInput";
// import FormField from "layouts/applications/wizard/components/FormField";
// import { useFormik } from "formik";
// const initialValues = {
//   email_gateway: "Gmail",
//   email_address: "",
//   outgoing_smtp: "",
//   server_port: 0,
//   username: "",
//   password: "",
// };
// const Gateway = () => {
//   const gatewayOption = ["Gmail", "Yahoo", "Other"];
//   const { values, handleBlur, handleChange, errors, touched } = useFormik({
//     initialValues,
//     // validationSchema: organisationSchema,
//     enableReinitialize: true,
//     onSubmit: () => {
//       // console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       // action.resetForm();
//     },
//   });
//   console.log(values, "values");
//   return (
//     <MDBox p={3}>
//       <Grid container spacing={3}>
//         <Grid
//           sm={12}
//           py={2}
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             borderBottom: "2px solid #3873E8",
//           }}
//         >
//           <Grid item xs={12} sm={9} display="flex" justifyContent="flex-start">
//             <MDTypography variant="h4" color="info" px={2}>
//               Email Gateway Details
//             </MDTypography>
//           </Grid>
//           <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
//             <MDButton
//               variant="gradient"
//               color="info"
//               type="submit"
//               //   onClick={() => {
//               //     handleFormSubmit();
//               //   }}
//             >
//               {/* <MDTypography variant="caption" fontWeight="bold">
//                   {" "}
//                   <NotificationsActiveIcon />
//                   Set Reminder
//                 </MDTypography> */}
//               Submit
//             </MDButton>
//           </Grid>
//         </Grid>
//         <Grid item sm={6}>
//           {" "}
//           <Autocomplete
//             //   sx={{ width: "70%" }}
//             // multiple
//             defaultValue="Select"
//             onChange={(event: any, value: any) => {
//               handleChange({ target: { name: "email_gateway", value } });
//             }}
//             // value={department}
//             // onChange={handleMainFieldChange}
//             options={gatewayOption}
//             renderInput={(params: any) => (
//               <FormField
//                 label={"Email Gateway"}
//                 InputLabelProps={{ shrink: true }}
//                 name="email_gateway"
//                 placeholder="Select Email gateway"
//                 onChange={handleChange}
//                 value={values.email_gateway}
//                 {...params}
//                 onBlur={handleBlur}
//                 variant="standard"
//               />
//             )}
//           />
//         </Grid>
//         <Grid item sm={6}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Email Address"}
//             type="email"
//             variant="standard"
//             name="email_address"
//             placeholder="Enter Template"
//             value={values.email_address}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.email_address && Boolean(errors.email_address)}
//             helperText={touched.email_address && errors.email_address}
//           />
//         </Grid>
//         <Grid item sm={6}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Outing SMTP"}
//             type="name"
//             variant="standard"
//             name="outgoing_smtp"
//             placeholder="Enter Outing SMTP"
//             value={values.outgoing_smtp}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.outgoing_smtp && Boolean(errors.outgoing_smtp)}
//             helperText={touched.outgoing_smtp && errors.outgoing_smtp}
//           />
//         </Grid>
//         <Grid item sm={6}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Server Port"}
//             type="number"
//             variant="standard"
//             name="server_port"
//             placeholder="Enter Template"
//             value={values.server_port}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.server_port && Boolean(errors.server_port)}
//             helperText={touched.server_port && errors.server_port}
//           />
//         </Grid>{" "}
//         <Grid item sm={6}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Username"}
//             type="name"
//             variant="standard"
//             name="username"
//             placeholder="Enter Template"
//             value={values.username}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.username && Boolean(errors.username)}
//             helperText={touched.username && errors.username}
//           />
//         </Grid>
//         <Grid item sm={6}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Password"}
//             type="password"
//             variant="standard"
//             name="password"
//             placeholder="Enter Template"
//             value={values.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.password && Boolean(errors.password)}
//             helperText={touched.password && errors.password}
//           />
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// };

// export default Gateway;

import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import { useFormik } from "formik";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const Gateway = () => {
  const gatewayOption = ["Gmail", "Yahoo", "Other"];
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      email_gateway: "Other",
      email_address: "",
      outgoing_smtp: "",
      server_port: 587,
      username: "",
      password: "",
      active: false,
      ssl_tls: false,
    },
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });

  const handleGatewayChange = (event: any, value: any) => {
    handleChange({ target: { name: "email_gateway", value } });
    switch (value) {
      case "Gmail":
        handleChange({
          target: { name: "outgoing_smtp", value: "smtp.gmail.com" },
        });
        handleChange({ target: { name: "server_port", value: 587 } });
        break;
      case "Yahoo":
        handleChange({
          target: { name: "outgoing_smtp", value: "smtp.mail.yahoo.com" },
        });
        handleChange({ target: { name: "server_port", value: 587 } });
        break;
      default:
        handleChange({ target: { name: "outgoing_smtp", value: "" } });
        handleChange({ target: { name: "server_port", value: 0 } });
        break;
    }
  };
  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");

      const response = await axios.post("http://10.0.20.121:8000/email_service ", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      // console.log(response);

      if (response.status === 200) {
        console.log(" Created Employee Successfully");
        message.success(" Created Employee Successfully");
        // setIsSubmit(true);
        // navigate("/pages/employee/employee-invitation");
        // setDataSubmitted(true);
        // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid
            sm={12}
            py={2}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              borderBottom: "2px solid #3873E8",
            }}
          >
            <Grid item xs={12} sm={9} display="flex" justifyContent="flex-start">
              <MDTypography variant="h4" color="info" px={2}>
                Email Gateway Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton
                variant="gradient"
                color="info"
                type="submit"
                onClick={() => {
                  handleFormSubmit();
                }}
              >
                Submit
              </MDButton>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Autocomplete
              defaultValue="Other"
              onChange={handleGatewayChange}
              options={gatewayOption}
              renderInput={(params) => (
                <FormField
                  label={"Email Gateway"}
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
          <Grid item sm={6}>
            <MDInput
              sx={{ minWidth: "100%" }}
              label={"Email Address"}
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
          <Grid item sm={6}>
            <MDInput
              sx={{ minWidth: "100%" }}
              label={"Outgoing SMTP"}
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
          <Grid item sm={6}>
            <MDInput
              sx={{ minWidth: "100%" }}
              label={"Server Port"}
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
          <Grid item sm={6}>
            <MDInput
              sx={{ minWidth: "100%" }}
              label={"Username"}
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
          <Grid item sm={6}>
            <MDInput
              sx={{ minWidth: "100%" }}
              label={"Password"}
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
          <Grid sm={4} px={4} display="flex" justifyContent="flex-start">
            <FormControlLabel
              value="end"
              control={<Checkbox checked={values.ssl_tls} onChange={handleChange} name="ssl_tls" />}
              label={<MDTypography variant="caption">Use SSL/TLS</MDTypography>}
              labelPlacement="end"
            />
          </Grid>
          <Grid sm={4} px={2} display="flex" justifyContent="flex-end">
            <FormControlLabel
              value="end"
              control={<Checkbox checked={values.active} onChange={handleChange} name="active" />}
              label={<MDTypography variant="caption">Active</MDTypography>}
              labelPlacement="end"
            />
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Gateway;
