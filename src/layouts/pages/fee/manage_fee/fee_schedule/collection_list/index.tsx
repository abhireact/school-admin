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
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const CollectionList = () => {
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

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
        academic_year: Cacademic_year,
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
            setData([]);
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

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/students`,
        {
          name: main_data.name,
          academic_year: main_data.academic_year,
          class_name: main_data.class_name,
          section_name: main_data.section_name,
          particular_id: main_data.particular_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setManageData(response.data);
        setSendData(main_data);
        setManagepage(true);
        console.log("manage schedule data", response.data);
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };

  const handleDelete = (row: any) => {
    console.log(row, "delete schedule");
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule`, {
        data: {
          name: row.name,
          particular_id: row.particular_id,
          academic_year: row.academic_year,
          class_name: row.class_name,
          section_name: row.section_name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Deleted Successfully");
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
            setData([]);
            message.error(error.response.data.detail);
          });
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
          <Tooltip title="Edit" placement="top">
            <IconButton
              onClick={() => {
                handleOpenupdate(index);
              }}
            >
              <CreateRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top">
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  handleDelete(row);
                }}
              />
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
                  <Grid
                    sm={12}
                    container
                    pt={2}
                    px={2}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid item>
                      <MDTypography variant="h4" fontWeight="bold" color="secondary">
                        Fee Schedule
                      </MDTypography>
                    </Grid>
                    <Grid item>
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
                  </Grid>
                  <form onSubmit={handleSubmit}>
                    <MDBox p={4}>
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
                            onChange={(_event, value) => {
                              handleChange({ target: { name: "academic_year", value } });
                            }}
                            defaultValue={Cacademic_year}
                            options={
                              classes
                                ? Array.from(
                                    new Set(classes.map((item: any) => item.academic_year))
                                  )
                                : []
                            }
                            disabled
                            renderInput={(params) => (
                              <MDInput
                                required
                                defaultValue="Cacademic_year"
                                name="academic_year"
                                onChange={handleChange}
                                disabled
                                value={values.academic_year}
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Academic Year
                                  </MDTypography>
                                }
                                {...params}
                                variant="standard"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
                            onChange={(_event, value) => {
                              handleChange({ target: { name: "class_name", value } });
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
                                name="class"
                                onChange={handleChange}
                                value={values.class_name}
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Class
                                  </MDTypography>
                                }
                                {...params}
                                variant="standard"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
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
                                onChange={handleChange}
                                value={values.section_name}
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Section
                                  </MDTypography>
                                }
                                {...params}
                                variant="standard"
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
