import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete, IconButton } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { fetchStudent } from "layouts/pages/redux/dataSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  committee_name: Yup.string().required("Required *"),
});

const cookies_academic_year = Cookies.get("academic_year");

export default function CreateCommittee() {
  const [studentSelections, setStudentSelections] = useState<any>({});
  const [employeeSelections, setEmployeeSelections] = useState<any>({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const initialValues = {
    academic_year: cookies_academic_year,
    class: "",
    section: "",
    department: "",
    committee_name: "",
    student_id: [] as string[],
    employee_number: [] as string[],
  };

  const { classes, student, employee, department } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const studentUserNames = Object.keys(studentSelections)?.filter(
          (userId) => studentSelections[userId]
        );
        const employeeUserNames = Object.keys(employeeSelections)?.filter(
          (userId) => employeeSelections[userId]
        );
        let sendData = {
          committee_name: values.committee_name,
          student_id: studentUserNames,
          employee_number: employeeUserNames,
        };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_committee`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();
            navigate("/event/event_committee");
            setData([]);
            setEmployeeData([]);
            setSelectedEmployees([]);
            setSelectedStudents([]);

            message.success("Event Committee Created Successfully");
          })
          .catch((error: any) => {
            console.log(error, "error");
            message.error(error.response.data.detail);
          });
      },
    });

  useEffect(() => {
    if (values.department) {
      let filterEmployee = employee?.filter((item: any) => item.department == values.department);
      if (filterEmployee?.length < 1) {
        message.error("No Employee found for this department");
      }
      let employeeData = filterEmployee?.map((selection: any) => ({
        ...selection,
        is_selected: employeeSelections[selection.user_id] || false,
      }));
      setEmployeeData(employeeData);
    }
  }, [values.department, employee, employeeSelections]);

  useEffect(() => {
    if (values.academic_year && values.class && values.section) {
      let filterStudent = student?.filter(
        (item: any) =>
          item.class_name == values.class &&
          item.section_name == values.section &&
          item.academic_year == values.academic_year
      );
      if (filterStudent?.length < 1) {
        message.error("No Student Found for this Academic Year/ Class / Section");
      }
      let studentData = filterStudent?.map((selection: any) => ({
        ...selection,
        is_selected: studentSelections[selection.user_id] || false,
      }));
      setData(studentData);
    }
  }, [values.academic_year, values.class, values.section, student, studentSelections]);

  const handleEmployeeCheckBox = (userId: string) => {
    setEmployeeSelections((prev: any) => {
      const newSelections = { ...prev, [userId]: !prev[userId] };
      const selectedEmps = employee?.filter((emp: any) => newSelections[emp.user_id]);
      setSelectedEmployees(selectedEmps);
      return newSelections;
    });
  };

  const handleCheckboxChange = (userId: string) => {
    setStudentSelections((prev: any) => {
      const newSelections = { ...prev, [userId]: !prev[userId] };
      const selectedStuds = student?.filter((stud: any) => newSelections[stud.user_id]);
      setSelectedStudents(selectedStuds);
      return newSelections;
    });
  };

  const handleSelectAllEmployee = () => {
    const newSelections: any = {};
    employeeData.forEach((employee: any) => {
      newSelections[employee.user_id] = true;
    });
    setEmployeeSelections(newSelections);
    setSelectedEmployees(employeeData);
  };

  const handleSelectNoneEmployee = () => {
    setEmployeeSelections({});
    setSelectedEmployees([]);
  };

  const handleSelectAll = () => {
    const newSelections: any = {};
    data.forEach((student: any) => {
      newSelections[student.user_id] = true;
    });
    setStudentSelections(newSelections);
    setSelectedStudents(data);
  };

  const handleSelectNone = () => {
    setStudentSelections({});
    setSelectedStudents([]);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_event: any, newValue: any) => {
    setSelectedTab(newValue);
  };
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Event Committee
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
                  Back
                </MDButton>
                &nbsp;&nbsp;
                <MDButton color="info" variant="contained" type="submit">
                  Submit&nbsp;
                  <SaveIcon />
                </MDButton>
              </Grid>

              <Grid item xs={6} sm={6}>
                <MDInput
                  sx={{ width: "90%" }}
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      COMMITEE NAME
                    </MDTypography>
                  }
                  variant="standard"
                  name="committee_name"
                  value={values.committee_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.committee_name && Boolean(errors.committee_name)}
                  success={values.committee_name?.length > 0 && !errors.committee_name}
                  helperText={touched.committee_name && errors.committee_name}
                />
              </Grid>
              <Grid item xs={6} sm={6}></Grid>

              <Grid item xs={12} sm={6}>
                {selectedEmployees.length > 0 && (
                  <>
                    <MDTypography variant="button" fontWeight="medium" color="text">
                      SELECTED EMPLOYEES
                    </MDTypography>
                    <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {selectedEmployees.map((emp: any) => (
                        <li key={emp.user_id}>
                          <MDTypography key={emp.user_id} variant="caption" fontWeight="bold">
                            {emp.user_id} - {emp.employee_name}
                          </MDTypography>
                          <IconButton onClick={() => handleEmployeeCheckBox(emp.user_id)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {selectedStudents?.length > 0 && (
                  <>
                    <MDTypography variant="button" fontWeight="medium" color="text">
                      SELECTED STUDENTS
                    </MDTypography>
                    <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {selectedStudents.map((stud: any) => (
                        <li key={stud.user_id}>
                          <MDTypography key={stud.user_id} variant="caption" fontWeight="bold">
                            {stud.user_id} - {stud.first_name} {stud.middle_name} {stud.last_name}
                          </MDTypography>
                          <IconButton onClick={() => handleCheckboxChange(stud.user_id)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Grid>

              <Grid item container xs={12} sm={12} mt={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  mb={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MDTypography variant="body2" fontWeight="bold" color="dark">
                    ADD MEMBERS
                  </MDTypography>
                </Grid>
                <AppBar position="static">
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <Tab
                      label={
                        <MDTypography variant="body2" fontWeight="bold" color="info">
                          EMPLOYEE
                        </MDTypography>
                      }
                      sx={{ flex: "50%", color: "info" }}
                    />
                    <Tab
                      label={
                        <MDTypography variant="body2" fontWeight="bold" color="info">
                          STUDENT
                        </MDTypography>
                      }
                      sx={{ flex: "50%" }}
                    />
                  </Tabs>
                </AppBar>
              </Grid>
              {selectedTab === 0 && (
                <Grid container spacing={2} item sm={12} xs={12}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "90%" }}
                      value={values.department}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "department", value },
                        });
                      }}
                      options={department?.map((info: any) => info.dept_name)}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="department"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              SELECT DEPARTMENT FROM OPTIONS
                            </MDTypography>
                          }
                          value={values.department}
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.department && Boolean(errors.department)}
                          success={values.department && !errors.department}
                          helperText={touched.department && errors.department}
                        />
                      )}
                    />
                  </Grid>

                  {employeeData?.length > 0 && (
                    <Grid item xs={12} sm={12}>
                      <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "fixed",
                          }}
                        >
                          <thead
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "white",
                              zIndex: 1,
                            }}
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
                                  AVAILABLE EMPLOYEE
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
                                  onClick={() => handleSelectAllEmployee()}
                                >
                                  All
                                </MDButton>
                                &nbsp; &nbsp;
                                <MDButton
                                  color="info"
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleSelectNoneEmployee()}
                                >
                                  None
                                </MDButton>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeData?.length > 0
                              ? employeeData?.map((item: any, index: any) => (
                                  <tr key={index + item.user_id}>
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
                                        {item.user_id}/{item.employee_name}
                                      </MDTypography>
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
                                        checked={employeeSelections[item.user_id] || false}
                                        onChange={() => handleEmployeeCheckBox(item.user_id)}
                                      />
                                    </td>
                                  </tr>
                                ))
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </Grid>
                  )}
                </Grid>
              )}
              {selectedTab === 1 && (
                <Grid container spacing={2} item sm={12} xs={12}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "90%" }}
                      value={values.class}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "class", value } });
                      }}
                      options={
                        values.academic_year !== ""
                          ? classes
                              ?.filter((item: any) => item.academic_year === values.academic_year)
                              ?.map((item: any) => item.class_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          //required
                          name="class"
                          // onChange={handleChange}
                          value={values.class}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              SELECT CLASS FROM OPTIONS
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.class && Boolean(errors.class)}
                          success={values.class?.length && !errors.class}
                          helperText={touched.class && errors.class}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "90%" }}
                      value={values.section}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section", value } });
                      }}
                      options={
                        values.class !== ""
                          ? classes
                              ?.filter(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.class
                              )[0]
                              .section_data?.map((item: any) => item.section_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          //required
                          name="section_name"
                          //  onChange={handleChange}
                          value={values.section}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              SELECT SECTION FROM OPTIONS
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.section && Boolean(errors.section)}
                          success={values.section?.length && !errors.section}
                          helperText={touched.section && errors.section}
                        />
                      )}
                    />
                  </Grid>
                  {data?.length > 0 && (
                    <Grid item xs={12} sm={12}>
                      <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "fixed",
                          }}
                        >
                          <thead
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "white",
                              zIndex: 1,
                            }}
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
                                  AVAILABLE STUDENTS
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
                                  <tr key={index + item.user_id}>
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
                                        {item.user_id}/{item.first_name}
                                        {item.middle_name} {item.last_name}
                                      </MDTypography>
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
                                        checked={studentSelections[item.user_id] || false}
                                        onChange={() => handleCheckboxChange(item.user_id)}
                                      />
                                    </td>
                                  </tr>
                                ))
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
