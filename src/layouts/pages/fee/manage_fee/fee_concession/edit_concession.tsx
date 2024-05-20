import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function EditConcession(props: any) {
  const initialValues = props.data;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        axios
          .put(
            "http://10.0.20.200:8000/fee_concession",
            { ...values, old_name: props.data.name },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            message.success(response.data.message);
            props.onSuccess();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  return (
    <Card>
      <MDBox p={3}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Edit Fee Concession
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Concession Type"
                name="discount_type"
                value={values.discount_type}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Concession Name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Class Section"
                name="class_section"
                value={values.class_name + "-" + values.section_name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Fee Category"
                name="fee_category"
                value={values.fee_category}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField label="Student Category" name="quota" value={values.quota} disabled />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField label="User Id" name="user_id" value={values.user_id} disabled />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                required
                type="number"
                label="Concession Amount"
                name="discount"
                value={values.discount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField label="Account" name="account_name" value={values.account_name} disabled />
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
            <Grid item>
              <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                Back
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </form>
      </MDBox>
    </Card>
  );
}
