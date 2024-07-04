import { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Checkbox from "@mui/material/Checkbox";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import Cookies from "js-cookie";
import { Spin, Tree, message } from "antd";
import { useSelector } from "react-redux";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { useReactToPrint } from "react-to-print";
import type { TreeDataNode, TreeProps } from "antd";
import React from "react";

const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");

interface FeeConcessionInterface {
  columns: { Header: string; accessor: string }[];
  rows: any[]; // Changed to any[] to accommodate both datewise and non-datewise structures
}

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

interface ResponseItem {
  transaction_date: string;
  student_name: string;
  admission_number: string;
  class_name: string;
  section_name: string;
  transaction_number: string;
  insallment: string;
  payment_mode: string;
  amount: number;
}
type RowType = {
  sl_no: number | string;
  student_name: string;
  admission_number: string;
  section: string;
  transaction_number: string;
  insallment: string;
  payment_mode: string;
  amount: number | string;
  isDateHeader?: boolean;
  isDateTotal?: boolean;
  isGrandTotal?: boolean;
};
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
  section_name: "",
  datewise: false,
  start_date: Date,
  end_date: Date,
};

export default function FeeConcessionReportDetail() {
  const { classes } = useSelector((state: any) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [feeConcessionReportData, setfeeConcessionReportData] = useState<FeeConcessionInterface>({
    columns: [],
    rows: [],
  });
  const [result, setResult] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const checkedSectionKeys = checkedKeys
        ?.filter((key) => key.toString().includes("section:"))
        ?.map((item) => {
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
        classes: checkedSectionKeys,
        start_date: values.start_date,
        end_date: values.end_date,
      };

      setIsLoading(true);
      try {
        const response = await axios.post<ResponseItem[]>(
          "http://10.0.20.200:8000/concession_report/detailed",
          submit_value,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let feeConcessionData: FeeConcessionInterface;

        if (values.datewise) {
          // Group data by date
          const groupedData = response.data.reduce(
            (acc: { [key: string]: ResponseItem[] }, item) => {
              const date = item.transaction_date;
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(item);
              return acc;
            },
            {}
          );

          // Create a new array with date headers, data, and totals
          let grandTotal = 0;
          const rows: RowType[] = Object.entries(groupedData).flatMap(([date, items]) => {
            let dateTotal = 0;
            const dateRows: RowType[] = [
              {
                isDateHeader: true,
                sl_no: "",
                student_name: `Date ${date}`,
                admission_number: "",
                section: "",
                transaction_number: "",
                insallment: "",
                payment_mode: "",
                amount: "",
              },
              ...items.map((item, index) => {
                dateTotal += item.amount;
                grandTotal += item.amount;
                return {
                  sl_no: index + 1,
                  student_name: item.student_name,
                  admission_number: item.admission_number,
                  section: `${item.class_name}-${item.section_name}`,
                  transaction_number: item.transaction_number,
                  insallment: item.insallment,
                  payment_mode: item.payment_mode,
                  amount: item.amount,
                };
              }),
              {
                isDateTotal: true,
                sl_no: "",
                student_name: "",
                admission_number: "",
                section: "",
                transaction_number: "",
                insallment: "",
                payment_mode: "",
                amount: `ToTal ${dateTotal.toFixed(2)}`,
              },
            ];
            return dateRows;
          });

          // Add grand total at the end
          rows.push({
            isGrandTotal: true,
            sl_no: "",
            student_name: "",
            admission_number: "",
            section: "",
            transaction_number: "",
            insallment: "",
            payment_mode: "",
            amount: `Grand Total: ${grandTotal.toFixed(2)}`,
          });

          feeConcessionData = {
            columns: [
              { Header: "SL.NO", accessor: "sl_no" },
              { Header: "STUDENT NAME", accessor: "student_name" },
              { Header: "ADMISSION NUMBER", accessor: "admission_number" },
              { Header: "CLASS & SECTION", accessor: "section" },
              { Header: "Reciept No", accessor: "transaction_number" },
              { Header: "Installment", accessor: "insallment" },
              { Header: "Payment Mode", accessor: "payment_mode" },
              { Header: "Amount", accessor: "amount" },
            ],
            rows: rows,
          };
        } else {
          const rows: RowType[] = response.data.map((data, index) => ({
            sl_no: index + 1,
            student_name: data.student_name,
            admission_number: data.admission_number,
            section: `${data.class_name}-${data.section_name}`,
            transaction_number: data.transaction_number,
            insallment: data.insallment,
            payment_mode: data.payment_mode,
            amount: data.amount,
          }));

          const grandTotal = rows.reduce(
            (total, row) => total + (typeof row.amount === "number" ? row.amount : 0),
            0
          );
          rows.push({
            isGrandTotal: true,
            sl_no: "",
            student_name: "",
            admission_number: "",
            section: "",
            transaction_number: "",
            insallment: "",
            payment_mode: "",
            amount: `Grand Total:${grandTotal.toFixed(2)}`,
          });

          feeConcessionData = {
            columns: [
              { Header: "SL.NO", accessor: "sl_no" },
              { Header: "STUDENT NAME", accessor: "student_name" },
              { Header: "ADMISSION NUMBER", accessor: "admission_number" },
              { Header: "CLASS & SECTION", accessor: "section" },
              { Header: "Reciept No", accessor: "transaction_number" },
              { Header: "Installment", accessor: "insallment" },
              { Header: "Payment Mode", accessor: "payment_mode" },
              { Header: "Amount", accessor: "amount" },
            ],
            rows: rows,
          };
        }

        setfeeConcessionReportData(feeConcessionData);
        message.success("Fetched concession report successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching concession report. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const filteredClassData = classes?.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    filteredClassData?.forEach(({ wing_name, class_name, section_data }: Class) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: `wing-${wing_name}`,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child: { title: any }) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `wing-${wing_name},class-${class_name}`,
          children: [],
        });
      }
      const classItem = wing.children?.find((child: { title: any }) => child.title === class_name);
      section_data?.forEach((section: any) => {
        if (classItem && classItem.children) {
          classItem.children.push({
            title: `section ${section.section_name}`,
            key: `class:${class_name},section:${section.section_name}`,
          });
        }
      });
    });

    setResult(result);
  }, [values.academic_year, classes]);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue);
  };

  const tableRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  console.log(feeConcessionReportData.rows, "cdata");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit}>
          <MDBox>
            <MDButton onClick={handlePrint}>Print</MDButton>
          </MDBox>

          <Grid container>
            <Grid item xs={12} sm={12}>
              <Card>
                <MDBox p={3}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="h4" fontWeight="bold" color="secondary">
                        Concession Report Detail
                      </MDTypography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} pt={2}>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        disabled
                        defaultValue={Cacademic_year}
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
                            disabled
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
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        sx={{ width: "100%" }}
                        label=" Start Date"
                        variant="standard"
                        name="start_date"
                        value={values.start_date}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        type="date"
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        sx={{ width: "100%" }}
                        label=" End Date"
                        variant="standard"
                        name="end_date"
                        value={values.end_date}
                        onChange={handleChange}
                        inputProps={{ min: values.start_date }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      p={3}
                      style={{ maxHeight: "250px", overflowY: "auto" }}
                    >
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
                    <Grid item xs={12} sm={4}>
                      <Checkbox checked={values.datewise} name="datewise" onChange={handleChange} />
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Show Datewise
                      </MDTypography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                    <Grid item ml={2}>
                      <MDButton color="info" variant="contained" type="submit">
                        Show Data
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} pt={2}>
              {feeConcessionReportData.rows.length > 0 ? (
                <Card>
                  <MDBox ref={tableRef} className="hidden-text">
                    <PdfGenerator
                      data={feeConcessionReportData.rows}
                      isPdfMode={true}
                      hiddenText={""}
                      additionalInfo={undefined}
                    />
                  </MDBox>
                  <MDBox p={3}>
                    {values.datewise && (
                      <DataTable
                        table={{
                          columns: feeConcessionReportData.columns,
                          rows: feeConcessionReportData.rows,
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    )}
                  </MDBox>
                </Card>
              ) : null}
            </Grid>
          </Grid>
        </form>
      </Spin>
    </DashboardLayout>
  );
}
