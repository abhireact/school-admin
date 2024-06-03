import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";

import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { Checkbox, Divider, Table } from "antd";
import type { CheckboxOptionType, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  sl_no: string;
  admission_no: string;
  class_section: string;
  student_name: string;
  collection_name: string;
  guardian_name: string;
  g_contact_no: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
}

const token = Cookies.get("token");

interface SectionData {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface Class {
  wing_name: string;
  class_name: string;
  section_data: SectionData[];
}

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
export default function FeeDefaulterReport() {
  const [result, setResult] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const columns: TableColumnsType<DataType> = [
    { title: "SL.NO", key: "1", dataIndex: "sl_no" },
    { title: "ADMISSION NO.", key: "2", dataIndex: "admission_no" },
    { title: "CLASS-SECTION", key: "3", dataIndex: "class_section" },
    { title: "STUDENT NAME", key: "4", dataIndex: "student_name" },
    { title: "COLLECTION NAME", key: "5", dataIndex: "collection_name" },
    { title: "GUARDIAN NAME", key: "6", dataIndex: "guardian_name" },
    { title: "GUARDIAN CONTACT NO", key: "7", dataIndex: "g_contact_no" },
    { title: "TOTAL AMOUNT", key: "8", dataIndex: "total_amount" },
    { title: "PAID AMOUNT", key: "9", dataIndex: "paid_amount" },
    { title: "REMAINING AMOUNT", key: "10", dataIndex: "remaining_amount" },
  ];

  const data: DataType[] = defaultData.map((row: any, index: any) => ({
    key: index,
    sl_no: index,
    admission_no: row.admission_number,
    class_section: `${row.class_name} ${row.section_name}`,
    student_name: row.student_name,
    collection_name: row.collection_name,
    guardian_name: row.guardian_name,
    g_contact_no: row.guardian_phone,
    total_amount: row.total_amount,
    paid_amount: row.paid_amount,
    remaining_amount: row.amount_paying,
  }));
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, setCheckedList] = useState(["3", "4"]);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  let initialValues = {
    academic_year: "",
    start_date: Date,
    end_date: Date,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values);
        const checkedSectionKeys = checkedKeys
          .filter((key) => key.toString().includes("section:"))
          .map((item) => {
            const [classKey, sectionKey] = item.toString().split(",");
            const classValue = classKey.split(":")[1];
            const sectionValue = sectionKey.split(":")[1];
            return {
              academic_year: values.academic_year,
              class_name: classValue,
              section_name: sectionValue,
            };
          });
        const submit_value = {
          class_data: checkedSectionKeys,
          fee_categories: [] as any[],
          start_date: values.start_date,
          end_date: values.end_date,
        };
        console.log(submit_value, "submit valyuuuee");
        axios
          .post("http://10.0.20.200:8000/fee_defaulter", submit_value, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setDefaultData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  const { classes, account, studentcategory } = useSelector((state: any) => state);

  useEffect(() => {
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    filteredClassData.forEach(({ wing_name, class_name, section_data }: Class, index: number) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: `wing-${wing_name}`,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `wing-${wing_name},class-${class_name}`,
          children: [],
        });
      }
      const classItem = wing.children?.find((child) => child.title === class_name);
      section_data.forEach((section: any) => {
        if (classItem && classItem.children) {
          classItem.children.push({
            title: `section ${section.section_name}`,
            key: `class:${class_name},section:${section.section_name}`,
          });
        }
      });
    });

    setResult(result);
  }, [values.academic_year]);
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
  const feeDefaulter = {
    columns: [
      { Header: "SL.NO", accessor: "sl_no" },
      { Header: "ADMISSION NO.", accessor: "admission_no" },
      { Header: "CLASS-SECTION", accessor: "class_section" },
      { Header: "STUDENT NAME", accessor: "student_name" },
      { Header: "COLLECTION NAME", accessor: "collection_name" },
      { Header: "GUARDIAN NAME", accessor: "guardian_name" },
      { Header: "GUARDIAN CONTACT NO", accessor: "g_contact_no" },
      { Header: "TOTAL AMOUNT", accessor: "total_amount" },
      { Header: "PAID AMOUNT", accessor: "paid_amount" },
      { Header: "REMAINING AMOUNT", accessor: "remaining_amount" },
    ],
    rows: defaultData.map((row: any, index: any) => ({
      sl_no: index,
      admission_no: row.admission_number,
      class_section: `${row.class_name} ${row.section_name}`,
      student_name: row.student_name,
      collection_name: row.collection_name,
      guardian_name: row.guardian_name,
      g_contact_no: row.guardian_phone,
      total_amount: row.total_amount,
      paid_amount: row.paid_amount,
      remaining_amount: row.amount_paying,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid xs={12} sm={12} p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Fee Defaulter Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
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
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Academic Year
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
                      type="date"
                      sx={{ width: "100%" }}
                      label="select Start Date"
                      variant="standard"
                      name="start_date"
                      value={values.start_date}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      type="date"
                      sx={{ width: "100%" }}
                      label="select End Date"
                      variant="standard"
                      name="end_date"
                      value={values.end_date}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} p={3} style={{ maxHeight: "250px", overflowY: "auto" }}>
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Select Class & sections
                    </MDTypography>
                    <Tree
                      checkable
                      onExpand={onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      onSelect={onSelect}
                      selectedKeys={selectedKeys}
                      treeData={result}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Grid item mt={2}>
                    <MDButton
                      color="dark"
                      variant="contained"
                      // onClick={() => {
                      //   handleCloseupdate();
                      // }}
                    >
                      Back
                    </MDButton>
                  </Grid>
                  <Grid item mt={2} ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Show
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {defaultData.length > 0 ? (
            <Grid item xs={12} sm={12}>
              <Card>
                <Checkbox.Group
                  value={checkedList}
                  options={options as CheckboxOptionType[]}
                  onChange={(value) => {
                    setCheckedList(value as string[]);
                  }}
                  style={{ paddingTop: 24, paddingLeft: 24 }}
                />

                <Table
                  columns={newColumns}
                  dataSource={data}
                  style={{ marginTop: 24 }}
                  scroll={{ x: true }}
                />
              </Card>
            </Grid>
          ) : null}
        </Grid>
      </form>
    </DashboardLayout>
  );
}
