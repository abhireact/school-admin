import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleClose, employeedata } = props;
  const cookies_academic_year = Cookies.get("academic_year");
  const [data, setData] = useState([]);

  const handleShowData = () => {
    const sendData = {
      employee_number: employeedata.user_id,
      academic_year: values.academic_year,
      class_name: values.class_name,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_subject/employee_subject`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data, "employee subject");
        if (response.data.length < 1) {
          message.error("No Subject is Assigned for this Academic Year and Class");
        }
      })
      .catch((error: any) => {
        console.log(error, "error");
        message.error(error.response.data.detail);
      });
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      employee_number: employeedata.user_id,
      academic_year: cookies_academic_year,
      class_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log("submit");
      const sendValue = { ...values, subject_employee: data };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_subject/employee_subject`, sendValue, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          handleClose();
          message.success("Updated Successfully");
        })
        .catch((error: any) => {
          console.log(error, "error");
          message.error(error.response.data.detail);
        });
    },
  });
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
  const { classes } = useSelector((state: any) => state);
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} pt={2} pl={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {employeedata.employee_name}&apos;s Subjects
              </MDTypography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              pt={2}
              pl={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {!(data.length > 0) && (
                <MDButton
                  color="dark"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </MDButton>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "100%" }}
                value={values.academic_year}
                onChange={(_event, value) => {
                  handleChange({ target: { name: "academic_year", value } });
                }}
                options={
                  classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
                }
                renderInput={(params) => (
                  <MDInput
                    name="academic_year"
                    required
                    //onChange={handleChange}
                    value={values.academic_year}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.academic_year && Boolean(errors.academic_year)}
                    success={values.academic_year.length && !errors.academic_year}
                    helperText={touched.academic_year && errors.academic_year}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "100%" }}
                value={values.class_name}
                onChange={(_event, value) => {
                  handleChange({ target: { name: "class_name", value } });
                }}
                options={
                  values.academic_year !== ""
                    ? classes
                        .filter((item: any) => item.academic_year === values.academic_year)
                        .map((item: any) => item.class_name)
                    : []
                }
                renderInput={(params) => (
                  <MDInput
                    name="class_name"
                    required
                    // onChange={handleChange}
                    value={values.class_name}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class Name
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.class_name && Boolean(errors.class_name)}
                    success={values.class_name.length && !errors.class_name}
                    helperText={touched.class_name && errors.class_name}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <MDButton
                color="info"
                variant="contained"
                onClick={() => {
                  handleShowData();
                }}
              >
                Show Data
              </MDButton>
              {data.length > 0 && (
                <MDButton color="info" variant="contained" type="submit">
                  Save &nbsp;<Icon>save</Icon>
                </MDButton>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} m={4}>
            {data.length > 0 && (
              <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
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
                          AVAILABLE SUBJECTS
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
                          <tr key={index + item.subject_name}>
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
                                {item.subject_name}
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
            )}
          </Grid>
          {data.length > 0 && (
            <Grid container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item mt={2}>
                <MDButton
                  color="dark"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
            </Grid>
          )}
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
