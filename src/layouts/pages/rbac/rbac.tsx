import React, { useEffect, useState } from "react";
import { Tree, message } from "antd";
import type { DataNode, Key } from "rc-tree-select/es/interface";
import MainRoutes from "../../../mainroutes";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
import {
  Autocomplete,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { CheckBox } from "@mui/icons-material";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FormField from "../account/components/FormField";

import Cookies from "js-cookie";
const token = Cookies.get("token");
const Rbac = (props: any) => {
  const { setOpenupdate2, editData2 } = props;
  const initialValues = {
    sub_module_menu: [] as string[],
    role_name: editData2?.role_name,
    role_access: "",
    seeded: "",
    status: "",
    role_short_code: "",
    description: "",
    access: [] as string[],
    access_create: [] as string[],
    access_read: [] as string[],
    access_update: [] as string[],
    access_delete: [] as string[],
  };
  const [editorcreate, setEditorcreate] = useState("create");
  const [roles, setRoles] = useState([]);
  const [mroles, setMRoles] = useState([]);
  const [worklocation, setWorklocation] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(["pay-sheadule"]);
  const [checkedKeystring, setCheckedKeystring] = useState();
  const [halfchecked, setHalfchecked] = useState([]);
  const [allchecked, setAllchecked] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rbacData, setRbacData] = useState([]);
  return <div>{initialValues.role_name}</div>;
};

export default Rbac;
