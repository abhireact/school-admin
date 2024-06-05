// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // import VerticalTabs from "./tablepanal";
// import {
//   Autocomplete,
//   Card,
//   Checkbox,
//   FormControlLabel,
//   Grid,
// } from "@mui/material";
// import MDButton from "components/MDButton";
// import FormField from "layouts/applications/wizard/components/FormField";
// import { useFormik } from "formik";
// import MDInput from "components/MDInput";
// const initialValues = {
//   templates: "",
//   select_event: "Invoice Generated",
//   auto_send: false,

//   payment_recipt_reset: [] as string[],
// };
// const Templates = () => {
//   const { values, handleBlur, handleChange, errors, touched } = useFormik({
//     initialValues,
//     // validationSchema: organisationSchema,
//     enableReinitialize: true,
//     onSubmit: () => {
//       // console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       // action.resetForm();
//     },
//   });
//   const eventOption = [
//     "Birthday Wish",
//     "Anniversery Wish",
//     "Invoice Generated",
//     "Delivery Note Generated",
//     "Proforma Generated",
//     "Quotation Generated",
//     "Amount Due",
//     "Due Alert",
//     "Payment Received",
//   ];
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
//               SMS Templates
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
//         <Grid sm={6} p={1}>
//           {" "}
//           <Autocomplete
//             //   sx={{ width: "70%" }}
//             // multiple
//             defaultValue="Invoice Generated"
//             onChange={(event: any, value: any) => {
//               handleChange({ target: { name: "select_event", value } });
//             }}
//             options={eventOption}
//             renderInput={(params: any) => (
//               <FormField
//                 label={"Select Event"}
//                 InputLabelProps={{ shrink: true }}
//                 name="select_event"
//                 placeholder="Select Event"
//                 onChange={handleChange}
//                 value={values.select_event}
//                 {...params}
//                 onBlur={handleBlur}
//                 variant="standard"
//               />
//             )}
//           />
//         </Grid>
//         <Grid sm={4} p={1} display="flex" justifyContent="flex-end">
//           <FormControlLabel
//             value="end"
//             control={
//               <Checkbox
//                 checked={values.auto_send}
//                 onChange={handleChange}
//                 name="auto_send"
//                 value="Hourly"
//               />
//             }
//             label={
//               <MDTypography variant="caption"> Auto Send SMS</MDTypography>
//             }
//             labelPlacement="end"
//           />
//         </Grid>
//         <Grid item sm={9}>
//           <MDInput
//             sx={{ minWidth: "100%" }}
//             label={"Template"}
//             multiline
//             rows={5}
//             variant="standard"
//             name="templates"
//             placeholder="Enter Template"
//             value={values.templates}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.templates && Boolean(errors.templates)}
//             helperText={touched.templates && errors.templates}
//           />
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// };

// export default Templates;

/************************************************************************************** */

import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import FormField from "layouts/applications/wizard/components/FormField";
import { useFormik } from "formik";
import MDInput from "components/MDInput";

const Templates = () => {
  const [message, setMessage] = useState("");
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      templates: "",
      select_event: "Invoice Generated",
      auto_send: false,
      payment_recipt_reset: [] as string[],
    },
    enableReinitialize: true,
    onSubmit: () => {
      // Handle form submission
    },
  });
  const name = "Hariom";
  const amount = 1000;
  const duedate = "12 / 02 / 2024";
  const eventOption = [
    "Birthday Wish",
    "Anniversary Wish",
    "Invoice Generated",
    "Delivery Note Generated",
    "Proforma Generated",
    "Quotation Generated",
    "Amount Due",
    "Due Alert",
    "Payment Received",
  ];

  const messageMap = {
    "Birthday Wish": (name: any) =>
      `Dear ${name}, we wish you a very Happy Birthday and a great year ahead!`,
    "Anniversary Wish": (name: any) =>
      `Dear ${name}, we wish you a very happy marriage anniversary and a great year ahead!`,
    "Invoice Generated": (name: any, amount: any) =>
      `Dear ${name}, Invoice of ${amount} is generated successfully. Please pay the due amount. If already paid, ignore this message.`,
    "Delivery Note Generated": (name: any) => `Dear ${name}, Delivery note has been generated.`,
    "Proforma Generated": (name: any, amount: any) =>
      `Dear ${name}, Proforma of ${amount} is generated successfully for your reference.`,
    "Quotation Generated": (name: any, amount: any, validityPeriod: any) =>
      `Dear ${name}, Quotation of ${amount} is generated successfully for your reference. Please refer to the quotation for the validity period.`,
    "Amount Due": (name: any, amount: any) =>
      `Dear ${name}, You are requested to pay ${amount} as soon as possible to clear your outstanding balance.`,
    "Due Alert": (name: any, amount: any, dueDate: any) =>
      `Dear ${name}, You are requested to pay ${amount} on or before ${dueDate} to clear your outstanding balance.`,
    "Payment Received": (name: any, amount: any) =>
      `Dear ${name}, We received ${amount} from you on account of the account balance. Your amount will be credited shortly.`,
  };

  const handleEventOptionChange = (event: any, value: string | number) => {
    handleChange({ target: { name: "select_event", value } });
    const selectedMessageFunc = messageMap[value as keyof typeof messageMap];
    if (selectedMessageFunc) {
      setMessage(selectedMessageFunc(name, amount, duedate));
    } else {
      setMessage(""); // If no message function found for the selected event
    }
  };

  return (
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
              Email Templates
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="info" type="submit">
              Submit
            </MDButton>
          </Grid>
        </Grid>
        <Grid sm={6} p={1}>
          <Autocomplete
            defaultValue="Invoice Generated"
            onChange={handleEventOptionChange}
            options={eventOption}
            renderInput={(params) => (
              <FormField
                label={"Select Event"}
                InputLabelProps={{ shrink: true }}
                name="select_event"
                placeholder="Select Event"
                onChange={handleChange}
                value={values.select_event}
                onBlur={handleBlur}
                variant="standard"
                {...params}
              />
            )}
          />
        </Grid>
        <Grid sm={4} p={1} display="flex" justifyContent="flex-end">
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                checked={values.auto_send}
                onChange={handleChange}
                name="auto_send"
                value="Hourly"
              />
            }
            label={<MDTypography variant="caption">Auto Send SMS</MDTypography>}
            labelPlacement="end"
          />
        </Grid>
        <Grid item sm={9}>
          <MDInput
            sx={{ minWidth: "100%" }}
            label={"Template"}
            multiline
            rows={5}
            variant="standard"
            name="templates"
            placeholder="Enter Template"
            value={message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.templates && Boolean(errors.templates)}
            helperText={touched.templates && errors.templates}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Templates;
