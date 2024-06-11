import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
export default function CreateTemplateForm(props: any) {
  const initialValues = props.data
    ? props.data
    : {
        module_name: "",
        sms_activity: "",
        message: "",
        vendor: "",
        P_id: "",
        template_id: "",
      };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        if (props.data) {
          const putvalues = {
            old_module_name: props.data.module_name,
            old_sms_activity: props.data.sms_activity,
            ...values,
          };
          axios
            .put("http://10.0.20.200:8000/mg_templates/school_incharge", putvalues, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                message.success(response.data.message);
                props.onSuccess();
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        } else {
          axios
            .post("http://10.0.20.200:8000/mg_templates/school_incharge", values, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                message.success(response.data.message);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid xs={12} sm={12} p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {props.data ? "Edit Template" : "Create Sms Template"}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "module_name", value } });
                }}
                options={["CLASSES"]}
                renderInput={(params) => (
                  <MDInput
                    // required
                    name="module_name"
                    onChange={handleChange}
                    value={values.module_name}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Module
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "vendor", value } });
                }}
                options={["SMS WORLD"]}
                renderInput={(params) => (
                  <MDInput
                    // required
                    name="vendor"
                    onChange={handleChange}
                    value={values.vendor}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Vender
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    SMS Activity
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="sms_activity"
                value={values.sms_activity}
                placeholder=" "
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    P ID
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="P_id"
                value={values.P_id}
                placeholder=" "
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Template ID
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="template_id"
                value={values.template_id}
                placeholder=" "
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Message
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="message"
                value={values.message}
                placeholder="Enter Message"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container px={3} pb={2} sx={{ display: "flex", justifyContent: "flex-end" }} mt={1}>
          <Grid item>
            <Link href="/pages/notification/message_template" variant="body2">
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
        <Grid
          container
          px={3}
          pb={2}
          sx={{ display: "flex", justifyContent: "flex-center" }}
          mt={1}
        >
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Defination of Terms
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$User_ID]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">User ID of SMS Recipient</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$User_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">Name of SMS Recipient</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$Current_date]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">Currrent Date</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$School_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">School Name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$Child_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">Child name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="h6" color="secondary">
              [$Amount]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="button">Amount</MDTypography>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}
