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

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchingData } = props;

  const handleClose = () => {
    setOpenupdate(false);
  };
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }

  useEffect(() => {
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

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: editData.class_name,
      section_name: editData.section_name,
      exam_type: editData.exam_type,
      academic_year: editData.academic_year,
      scholastic_particular_name: editData.scholastic_particular_name,
      scholastic_component_name: editData.scholastic_component_name,
      date: editData.date,
      start_time: editData.start_time,
      end_time: editData.end_time,
      subject_name: editData.subject_name,
      sub_subject_name: editData.sub_subject_name,
      subject_weightage: editData.subject_weightage,
      subject_maxmarks: editData.subject_maxmarks,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put("http://10.0.20.200:8000/exam_schedule", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          handleClose();
          action.resetForm();
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
                InputLabelProps={{ shrink: true }}
                sx={{ width: "70%" }}
                variant="standard"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                name="date"
                label={<MDTypography variant="body2">Date</MDTypography>}
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                InputLabelProps={{ shrink: true }}
                sx={{ width: "70%" }}
                variant="standard"
                type="time"
                name="start_time"
                label={<MDTypography variant="body2">Start Time</MDTypography>}
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                InputLabelProps={{ shrink: true }}
                sx={{ width: "70%" }}
                variant="standard"
                type="time"
                name="end_time"
                label={<MDTypography variant="body2">End Time</MDTypography>}
                value={values.end_time}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Grid item mt={4}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2} mt={4}>
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
