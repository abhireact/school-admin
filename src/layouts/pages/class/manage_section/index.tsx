import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
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
import * as Yup from "yup";
import FormField from "layouts/pages/account/components/FormField";
import Icon from "@mui/material/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import UpdateSection from "./update_section";
function convertData(inputData: any[]) {
  return inputData.map((item: { section_name: any; start_date: string; end_date: string }) => ({
    section_name: item.section_name,
    start_date: item.start_date.split(" ")[0],
    end_date: item.end_date.split(" ")[0],
  }));
}
function updateObjectAtIndex(array: any, index: number, newData: any) {
  if (index < 0 || index >= array.length) {
    // If the index is out of bounds, return null or handle error as needed
    return null;
  }

  // Update the object at the specified index with newData
  array[index] = { ...array[index], ...newData };

  // Return the updated array
  return array;
}

const ManageSection = (props: any) => {
  const token = Cookies.get("token");
  const [academicdata, setAcademicdata] = useState([]);
  const { handleManagePage, fetchData, editData } = props;
  editData.section_data = convertData(editData.section_data);
  console.log(editData.section_data, "section data may 15");
  const handleClose = () => {
    handleManagePage(false);
  };
  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Required *"),
    academic_year: Yup.string().required("Required *"),
  });

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
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: editData.academic_year,
        class_name: editData.class_name,
        sectiondata: editData.section_data,
        section: [{ section_name: "", start_date: "", end_date: "" }],
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/mg_batches`,
            {
              academic_year: values.academic_year,

              class_name: values.class_name,

              section: values.section,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            console.log("create successfully");
            message.success(" Created successfully!");
            fetchData();
            handleClose();
            action.resetForm();
          })
          .catch(() => {
            message.error("Error on creating  !");
          });
      },
    });
  const handleAddField = () => {
    setFieldValue("section", [
      ...values.section,
      { section_name: "", start_date: "", end_date: "" },
    ]);
  };
  const handleRemoveField = (index: number) => {
    const newDues = [...values.section];
    newDues.splice(index, 1);
    setFieldValue("section", newDues);
  };
  //Start

  const [sectionData, setSectionData] = useState({});
  const [open, setOpen] = useState(false);

  const handleCloseSection = () => {
    setOpen(false);
  };
  const handleOpenSection = (data: any, index: number) => {
    const main_data = data;
    console.log(main_data, "section edit Data");

    setSectionData(data);
    setOpen(true);
  };
  const handleDeleteSection = (data: any, index: number) => {
    const main_data = {
      ...data,
      academic_year: editData.academic_year,
      class_name: editData.class_name,
    };
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/mg_MgBatch`, {
        data: main_data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("create successfully");
        message.success(" Created successfully!");
        fetchData();
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };

  return (
    <Card>
      {" "}
      <form onSubmit={handleSubmit}>
        <MDBox p={4}>
          <Grid container>
            <Grid container spacing={3} px={2}>
              <Grid item sm={3} xs={12} py={1}>
                <Autocomplete
                  sx={{ width: "80%" }}
                  value={values.academic_year}
                  disableClearable
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "academic_year", value },
                    });
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
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3} py={1}>
                <MDInput
                  sx={{ width: "80%" }}
                  mb={2}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class Name
                    </MDTypography>
                  }
                  variant="standard"
                  name="class_name"
                  value={values.class_name}
                  //onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.class_name && Boolean(errors.class_name)}
                  success={values.class_name.length && !errors.class_name}
                  helperText={touched.class_name && errors.class_name}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} px={2}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Manage Sections
                </MDTypography>
              </Grid>
              {values.sectiondata.map((clone: any, index: any) => (
                <>
                  <Grid item xs={12} sm={3} py={1} key={index + "section_name"}>
                    <MDInput
                      required
                      sx={{ width: "80%" }}
                      variant="standard"
                      name={`sectiondata[${index}].section_name`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section Name
                        </MDTypography>
                      }
                      value={values.sectiondata[index].section_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} key={index + "start_date"}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      required
                      type="date"
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`sectiondata[${index}].start_date`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Start Date
                        </MDTypography>
                      }
                      value={values.sectiondata[index].start_date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} key={index + "end_date"}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      required
                      type="date"
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`sectiondata[${index}].end_date`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          End Date
                        </MDTypography>
                      }
                      value={values.sectiondata[index].end_date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} key={index + "space"}>
                    <IconButton onClick={() => handleOpenSection(clone, index)}>
                      <CreateRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteSection(clone, index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </>
              ))}
              {values.section.map((clone: any, index: any) => (
                <>
                  <Grid item xs={12} sm={3} py={1} key={index + "section_name"}>
                    <MDInput
                      required
                      sx={{ width: "80%" }}
                      variant="standard"
                      name={`section[${index}].section_name`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section Name
                        </MDTypography>
                      }
                      value={values.section[index].section_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} key={index + "start_date"}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      required
                      type="date"
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`section[${index}].start_date`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Start Date
                        </MDTypography>
                      }
                      value={values.section[index].start_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} key={index + "end_date"}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      required
                      type="date"
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`section[${index}].end_date`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          End Date
                        </MDTypography>
                      }
                      value={values.section[index].end_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={3} key={index + "deleteicon"} pt={5}>
                    {values.section.length > 1 ? (
                      <DeleteIcon
                        fontSize="medium"
                        onClick={() => {
                          handleRemoveField(index);
                        }}
                      />
                    ) : null}
                  </Grid>
                </>
              ))}
              <Grid xs={12} sm={3} py={1}>
                <MDButton
                  onClick={() => {
                    handleAddField();
                  }}
                  color="info"
                  variant="text"
                  fontSize="medium"
                >
                  + New Section
                </MDButton>
              </Grid>
            </Grid>
            <Dialog open={open} onClose={handleCloseSection} maxWidth="sm">
              <UpdateSection
                sectionData={sectionData}
                class_name={editData.class_name}
                academic_year={editData.academic_year}
                setOpen={setOpen}
                fetchData={fetchData}
              />
            </Dialog>
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
      </form>
    </Card>
  );
};

export default ManageSection;
