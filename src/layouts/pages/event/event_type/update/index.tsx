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
// import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

const colorOptions = [
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#00FF00" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Purple", value: "#800080" },
  { name: "Orange", value: "#FFA500" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Brown", value: "#A52A2A" },
  { name: "Cyan", value: "#00FFFF" },
  { name: "Magenta", value: "#FF00FF" },
  { name: "Lime", value: "#00FF00" },
  { name: "Teal", value: "#008080" },
  { name: "Lavender", value: "#E6E6FA" },
  { name: "Maroon", value: "#800000" },
  { name: "Navy", value: "#000080" },
  { name: "Olive", value: "#808000" },
  { name: "Turquoise", value: "#40E0D0" },
  { name: "Silver", value: "#C0C0C0" },
  { name: "Indigo", value: "#4B0082" },
  { name: "Gold", value: "#FFD700" },
  { name: "Violet", value: "#EE82EE" },
  { name: "Plum", value: "#DDA0DD" },
  { name: "Khaki", value: "#F0E68C" },
  { name: "Sky Blue", value: "#87CEEB" },
  { name: "Salmon", value: "#FA8072" },
  { name: "Coral", value: "#FF7F50" },
  { name: "Aquamarine", value: "#7FFFD4" },
  { name: "Tan", value: "#D2B48C" },
  { name: "Peach", value: "#FFDAB9" },
  { name: "Orchid", value: "#DA70D6" },
  { name: "Ruby", value: "#E0115F" },
  { name: "Mint", value: "#3EB489" },
  { name: "Forest Green", value: "#228B22" },
  { name: "Olive Drab", value: "#6B8E23" },
  { name: "Midnight Blue", value: "#191970" },
  { name: "Wheat", value: "#F5DEB3" },
  { name: "Steel Blue", value: "#4682B4" },
  { name: "Sea Green", value: "#2E8B57" },
  { name: "Slate Gray", value: "#708090" },
  { name: "Royal Blue", value: "#4169E1" },
  { name: "Crimson", value: "#DC143C" },
  { name: "Chocolate", value: "#D2691E" },
  { name: "Sienna", value: "#A0522D" },
  { name: "Pale Green", value: "#98FB98" },
  { name: "Orchid", value: "#DA70D6" },
  { name: "Peru", value: "#CD853F" },
  { name: "Rosy Brown", value: "#BC8F8F" },
  { name: "Powder Blue", value: "#B0E0E6" },
  { name: "Goldenrod", value: "#DAA520" },
  { name: "Gainsboro", value: "#DCDCDC" },
];

interface ColorBlockProps {
  color: string;
  selectedColor: string | null;
  onClick: (color: string) => void;
}
const ColorBlock: React.FC<ColorBlockProps> = ({ color, selectedColor, onClick }) => (
  <div
    style={{
      width: "40px", // Reduced fixed width
      height: "40px", // Reduced fixed height
      backgroundColor: color,
      cursor: "pointer",
      border: selectedColor === color ? "2px solid black" : "none",
      boxSizing: "border-box",
      margin: "1px", // Added small margin for spacing
    }}
    onClick={() => onClick(color)}
  />
);
const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        old_event_name: editData.event_name,
        event_name: editData.event_name,
        event_color: editData.event_color,
      },

      onSubmit: (values, action) => {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_type`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Updated  Successfully!");
            fetchData();
            handleCloseupdate();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });

        action.resetForm();
      },
    });
  const handleColorSelect = (colorName: string) => {
    setFieldValue("event_color", colorName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Event Type Name *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              sx={{ width: "70%" }}
              variant="standard"
              name="event_name"
              value={values.event_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.event_name && Boolean(errors.event_name)}
              success={values.event_name.length > 0 && !errors.event_name}
              helperText={touched.event_name && errors.event_name}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Event Color *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Autocomplete
              sx={{ width: "70%" }}
              disableClearable
              value={values.event_color}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "event_color", value },
                });
              }}
              options={colorOptions.map((item: any) => item.name)}
              renderInput={(params: any) => (
                <MDInput
                  //InputLabelProps={{ shrink: true }}
                  name="event_color"
                  placeholder="Select Option"
                  //label={<MDTypography variant="body2">Scoring Type</MDTypography>}
                  //onChange={handleChange}
                  value={values.event_color}
                  {...params}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)", // 10 columns
                gap: "3px",
                maxWidth: "100%",
                overflow: "auto",
              }}
            >
              {colorOptions.map((color) => (
                <ColorBlock
                  key={color.name}
                  color={color.value}
                  selectedColor={values.event_color === color.name ? color.value : null}
                  onClick={() => handleColorSelect(color.name)}
                />
              ))}
            </div>
            {touched.event_color && errors.event_color && (
              <MDTypography variant="caption" color="error">
                {errors.event_color}
              </MDTypography>
            )}
          </Grid>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item mt={2}>
              <MDButton color="dark" variant="contained" onClick={handleCloseupdate}>
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

export default Update;
