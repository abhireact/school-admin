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
import { createschema } from "./createschema";
import { Grid, Card, Link } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import { Dashboard } from "@mui/icons-material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const token = Cookies.get("token");
export default function CreateFeeCategory() {
  const initialValues = {
    fee_category_name: "",
    description: "",
    first_perticular: "",
    particulars: [] as string[], // Array to store particulars
  };

  const [particularFields, setParticularFields] = useState([]);
  const data = useSelector((state: any) => state);
  console.log(data.wings, "lllllllllllllllllllllll");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const submitvalue = {
          name: values.fee_category_name,
          description: values.description,
          particular_types: particularFields.map((data: string, index: number) => ({
            particular_name: data,
          })),
        };
        submitvalue.particular_types.unshift({ particular_name: values.first_perticular });

        try {
          const response = await axios.post("http://10.0.20.200:8000/fee_category", submitvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response);

          if (response.status === 200) {
            message.success(" Created Successfully");
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
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
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Fee Category
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Name "
                  name="fee_category_name"
                  value={values.fee_category_name}
                  placeholder="Enter Fee Category Name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fee_category_name && Boolean(errors.fee_category_name)}
                  success={values.fee_category_name.length && !errors.fee_category_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Description"
                  name="description"
                  value={values.description}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={10} sm={6}>
                <FormField
                  label={`Particular`}
                  name={`first_perticular`}
                  value={values.first_perticular}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MDButton
                  color="info"
                  variant="text"
                  type="submit"
                  style={{ fontSize: "16px" }}
                  onClick={addParticularField}
                  pl={2}
                >
                  {"ADD +"}
                </MDButton>
              </Grid>
            </Grid>

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
            ))}
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
