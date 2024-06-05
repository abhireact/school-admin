// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import Icon from "@mui/material/Icon";
// import { Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import Dialog, { DialogProps } from "@mui/material/Dialog";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import FormField from "layouts/pages/account/components/FormField";
// import { useFormik } from "formik";
// import { createschema } from "./createschema";
// export default function CreateFeeCategory() {
//   const initialValues = {
//     fee_category_name: "",
//     description: "",
//     particulars: [] as string[],
//   };
//   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
//     useFormik({
//       initialValues,
//       validationSchema: createschema,
//       enableReinitialize: true,
//       onSubmit: async (values, action) => {},
//     });
//   return (
//     <DashboardLayout>
//       {/* <DashboardNavbar /> */}
//       <form onSubmit={handleSubmit}>
//         <Card>
//           <Grid xs={12} sm={12} p={2}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={12}>
//                 <MDTypography variant="h4" fontWeight="bold" color="secondary">
//                   Create Fee Category
//                 </MDTypography>
//               </Grid>
//             </Grid>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <FormField
//                   label="Name "
//                   name="fee_category_name"
//                   value={values.fee_category_name}
//                   placeholder="Enter Fee Category Name"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.fee_category_name && Boolean(errors.fee_category_name)}
//                   success={values.fee_category_name.length && !errors.fee_category_name}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormField
//                   label="Description"
//                   name="description"
//                   value={values.description}
//                   variant="standard"
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <FormField
//                   label="Particulars"
//                   name="particulars"
//                   value={values.particulars}
//                   variant="standard"
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//             <MDButton variant="gradient" color="info" type="submit" pl={2}>
//               {"Save"}
//             </MDButton>
//           </Grid>
//         </Card>
//       </form>
//     </DashboardLayout>
//   );
// }
import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";
import MDInput from "components/MDInput";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
export default function SmsConfiguration() {
  const initialValues = {
    url: "",
    mobile_number: "",
    attribute: "",
    unicode_key: "", // Array to store particulars
    unicode_value: "", // Array to store particulars
    request_type: "", // Array to store particulars
    sender_id: "", // Array to store particulars
    sender_id_value: "", // Array to store particulars
    english_key: "", // Array to store particulars
    english_value: "", // Array to store particulars
    support_multiple_sms: false, // Array to store particulars
  };
  const [particularFields, setParticularFields] = useState([]);
  const data = useSelector((state: any) => state);
  console.log(data.wings, "lllllllllllllllllllllll");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values);
      },
    });

  // Function to add a new particular field
  const addParticularField = () => {
    setParticularFields([...particularFields, ""]);
  };

  // Function to remove a particular field
  const removeParticularField = (index: any) => {
    const updatedFields = [...particularFields];
    updatedFields.splice(index, 1);
    setParticularFields(updatedFields);
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  SMS Configuration
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      URL
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="url"
                  value={values.url}
                  placeholder="Enter URL"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Mobile Number
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="mobile_number"
                  value={values.mobile_number}
                  placeholder="Enter Mobile number"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Attribute
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="attribute"
                  value={values.attribute}
                  placeholder="Enter Mobile attribute"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Unicode Key
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="unicode_key"
                  value={values.unicode_key}
                  placeholder="Enter Unicode Key"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Unicode Value
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="unicode_value"
                  value={values.unicode_value}
                  placeholder="Enter Unicode Value"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Request Type
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="request_type"
                  value={values.request_type}
                  placeholder="Enter Request Type"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Sender Id
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="sender_id"
                  value={values.sender_id}
                  placeholder="Enter Sender Id"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Sender Id Value
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="sender_id_value"
                  value={values.sender_id_value}
                  placeholder="Enter Sender Id Value"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      English Key
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="english_key"
                  value={values.english_key}
                  placeholder="Enter English Key"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      English Value
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="english_value"
                  value={values.english_value}
                  placeholder="Enter English Value"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Checkbox
                  checked={values.support_multiple_sms}
                  name="support_multiple_sms"
                  value="true"
                  onChange={handleChange}
                />
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Support Multiple SMS
                </MDTypography>
              </Grid>
            </Grid>
            {/* 
            {particularFields.map((particular, index) => (
              <Grid container spacing={3} key={index} p={2}>
                <Grid item xs={10} sm={6}>
                  <FormField
                    label={`Particular ${index + 2}`}
                    name={`particulars.${index}`}
                    value={particular}
                    variant="standard"
                    onChange={(e: any) => {
                      const updatedFields = [...particularFields];
                      updatedFields[index] = e.target.value;
                      setParticularFields(updatedFields);
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={6}>
                  <Icon color="secondary" onClick={() => removeParticularField(index)}>
                    delete
                  </Icon>
                </Grid>
              </Grid>
            ))} */}
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
              <Grid item>
                <Link href="fee_category" variant="body2">
                  <MDButton color="dark" variant="contained">
                    Back
                  </MDButton>
                </Link>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </DashboardLayout>
  );
}
