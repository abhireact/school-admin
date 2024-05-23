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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Update from "./update";
import ManageSchedule from "./manage";
import NewFeeSchedule from "../new_fee_schedule";

const token = Cookies.get("token");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const CollectionList = () => {
  const [data, setData] = useState([]);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);

  function filterSectionData(data: any, class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }

  console.log(filteredSection, "section name");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchCollectionlist = (datainfo: any) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/search`, datainfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log("may 20", response.data);
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: "",
        class_name: "",
        section_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/search`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log("may 20", response.data);
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  const [editData, setEditData] = useState(null);
  const [updatepage, setUpdatepage] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setEditData(main_data);
    setUpdatepage(true);
  };
  const [manageData, setManageData] = useState(null);
  const [managepage, setManagepage] = useState(false);
  const [sendData, setSendData] = useState(null);
  const handleOpenManage = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setSendData({
      name: main_data.name,
      academic_year: main_data.academic_year,
      class_name: main_data.class_name,
      section_name: main_data.section_name,
    });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/students`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setManageData(response.data);
        setManagepage(true);
        console.log("manage schedule data", response.data);
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };
  const dataTableData = {
    columns: [
      { Header: "Index ", accessor: "index", width: "10%" },
      { Header: "Name", accessor: "name" },
      { Header: "Class & Section", accessor: "class_name" },
      { Header: "Start Date", accessor: "start_date" },
      { Header: "End Date", accessor: "end_date" },
      { Header: "Due Date", accessor: "due_date" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      index: `${index + 1}`,
      class_name: `${row.class_name} ${row.section_name}`,
      name: row.name,
      start_date: row.start_date,
      end_date: row.end_date,
      due_date: row.due_date,
      action: (
        <>
          <Tooltip title="Edit Class" placement="top">
            <IconButton
              onClick={() => {
                handleOpenupdate(index);
              }}
            >
              <CreateRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Class" placement="top">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage Schedule" placement="top">
            <IconButton
              onClick={() => {
                handleOpenManage(index);
              }}
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    })),
  };
  const [createpage, setCreatepage] = useState(false);
  const handleCreatePage = () => {
    setCreatepage(!createpage);
  };
  return (
    <>
      {managepage ? (
        <ManageSchedule manageData={manageData} handleClose={setManagepage} sendData={sendData} />
      ) : (
        <>
          {updatepage ? (
            <Update
              editData={editData}
              handleClose={setUpdatepage}
              fetchData={fetchCollectionlist}
            />
          ) : (
            <>
              {createpage ? (
                <Grid sm={12}>
                  <NewFeeSchedule handleClose={handleCreatePage} />
                </Grid>
              ) : (
                <>
                  <Grid sm={12} pt={2} px={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        handleCreatePage();
                      }}
                    >
                      + Create New Fee Schedule
                    </MDButton>
                  </Grid>
                  <form onSubmit={handleSubmit}>
                    <MDBox p={4}>
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
                            sx={{ width: "80%" }}
                            disableClearable
                            value={values.academic_year}
                            onChange={(event, value) => {
                              handleChange({
                                target: { name: "academic_year", value },
                              });
                              filterDataByAcdName(classdata, value);
                            }}
                            options={academicdata.map((acd) => acd.academic_year)}
                            renderInput={(params: any) => (
                              <MDInput
                                InputLabelProps={{ shrink: true }}
                                name="academic_year"
                                placeholder="eg. 2022-2023"
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Academic Year
                                  </MDTypography>
                                }
                                onChange={handleChange}
                                value={values.academic_year}
                                {...params}
                                variant="standard"
                                onBlur={handleBlur}
                                error={touched.academic_year && Boolean(errors.academic_year)}
                                success={values.academic_year.length && !errors.academic_year}
                                helperText={touched.academic_year && errors.academic_year}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
                            sx={{ width: "80%" }}
                            disableClearable
                            value={values.class_name}
                            onChange={
                              filteredClass.length >= 1
                                ? (event, value) => {
                                    handleChange({
                                      target: { name: "class_name", value },
                                    });
                                    filterSectionData(sectiondata, value);
                                  }
                                : undefined
                            }
                            options={filteredClass}
                            renderInput={(params: any) => (
                              <MDInput
                                InputLabelProps={{ shrink: true }}
                                name="class_name"
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
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
                            disableClearable
                            value={values.section_name}
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
                                ? filteredSection[0].map(
                                    (sectiondata: any) => sectiondata.section_name
                                  )
                                : []
                            }
                            renderInput={(params: any) => (
                              <MDInput
                                InputLabelProps={{ shrink: true }}
                                name="section_name"
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Section Name
                                  </MDTypography>
                                }
                                onChange={handleChange}
                                value={values.section_name}
                                {...params}
                                variant="standard"
                                error={touched.section_name && Boolean(errors.section_name)}
                                success={values.section_name.length && !errors.section_name}
                                helperText={touched.section_name && errors.section_name}
                              />
                            )}
                          />
                        </Grid>

                        <Grid
                          item
                          container
                          xs={12}
                          sm={12}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                          mr={2}
                        >
                          <Grid item mt={2} mr={2}></Grid>
                          <Grid item mt={2}>
                            <MDButton color="info" variant="contained" type="submit">
                              Submit
                            </MDButton>
                          </Grid>
                        </Grid>
                        {data.length > 1 ? <DataTable table={dataTableData} canSearch /> : ""}
                      </Grid>
                    </MDBox>
                  </form>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default CollectionList;