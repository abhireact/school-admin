import React, { useEffect, useRef } from "react";
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
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { useReactToPrint } from "react-to-print";

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
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");
  let initialValues = {
    academic_year: Cacademic_year,
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

  // {
  //       "user_name": "THSKRBS1292",
  //       "admission_number": "THS/2425/1813",
  //       "student_name": "DRISHTI SINGH",
  //       "class_name": "I",
  //       "section_name": "B",
  //       "collection_name": "May Month Fee",
  //       "guardian_name": "DURGENDRA  PRATAP  SINGH",
  //       "guardian_phone": "9451175081",
  //       "total_amount": 4122.0,
  //       "paid_amount": 0.0,
  //       "fine_amount": 200.0,
  //       "amount_paying": 4122.0,
  //       "is_archive": false
  //   },
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
  const tableRef = useRef();
  const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <MDBox ref={tableRef}>
          <PdfGenerator
            data={feeDefaulter.rows}
            hiddenText={hiddenText}
            isPdfMode={true}
            additionalInfo={undefined}
          />
        </MDBox>
        <MDButton onClick={handlePrint}>Print</MDButton>

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
                      defaultValue={Cacademic_year}
                      disabled
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
                          value={values.academic_year || Cacademic_year}
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
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
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
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
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
          <Grid item xs={12} sm={12}>
            <Card>
              <DataTable table={feeDefaulter} />
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
