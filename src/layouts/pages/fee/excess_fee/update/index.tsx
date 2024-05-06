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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchingData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterClassData(data: any, academic_year: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === academic_year)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_section", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsectiondata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://10.0.20.200:8000/mg_accademic_year", {
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
      .get("http://10.0.20.200:8000/mg_class", {
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
  const paymenttypes = ["Adjust", "Refund"];
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        student_name: editData.student_name,
        account_name: editData.account_name,
        description: editData.description,
        payment_status: editData.payment_status,
        class_name: editData.class_name,
        academic_year: editData.academic_year,
        section_name: editData.section_name,
        excess_amount: editData.excess_amount,
        add_amount: editData.add_amount,
        date: editData.date,
        total_amount: editData.total_amount,
      },

      onSubmit: (values, action) => {
        axios
          .post("http://10.0.20.200:8000/fee_fine", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success(" Created successfully!");
            fetchingData();
            action.resetForm();
            handleClose();
          })
          .catch(() => {
            message.error("Error on creating  !");
          });
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="student_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Name
                  </MDTypography>
                }
                value={values.student_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.student_name && Boolean(errors.student_name)}
                success={values.student_name.length && !errors.student_name}
                helperText={touched.student_name && errors.student_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="account_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Account
                  </MDTypography>
                }
                value={values.account_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.account_name && Boolean(errors.account_name)}
                success={values.account_name.length && !errors.account_name}
                helperText={touched.account_name && errors.account_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                multiline
                rows={2}
                sx={{ width: "70%" }}
                variant="standard"
                name="description"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description ...
                  </MDTypography>
                }
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                success={values.description.length && !errors.description}
              />
            </Grid>
            <Grid xs={12} sm={4} py={1}>
              <Autocomplete
                value={values.payment_status}
                sx={{ width: "70%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "payment_status", value },
                  });
                }}
                disableClearable
                options={paymenttypes}
                renderInput={(params: any) => (
                  <MDInput
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Payment Status
                      </MDTypography>
                    }
                    InputLabelProps={{ shrink: true }}
                    name="payment_status"
                    onChange={handleChange}
                    value={values.payment_status}
                    onBlur={handleBlur}
                    error={touched.payment_status && Boolean(errors.payment_status)}
                    helperText={touched.payment_status && errors.payment_status}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.academic_year}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "academic_year", value },
                  });
                  filterClassData(classdata, value);
                }}
                options={academicdata.map((acd) => acd.academic_year)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="academic_year"
                    placeholder="2022-23"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.academic_year}
                    {...params}
                    variant="standard"
                    error={touched.academic_year && Boolean(errors.academic_year)}
                    helperText={touched.academic_year && errors.academic_year}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.class_name}
                onChange={
                  filteredClass.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "class_name", value },
                        });

                        filterSectionData(sectiondata, value);
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
                    onChange={handleChange}
                    value={values.class_name}
                    {...params}
                    variant="standard"
                    error={touched.class_name && Boolean(errors.class_name)}
                    helperText={touched.class_name && errors.class_name}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.section_name}
                onChange={
                  filteredSection.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "section_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredSection}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="section_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Section Name
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.section_name}
                    {...params}
                    variant="standard"
                    error={touched.section_name && Boolean(errors.section_name)}
                    helperText={touched.section_name && errors.section_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="date"
                type="date"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Date
                  </MDTypography>
                }
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date && Boolean(errors.date)}
                success={values.date.length && !errors.date}
                helperText={touched.date && errors.date}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="excess_amount"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Excess Amount
                  </MDTypography>
                }
                value={values.excess_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.excess_amount && Boolean(errors.excess_amount)}
                success={values.excess_amount.length && !errors.excess_amount}
                helperText={touched.excess_amount && errors.excess_amount}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="total_amount"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Total Amount
                  </MDTypography>
                }
                value={values.total_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.total_amount && Boolean(errors.total_amount)}
                success={values.total_amount.length && !errors.total_amount}
                helperText={touched.total_amount && errors.total_amount}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="add_amount"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Add Amount
                  </MDTypography>
                }
                value={values.add_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.add_amount && Boolean(errors.add_amount)}
                success={values.add_amount.length && !errors.add_amount}
                helperText={touched.add_amount && errors.add_amount}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
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
              <Grid item mt={2} ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Update;
