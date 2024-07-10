import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { Divider, Radio, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  wing_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});
const token = Cookies.get("token");
const initialValues = {
  academic_year: "",
  wing_name: "",
};
interface DataType {
  key: any;
  employee_id: string;
  employee_name: string;
}
interface SectionData {
  class_name: string;
  section_name: string;
  user_id: string;
  mg_class_teacher: string;
}

export default function AssignClassTeacher() {
  const { classes, account, studentcategory, wings } = useSelector((state: any) => state);
  const [sectionData, setSectionData] = useState<SectionData>({
    class_name: "",
    section_name: "",
    user_id: "",
    mg_class_teacher: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [concessiondata, setConcessiondata] = useState([]);
  const [defaultSelectedRowKeys, setDefaultSelectedRowKeys] = useState(["DFGJU67"]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [classTeacher, setClassTeacher] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/assign_class_teacher/filter`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setConcessiondata(response.data);
      }
    } catch (error) {
      setConcessiondata([]);
      //  message.error("No data for this section");
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {},
    });

  const onsubmitt = async () => {
    const editData = [
      {
        academic_year: values.academic_year,
        wing_name: values.wing_name,
        class_name: sectionData.class_name,
        section_name: sectionData.section_name,
        teacher_name: classTeacher[0],
      },
    ];
    console.log(editData, sectionData, "submitted");
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/mg_assign_class_teacher`, editData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          handleClickCloseEdit();
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleClickOpenEdit = (data: any) => {
    // setEditdata(data);

    setSectionData(data);
    setDefaultSelectedRowKeys([data.user_id]);
    console.log(data, "popupdata");
    setAssignOpen(true);
  };
  const handleClickCloseEdit = () => {
    setAssignOpen(false);
  };
  useEffect(() => {
    fetchData(); // Fetch data from API on component mount
  }, [values.wing_name, values.academic_year]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setEmployeeData(
            response.data.filter((employee: any) => employee.employe_type === "Teaching Staff")
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const feeConcessionData = {
    columns: [
      { Header: "CLASS & SECTION", accessor: "section" },
      { Header: "ASSIGNED TEACHER", accessor: "assigned_teacher" },
      { Header: "ACTION", accessor: "action" },
    ],
    rows: concessiondata.map((data, index) => ({
      section: `${data.class_name}-${data.section_name}`,
      assigned_teacher:
        data.mg_class_teacher == "No teacher assigned" ? (
          <MDButton
            color="info"
            variant="text"
            onClick={() => {
              handleClickOpenEdit(data);
            }}
          >
            Assign
          </MDButton>
        ) : (
          data.mg_class_teacher
        ),
      action:
        data.mg_class_teacher == "No teacher assigned" ? null : (
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title="Update Teacher" placement="top">
                <Icon
                  fontSize="small"
                  onClick={() => {
                    handleClickOpenEdit(data);
                  }}
                >
                  edit
                </Icon>
              </Tooltip>
            </Grid>
          </Grid>
        ),
    })),
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "EMPLOYEE ID",
      dataIndex: "employee_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "EMPLOYEE NAME",
      dataIndex: "employee_name",
    },
  ];

  const data: DataType[] = employeeData.map((data, index) => ({
    key: data.user_id,
    employee_id: data.user_id,
    employee_name: data.employee_name,
  }));

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Dialog open={assignOpen} onClose={handleClickCloseEdit}>
          <Card>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={12}>
                <Table
                  pagination={false}
                  scroll={{ y: 400, x: true }}
                  rowSelection={{
                    type: "radio",
                    defaultSelectedRowKeys: defaultSelectedRowKeys,
                    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                      setClassTeacher(selectedRowKeys);
                      console.log(
                        `selectedRowKeys: ${selectedRowKeys}`,
                        "selectedRows: ",
                        selectedRows
                      );
                    },
                  }}
                  columns={columns}
                  dataSource={data}
                />
              </Grid>
              <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
                <Grid item>
                  <MDButton color="dark" variant="contained" onClick={handleClickCloseEdit}>
                    Back
                  </MDButton>
                </Grid>
                <Grid item ml={2}>
                  <MDButton color="info" variant="contained" type="submit" onClick={onsubmitt}>
                    Assign
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Assign Class Teacher
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
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
                        required
                        name="academic_year"
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
                    value={values.wing_name}
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "wing_name", value } });
                    }}
                    options={wings.map((item: any) => item.wing_name)}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="wing_name"
                        value={values.wing_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Wing Name
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.wing_name && Boolean(errors.wing_name)}
                        success={values.wing_name && !errors.wing_name}
                        helperText={touched.wing_name && errors.wing_name}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Card>
              {concessiondata.length > 0 && (
                <DataTable table={feeConcessionData} isSorted={false} canSearch={true} />
              )}
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
