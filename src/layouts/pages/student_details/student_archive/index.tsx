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
import { IconButton, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowStudent from "./show_student";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
const token = Cookies.get("token");
import * as Yup from "yup";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import EditArchive from "./EditArchive";
const validationSchema = Yup.object().shape({
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required"),
  class_name: Yup.string().required("Required"),
  section_name: Yup.string().required("Required"),
});
const cookies_academic_year = Cookies.get("academic_year");

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Create from "./create";
const StudentArchive = () => {
  const [rbacData, setRbacData] = useState([]);

  const { classes } = useSelector((state: any) => state);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);
  //Update Dialog Box Start

  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setUsername(main_data.user_name);
  };

  //End
  const [openedit, setOpenedit] = useState(false);

  const [editData, setEditData] = useState({});

  const handleEdit = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setEditData(main_data);
    setOpenedit(true);
    setUsername(main_data.user_name);
  };
  const handleEditClose = () => {
    setOpenedit(false);
  };

  const fetchArchiveStudents = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/student_archive`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.filter((info: any) => info.academic_year == cookies_academic_year));
        console.log(response.data);
      })
      .catch((error) => {
        setData([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchArchiveStudents();
  }, []);
  const handleArchive = async (name: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/student_archive/un_archive`,
        { user_name: name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Archived SuccessFully");
        // Filter out the deleted user from the data
        // Update the state with the new data
        fetchArchiveStudents();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);

      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Student Name", accessor: "student_name" },
      { Header: "Class", accessor: "class_name" },
      { Header: "Section", accessor: "section_name" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Admission Number", accessor: "admission_number" },
      { Header: "User ID", accessor: "user_name" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row: any, index: any) => ({
      admission_number: row.admission_number,
      user_name: row.user_name,
      student_name: row.student_name,
      class_name: row.class_name,
      gender: row.gender,
      section_name: row.section_name,
      mobile_number: row.mobile_number,
      action: (
        <>
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
            }}
          >
            <Tooltip title="View Info" placement="top">
              <AccountBoxIcon />
            </Tooltip>
          </IconButton>

          <IconButton>
            <Popconfirm
              title="UnArchive"
              description="Do you want to  UnArchive it ?"
              placement="topLeft"
              onConfirm={() => handleArchive(row.user_name)} // Pass index to confirm function
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="UnArchive" placement="top">
                <UnarchiveIcon />
              </Tooltip>
            </Popconfirm>
          </IconButton>
          <IconButton
            onClick={() => {
              handleEdit(index);
            }}
          >
            <Tooltip title="Edit" placement="top">
              <ModeEditOutlineIcon />
            </Tooltip>
          </IconButton>
        </>
      ),
    })),
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: cookies_academic_year,
        class_name: "",
        section_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        let getAcademic_year = values.academic_year;
        let getClass_name = values.class_name;
        let getSection_name = values.section_name;

        axios
          .get(`${process.env.REACT_APP_BASE_URL}/student_archive`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(
              response.data.filter(
                (info: any) =>
                  info.class_name == getClass_name &&
                  info.section_name == getSection_name &&
                  info.academic_year == getAcademic_year
              )
            );
            console.log(response.data);
          })
          .catch((error: any) => {
            setData([]);
            message.error(error.response.data.detail);
          });
      },
    });
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  // student.filter((info: any) => info.academic_year == values.academic_year);
  return (
    <BaseLayout>
      {showpage ? (
        <>
          <Create setShowpage={setShowpage} fetchData={fetchArchiveStudents} />
        </>
      ) : (
        <>
          {openupdate && username ? (
            <ShowStudent
              setOpenupdate={setOpenupdate}
              username={username}
              fetchData={fetchArchiveStudents}
            />
          ) : (
            <>
              <Card>
                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid item pt={2} pl={2}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Student Archive List
                    </MDTypography>
                  </Grid>
                  <Grid item pt={2} pr={2}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      type="submit"
                      onClick={handleShowPage}
                    >
                      + Create Student Archive
                    </MDButton>
                  </Grid>
                </Grid>
                <form onSubmit={handleSubmit}>
                  <MDBox p={4}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disableClearable
                          value={values.academic_year}
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "academic_year", value } });
                          }}
                          options={
                            classes
                              ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              name="academic_year"
                              //onChange={handleChange}
                              value={values.academic_year}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Academic Year
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                              onBlur={handleBlur}
                              error={touched.academic_year && Boolean(errors.academic_year)}
                              success={values.academic_year && !errors.academic_year}
                              helperText={touched.academic_year && errors.academic_year}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disableClearable
                          value={values.class_name}
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "class_name", value } });
                            setFieldValue("section_name", "");
                          }}
                          options={
                            values.academic_year !== ""
                              ? classes
                                  .filter(
                                    (item: any) => item.academic_year === values.academic_year
                                  )
                                  .map((item: any) => item.class_name)
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="class_name"
                              // onChange={handleChange}
                              value={values.class_name}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Class
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                              onBlur={handleBlur}
                              error={touched.class_name && Boolean(errors.class_name)}
                              success={values.class_name && !errors.class_name}
                              helperText={touched.class_name && errors.class_name}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disableClearable
                          value={values.section_name}
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "section_name", value } });
                          }}
                          options={
                            values.class_name !== ""
                              ? classes
                                  .filter(
                                    (item: any) =>
                                      item.academic_year === values.academic_year &&
                                      item.class_name === values.class_name
                                  )[0]
                                  .section_data.map((item: any) => item.section_name)
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="section_name"
                              //  onChange={handleChange}
                              value={values.section_name}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Section
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                              onBlur={handleBlur}
                              error={touched.section_name && Boolean(errors.section_name)}
                              success={values.section_name && !errors.section_name}
                              helperText={touched.section_name && errors.section_name}
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        ml={2}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        <MDButton color="info" variant="contained" type="submit">
                          Show Data
                        </MDButton>
                      </Grid>
                    </Grid>
                    {data.length > 0 && (
                      <DataTable canSearch={true} isSorted={false} table={dataTableData} />
                    )}
                  </MDBox>
                </form>
              </Card>
            </>
          )}
        </>
      )}
      <Dialog open={openedit} onClose={handleEditClose}>
        <EditArchive
          fetchData={fetchArchiveStudents}
          handleClose={handleEditClose}
          editData={editData}
        />
      </Dialog>
    </BaseLayout>
  );
};

export default StudentArchive;
