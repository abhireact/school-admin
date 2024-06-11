import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Autocomplete, Card, Typography, Box, Tab } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import { message } from "antd";
import MDButton from "components/MDButton";
export default function WeekDays() {
  const [selectedTab, setSelectedTab] = useState(0);
  const initialValues = {
    wing_name: "",
  };
  const { classes, account, studentcategory, wings } = useSelector((state: any) => state);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayToggle = (day: any) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const isChecked = (day: any) => selectedDays.includes(day);
  console.log(selectedDays, "selected days");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: commonacademicyear,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const checked_days = ["0", "1", "2", "3", "4", "5", "6"].map((number, index) => {
          const is_selected = selectedDays.includes(index);
          return {
            week_name: number,
            is_selected: is_selected,
          };
        });

        const submit_value = {
          wing_name: values.wing_name,
          weekday: checked_days,
        };
        axios
          .post("http://10.0.20.200:8000/mg_weekdays", submit_value, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              message.success(" Created Successfully");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  const handleTabChange = (_event: any, newValue: any) => {
    initialValues.wing_name = "";
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_weekdays", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          message.success(" Created Successfully");
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
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Week Days
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Tab
                    label={
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Student Week Days
                      </MDTypography>
                    }
                    sx={{ flex: "50%", color: "blue" }}
                  />
                  <Tab
                    label={
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Employee Week Days
                      </MDTypography>
                    }
                    sx={{ flex: "50%" }}
                  />
                </Tabs>
              </Grid>
              {selectedTab === 0 && (
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
                  {values.wing_name == "" ? null : (
                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Select Working Days
                      </MDTypography>
                      <Box display="flex" className="weekDays-selector">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                          <Box
                            key={index}
                            onClick={() => handleDayToggle(index)}
                            sx={{
                              bgcolor: isChecked(index) ? "#2AD705" : "#dddddd",
                              color: isChecked(index) ? "#ffffff" : "#000000",
                              borderRadius: "6px",
                              width: "40px",
                              height: "40px",
                              textAlign: "center",
                              lineHeight: "40px",
                              cursor: "pointer",
                              marginRight: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="h6" fontWeight="bold" color="dark">
                              {day}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
              {selectedTab === 1 && (
                <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                  <Grid item xs={12} sm={6} py={2}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Select Working Days
                    </MDTypography>
                    <Box display="flex" className="weekDays-selector">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <Box
                          key={index}
                          onClick={() => handleDayToggle(index)}
                          sx={{
                            bgcolor: isChecked(index) ? "#2AD705" : "#dddddd",
                            color: isChecked(index) ? "#ffffff" : "#000000",
                            borderRadius: "6px",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                            lineHeight: "40px",
                            cursor: "pointer",
                            marginRight: "3px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold" color="dark">
                            {day}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    p={3}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <MDButton color="info" variant="contained" type="submit">
                      Save
                    </MDButton>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid container mt={4}></Grid>
      </form>
    </DashboardLayout>
  );
}
