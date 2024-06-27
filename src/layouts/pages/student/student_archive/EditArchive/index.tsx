// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
const validationSchema = Yup.object().shape({
  archive_date: Yup.date()
    .required("Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
  reason_id: Yup.string().required("Required *"),
});

const EditArchive = (props: any) => {
  const { handleClose, fetchData, editData, user_name } = props;
  const token = Cookies.get("token");
  console.log(editData, "Edit data");
  const [reasonsdata, setReasonsdata] = useState([]);

  // editData to give intial values

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        reason_id: editData.reason_id,
        archive_date: editData.archive_date,
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        let description = reasonsdata.find((item: any) => item.reason === values.reason_id).id;
        let sendData = {
          reason_id: description,
          user_name: editData.user_name,
          archive_date: values.archive_date,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/student_archive`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Updated  Successfully!");
            fetchData();
            handleClose();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });

        action.resetForm();
      },
    });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/student_archive/archive_reasons`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReasonsdata(response.data);
        setFieldValue(
          "reason_id",
          response.data.find((item: any) => item.id === editData.reason_id).reason
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Reason *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Autocomplete
              sx={{ width: "100%" }}
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
                  mutliline
                  rows={3}
                  //onChange={handleChange}
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

          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Archive Date *
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              type="date"
              required
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
              sx={{ width: "100%" }}
              variant="standard"
              name="archive_date"
              value={values.archive_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.archive_date && Boolean(errors.archive_date)}
              helperText={touched.archive_date && errors.archive_date}
              success={values.archive_date.length && !errors.archive_date}
            />
          </Grid>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
  );
};

export default EditArchive;
