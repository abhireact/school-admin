import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import { Grid, Link } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
export default function CollTable() {
  const [showpage, setShowpage] = useState(false);
  const [data, setData] = useState([]);

  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  const fetchLateFees = () => {
    axios
      .post(
        "http://10.0.20.200:8000/fee_collections",
        { user_name: "", academic_year: "", collection_date: "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchLateFees();
  }, []);
  const columns = [
    { title: "Collection Name", dataIndex: "collection_name", key: "collection_name" },
    { title: "Due Date", dataIndex: "due_date", key: "due_date" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Grid container spacing={1}>
          <Grid item>
            {/* <Icon fontSize="small" onClick={() => handleClickOpen(data)}> */}
            View
          </Grid>
          <Grid item>
            <Icon fontSize="small" color="secondary">
              delete
            </Icon>
          </Grid>
        </Grid>
      ),
    },
  ];
  function KeyDataProps(data2: any) {
    return data2.map((item: any, index: any) => {
      return {
        key: index + 1,
        ...item,
      };
    });
  }

  const data2 = [
    {
      collections: [
        {
          collection_name: "May Month Fee",
          due_date: "2024-05-10",
          particular: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Month Fee 2024-25",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          discount: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          late_fine: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
        },
        {
          collection_name: "May Month Fee",
          due_date: "2024-05-10",
          particular: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Month Fee 2024-25",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          discount: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          late_fine: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
        },
        {
          collection_name: "May Month Fee",
          due_date: "2024-05-10",
          particular: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Month Fee 2024-25",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          discount: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          late_fine: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
        },
        {
          collection_name: "May Month Fee",
          due_date: "2024-05-10",
          particular: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Month Fee 2024-25",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          discount: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          late_fine: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
        },
        {
          collection_name: "May Month Fee",
          due_date: "2024-05-10",
          particular: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Month Fee 2024-25",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          discount: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
          late_fine: [
            {
              type: "particular",
              id: 1433514,
              particular_name: "Discount",
              amount: 4850,
              previous_paid: 0,
              balance: 4850,
              discount: 0,
              amount_paying: 4850,
              excess_amount: 0,
            },
          ],
        },
      ],
    },
  ];

  const KeyData = KeyDataProps(data2);
  function Particular(index: any) {
    console.log(KeyData[index].particular, "keyData index");
    const rowData = KeyData[index].particular;

    return {
      columns: [
        { Header: "Particular", accessor: "particular_name" },
        { Header: "Fee", accessor: "amount" },
        { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
        { Header: "Fee", accessor: "balance" },
        { Header: "Discount", accessor: "discount" },
        { Header: "Amount Paying", accessor: "amount_paying" },
        { Header: "Excess Amount", accessor: "excess_amount" },
      ],
      rows: rowData.map((row: any, rowIndex: number) => ({
        particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
        previous_paid: <MDTypography variant="p">{row.previous_paid}</MDTypography>,
        balance: <MDTypography variant="p">{row.balance}</MDTypography>,
        discount: <MDTypography variant="p">{row.discount}</MDTypography>,
        amount_paying: <MDTypography variant="p">{row.amount_paying}</MDTypography>,
        amount: <MDTypography variant="p">{row.amount}</MDTypography>,
        excess_amount: <MDTypography variant="p">{row.excess_amount}</MDTypography>,
        // Add other properties if needed
      })),
    };
  }
  function Discount(index: any) {
    console.log(KeyData[index].discount, "keyData index");
    const rowData = KeyData[index].discount;

    return {
      columns: [
        { Header: "Particular", accessor: "particular_name" },
        // { Header: "Fee", accessor: "amount" },
        // { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
        { Header: "Balance", accessor: "balance" },
        // { Header: "Discount", accessor: "discount" },
        { Header: "Amount Paying", accessor: "amount_paying" },
        // { Header: "Excess Amount", accessor: "excess_amount" },
      ],
      rows: rowData.map((row: any, rowIndex: number) => ({
        particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
        // previous_paid: <MDTypography variant="p">{row.previous_paid}</MDTypography>,
        balance: <MDTypography variant="p">{row.balance}</MDTypography>,
        // discount: <MDTypography variant="p">{row.discount}</MDTypography>,
        amount_paying: <MDTypography variant="p">{row.amount_paying}</MDTypography>,
        // amount: <MDTypography variant="p">{row.amount}</MDTypography>,
        // excess_amount: <MDTypography variant="p">{row.excess_amount}</MDTypography>,
        // Add other properties if needed
      })),
    };
  }
  function LateFee(index: any) {
    console.log(KeyData[index].late_fine, "keyData index");
    const rowData = KeyData[index].late_fine;

    return {
      columns: [
        { Header: "Particular", accessor: "particular_name" },
        // { Header: "Fee", accessor: "amount" },
        // { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
        { Header: "Balance", accessor: "balance" },
        { Header: "Discount", accessor: "discount" },
        { Header: "Amount Paying", accessor: "amount_paying" },
        // { Header: "Excess Amount", accessor: "excess_amount" },
      ],
      rows: rowData.map((row: any, rowIndex: number) => ({
        particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
        // previous_paid: <MDTypography variant="p">{row.previous_paid}</MDTypography>,
        balance: <MDTypography variant="p">{row.balance}</MDTypography>,
        discount: <MDTypography variant="p">{row.discount}</MDTypography>,
        amount_paying: <MDTypography variant="p">{row.amount_paying}</MDTypography>,
        // amount: <MDTypography variant="p">{row.amount}</MDTypography>,
        // excess_amount: <MDTypography variant="p">{row.excess_amount}</MDTypography>,
        // Add other properties if needed
      })),
    };
  }
  const flattenedData = data2.flatMap(({ collections }) =>
    collections.flatMap((collection) =>
      collection.particular.map((particular) => ({
        collection_name: collection.collection_name,
        due_date: collection.due_date,
        particular_name: particular.particular_name,
        amount: particular.amount,
        previous_paid: particular.previous_paid,
        balance: particular.balance,
        discount: particular.discount,
        amount_paying: particular.amount_paying,
        excess_amount: particular.excess_amount,
      }))
    )
  );
  const dataTableData = {
    columns: [
      { Header: "COLLECTION NAME", accessor: "collection_name" },
      { Header: "DUE DATE", accessor: "due_date" },
      { Header: "PARTICULAR NAME", accessor: "particular_name" },
      { Header: "AMOUNT", accessor: "amount" },
      { Header: "PREVIOUS PAID", accessor: "previous_paid" },
      { Header: "BALANCE", accessor: "balance" },
      { Header: "DISCOUNT", accessor: "discount" },
      { Header: "AMOUNT PAYING", accessor: "amount_paying" },
      { Header: "EXCESS AMOUNT", accessor: "excess_amount" },
    ],
    rows: flattenedData.map((row) => ({
      collection_name: <MDTypography variant="p">{row.collection_name}</MDTypography>,
      due_date: <MDTypography variant="p">{row.due_date}</MDTypography>,
      particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
      amount: <MDTypography variant="p">{row.amount}</MDTypography>,
      previous_paid: <MDTypography variant="p">{row.previous_paid}</MDTypography>,
      balance: <MDTypography variant="p">{row.balance}</MDTypography>,
      discount: <MDTypography variant="p">{row.discount}</MDTypography>,
      amount_paying: <MDTypography variant="p">{row.amount_paying}</MDTypography>,
      excess_amount: <MDTypography variant="p">{row.excess_amount}</MDTypography>,
    })),
  };

  return (
    <>
      {/* <DashboardNavbar /> */}
      <Card>
        <Grid container px={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Collection{" "}
            </MDTypography>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} py={2}>
          {/* <Table
            columns={columns}
            expandable={{
              expandedRowRender: (KeyData, index: number) => (
                <Card>
                  <Grid container px={3}>
                    <Grid item xs={12} sm={12} mt={2}>
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Particular
                      </MDTypography>
                      <DataTable
                        table={Particular(index)}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} mt={2}>
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Discount
                      </MDTypography>
                      <DataTable
                        table={Discount(index)}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} mt={2}>
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Late Fees
                      </MDTypography>
                      <DataTable
                        table={LateFee(index)}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ),
            }}
            dataSource={KeyData} // Adjust the width to enable horizontal scrolling only
            scroll={{ y: "100%" }}
            bordered
            expandRowByClick
          /> */}
          <DataTable table={dataTableData} />
        </Grid>
      </Card>
    </>
  );
}
