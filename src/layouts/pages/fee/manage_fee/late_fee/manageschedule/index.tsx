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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const ManageSchedule = (props: any) => {
  const { manageData, handleClose } = props;

  const [data, setData] = useState([]);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);

  function filterSectionData(data: any, class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }

  console.log(filteredSection, "section name");

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
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: Cacademic_year,
        class_name: "",
        section_name: "",
        fine_name: manageData.fine_name,
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/late_fee/collection`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log("may 20", response.data);
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  // console.log(manageData.fine_name, "fine name");
  const handleCheckboxChange = (index: number) => {
    setData((prevSelections) => [
      ...prevSelections,
      (prevSelections[index].select = !prevSelections[index].select),
    ]);
    console.log(data, "change checkbox");
  };
  const handleSelectAll = () => {
    setData((prevData) => prevData.map((item) => ({ ...item, select: true })));
    console.log(data, "all checkbox");
    setAllCheck(true);
    setNoneCheck(false);
  };

  const handleSelectNone = () => {
    setData((prevData) => prevData.map((item) => ({ ...item, select: false })));
    console.log(data, "none checkbox");
    setAllCheck(false);
    setNoneCheck(true);
  };
  const [allCheck, setAllCheck] = useState(false);
  const [noneCheck, setNoneCheck] = useState(false);

  const handleCollectionSubmit = () => {
    const sendValues = { ...values, collections: data };
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/late_fee/collection`, sendValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success("Updated Successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };
  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disabled
                  defaultValue={Cacademic_year}
                  sx={{ width: "80%" }}
                  disableClearable
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
                      defaultValue={Cacademic_year}
                      name="academic_year"
                      placeholder="eg. 2022-2023"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.academic_year}
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
                  sx={{ width: "80%" }}
                  disableClearable
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
                      success={values.class_name.length && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "80%" }}
                  disableClearable
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
                  options={
                    filteredSection[0]
                      ? filteredSection[0].map((sectiondata: any) => sectiondata.section_name)
                      : []
                  }
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
                      success={values.section_name.length && !errors.section_name}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
                mr={2}
              >
                <Grid item mt={2} mr={2}>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => {
                      handleClose(false);
                    }}
                  >
                    Back
                  </MDButton>
                </Grid>
                <Grid item mt={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    Submit
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </form>

        {data.length == 0 ? (
          ""
        ) : (
          <>
            <MDBox p={4}>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <td
                          style={{
                            fontSize: "15px",
                            textAlign: "left",
                          }}
                        >
                          {" "}
                          <b>Collection Name</b>
                        </td>
                        <td
                          style={{
                            fontSize: "15px",
                            textAlign: "left",
                          }}
                        >
                          <b>Select</b>: &nbsp;All
                          <Checkbox checked={allCheck} onChange={() => handleSelectAll()} />
                          &nbsp; None
                          <Checkbox checked={noneCheck} onChange={() => handleSelectNone()} />
                        </td>
                        <td>
                          {" "}
                          <MDButton
                            color="info"
                            variant="contained"
                            onClick={() => handleCollectionSubmit()}
                          >
                            Submit
                          </MDButton>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((datainfo, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: "left" }}>
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {datainfo.collection_name}
                            </MDTypography>
                          </td>
                          <td>
                            <Checkbox
                              checked={datainfo.select}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>

                {/* <Grid
                  item
                  container
                  xs={12}
                  sm={6}
                  mr={8}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Grid item mt={2}>
                    <MDButton color="info" variant="contained">
                      Submit
                    </MDButton>
                  </Grid>
                </Grid> */}
              </Grid>
            </MDBox>
          </>
        )}
      </Card>
    </>
  );
};
export default ManageSchedule;
