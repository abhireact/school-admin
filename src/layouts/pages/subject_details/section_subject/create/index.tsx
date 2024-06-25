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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox, Icon } from "@mui/material";
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
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {classSectionData.class_name} - {classSectionData.section_name}
              </MDTypography>
            </Grid>
            <Grid
              container
              xs={12}
              sm={6}
              my={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
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
              {data.length > 0 ? (
                <Grid item ml={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    Save&nbsp;<Icon>save</Icon>
                  </MDButton>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} sm={12} m={4}>
              {data.length < 1 ? (
                "NO DATA AVAILABLE"
              ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                  <table
                    style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
                  >
                    <thead
                      style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
                    >
                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            SUBJECT
                          </MDTypography>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            TEACHER
                          </MDTypography>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "left",
                            border: "1px solid #f0f2f5",
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontWeight="bold"
                            color="secondary"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            SELECT:
                          </MDTypography>
                          &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectAll()}
                          >
                            All
                          </MDButton>
                          &nbsp; &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
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
                              <td
                                style={{
                                  padding: "10px",
                                  textAlign: "left",
                                  border: "1px solid #f0f2f5",
                                }}
                              >
                                <MDTypography
                                  variant="caption"
                                  fontWeight="bold"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.subject_name}
                                </MDTypography>
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  textAlign: "start",
                                  border: "1px solid #f0f2f5",
                                }}
                              >
                                <Autocomplete
                                  disableClearable
                                  sx={{ width: "100%" }}
                                  value={
                                    item.employee_list.find((info: any) => info.is_selected)
                                      ?.name || "Select Options"
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
                              <td
                                style={{
                                  padding: "10px",
                                  textAlign: "start",
                                  border: "1px solid #f0f2f5",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={item.is_selected}
                                  onChange={() => handleCheckboxChange(index)}
                                />
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
