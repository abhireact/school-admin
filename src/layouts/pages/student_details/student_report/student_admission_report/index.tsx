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
import * as XLSX from "xlsx";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import TablePdfGenerator from "layouts/pages/student_details/student_table_pdf";
import { useReactToPrint } from "react-to-print";
import * as Yup from "yup";
const token = Cookies.get("token");
const validationSchema = Yup.object().shape({
  start_date: Yup.date().required("Required *"),
  end_date: Yup.date().required("Required *").min(Yup.ref("start_date"), "Incorrect"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

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
  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: Cacademic_year,
        start_date: "",
        end_date: "",
        is_archive: false,
      },
      enableReinitialize: true,
      validationSchema,
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
          start_date: values.start_date,
          end_date: values.end_date,
        };
        console.log(submit_value, "submit valyuuuee");
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/mg_student/reports/student_admission_report`,
            submit_value,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.length < 1) {
              message.error("No Data Available for given Academic Year/Class/Section ");
              return;
            } else {
              let filterArchivedData = values.is_archive
                ? response.data.filter((item: any) => {
                    item.is_archive;
                  })
                : response.data;
              console.log(filterArchivedData, "filter Archive Data");
              setData(filterArchivedData);
            }
          })
          .catch((error) => {
            setData([]);
            message.error(error.response.data.detail);
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

  const tableRef = useRef();
  const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const [isExporting, setIsExporting] = useState(false);
  const exportToExcel = () => {
    // Convert data to worksheet
    setIsExporting(true);
    const ws = XLSX.utils.json_to_sheet(data);

    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "students_data.xlsx");
    setIsExporting(false);
  };
  const admission_list = {
    columns: [
      { Header: "SL.NO", accessor: "sl_no" },
      { Header: "ADMISSION DATE", accessor: "date_of_admission" },
      { Header: "CLASS & SECTION", accessor: "class_section", width: "20%" },
      { Header: "STUDENT NAME", accessor: "student_name" },
      { Header: "USER ID", accessor: "user_id" },
      { Header: "FATHER NAME", accessor: "father_name" },
      { Header: "Admission Fee", accessor: "admission_fee" },
    ],
    rows: data.map((row: any, index: any) => ({
      sl_no: index + 1,
      date_of_admission: row.date_of_admission,
      class_section: `${row.class_name} ${row.section_name}`,
      student_name: row.student_name,
      user_id: row.user_id,
      father_name: row.father_name,
      admission_fee: row.admission_fee,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Student Admission List Report
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Autocomplete
                  value={values.academic_year || Cacademic_year}
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
                      onBlur={handleBlur}
                      error={touched.academic_year && Boolean(errors.academic_year)}
                      success={values.academic_year && !errors.academic_year}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDInput
                  type="date"
                  required
                  InputLabelProps={{ shrink: true }}
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                  sx={{ width: "100%" }}
                  label="Select Start Date"
                  variant="standard"
                  name="start_date"
                  value={values.start_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.start_date && Boolean(errors.start_date)}
                  success={values.start_date && !errors.start_date}
                  helperText={touched.start_date && errors.start_date}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDInput
                  type="date"
                  required
                  InputLabelProps={{ shrink: true }}
                  onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                  sx={{ width: "100%" }}
                  label="Select End Date"
                  variant="standard"
                  name="end_date"
                  value={values.end_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.end_date && Boolean(errors.end_date)}
                  success={values.end_date && !errors.end_date}
                  helperText={touched.end_date && errors.end_date}
                />
              </Grid>
              <Grid item xs={12} mb={2} mt={2} sm={3}>
                <input
                  type="checkbox"
                  checked={values.is_archive}
                  name="is_archive"
                  onChange={handleChange}
                />
                &nbsp;&nbsp;
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Student is Archive
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} p={3} style={{ maxHeight: "250px", overflowY: "auto" }}>
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Select Class & Section
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

              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item mt={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    Show Data
                  </MDButton>
                </Grid>
                <Grid item>
                  {data.length > 0 && (
                    <>
                      <MDButton color="info" onClick={handlePrint}>
                        Generate PDF &nbsp;<Icon>picture_as_pdf</Icon>
                      </MDButton>
                      &nbsp;&nbsp;
                      <MDButton
                        variant="contained"
                        disabled={data.length < 1}
                        color="dark"
                        type="submit"
                        onClick={exportToExcel}
                      >
                        {isExporting ? "Exporting..." : "Export to Excel"}
                      </MDButton>
                    </>
                  )}
                </Grid>
              </Grid>
              {data.length > 0 && (
                <DataTable table={admission_list} canSearch={true} isSorted={false} />
              )}
            </Grid>
          </MDBox>
          <MDBox className="report-hidden-text" ref={tableRef}>
            <TablePdfGenerator
              data={data}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={undefined}
            />
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
