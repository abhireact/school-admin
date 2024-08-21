import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Checkbox } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
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
import { fetchStudent } from "layouts/pages/redux/dataSlice";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  committee_name: Yup.string().required("Required *"),
});
const cookies_academic_year = Cookies.get("academic_year");
export default function CreateCommittee() {
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
        const studentUserNames = data
          .filter((info: any) => info.is_selected)
          .map((info: any) => info.user_id);
        const employeeUserNames = employeeData
          .filter((info: any) => info.is_selected)
          .map((info: any) => info.user_id);
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

            setData([]);
            setEmployeeData([]);
            dispatch(fetchStudent() as any);
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
      let filterEmployee = employee.filter((item: any) => item.department == values.department);
      if (filterEmployee.length < 1) {
        message.error("No Employee found for this department");
      }
      let employeeData = filterEmployee.map((selection: any, i: number) => ({
        ...selection,
        is_selected: false,
      }));
      setEmployeeData(employeeData);
    }
  }, [values.department]);
  const handleEmployeeCheckBox = (index: number) => {
    setEmployeeData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) =>
        i === index ? { ...selection, is_selected: !selection.is_selected } : selection
      )
    );
    console.log(employee, "change employee checkbox");
  };
  const handleSelectAllEmployee = () => {
    setEmployeeData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: true }))
    );
    console.log(employeeData, "employee select all");
  };
  const handleSelectNoneEmployee = () => {
    setEmployeeData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: false }))
    );
    console.log(employeeData, "employee select none");
  };
  useEffect(() => {
    if (values.academic_year && values.class && values.section) {
      let filterStudent = student.filter(
        (item: any) =>
          item.class_name == values.class &&
          item.section_name == values.section &&
          item.academic_year == values.academic_year
      );
      if (filterStudent.length < 1) {
        message.error("No Student Found for this Academic Year/ Class / Section");
      }
      let studentData = filterStudent.map((selection: any, i: number) => ({
        ...selection,
        is_selected: false,
      }));
      setData(studentData);
    }
  }, [values.academic_year, values.class, values.section]);

  const handleCheckboxChange = (index: number) => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) =>
        i === index ? { ...selection, is_selected: !selection.is_selected } : selection
      )
    );
    console.log(data, "change student checkbox");
  };

  const handleSelectAll = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: true }))
    );
    console.log(data, "student select all");
  };
  const handleSelectNone = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: false }))
    );
    console.log(data, "student select none");
  };

  //tabs
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
                  Create Album
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
                      ALBUM NAME
                    </MDTypography>
                  }
                  variant="standard"
                  name="committee_name"
                  value={values.committee_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.committee_name && Boolean(errors.committee_name)}
                  success={values.committee_name.length > 0 && !errors.committee_name}
                  helperText={touched.committee_name && errors.committee_name}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
