import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import EditConcession from "./edit_concession";
import ManageConcession from "./manage_concession";
export default function FeeConcession() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [managedata, setManagedata] = useState({});
  const [manageopen, setManageOpen] = useState(false);
  const handleClickOpenEdit = (data: any) => {
    setEditdata(data);
    setEditOpen(true);
  };

  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };
  const handleEditSuccess = () => {
    // fetchData();
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
    // fetchData();
    handleClickCloseManage();
  };
  const data = {
    concession_type: "aa",
    concession_name: "ccc",
    class_section: "ccc",
    fee_category: "dwxdw",
    student_category: "wdexwe",
    admission_number: 0,
    concession_amount: 0,
    account: "kotak",
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
    rows: [
      {
        type: "student",
        name: "student1",
        section: "section1",
        fee_category: "catatgaoiajmaja",
        quota: "General",
        student: "student 1",
        concession: 5000,
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
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Dialog open={editopen} onClose={handleClickCloseEdit}>
          <EditConcession data={editdata} onSuccess={handleEditSuccess} />
        </Dialog>
        <Dialog open={manageopen} onClose={handleClickCloseManage}>
          <ManageConcession data={managedata} onSuccess={handleManageSuccess} />
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Concession
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/fee/create_concession" variant="body2">
              <MDButton variant="outlined" color="info">
                + Create Fee Concession
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable
          table={feeConcessionData}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </Card>
    </DashboardLayout>
  );
}
