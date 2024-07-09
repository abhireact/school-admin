import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect } from "react";
import MDInput from "components/MDInput";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";

const initialValues = {
  from_date: "",
  to_date: "",
};
const MYAttandance = () => {
  const [data, setData] = React.useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
  });
  const token = Cookies.get("token");
  useEffect(() => {
    if ((values.from_date, values.to_date)) {
      handleFormSubmit();
    }
  }, [values.from_date, values.to_date]);

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/attendance/me`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const dataTableData = {
    columns: [
      { Header: `${"Date"}`, accessor: "date" },
      { Header: `${"CheckIn "}`, accessor: "checkin" },
      { Header: `${"CheckIn "}`, accessor: "checkout" },
      { Header: `${"Total Hours"}`, accessor: "total_hours" },
      { Header: `${"Status"}`, accessor: "status" },
    ],

    rows: data.map((row: any, index: any) => ({
      date: (
        <p>
          <span style={{ color: "black" }}> {row.day}</span>, {row.date}
        </p>
      ),
      checkin: <p>{row.checkin == null ? "-----" : row.checkin}</p>,
      checkout: <p>{row.checkout == null ? "-----" : row.checkout}</p>,
      total_hours: <p>{row.total_hours == null ? "-----" : row.total_hours}</p>,
      status: (
        <MDTypography
          color={
            row.status === "Present"
              ? "success"
              : row.status === "Absent"
              ? "error"
              : row.status === "Weekend"
              ? "warning"
              : "default"
          }
          variant="p"
        >
          {row.status}
        </MDTypography>
      ),
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} m={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  MY Attendance
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDInput
                  type="date"
                  sx={{ width: "100%" }}
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      From Date
                    </MDTypography>
                  }
                  name="from_date"
                  value={values.from_date}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.from_date && touched.from_date}
                  success={values.from_date.length && !errors.from_date}
                />
                {errors.from_date && touched.from_date ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.from_date}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={3}>
                <MDInput
                  type="date"
                  sx={{ width: "100%" }}
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      To Date
                    </MDTypography>
                  }
                  name="to_date"
                  value={values.to_date}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.to_date && touched.to_date}
                  success={values.to_date.length && !errors.to_date}
                />
                {errors.to_date && touched.to_date ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.to_date}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
            </Grid>
          </MDBox>
        </Card>
        {data.length > 0 && (
          <Card>
            <MDBox p={3}>
              <DataTable table={dataTableData} entriesPerPage={false} />
            </MDBox>
          </Card>
        )}
      </form>
    </DashboardLayout>
  );
};

export default MYAttandance;
