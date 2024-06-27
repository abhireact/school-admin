import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditableCell from "./edittable";
import MDButton from "components/MDButton";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const Try = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
      </DashboardLayout>
    </>
  );
};

export default Try;
