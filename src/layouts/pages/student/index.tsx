import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GroupsIcon from "@mui/icons-material/Groups";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import Update from "./update";
import Create from "./create";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
const token = Cookies.get("token");
import * as Yup from "yup";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Enter Class Name"),
  section_name: Yup.string().required("Enter Section Name"),
});

const Student = () => {
  const [rbacData, setRbacData] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("rbac user", response.data);
        setRbacData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRbac();

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);
        filterDataByAcdName(response.data, "2024-2025");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);
  //End
  const [data, setData] = useState([]);

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data.user_id);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End

  const fetchStudents = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_student/search`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_student`, {
        data: { user_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.username !== name);
        setData(updatedData); // Update the state with the new data
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);

      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Student Name", accessor: "full_name" },
      { Header: "Class", accessor: "class_name" },
      { Header: "Section", accessor: "section_name" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Admission Number", accessor: "admission_number" },
      { Header: "User ID", accessor: "user_id" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      admission_number: row.admission_number,
      user_id: row.user_id,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "studentdetailsupdate") ? (
              <IconButton
                onClick={() => {
                  handleOpenupdate(index);
                }}
              >
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <IconButton
            onClick={() => {
              handleDelete(row.user_id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),

      full_name: `${row.first_name} ${row.middle_name == null ? "" : row.middle_name} ${
        row.last_name
      }`,
      class_name: row.class_name,
      gender: row.gender,
      section_name: row.section_name,
      mobile_number: row.mobile_number,
    })),
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: "2024-2025",
        class_name: "",
        section_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = {
          academic_year: values.academic_year,
          classes: [
            {
              class_name: values.class_name,
              section_name: values.section_name,
            },
          ],
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_student/search`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            action.resetForm();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <BaseLayout>
      {showpage ? (
        <>
          <Create setShowpage={setShowpage} />
        </>
      ) : (
        <>
          {openupdate ? (
            <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchStudents} />
          ) : (
            <>
              <Card>
                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid item pt={2} pl={2}>
                    {" "}
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Student List
                    </MDTypography>
                  </Grid>
                  <Grid item pt={2} pr={2}>
                    {rbacData ? (
                      rbacData?.find((element: string) => element === "studentdetailscreate") ? (
                        <MDButton
                          variant="outlined"
                          color="info"
                          type="submit"
                          onClick={handleShowPage}
                        >
                          + Create New Student
                        </MDButton>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>{" "}
                <form onSubmit={handleSubmit}>
                  <Grid container m={2}>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        sx={{ width: "80%" }}
                        value={values.class_name}
                        disableClearable
                        onChange={
                          filteredClass.length >= 1
                            ? (event, value) => {
                                handleChange({
                                  target: { name: "class_name", value },
                                });
                                filterSectionData(value);
                              }
                            : undefined
                        }
                        options={filteredClass}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="class_name"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Class Name
                              </MDTypography>
                            }
                            onChange={handleChange}
                            value={values.class_name}
                            {...params}
                            variant="standard"
                            error={touched.class_name && Boolean(errors.class_name)}
                            success={values.class_name.length && !errors.class_name}
                            helperText={touched.class_name && errors.class_name}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        sx={{ width: "80%" }}
                        value={values.section_name}
                        disableClearable
                        onChange={
                          filteredSection.length >= 1
                            ? (event, value) => {
                                handleChange({
                                  target: { name: "section_name", value },
                                });
                              }
                            : undefined
                        }
                        options={
                          filteredSection[0]
                            ? filteredSection[0].map((sectiondata: any) => sectiondata.section_name)
                            : ""
                        }
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="section_name"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Section Name
                              </MDTypography>
                            }
                            onChange={handleChange}
                            value={values.section_name}
                            {...params}
                            variant="standard"
                            error={touched.section_name && Boolean(errors.section_name)}
                            helperText={touched.section_name && errors.section_name}
                            success={values.section_name.length && !errors.section_name}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDButton color="dark" variant="contained" type="submit">
                        filter
                      </MDButton>
                    </Grid>
                  </Grid>{" "}
                </form>
                {data.length > 1 && (
                  <DataTable
                    canSearch={true}
                    table={dataTableData}
                    entriesPerPage={false}
                    showTotalEntries={false}
                  />
                )}
              </Card>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
};

export default Student;
