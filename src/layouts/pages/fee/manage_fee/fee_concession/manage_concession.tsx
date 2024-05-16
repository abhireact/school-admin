import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Tree } from "antd";
import MDBox from "components/MDBox";
import { Radio, Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "COLLECTION NAME",
    dataIndex: "name",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Nov month",
  },
  {
    key: "2",
    name: "Jan month",
  },
  {
    key: "3",
    name: "Feb",
  },
  {
    key: "4",
    name: "MArch",
  },
  {
    key: "41",
    name: "Sports",
  },
  {
    key: "42",
    name: "ssss",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
};

export default function ManageConcession(props: any) {
  const initialValues = props.data;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        props.onSuccess();
      },
    });
  return (
    <Card>
      <MDBox p={3}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Manage Scheduled Concession
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "center" }} m={2}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: 400, x: true }}
            />
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
            <Grid item>
              <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                Back
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </form>
      </MDBox>
    </Card>
  );
}
