import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  const [data, setData] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
      academic_year: "",
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
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} pt={2} pl={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {employeedata.employee_name}&apos;s Subjects
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "100%" }}
                value={values.academic_year}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "academic_year", value },
                  });
                  filterDataByAcdName(classdata, value);
                }}
                options={academicdata.map((acd) => acd.academic_year)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="academic_year"
                    placeholder="eg. 2022-2023"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    value={values.academic_year}
                    {...params}
                    variant="standard"
                    onChange={handleChange}
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
                onChange={
                  filteredClass.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "class_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredClass}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="class_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class Name
                      </MDTypography>
                    }
                    value={values.class_name}
                    {...params}
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.academic_year && Boolean(errors.academic_year)}
                    success={values.academic_year.length && !errors.academic_year}
                    helperText={touched.academic_year && errors.academic_year}
                  />
                )}
              />
            </Grid>
            <Grid item container xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
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
            </Grid>
          </Grid>{" "}
          <Grid item xs={12} sm={12} m={4}>
            {data.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <td
                      style={{
                        fontSize: "18px",
                        textAlign: "left",
                      }}
                    >
                      <b>Available Subjects</b>
                    </td>
                    <td
                      style={{
                        fontSize: "18px",
                        textAlign: "left",
                      }}
                    >
                      <b>Select</b>:
                      <MDButton color="info" variant="text" onClick={() => handleSelectAll()}>
                        All
                      </MDButton>
                      <MDButton color="info" variant="text" onClick={() => handleSelectNone()}>
                        None
                      </MDButton>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0
                    ? data?.map((item: any, index: any) => (
                        <tr key={index + item.subject_name}>
                          <td style={{ textAlign: "left" }}>
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {item.subject_name}
                            </MDTypography>
                          </td>

                          <td>
                            <Checkbox
                              checked={item.is_selected}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            )}
          </Grid>
          <Grid container xs={12} sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item mt={4}>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
            </Grid>{" "}
            {data.length > 0 && (
              <Grid item mr={8} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
