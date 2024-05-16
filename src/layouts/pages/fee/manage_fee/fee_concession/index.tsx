import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import EditConcession from "./edit_concession";
import ManageConcession from "./manage_concession";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
const token = Cookies.get("token");
const initialValues = {
  academic_year: "",
  class_name: "",
  section_name: "",
};
export default function FeeConcession() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [managedata, setManagedata] = useState({});
  const [manageopen, setManageOpen] = useState(false);
  const [concessiondata, setConcessiondata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post(`http://10.0.20.200:8000/fee_concession/search`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setConcessiondata(response.data);
      }
    } catch (error) {
      setConcessiondata([]);
      message.error("No data for this section");
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: commonacademicyear,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("inside onsubmitr");
        fetchData();
      },
    });

  const handleClickOpenEdit = (data: any) => {
    setEditdata(data);
    setEditOpen(true);
  };

  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };
  const handleEditSuccess = () => {
    fetchData();
    handleClickCloseEdit();
  };
  const handleClickOpenManage = (data: any) => {
    setManagedata(data);
    setManageOpen(true);
  };

  const handleClickCloseManage = () => {
    setManageOpen(false);
  };
  const handleManageSuccess = () => {
    fetchData();
    handleClickCloseManage();
  };
  const feeConcessionData = {
    columns: [
      { Header: "CONCESSION TYPE", accessor: "type" },
      { Header: "CONCESSION NAME", accessor: "name" },
      { Header: "CLASS & SECTION", accessor: "section" },
      { Header: "FEE CATEGORY", accessor: "fee_category" },
      { Header: "QUOTA", accessor: "quota" },
      { Header: "STUDENT NAME", accessor: "student" },
      { Header: "CONCESSION", accessor: "concession" },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: concessiondata.map((data, index) => ({
      type: data.discount_type,
      name: data.name,
      section: `${data.class_name}-${data.section_name}`,
      fee_category: data.fee_category,
      quota: data.quota == null ? "" : data.quota,
      student: `${data.student_first_name} ${
        data.student_middle_name ? data.student_middle_name : ""
      } ${data.student_last_name ? data.student_last_name : ""}`,
      concession: data.discount,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Edit" placement="top">
              <Icon fontSize="small" onClick={() => handleClickOpenEdit(data)}>
                edit
              </Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete" placement="top">
              <Icon fontSize="small">delete</Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Manage Sheadule Concession" placement="top">
              <FormatListBulletedTwoToneIcon
                fontSize="small"
                onClick={() => handleClickOpenManage(data)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Dialog open={editopen} onClose={handleClickCloseEdit}>
                <EditConcession data={editdata} onSuccess={handleEditSuccess} />
              </Dialog>
              <Dialog open={manageopen} onClose={handleClickCloseManage}>
                <ManageConcession data={managedata} onSuccess={handleManageSuccess} />
              </Dialog>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Fee Concession
                  </MDTypography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  mt={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Link href="/fee/create_concession" variant="body2">
                    <MDButton variant="outlined" color="info">
                      + Create Fee Concession
                    </MDButton>
                  </Link>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    options={["2023-2024", "2024-2025"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label="Academic Year"
                        {...params}
                        variant="standard"
                        onBlur={handleBlur}
                        error={errors.academic_year && touched.academic_year}
                        success={values.academic_year && !errors.academic_year}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "class_name", value } });
                    }}
                    options={["I", "II", "III"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="class_name"
                        onChange={handleChange}
                        value={values.class_name}
                        label="Class"
                        {...params}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.class_name && Boolean(errors.class_name)}
                        success={values.class_name && !errors.class_name}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "section_name", value } });
                    }}
                    options={["A", "B", "C"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="section_name"
                        onChange={handleChange}
                        value={values.section_name}
                        label="Section"
                        {...params}
                        variant="standard"
                        onBlur={handleBlur}
                        error={errors.section_name && touched.section_name}
                        success={values.section_name && !errors.section_name}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  ml={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <MDButton color="info" variant="contained" type="submit">
                    Show Data
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            {concessiondata.length > 0 ? (
              <Card>
                <DataTable
                  table={feeConcessionData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
