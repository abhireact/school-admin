import { useFormik } from "formik";
import { Grid, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import MDInput from "components/MDInput";
const token = Cookies.get("token");
export default function EditConcession(props: any) {
  const initialValues = props.data;
  console.log(props, "props");

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
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Concession Type
                  </MDTypography>
                }
                name="discount_type"
                value={values.discount_type}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Concession Name
                  </MDTypography>
                }
                required
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Class Section
                  </MDTypography>
                }
                name="class_section"
                value={`${values.class_name}-${values.section_name}`}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fee Category
                  </MDTypography>
                }
                name="fee_category"
                value={values.fee_category}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Student Category
                  </MDTypography>
                }
                name="quota"
                value={values.quota}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    User Id
                  </MDTypography>
                }
                name="user_id"
                value={values.user_id}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {props.data.parcentage == true ? (
                <MDInput
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 100,
                    pattern: "[0-9]*",
                  }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Concession %
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  error={
                    parseInt(values.concession_amount) < 0 ||
                    parseInt(values.concession_amount) > 100
                  }
                  helperText={
                    parseInt(values.concession_amount) < 0
                      ? "Concession % must be greater than or equal to 0"
                      : parseInt(values.concession_amount) > 100
                      ? "Concession % must be less than or equal to 100"
                      : ""
                  }
                  variant="standard"
                  name="concession_amount"
                  value={values.concession_amount}
                  onChange={handleChange}
                />
              ) : (
                <MDInput
                  variant="standard"
                  required
                  type="number"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Concession Amount
                    </MDTypography>
                  }
                  name="discount"
                  value={values.discount}
                  onChange={handleChange}
                  error={parseInt(values.discount) < 1}
                  helperText={
                    parseInt(values.discount) < 1
                      ? "Concession Amount must be greater than or equal to 1"
                      : // : parseInt(values.concession_amount) > 100
                        // ? "Concession % must be less than or equal to 100"
                        ""
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Account
                  </MDTypography>
                }
                name="account_name"
                value={values.account_name}
                disabled
              />
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
