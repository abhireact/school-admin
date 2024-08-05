import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import StudentCard from "../student_card";
import { useReactToPrint } from "react-to-print";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
const token = Cookies.get("token");

const PaidFees = (props: any) => {
  const [data, setData] = useState([]);
  console.log(props, "props");
  useEffect(() => {
    GetData(props.mainData);
  }, []);
  const GetData = (data: any) => {
    console.log(data, "data in GetData");

    axios
      .post(
        "http://10.0.20.200:8000/fee_receipts",
        {
          student_user_name: data.user_id,
          academic_year: data.academic_year,
          class_name: data.class_name,
          section_name: data.section_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        message.error("Error on fetching data !");
      });
  };

  const dataTableData = {
    columns: [
      { Header: "RECIEPT NO", accessor: "receipt_number" },
      { Header: "COLLECTION DATE", accessor: "submit_date" },
      { Header: "COLLECTION NAME", accessor: "collection_name" },
      { Header: "PAID AMOUNT", accessor: "paid_amount" },
      { Header: "TOTAL PAID AMOUNT", accessor: "total_amount" },
    ],

    rows: data.map(
      (
        row: {
          receipt_number: any;
          submit_date: any;
          collection_name: any;
          paid_amount: any;
          total_amount: any;
        },
        index: number
      ) => ({
        total_amount: row?.total_amount,
        submit_date: row.submit_date,
        paid_amount: row.paid_amount,
        receipt_number: row.receipt_number,
        collection_name: row.collection_name,
      })
    ),
  };
  // const tableRef = useRef();
  // // const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  // const handlePrint = useReactToPrint({
  //   content: () => tableRef.current,
  // });

  return (
    <>
      <Grid container px={3} display="flex" justifyContent={"center"}>
        <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
          <StudentCard data={props.mainData} />
        </Grid>
      </Grid>
      {/* <MDBox>
        <MDButton onClick={handlePrint}>Print</MDButton>
      </MDBox> */}
      <DataTable
        table={dataTableData}
        selectColumnBtn
        importbtn
        pdfGeneratorProps={{
          isPdfMode: true,
          hiddenText: "",
          additionalInfo: undefined,
        }}
      />
    </>
  );
};

export default PaidFees;
