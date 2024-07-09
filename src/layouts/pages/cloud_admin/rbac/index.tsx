import React, { useEffect, useState } from "react";
import { Tree, message } from "antd";
import type { DataNode, Key } from "rc-tree-select/es/interface";
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

import Cookies from "js-cookie";
import FormField from "layouts/pages/account/components/FormField";
import CloudAdminRouts from "cloud_admin_routs";
import { route2 } from "routes";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
const CloudAdminRbac = (props: any) => {
  const { setOpenupdate2 } = props;

  const initialValues = {
    sub_module_menu: [] as string[],
    // role_name: editData2?.role_name,
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
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([
    "schoolinfo",
    "schoolinforead",
    "schoolinfoupdate",
    "schoolinfodelete",
    "schoolinfocreate",
    "academic",
    "academicread",
    "academicupdate",
    "academicdelete",
    "academiccreate",
    "section",
    "sectionread",
    "sectionupdate",
    "sectiondelete",
    "sectioncreate",
    "class",
    "classread",
    "classupdate",
    "classdelete",
    "classcreate",
    "student",
    "studentread",
    "studentupdate",
    "studentdelete",
    "studentcreate",
    "wings",
    "wingsread",
    "wingsupdate",
    "wingsdelete",
    "wingscreate",
    "school",
  ]);
  const [checkedKeystring, setCheckedKeystring] = useState();
  const [halfchecked, setHalfchecked] = useState([]);
  const [allchecked, setAllchecked] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rbacData, setRbacData] = useState([]);
  const { handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      console.log("valuess", values);
      action.resetForm();
    },
  });
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/mg_rbac/cloud_admin
      `,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response, "response");
        const filteredData = response.data.filter(
          (item: { school_code: any }) => item.school_code === props.school_code
        );
        const subModuleMenus = filteredData.map(
          (item: { sub_module_menu: any }) => item.sub_module_menu
        );
        console.log(subModuleMenus, "subModuleMenus");

        setCheckedKeys(subModuleMenus[0]);
      })
      .catch((error) => console.log(error));

    // Fetch data from API on component mount
  }, []);
  console.log(allchecked, "allchecked");

  const handleFormSubmit = async () => {
    for (const key of checkedKeys) {
      console.log(key, checkedKeys, "checkedkey");
      initialValues.sub_module_menu.push(key.toString());
    }
    console.log(allchecked, "checked");
    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/mg_rbac/cloud_admin",
        {
          sub_module_menu: allchecked,
          school_code: props.school_code,
          school_name: props.school_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Created  Successfully");
        message.success("Updated Successfully");
        setOpenupdate2(false);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const treeData: DataNode[] = [];
  let count = 0;
  if (count === 0) {
    for (const item of route2) {
      if (item.collapse) {
        const module: any = {};
        module.title = item.name;
        module.key = item.key;
        const modulechildren = [];

        console.log(item.collapse, "sub module");

        for (const subitem of item.collapse) {
          const submodule: any = {};
          submodule.title = subitem.name;
          submodule.key = subitem.key;
          submodule.children = [
            { title: "read", key: `${submodule.key}read` },
            { title: "update", key: `${submodule.key}update` },
            { title: "delete", key: `${submodule.key}delete` },
            { title: "create", key: `${submodule.key}create` },
          ];
          const submodulechildren = [];
          if ("collapse" in subitem && Array.isArray(subitem.collapse)) {
            for (const subitemmenu of subitem.collapse) {
              const submodulemenu: any = {};
              submodulemenu.title = subitemmenu.name;
              submodulemenu.key = subitemmenu.key;
              // Add common children for the second level
              submodulemenu.children = [
                { title: "update", key: `${subitemmenu.key}update` },
                { title: "delete", key: `${subitemmenu.key}delete` },
                { title: "create", key: `${subitemmenu.key}create` },
              ];
              submodulechildren.push(submodulemenu);
              console.log("submodulemenuchildren", submodulemenu);
            }
            // console.log("submodulemenuchildren2", submodulemenu);
          }
          submodule.children =
            submodulechildren.length > 0
              ? submodulechildren
              : [
                  { title: "read", key: `${submodule.key}read` },
                  { title: "update", key: `${submodule.key}update` },
                  { title: "delete", key: `${submodule.key}delete` },
                  { title: "create", key: `${submodule.key}create` },
                ];
          modulechildren.push(submodule);
        }
        module.children = modulechildren;
        treeData.push(module);
      }
    }
    count += 1;
  }
  console.log(treeData, "treedata");
  const getParentKeys = (key: React.Key, nodes: DataNode[] | undefined): React.Key[] => {
    const parentKeys: React.Key[] = [];
    const findParent = (currentKey: React.Key, nodesArray: DataNode[] | undefined): void => {
      nodesArray?.forEach((node) => {
        const nodeKey = node.key as React.Key;
        if (node.children && node.children.some((child) => child.key === currentKey)) {
          parentKeys.push(nodeKey);
        } else if (node.children) {
          findParent(currentKey, node.children);
        }
      });
    };

    findParent(key, nodes);
    return parentKeys;
  };
  const onExpand = (expandedKeysValue: Key[]) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    console.log("onCheck", checked);

    // Check if checked is an array
    if (Array.isArray(checked)) {
      const halfCheckedKeysSet = checked.reduce((acc: Set<React.Key>, key: React.Key) => {
        const parentKeys = getParentKeys(key, treeData);
        parentKeys.forEach((parentKey) => acc.add(parentKey));
        return acc;
      }, new Set());

      const halfCheckedKeys = Array.from(halfCheckedKeysSet);

      console.log("Half-checked keys", halfCheckedKeys, checked);
      const combinedArray = Array.from(new Set([...checked, ...halfCheckedKeys]));
      console.log("combinedArray", combinedArray);
      // setCheckedKeys(combinedArray);
      setAllchecked(combinedArray);
      setHalfchecked(halfCheckedKeys);
      setCheckedKeys(checked);
    } else {
      // If checked is an object, extract the checked property
      const { checked: checkedArray } = checked;

      const halfCheckedKeysSet = checkedArray.reduce((acc: Set<React.Key>, key: React.Key) => {
        const parentKeys = getParentKeys(key, treeData);
        parentKeys.forEach((parentKey) => acc.add(parentKey));
        return acc;
      }, new Set());

      const halfCheckedKeys = Array.from(halfCheckedKeysSet);

      console.log("Half-checked keys", halfCheckedKeys, checkedArray);
      const combinedArray = Array.from(new Set([...checkedArray, ...halfCheckedKeys]));
      console.log(combinedArray, "combinedArray");
      // setCheckedKeys(combinedArray);
      setAllchecked(combinedArray);
      setHalfchecked(halfCheckedKeys);
      setCheckedKeys(checkedArray);
    }
  };

  const onSelect = (selectedKeysValue: Key[]) => {
    console.log("onSelect", selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
  };

  console.log("Tree Data", treeData);
  const renderTreeNodes = (data: DataNode[]): React.ReactNode => {
    console.log(data, "data");

    return data.map((item) => {
      const { key, title, children } = item;
      console.log(item, "renderingTree");
      return (
        <Tree.TreeNode key={key} title={<span>{title}</span>}>
          {children && renderTreeNodes(children)}
        </Tree.TreeNode>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9} mb={2}>
              <MDTypography variant="h4">Give Permission OF Modules</MDTypography>
            </Grid>
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={6} display="flex" justifyContent="center">
              <FormField
                type="name"
                label="Role name"
                name="role_name"
                required
                value={values.role_name}
                placeholder="Enter Your Role name"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.role_name && touched.role_name}
                success={values.role_name.length && !errors.role_name}
              />
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit">
                {"Save"}
              </MDButton>
            </Grid>
          </Grid> */}
        </MDBox>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
          >
            {renderTreeNodes(treeData)}
            {/* {renderTreeNodes(treeData.filter(node => node.key !== "fee"))} */}
          </Tree>
        </MDBox>
        <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
          <MDButton variant="gradient" color="info" onClick={handleFormSubmit}>
            {"Save rbac"}
          </MDButton>
        </Grid>
      </Card>
    </form>
  );
};

export default CloudAdminRbac;
