import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { createschema } from "../createschema";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Demopage from "../create";
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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import type { TreeDataNode, TreeProps } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");

function not(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}
interface Section {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface Class {
  academic_year: string;
  wing_name: string;
  class_name: string;
  class_code: string;
  index: number;
  section_data: Section[];
}

interface TransformedSection {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface TransformedClass {
  class_name: string;
  sections: TransformedSection[];
}

interface TransformedWing {
  wing_name: string;
  classes: TransformedClass[];
}

interface WingMap {
  [key: string]: {
    wing_name: string;
    classess: { [key: string]: TransformedClass };
  };
}

export default function CreateFeeParicularAmount() {
  let initialValues = {
    fee_category: "",
    fee_perticular: "",
    account: "",
    amount: "",
    academic_year: "",
    student_category: "",
    class_name: "",
    section_name: "",
    class_and_section: [] as string[],
    students: [] as string[],
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // Uncomment and ensure createschema is correctly defined
    // validationSchema: createschema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "on submit");
      // Handle form submission logic here
    },
  });

  // const { classes, account } = useSelector((state: any) => state);
  const data = useSelector((state: any) => state);
  console.log(data.wings, "lllllllllllllllllllllll");
  const classes = data.classes;
  const account = data.account;
  const [feeCategory, setFeecategory] = useState([]);
  const [checked, setChecked] = useState<readonly string[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/fee_category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeecategory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  const handleTabChange = (_event: any, newValue: any) => {
    setCheckedKeys([]);
    setExpandedKeys([]);
    setSelectedKeys([]);
    setSelectedTab(newValue);
  };

  const result: TransformedWing[] = [];
  const wingMap: WingMap = {};

  classes
    ? classes.forEach((item: Class) => {
        const { wing_name, class_name, section_data } = item;

        // Initialize wing if it does not exist
        if (!wingMap[wing_name]) {
          wingMap[wing_name] = { wing_name, classess: {} };
          result.push(wingMap[wing_name] as unknown as TransformedWing);
        }

        // Initialize class if it does not exist
        if (!wingMap[wing_name].classess[class_name]) {
          wingMap[wing_name].classess[class_name] = { class_name, sections: [] };
        }

        // Add section data to the class
        wingMap[wing_name].classess[class_name].sections.push(...section_data);
      })
    : [];

  console.log(classes, result, "llllllllllllllllooo");
  const wingdata = [
    {
      title: "Wing 1",
      key: "wing1",
      children: [
        {
          title: "class1",
          key: "class1",
          children: [
            { title: "section A", key: "0-0-0-0" },
            { title: "Section B", key: "0-0-0-1" },
            { title: "section C", key: "0-0-0-2" },
          ],
        },
        {
          title: "class2",
          key: "class2",
          children: [
            { title: "section A", key: "0-0-1-0" },
            { title: "Section B", key: "0-0-1-1" },
            { title: "section C", key: "0-0-1-2" },
          ],
        },
      ],
    },
    {
      title: "Wing 2",
      key: "wing2",
      children: [
        {
          title: "class3",
          key: "class3",
          children: [
            { title: "section A", key: "0-0-2-0" },
            { title: "Section B", key: "0-0-2-1" },
            { title: "section C", key: "0-0-2-2" },
          ],
        },
        {
          title: "class4",
          key: "class4",
          children: [
            { title: "section A", key: "0-0-3-0" },
            { title: "Section B", key: "0-0-3-1" },
            { title: "section C", key: "0-0-3-2" },
          ],
        },
      ],
    },
  ];

  const studentdata = [
    {
      title: "student 1",
      key: "student1",
    },
    {
      title: "student 2",
      key: "student2",
    },
  ];

  const treeData: TreeDataNode[] =
    selectedTab === 0 ? wingdata : selectedTab === 1 ? studentdata : [];

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Fee Amount Perticular
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_category", value } });
                  }}
                  options={feeCategory ? feeCategory.map((item) => item.name) : []}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_category"
                      value={values.fee_category}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Category Name
                        </MDTypography>
                      }
                      onChange={handleChange}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_perticular", value } });
                  }}
                  options={
                    values.fee_category !== ""
                      ? feeCategory
                          .find((item) => item.name === values.fee_category)
                          .particular_types.map((item: any) => item.particular_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_perticular"
                      onChange={handleChange}
                      value={values.fee_perticular}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Fee Perticular
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
                    handleChange({ target: { name: "account", value } });
                  }}
                  options={account ? account.map((item: any) => item.account_name) : []}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="account"
                      onChange={handleChange}
                      value={values.account}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Account
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Amount
                    </MDTypography>
                  }
                  name="amount"
                  value={values.amount}
                  placeholder="Enter Amount"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2} pt={3}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{ display: "flex", width: "100%" }}
              >
                <Tab
                  label={
                    <MDTypography variant="h6" fontWeight="bold" color="secondary">
                      Section/Category Wise
                    </MDTypography>
                  }
                  sx={{ flex: "50%", color: "blue" }}
                />
                <Tab
                  label={
                    <MDTypography variant="h6" fontWeight="bold" color="secondary">
                      Student Wise
                    </MDTypography>
                  }
                  sx={{ flex: "50%" }}
                />
              </Tabs>
              {selectedTab === 0 && (
                <Grid container spacing={2} pt={3} p={4}>
                  <Grid item xs={12} sm={4}>
                    <MDBox
                      p={3}
                      sx={{
                        height: "300px",
                        overflowY: "auto",
                        display: "inline-block",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        color="secondary"
                        alignItems="center"
                      >
                        Select Wing &gt;&gt; Class &gt;&gt; Section
                      </MDTypography>
                      <Divider />
                      <Tree
                        checkable
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "student_category", value } });
                      }}
                      options={["ALL", "Ac", "General"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="student_category"
                          onChange={handleChange}
                          value={values.student_category}
                          label="Select Student Category"
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )}
              {selectedTab === 1 && (
                <>
                  <Grid container spacing={3} px={4} pt={4}>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
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
                            onChange={handleChange}
                            value={values.academic_year}
                            label="Academic Year"
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
                                .filter((item: any) => item.academic_year === values.academic_year)
                                .map((item: any) => item.class_name)
                            : []
                        }
                        renderInput={(params) => (
                          <MDInput
                            required
                            name="class_name"
                            onChange={handleChange}
                            value={values.class_name}
                            label="Class"
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
                            label="Section"
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justifyContent="center" alignItems="center" pt={4}>
                    <Tree
                      checkable
                      onExpand={onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      onSelect={onSelect}
                      selectedKeys={selectedKeys}
                      treeData={treeData}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={1}>
              <Grid item>
                <Link href="fee_category" variant="body2">
                  <MDButton color="dark" variant="contained">
                    Back
                  </MDButton>
                </Link>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </DashboardLayout>
  );
}
