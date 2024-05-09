// import DataTable from "examples/Tables/DataTable";
// import MDTypography from "components/MDTypography";
// import DialogContent from "@mui/material/DialogContent";
// import Dialog, { DialogProps } from "@mui/material/Dialog";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDButton from "components/MDButton";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Create from "./create";
// import Update from "./update";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useTheme } from "@emotion/react";
// import { useMediaQuery } from "@mui/material";
// import Cookies from "js-cookie";
// import { Dispatch, SetStateAction } from "react";
// import { message } from "antd";
// import { useSelector } from "react-redux";

// const token = Cookies.get("token");
// const LateFine = () => {
//   // To fetch rbac from redux:  Start
//   // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
//   // console.log("rbac user", rbacData);
//   //End

//   // Fetch rbac  Date from useEffect: Start

//   const [rbacData, setRbacData] = useState([]);
//   const fetchRbac = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         console.log("rbac user", response.data);
//         setRbacData(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchRbac();
//   }, [token]);
//   //End
//   const [data, setData] = useState([]);

//   //Update Dialog Box Start
//   const [editData, setEditData] = useState(null);
//   const [updatepage, setUpdatepage] = useState(false);

//   const handleOpenupdate = (index: number) => {
//     const main_data = data[index];
//     console.log(main_data, "maindata");

//     setEditData(main_data);
//     setUpdatepage(true);
//   };

//   const handleCloseupdate = () => {
//     setUpdatepage(false);
//   }; //End
//   const fetchLateFees = () => {
//     axios
//       .get("http://10.0.20.200:8000/fee_fine", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchLateFees();
//   }, []);
//   const handleDelete = async (name: any) => {
//     try {
//       const response = await axios.delete("http://10.0.20.200:8000/mg_subject", {
//         data: {
//           class_code: name.class_code,
//           subject_code: name.subject_code,
//           subject_name: name.subject_name,
//         },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         message.success("Deleted successFully");
//         fetchLateFees();
//       }
//     } catch (error: unknown) {
//       console.error("Error deleting task:", error);
//       const myError = error as Error;
//       message.error("An unexpected error occurred");
//     }
//   };
//   const dataTableData = {
//     columns: [
//       { Header: "Fine ", accessor: "fine_name" },
//       { Header: "Account ", accessor: "account_name" },
//       { Header: "Late Fee Calculation Type", accessor: "late_fee_calculation_type" },
//       { Header: "Description", accessor: "description" },

//       { Header: "Action", accessor: "action" },
//     ],

//     rows: data.map((row, index) => ({
//       action: (
//         <MDTypography variant="p">
//           {rbacData ? (
//             rbacData?.find((element: string) => element === "subjectinfoupdate") ? (
//               <IconButton
//                 onClick={() => {
//                   handleOpenupdate(index);
//                 }}
//               >
//                 <CreateRoundedIcon />
//               </IconButton>
//             ) : (
//               ""
//             )
//           ) : (
//             ""
//           )}

//           {rbacData ? (
//             rbacData?.find((element: string) => element === "subjectinfodelete") ? (
//               <IconButton
//                 onClick={() => {
//                   handleDelete(row);
//                 }}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             ) : (
//               ""
//             )
//           ) : (
//             ""
//           )}
//         </MDTypography>
//       ),
//       account_name: <MDTypography variant="p">{row.account_name}</MDTypography>,
//       fine_name: <MDTypography variant="p">{row.fine_name}</MDTypography>,
//       description: <MDTypography variant="p">{row.description}</MDTypography>,
//       late_fee_calculation_type: (
//         <MDTypography variant="p">{row.late_fee_calculation_type}</MDTypography>
//       ),
//     })),
//   };
//   const [showpage, setShowpage] = useState(false);
//   const handleShowPage = () => {
//     setShowpage(!showpage);
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       {showpage ? (
//         <>
//           <Create handleShowPage={handleShowPage} fetchingData={fetchLateFees} />
//         </>
//       ) : (
//         <>
//           {!updatepage && (
//             <>
//               <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <MDTypography variant="h5" fontWeight="bold" color="secondary">
//                   Late Fee
//                 </MDTypography>
//                 {rbacData ? (
//                   rbacData?.find((element: string) => element === "subjectinfocreate") ? (
//                     <MDButton
//                       variant="outlined"
//                       color="info"
//                       type="submit"
//                       onClick={handleShowPage}
//                     >
//                       + New Late Fee
//                     </MDButton>
//                   ) : (
//                     ""
//                   )
//                 ) : (
//                   ""
//                 )}
//               </Grid>
//               <DataTable table={dataTableData} />
//             </>
//           )}
//         </>
//       )}
//       <>
//         {updatepage && (
//           <Update setOpenupdate={setUpdatepage} editData={editData} fetchingData={fetchLateFees} />
//         )}
//       </>
//     </DashboardLayout>
//   );
// };

// export default LateFine;

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
import Create from "./create";
const token = Cookies.get("token");
export default function FeeCategory() {
  const [showpage, setShowpage] = useState(false);
  const [datainfo, setDatainfo] = useState([]);

  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  const fetchLateFees = () => {
    axios
      .get("http://10.0.20.200:8000/fee_fine", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDatainfo(response.data);

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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "DESCRIPTION", dataIndex: "description", key: "age" },
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
  function KeyDataProps(data: any) {
    return data.map((item: any, index: any) => {
      return {
        key: index + 1,
        ...item,
      };
    });
  }

  const data = [
    {
      name: "Flat Fee",
      description: "The Flat Fee covers basic administrative costs.",
      fee_fine_dues: [
        {
          days_after_due_date: "6",
          amount: 988,
          is_percent: false,
        },
      ],
    },
    {
      name: "Tuition Fee",
      description: "The Tuition Fee is essential for educational expenses.",
      fee_fine_dues: [
        {
          days_after_due_date: "7",
          amount: 700,
          is_percent: false,
        },
      ],
    },
    {
      name: "Library Fee",
      description: "The Library Fee supports library resources and services.",
      fee_fine_dues: [
        {
          days_after_due_date: "8",
          amount: 560,
          is_percent: false,
        },
      ],
    },
    {
      name: "Academic Fee",
      description: "The Academic Fee contributes to academic programs and facilities.",
      fee_fine_dues: [
        {
          days_after_due_date: "4",
          amount: 600,
          is_percent: false,
        },
      ],
    },
  ];
  const KeyData = KeyDataProps(data);
  function LateFeeData(index: any) {
    return {
      columns: [
        { Header: "Day after Due Day", accessor: "days_after_due_date" },
        { Header: "Amount", accessor: "amount" },
        { Header: "Description", accessor: "description" },
      ],
      rows: KeyData[index].fee_fine_dues.map((row: any, index: number) => ({
        amount: <MDTypography variant="p">{row.amount}</MDTypography>,
        days_after_due_date: <MDTypography variant="p">{row.days_after_due_date}</MDTypography>,
      })),
    };
  }
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <Card>
        <Grid container px={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Late Fee
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
              + New Late Fee
            </MDButton>
          </Grid>

          {/* <Dialog open={open} onClose={handleClose}>
            <Create setOpen={setOpen} fetchData={fetchSection} />
          </Dialog> */}

          {/* <Dialog open={openupdate} onClose={handleCloseupdate}>
            <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchSection} />
          </Dialog> */}
        </Grid>
        {showpage ? (
          <>
            <Create handleShowPage={handleShowPage} fetchingData={fetchLateFees} />
          </>
        ) : (
          <>
            <Grid xs={12} sm={12} py={2}>
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender: (KeyData, index: number) => (
                    <Card>
                      <Grid container px={3}>
                        <Grid item xs={12} sm={6} mt={2}>
                          <Link href="create_fee_amount_perticular" variant="body2">
                            <MDTypography variant="h6" fontWeight="bold" color="secondary">
                              Fee Fine Dues
                            </MDTypography>
                          </Link>
                        </Grid>

                        <Grid item xs={12} sm={12} mt={2}>
                          <DataTable
                            table={LateFeeData(index)}
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
              />
            </Grid>
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
