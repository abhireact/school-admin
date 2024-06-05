import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
export default function WeekDays() {
  const initialValues = {
    wing_name: "",
  };
  const { classes, account, studentcategory, wings } = useSelector((state: any) => state);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: commonacademicyear,
      enableReinitialize: true,
      onSubmit: async (values, action) => {},
    });
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Week Days
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "wing_name", value } });
                    }}
                    options={wings.map((item: any) => item.wing_name)}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="wing_name"
                        onChange={handleChange}
                        value={values.wing_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Wing Name
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
