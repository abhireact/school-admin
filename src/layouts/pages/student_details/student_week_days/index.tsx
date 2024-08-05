import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Autocomplete, Card, Typography, Box } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import MDButton from "components/MDButton";
import SaveIcon from "@mui/icons-material/Save";
const token = Cookies.get("token");

export default function StudentWeekDays() {
  const initialValues = {
    wing_name: "",
  };

  const { wings } = useSelector((state: any) => state);

  const [studentDays, setStudentDays] = useState<any[]>([]);

  const handleStudentDay = (wingName: string, day: string) => {
    setStudentDays((prevDays) =>
      prevDays.map((wing) =>
        wing.wing_name === wingName
          ? {
              ...wing,
              weekday: wing.weekday.map((weekday: any) =>
                weekday.week_name === day
                  ? { ...weekday, is_selected: !weekday.is_selected }
                  : weekday
              ),
            }
          : wing
      )
    );
  };

  const isStudentDayChecked = (wingName: string, day: string) => {
    const wing = studentDays.find((wing) => wing.wing_name === wingName);
    return wing?.weekday.find((weekday: any) => weekday.week_name === day)?.is_selected || false;
  };

  const { values, handleChange, handleSubmit, setFieldValue, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values) => {
        const submit_value = studentDays.find((wing) => wing.wing_name === values.wing_name);

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_weekdays`, submit_value, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              message.success("Updated Successfully");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_weekdays`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setStudentDays(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Student Week Days
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    value={values.wing_name}
                    disableClearable
                    onChange={(_event, value) => {
                      setFieldValue("wing_name", value);
                    }}
                    options={wings.map((item: any) => item.wing_name)}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="wing_name"
                        value={values.wing_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Wing Name
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.wing_name && Boolean(errors.wing_name)}
                        success={values.wing_name && !errors.wing_name}
                        helperText={touched.wing_name && errors.wing_name}
                      />
                    )}
                  />
                </Grid>
                {values.wing_name === "" ? null : (
                  <Grid item xs={12} sm={12}>
                    <Typography variant="button" fontWeight="bold" color="secondary">
                      Select Working Days
                    </Typography>
                    <Box mt={2}>
                      <Box display="flex" className="weekDays-selector">
                        {["0", "1", "2", "3", "4", "5", "6"].map((day) => (
                          <Box
                            key={day}
                            onClick={() => handleStudentDay(values.wing_name, day)}
                            sx={{
                              bgcolor: isStudentDayChecked(values.wing_name, day)
                                ? "#4caf50"
                                : "#ffffff",
                              color: isStudentDayChecked(values.wing_name, day)
                                ? "#ffffff"
                                : "#000000",
                              borderRadius: "6px",
                              border: isStudentDayChecked(values.wing_name, day)
                                ? "1px solid #4caf50"
                                : "1px solid #3873e8", // Adjust the border color based on the condition
                              width: "80px",

                              height: "40px",
                              textAlign: "center",
                              lineHeight: "40px",
                              cursor: "pointer",
                              marginRight: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MDTypography
                              variant="h6"
                              fontWeight="bold"
                              color={isStudentDayChecked(values.wing_name, day) ? "" : "info"}
                            >
                              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][parseInt(day)]}
                            </MDTypography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                p={3}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <MDButton color="info" variant="contained" type="submit">
                  Save&nbsp;
                  <SaveIcon />
                </MDButton>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
