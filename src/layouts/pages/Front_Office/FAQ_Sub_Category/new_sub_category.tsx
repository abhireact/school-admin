import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions, Grid } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";

const validationSchema = Yup.object().shape({
  start_date: Yup.date().test("year-range", "Incorrect format", function (value) {
    if (value) {
      const year = new Date(value).getFullYear();
      return year >= 2000 && year <= 3000;
    }
    return true;
  }),
  end_date: Yup.date().test(
    "endDateGreaterThanOrEqualToStartDate",
    "End date should be greater than or equal to start date",
    function (value) {
      const { start_date } = this.parent;
      return !start_date || new Date(value) >= new Date(start_date);
    }
  ),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

const token = Cookies.get("token");

const NewDialog = ({
  open,
  handleClose,
  editedItem,
  setEditedItem,
  handleEditSave,
  classes,
}: any) => {
  const { values, errors, handleBlur, handleSubmit, touched, setValues } = useFormik({
    initialValues: {
      academic_year: editedItem?.academic_year || "",
      start_date: editedItem?.start_date || "",
      end_date: editedItem?.end_date || "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleEditSave();
    },
  });

  const [academicData, setAcademicData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    setValues({
      academic_year: editedItem?.academic_year || "",
      start_date: editedItem?.start_date || "",
      end_date: editedItem?.end_date || "",
    });
  }, [editedItem, setValues]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" color="secondary">
              New Sub Category
            </MDTypography>
          </Grid>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={8}>
              <MDInput
                sx={{ width: "100%" }}
                required
                variant="standard"
                name="start_date"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Category
                  </MDTypography>
                }
                value={editedItem?.start_date}
                onChange={(e: any) =>
                  setEditedItem({
                    ...editedItem,
                    start_date: e.target.value,
                  })
                }
                onBlur={handleBlur}
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                inputProps={{ min: values.academic_year }}
                error={touched.start_date && Boolean(errors.start_date)}
                helperText={touched.start_date && errors.start_date}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleClose} color="dark">
          Cancel
        </MDButton>
        <MDButton onClick={handleEditSave} color="info">
          Save
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewDialog;
