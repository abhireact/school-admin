import { Autocomplete, FormControl, RadioGroup, FormControlLabel, Card, Grid } from "@mui/material";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect } from "react";
import MDInput from "components/MDInput";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

const initialValues = {
  from_date: "",
  to_date: "",
  email: "",
};
const EmployeeWiseAttandance = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = React.useState([]);
  const [data, setData] = React.useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");
  useEffect(() => {
    axios
      .get(`http://10.0.20.200:8000/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/retrive`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "responsr");
      if (response.status === 200) {
        setData(response.data);
        console.log(" Created Employee Successfully");
        message.success(" Fetched Attandance Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  console.log(data, "dataa");

  const dataTableData = {
    columns: [
      { Header: `${"Date"}`, accessor: "date" },
      { Header: `${"CheckIn "}`, accessor: "checkin" },
      { Header: `${"CheckIn "}`, accessor: "checkout" },
      { Header: `${"Total Hours"}`, accessor: "total_hours" },
      { Header: `${"Status"}`, accessor: "status" },
    ],

    rows: Array.isArray(data)
      ? data.map(
          (
            row: {
              date: any;
              day: any;
              checkin: any;
              checkout: any;
              total_hours: any;
              status: any;
              //   email_id: any;
            },
            index: any
          ) => ({
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
          })
        )
      : [],
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h5">{"Show Attendance"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
                {"Search"}
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "email", value } });
                }}
                options={employee.map((item) => `${item.employee_name} (${item.user_id})`)}
                renderInput={(params: any) => (
                  <MDInput
                    label={"Employee Id"}
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    placeholder="Enter Your EmployeeId"
                    onChange={handleChange}
                    value={values.email}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    success={!errors.email}
                    variant="standard"
                  />
                )}
              />
              {errors.email && touched.email ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.email}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={3.5}>
              <MDInput
                type="date"
                sx={{ width: "100%" }}
                label="From Data"
                name="from_date"
                value={values.from_date}
                placeholder="Enter Your from_date"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.from_date && touched.from_date}
                success={values.from_date.length && !errors.from_date}
              />
              {errors.from_date && touched.from_date ? (
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.from_date}
                </MDTypography>
              ) : null}
            </Grid>{" "}
            <Grid item xs={12} sm={3.5}>
              <MDInput
                type="date"
                sx={{ width: "100%" }}
                label="to_date"
                name="to_date"
                value={values.to_date}
                placeholder="Enter Your to_date"
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
          {data ? (
            <MDBox p={3}>
              <DataTable
                table={dataTableData}
                // showTotalEntries={false}
                // isSorted={false}
                // entriesPerPage={false}
              />
            </MDBox>
          ) : (
            ""
          )}
        </MDBox>
      </form>
    </Card>
  );
};

export default EmployeeWiseAttandance;
