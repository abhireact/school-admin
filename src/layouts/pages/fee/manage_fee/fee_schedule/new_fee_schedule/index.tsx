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
import { FormControlLabel, FormControl, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
function extractIdFromString(str: string) {
  // Regular expression to match the ID pattern "(id-XXXXX)"
  const idRegex = /\(id-(\d+)\)/;

  // Match the regular expression against the input string
  const match = str.match(idRegex);

  // If a match is found, return the captured ID (group 1)
  if (match && match.length > 1) {
    return parseInt(match[1], 10);
  }

  // If no match is found, return null or throw an error
  return null;
}
function fetchObjectById(id: any, data: any) {
  const result = data.find((item: any) => item.id === id);
  return result;
}
function removeProperty(data: any) {
  return data.map((obj: any) => {
    const { showValue, select, ...rest } = obj;
    return rest;
  });
}
const validationSchema = Yup.object().shape({
  start_date: Yup.date().required("Start Date is required"),

  end_date: Yup.date().required("End Date is required"),
  due_date: Yup.date().required("Due Date is required"),
  category_name: Yup.string().required("Category Name is required"),
  fee_particular_name: Yup.string().required("Fee Particular Name is required"),
  name: Yup.string().required(" Collection Name is required"),
  // fine_name: Yup.string().required("Late Fine Name is required"),
});
const Create = (props: any) => {
  const token = Cookies.get("token");
  const [academicdata, setAcademicdata] = useState([]);
  const [categorydata, setCategorydata] = useState([]);
  const [particulardata, setParticulardata] = useState([]);
  const [particularInfo, setParticularInfo] = useState([]);
  const [fineInfo, setFineInfo] = useState([]);
  const { t } = useTranslation();

  const { handleClose } = props;
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
      .get(`${process.env.REACT_APP_BASE_URL}/fee_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategorydata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFineInfo(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function filterParticularData(name: any) {
    // Find the object with the matching name
    const category = categorydata.find((item) => item.name === name);

    // Return the particular_types array if found, else return null
    return category.particular_types;
  }
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        start_date: "",
        end_date: "",
        category_name: "",
        fine_name: "",
        due_date: "",
        fee_particular_name: "",
        academic_year: Cacademic_year,
        is_applicable: true,
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        if (particularInfo.length < 1) {
          message.error("Particular Types for Class-Section is required");
          return;
        }
        let selectedParticular = particularInfo.filter((acd) => acd.select == true);
        if (selectedParticular.length < 1) {
          message.error("Particular Types for Class-Section is required");
          return;
        }
        let particularData = removeProperty(selectedParticular);
        const sendData = { ...values, fee_particulars: particularData };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Created Successfully!");
            action.resetForm();
            handleClose();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  const fetchParticularsInfo = () => {
    const sendData = {
      academic_year: values.academic_year,
      category_name: values.category_name,
      fee_particular_name: values.fee_particular_name,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/fee_particular`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.length < 1) {
          message.error("No Data Available");
        }
        let responseinfo = response.data;
        let responseData = responseinfo.map((abc: any) => ({ ...abc, select: true }));
        console.log(responseData, "response info data ");
        setParticularInfo(responseData);
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };
  const [allCheck, setAllCheck] = useState(false);
  const [noneCheck, setNoneCheck] = useState(false);
  const handleCheckboxChange = (index: number) => {
    setParticularInfo((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) =>
        i === index ? { ...selection, select: !selection.select } : selection
      )
    );
    console.log(particularInfo, "change checkbox");
  };
  const handleSelectAll = () => {
    setParticularInfo((prevData: any) => prevData.map((item: any) => ({ ...item, select: true })));
    console.log(particularInfo, "all checkbox");
    setAllCheck(true);
    setNoneCheck(false);
  };

  const handleSelectNone = () => {
    setParticularInfo((prevData: any) => prevData.map((item: any) => ({ ...item, select: false })));
    console.log(particularInfo, "none checkbox");
    setAllCheck(false);
    setNoneCheck(true);
  };
  return (
    <I18nextProvider i18n={createTrans}>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid container p={3}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {t("create_fee_schedule")}{" "}
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  value={values.category_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "category_name", value },
                    });

                    const particularArray = filterParticularData(value);
                    setParticulardata(particularArray);

                    setFieldValue("fee_particular_name", "");
                  }}
                  options={categorydata.map((cd) => cd.name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="category_name"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("fee_category")}{" "}
                        </MDTypography>
                      }
                      value={values.category_name}
                      {...params}
                      variant="standard"
                      error={touched.category_name && Boolean(errors.category_name)}
                      helperText={touched.category_name && errors.category_name}
                      success={values.category_name.length && !errors.category_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  value={values.fee_particular_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "fee_particular_name", value },
                    });
                  }}
                  options={particulardata.map((info) => info.particular_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="fee_particular_name"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("fee_particular")}
                        </MDTypography>
                      }
                      value={values.fee_particular_name}
                      {...params}
                      variant="standard"
                      error={touched.fee_particular_name && Boolean(errors.fee_particular_name)}
                      helperText={touched.fee_particular_name && errors.fee_particular_name}
                      success={values.fee_particular_name.length && !errors.fee_particular_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="name"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("fee_collection_name")}
                    </MDTypography>
                  }
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  success={values.name.length && !errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="start_date"
                  value={values.start_date}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("start_date")}
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.start_date && Boolean(errors.start_date)}
                  helperText={touched.start_date && errors.start_date}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="end_date"
                  value={values.end_date}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("end_date")}
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ min: values.start_date }}
                  error={touched.end_date && Boolean(errors.end_date)}
                  helperText={touched.end_date && errors.end_date}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="due_date"
                  value={values.due_date}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("due_date")}
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ max: values.end_date, min: values.start_date }}
                  error={touched.due_date && Boolean(errors.due_date)}
                  helperText={touched.due_date && errors.due_date}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Autocomplete
                  disableClearable
                  disabled
                  defaultValue={Cacademic_year}
                  sx={{ width: "100%" }}
                  value={values.academic_year}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "academic_year", value },
                    });
                  }}
                  options={academicdata.map((acd) => acd.academic_year)}
                  renderInput={(params: any) => (
                    <MDInput
                      defaultValue={Cacademic_year}
                      InputLabelProps={{ shrink: true }}
                      name="academic_year"
                      placeholder="eg. 2022-2023"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("academic_year")}
                        </MDTypography>
                      }
                      value={values.academic_year}
                      {...params}
                      variant="standard"
                      error={touched.academic_year && Boolean(errors.academic_year)}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  value={values.fine_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "fine_name", value },
                    });
                  }}
                  options={fineInfo.map((acd) => acd.fine_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="fine_name"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("late_fine")}
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.fine_name}
                      {...params}
                      variant="standard"
                      error={touched.fine_name && Boolean(errors.fine_name)}
                      helperText={touched.fine_name && errors.fine_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="is_applicable"
                          checked={values.is_applicable}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <MDTypography variant="caption" fontWeight="bold">
                          {t("is_applicable")}
                        </MDTypography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>{" "}
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Grid item>
                  <MDButton
                    color="info"
                    variant="contained"
                    onClick={() => {
                      fetchParticularsInfo();
                    }}
                  >
                    {t("show_data")}
                  </MDButton>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {particularInfo?.length > 0 && (
                    <thead>
                      <tr>
                        <td
                          style={{
                            fontSize: "15px",
                            textAlign: "left",
                          }}
                        >
                          {" "}
                          <b>Course Batch Name</b>
                        </td>

                        <td
                          style={{
                            fontSize: "15px",
                            textAlign: "left",
                          }}
                        >
                          <b>Particular Types</b>
                        </td>
                        <td
                          style={{
                            fontSize: "15px",
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
                  )}
                  <tbody>
                    {particularInfo?.length > 0 ? (
                      particularInfo?.map((item: any, index: any) => (
                        <tr key={index + item.class_name}>
                          <td style={{ textAlign: "left" }}>
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {item.class_name} - {item.section_name}
                            </MDTypography>
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <Autocomplete
                              disableClearable
                              sx={{ width: "70%" }}
                              value={item.showValue || "All"}
                              onChange={(event, value) => {
                                let changeParticulars: any = null;
                                let desiredValue = value === "All" ? "All" : value;
                                let changeObject = particularInfo[index];

                                if (desiredValue === "All") {
                                  console.log("show All particulars change");
                                  changeParticulars = changeObject.particulars;
                                } else {
                                  let objectid = extractIdFromString(desiredValue);
                                  let desiredObject = fetchObjectById(
                                    objectid,
                                    changeObject.particulars
                                  );
                                  console.log("show one  particulars change", desiredObject);
                                  changeParticulars = [desiredObject];
                                }

                                setParticularInfo((prev) =>
                                  prev.map((prevItem: any, idx) =>
                                    idx === index
                                      ? {
                                          ...prevItem,
                                          showValue: desiredValue,
                                          particulars: changeParticulars,
                                        }
                                      : prevItem
                                  )
                                );
                                console.log(particularInfo, "info ");
                              }}
                              options={[
                                "All",
                                ...item.particulars.map(
                                  (particular: any) =>
                                    `${particular.particular_type}  ${
                                      particular.user_id || particular.student_category
                                        ? particular.user_id || particular.student_category
                                        : ""
                                    } (id-${particular.id})`
                                ),
                              ]}
                              renderInput={(params) => <MDInput {...params} variant="standard" />}
                            />
                          </td>

                          <td>
                            <Checkbox
                              checked={item.select}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
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
                    {t("back")}
                  </MDButton>
                </Grid>
                <Grid item mt={2} ml={2} mr={4}>
                  <MDButton color="info" variant="contained" type="submit">
                    {t("save")}
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </I18nextProvider>
  );
};

export default Create;
