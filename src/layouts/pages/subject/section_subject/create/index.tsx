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

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleClose, classSectionData } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_subject/section_subjects`, classSectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: classSectionData.academic_year,
      class_name: classSectionData.class_name,
      section_name: classSectionData.section_name,
    },

    enableReinitialize: true,
    onSubmit: (values, action) => {
      console.log("submit");
      const sendValue = { ...values, subject_list: data };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_subject/section_subjects`, sendValue, {
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
                {classSectionData.class_name} - {classSectionData.section_name}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} m={4}>
              {data.length < 1 ? (
                "NO DATA AVAILABLE"
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <td
                        style={{
                          fontSize: "18px",
                          textAlign: "left",
                        }}
                        rowSpan={2}
                      >
                        <b> SUBJECT</b>
                      </td>
                      <td
                        style={{
                          fontSize: "18px",
                          textAlign: "left",
                        }}
                        rowSpan={2}
                      >
                        <b>TEACHER</b>
                      </td>
                      <td
                        style={{
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                        rowSpan={2}
                      >
                        <b>SELECT</b>
                        <MDButton
                          color="info"
                          size="small"
                          variant="text"
                          onClick={() => handleSelectAll()}
                        >
                          All
                        </MDButton>
                        <MDButton
                          color="info"
                          size="small"
                          variant="text"
                          onClick={() => handleSelectNone()}
                        >
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
                            <td style={{ textAlign: "left" }}>
                              <Autocomplete
                                disableClearable
                                sx={{ width: "100%" }}
                                value={
                                  item.employee_list.find((info: any) => info.is_selected)?.name ||
                                  "Select Options"
                                }
                                onChange={(event, value) => {
                                  if (value === "No Options") {
                                    setData((prev) =>
                                      prev.map((prevItem, idx) =>
                                        idx === index
                                          ? {
                                              ...prevItem,

                                              employee_list: prevItem.employee_list.map(
                                                (emp: any) => ({ ...emp, is_selected: false })
                                              ),
                                            }
                                          : prevItem
                                      )
                                    );
                                  } else {
                                    setData((prev) =>
                                      prev.map((prevItem, idx) =>
                                        idx === index
                                          ? {
                                              ...prevItem,

                                              employee_list: prevItem.employee_list.map(
                                                (emp: any) =>
                                                  emp.name === value
                                                    ? { ...emp, is_selected: true }
                                                    : { ...emp, is_selected: false }
                                              ),
                                            }
                                          : prevItem
                                      )
                                    );
                                  }
                                }}
                                options={[
                                  ...item.employee_list.map((acd: any) => acd.name),
                                  "No Options",
                                ]}
                                renderInput={(params: any) => (
                                  <MDInput
                                    InputLabelProps={{ shrink: true }}
                                    {...params}
                                    variant="standard"
                                  />
                                )}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
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
            <Grid item mr={8} mt={4}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
