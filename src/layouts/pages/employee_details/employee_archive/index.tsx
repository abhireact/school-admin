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
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
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
  class_name: Yup.string(),
  section_name: Yup.string(),
});
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Create from "./create";
import { fetchStudent } from "layouts/pages/redux/dataSlice";

const EmployeeArchive = () => {
  const [rbacData, setRbacData] = useState([]);

  const { classes } = useSelector((state: any) => state);
  let dispatch = useDispatch();
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

  const handleArchive = async (info: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employee_archive/un_archive`,
        { user_name: info },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Archived SuccessFully");
        fetchEmployeeArchive();
        // dispatch(fetchStudent() as any);
      }
    } catch (error: any) {
      console.error("Error while doing Unarchive:", error);

      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Employee Name", accessor: "employee_name" },
      { Header: "Position", accessor: "position" },
      { Header: "Department", accessor: "department" },
      { Header: "User ID", accessor: "user_name" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row: any, index: any) => ({
      user_name: row.user_name,
      employee_name: row.employee_name,
      position: row.position,
      department: row.department,
      mobile_number: row.mobile_number,
      action: (
        <>
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
  const [departmentInfo, setDepartmentInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setDepartmentInfo(response.data);
        console.log(response.data, "department info");
      })
      .catch((error) => {
        setDepartmentInfo([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        department: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {},
    });
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  const fetchEmployeeArchive = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_archive`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let archivedata = response.data?.filter(
          (item: any) => !values.department || item.department === values.department
        );

        setData(archivedata);
        console.log(response.data);
      })
      .catch((error) => {
        setData([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchEmployeeArchive();
  }, [values]);

  return (
    <BaseLayout>
      {showpage ? (
        <>
          <Create setShowpage={setShowpage} fetchData={fetchEmployeeArchive} />
        </>
      ) : (
        <>
          <Card>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item pt={2} pl={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Employee Archive List
                </MDTypography>
              </Grid>
              <Grid item pt={2} pr={2}>
                <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
                  + Create Employee Archive
                </MDButton>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
              <MDBox p={4}>
                <Grid container spacing={3} ml={1.5}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      value={values.department}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "department", value } });
                      }}
                      options={departmentInfo.map((item: any) => item.dept_name) || []}
                      renderInput={(params) => (
                        <MDInput
                          name="department"
                          //onChange={handleChange}
                          value={values.department}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Department
                            </MDTypography>
                          }
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
                </Grid>
                {data?.length > 0 ? (
                  <DataTable canSearch={true} isSorted={false} table={dataTableData} />
                ) : (
                  <Grid container spacing={3} ml={1.5} mt={2}>
                    <Grid item xs={12} sm={4}>
                      <MDTypography variant="button" color="error">
                        No Data Available
                      </MDTypography>
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </form>
          </Card>
        </>
      )}
      <Dialog open={openedit} onClose={handleEditClose}>
        <EditArchive
          fetchData={fetchEmployeeArchive}
          handleClose={handleEditClose}
          editData={editData}
        />
      </Dialog>
    </BaseLayout>
  );
};

export default EmployeeArchive;
