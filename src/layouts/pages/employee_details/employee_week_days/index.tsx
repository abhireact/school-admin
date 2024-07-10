import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Card, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import MDButton from "components/MDButton";
import SaveIcon from "@mui/icons-material/Save";
import MDTypography from "components/MDTypography";

const token = Cookies.get("token");

export default function EmployeeWeekDays() {
  const [studentDays, setStudentDays] = useState([]);

  const handleStudentDay = (day: any) => {
    setStudentDays((prevDays) =>
      prevDays.map((weekday) =>
        weekday.week_name === day ? { ...weekday, is_selected: !weekday.is_selected } : weekday
      )
    );
  };

  const isStudentDayChecked = (day: any) => {
    return studentDays.find((weekday) => weekday.week_name === day)?.is_selected || false;
  };

  const { handleSubmit } = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/mg_employee_weekdays`,
          { weekday: studentDays },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          message.success("Updated Successfully");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employee_weekdays`, {
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
                  <Typography variant="h4" fontWeight="bold" color="secondary">
                    Employee Week Days
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant="button" fontWeight="bold" color="secondary">
                    Select Working Days
                  </Typography>
                  <Box mt={2}>
                    <Box display="flex" className="weekDays-selector">
                      {["0", "1", "2", "3", "4", "5", "6"].map((day) => (
                        <Box
                          key={day}
                          onClick={() => handleStudentDay(day)}
                          sx={{
                            bgcolor: isStudentDayChecked(day) ? "#4caf50" : "#ffffff",
                            color: isStudentDayChecked(day) ? "#ffffff" : "#000000",
                            borderRadius: "6px",
                            border: isStudentDayChecked(day)
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
                            color={isStudentDayChecked(day) ? "" : "info"}
                          >
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][parseInt(day)]}
                          </MDTypography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>
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
