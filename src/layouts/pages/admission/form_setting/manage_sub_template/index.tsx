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
const ManageSubTemplate = () => {
  const location = useLocation();
  const { templateData, postedData } = location.state || {};
  const navigate = useNavigate();
  console.log(templateData, "template");
  const [rows, setRows] = useState(
    templateData
      ? templateData.details.map((item: any) => ({
          select: item.select,
          class_name: item.class_name,
          max_form_per_day: item.max_form_per_day,
          max_form: item.max_form,
          date_of_calculating_age: item.date_of_calculating_age,
          min_age: item.min_age,
          max_age: item.max_age,
          min_age_month: item.min_age_month,
          max_age_month: item.max_age_month,
          min_age_day: item.min_age_day,
          max_age_day: item.max_age_day,
          amount: item.amount,
          status: item.status,
        }))
      : []
  );

  const handleCellChange = (index: any, field: string, value: any) => {
    const updatedRows = rows.map((row: any, rowIndex: any) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const columns = [
    {
      Header: "SELECT",
      accessor: "select",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={rows[index].status}
          onChange={(newValue: any) => handleCellChange(index, "select", newValue)}
          type="checkbox"
        />
      ),
    },
    {
      Header: "CLASS NAME",
      accessor: "class_name",
      width: "2%",
      // Cell: ({ cell: { value }, row: { index } }: any) => (
      //   <EditableCell
      //     value={value}
      //     onChange={(newValue: any) => handleCellChange(index, "class_name", newValue)}
      //   />
      // ),
    },
    {
      Header: "MAX FORM PER DAY",
      accessor: "max_form_per_day",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "max_form_per_day", newValue)}
        />
      ),
    },
    {
      Header: "MAX FORM",
      accessor: "max_form",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "max_form", newValue)}
        />
      ),
    },
    {
      Header: "DATE FOR CALCULATING AGE",
      accessor: "date_of_calculating_age",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "date_of_calculating_age", newValue)}
        />
      ),
    },
    {
      Header: "MIN AGE(YEAR)",
      accessor: "min_age",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "min_age", newValue)}
        />
      ),
    },
    {
      Header: "MAX AGE(YEAR)",
      accessor: "max_age",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "max_age", newValue)}
        />
      ),
    },
    {
      Header: "MIN AGE(MONTH)",
      accessor: "min_age_month",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "min_age_month", newValue)}
        />
      ),
    },
    {
      Header: "MAX AGE(MONTH)",
      accessor: "max_age_month",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "max_age_month", newValue)}
        />
      ),
    },
    {
      Header: "MIN AGE(DAY)",
      accessor: "min_age_day",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "min_age_day", newValue)}
        />
      ),
    },
    {
      Header: "MAX AGE(DAY)",
      accessor: "max_age_day",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "max_age_day", newValue)}
        />
      ),
    },
    {
      Header: "AMOUNT",
      accessor: "amount",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "amount", newValue)}
        />
      ),
    },
    {
      Header: "STATUS",
      accessor: "status",
      width: "2%",
      Cell: ({ cell: { value }, row: { index } }: any) => (
        <EditableCell
          value={value}
          onChange={(newValue: any) => handleCellChange(index, "status", newValue)}
          type="autocomplete"
          options={["Active", "Inactive"]}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    const data = {
      academic_year: postedData.academic_year,
      start_date: postedData.start_date,
      end_date: postedData.end_date,
      details: rows,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admissions/settings_detail`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <MDTypography variant="h4" fontWeight="bold" color="secondary">
            Manage Sub Template
          </MDTypography>
          <MDBox pt={3}>
            {rows.length > 0 ? (
              <DataTable
                table={{ columns, rows }}
                // isSorted={false}
                // entriesPerPage={false}
                // showTotalEntries={false}
              />
            ) : null}
          </MDBox>
        </MDBox>
        <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={1} mb={2}>
          <Grid item>
            <MDButton
              color="dark"
              variant="contained"
              onClick={() => navigate("/pages/admission/formsetting")}
            >
              Back
            </MDButton>
          </Grid>
          <Grid item ml={2} mr={2}>
            <MDButton color="info" variant="contained" type="submit" onClick={handleSubmit}>
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default ManageSubTemplate;
