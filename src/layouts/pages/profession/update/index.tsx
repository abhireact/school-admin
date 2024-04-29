import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
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

const Update = (props: any) => {
  const token = Cookies.get("token");
  let categories = ["Teaching Stafff", "Non-Teaching Staff"];
  const { setOpenupdate, editData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      prof_name: editData.prof_name,

      category: editData.category,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendValues = { ...values, old_prof_name: editData.prof_name };
      axios
        .put("http://10.0.20.200:8000/mg_prof", sendValues, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          message.success(" Updated successfully!");
        })
        .catch(() => {
          message.error("Error on updating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Category
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Autocomplete
              sx={{ width: "65%" }}
              value={values.category}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "category", value },
                });
              }}
              options={categories}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                  {...params}
                  variant="standard"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Profession
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="prof_name"
              value={values.prof_name}
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
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Save
              </MDButton>
            </Grid>
            <Grid item ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
