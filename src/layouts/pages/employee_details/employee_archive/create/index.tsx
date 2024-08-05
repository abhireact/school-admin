import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Checkbox } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import SaveIcon from "@mui/icons-material/Save";
const token = Cookies.get("token");
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  department: Yup.string().required("Required *"),
  archive_date: Yup.date().required("Required *"),
  reason_id: Yup.string().required("Required *"),
});
export default function StudentArchive(props: any) {
  const [data, setData] = useState([]);
  const initialValues = {
    reason_id: "",
    archive_date: "",
    department: "",
    user_name: [] as string[], // Array to store particulars
  };

  const [reasonsdata, setReasonsdata] = useState([]);
  const [departmentInfo, setDepartmentInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setDepartmentInfo(response.data);
        console.log(response.data, "department info");
      })
      .catch((error) => {
        setDepartmentInfo([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_archive/archive_reasons`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReasonsdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        console.log("submit");
        const sendData = data
          .filter((info: any) => info.is_selected)
          .map((info: any) => info.user_id);
        console.log(sendData);
        if (sendData.length < 1) {
          message.error("No Student is Selected");
          return;
        }
        let reasonNumber = reasonsdata.find((item: any) => item.reason === values.reason_id).id;
        const sendValue = {
          archive_date: values.archive_date,
          user_name: sendData,
          reason_id: reasonNumber,
        };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/employee_archive`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();
            props.setShowpage(false);
            props.fetchData();
            message.success("Employees Archived Successfully");
          })
          .catch((error: any) => {
            console.log(error, "error");
            message.error(error.response.data.detail);
          });
      },
    });

  const handleShowData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.filter((item: any) => item.department == values.department));

        console.log(
          response.data.filter((item: any) => item.department == values.department),
          "selected department employee"
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleCheckboxChange = (index: number) => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) =>
        i === index ? { ...selection, is_selected: !selection.is_selected } : selection
      )
    );
    console.log(data, "change checkbox");
  };
  const handleSelectAll = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: true }))
    );
    console.log(data, "change checkbox");
  };
  const handleSelectNone = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: false }))
    );
    console.log(data, "change checkbox");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Employee Archive
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton color="dark" variant="contained" onClick={() => props.setShowpage(false)}>
                Back
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                value={values.department}
                onChange={(_event, value) => {
                  handleChange({ target: { name: "department", value } });
                }}
                options={departmentInfo.map((item: any) => item.dept_name) || []}
                renderInput={(params) => (
                  <MDInput
                    name="department"
                    required
                    //onChange={handleChange}
                    value={values.department}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Department
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.department && Boolean(errors.department)}
                    success={values.department && !errors.department}
                    helperText={touched.department && errors.department}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                value={values.reason_id}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "reason_id", value },
                  });
                }}
                options={reasonsdata ? reasonsdata.map((acd) => acd.reason) : []}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="reason_id"
                    required
                    //onChange={handleChange}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Reason
                      </MDTypography>
                    }
                    value={values.reason_id}
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.reason_id && Boolean(errors.reason_id)}
                    success={values.reason_id.length && !errors.reason_id}
                    helperText={touched.reason_id && errors.reason_id}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                required
                sx={{ width: "100%" }}
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Archive Date
                  </MDTypography>
                }
                name="archive_date"
                value={values.archive_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.archive_date && Boolean(errors.archive_date)}
                success={values.archive_date && !errors.archive_date}
                helperText={touched.archive_date && errors.archive_date}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item>
                <MDButton
                  color="info"
                  variant="contained"
                  onClick={() => {
                    handleShowData();
                  }}
                >
                  Show Data
                </MDButton>
              </Grid>
              {data.length > 0 && (
                <Grid item>
                  <MDButton color="info" variant="contained" type="submit">
                    Submit&nbsp;
                    <SaveIcon />
                  </MDButton>
                </Grid>
              )}
            </Grid>

            {data.length > 0 && (
              <Grid item xs={12} sm={12} m={4}>
                <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                  <table
                    style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
                  >
                    <thead
                      style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
                    >
                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            AVAILABLE EMPLOYEES
                          </MDTypography>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            SELECT:
                          </MDTypography>
                          &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectAll()}
                          >
                            All
                          </MDButton>
                          &nbsp; &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectNone()}
                          >
                            None
                          </MDButton>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length > 0
                        ? data?.map((item: any, index: any) => (
                            <tr key={index + item.user_id}>
                              <td
                                style={{
                                  padding: "10px",
                                  textAlign: "left",
                                  border: "1px solid #f0f2f5",
                                }}
                              >
                                <MDTypography
                                  variant="caption"
                                  fontWeight="bold"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.user_id} {item.employee_name}
                                </MDTypography>
                              </td>

                              <td
                                style={{
                                  padding: "10px",
                                  textAlign: "start",
                                  border: "1px solid #f0f2f5",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={item.is_selected}
                                  onChange={() => handleCheckboxChange(index)}
                                />
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
}
