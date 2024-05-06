import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import MDAvatar from "components/MDAvatar";
import DataTable from "examples/Tables/DataTable";
import SummarizeIcon from "@mui/icons-material/Summarize";
import IconButton from "@mui/material/IconButton";
const token = Cookies.get("token");

const StudentInfo = () => {
  const [openBonafide, setOpenBonafide] = useState(false);

  const handleCloseBonafide = () => {
    setOpenBonafide(false);
  };
  const handleOpenBonafide = () => {
    setOpenBonafide(true);
  };
  const [openCharacter, setOpenCharacter] = useState(false);

  const handleCloseCharacter = () => {
    setOpenCharacter(false);
  };
  const handleOpenCharacter = () => {
    setOpenCharacter(true);
  };
  const [openTransfer, setOpenTransfer] = useState(false);

  const handleCloseTransfer = () => {
    setOpenTransfer(false);
  };
  const handleOpenTransfer = () => {
    setOpenTransfer(true);
  };
  return (
    <Card>
      <MDBox p={4}>
        <Grid container>
          <Grid item sm={12}>
            <MDTypography variant="button" fontWeight="bold" color="body3">
              Name:
            </MDTypography>
            <MDTypography variant="button" color="body3">
              ADVIK Meet YADAV
            </MDTypography>
          </Grid>
          <Grid item sm={12}>
            <MDTypography variant="button" fontWeight="bold" color="body3">
              UserID:
            </MDTypography>
            <MDTypography variant="button" color="body3">
              THSKRBS3
            </MDTypography>
          </Grid>
          <Grid item sm={12}>
            <MDTypography variant="button" fontWeight="bold" color="body3">
              Class and Section:
            </MDTypography>
            <MDTypography variant="button" color="body3">
              II-B
            </MDTypography>
          </Grid>
          <Grid item sm={12}>
            <MDTypography variant="button" fontWeight="bold" color="body3">
              Admission Number:
            </MDTypography>
            <MDTypography variant="button" color="body3">
              THS/2122/1215
            </MDTypography>
          </Grid>
        </Grid>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tr>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" fontWeight="bold" color="body3">
                Certificate
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" fontWeight="bold" color="body3">
                Date of issue
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" fontWeight="bold" color="body3">
                No of times issued
              </MDTypography>
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                Bonafide
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                29/11/2023
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                1
              </MDTypography>
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                character
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                29/11/2023
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                1
              </MDTypography>
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                Transfer
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3"></MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3"></MDTypography>
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3">
                Fee
              </MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3"></MDTypography>
            </th>
            <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
              <MDTypography variant="button" color="body3"></MDTypography>
            </th>
          </tr>
        </table>
        <Grid container py={2}>
          <Grid item sm={4}>
            <MDButton color="info" variant="outlined" onClick={() => handleOpenBonafide()}>
              Generate Bonafide Certificate
            </MDButton>
          </Grid>
          <Grid item sm={4}>
            <MDButton color="info" variant="outlined" onClick={() => handleOpenCharacter()}>
              Generate Character Certificate
            </MDButton>
          </Grid>
          <Grid item sm={4}>
            <MDButton color="info" variant="outlined" onClick={() => handleOpenTransfer()}>
              Generate Transfer Certificate
            </MDButton>
          </Grid>
        </Grid>
        <Dialog open={openBonafide} onClose={handleCloseBonafide} maxWidth="sm">
          hello bonafide
        </Dialog>
        <Dialog open={openCharacter} onClose={handleCloseCharacter} maxWidth="sm">
          hello character
        </Dialog>
        <Dialog open={openTransfer} onClose={handleCloseTransfer} maxWidth="sm">
          hello transfer
        </Dialog>
      </MDBox>
    </Card>
  );
};

export default StudentInfo;
