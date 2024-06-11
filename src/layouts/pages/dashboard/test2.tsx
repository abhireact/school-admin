// import React, { useState, useEffect, useMemo } from "react";
// import DataTable from "examples/Tables/DataTable";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import Checkbox from "@mui/material/Checkbox";
// import { Grid } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useFormik } from "formik";

// const MyDataTableComponent = () => {
//   let { values, handleChange, handleSubmit, setFieldValue, touched, errors, handleBlur } =
//     useFormik({
//       initialValues: {
//         class_name: "",
//         wing_name: "All",
//         academic_year: "2024-2025",
//         admission_number: "",
//         fee_code: "",
//         section_name: "",
//         collection_date: "",
//         adm_no_or_fee_code: "",
//         collected_at: "",
//         cheque_number: "",
//         cheque_date: "",
//         bank_branch: "",
//         cheque_status: "",
//         online_transaction_no: "",
//         draft_number: "",
//         draft_date: "",
//         discount: "",
//         applicable_late_fee: true,
//         payment_details: {
//           collected_at: "",
//           payment_mode: "",
//           cheque_number: "",
//           cheque_date: "",
//           bank_branch: "",
//           cheque_status: "",
//           online_transaction_no: "",
//           draft_number: "",
//           draft_date: "",
//         },
//       },

//       onSubmit: (values: any, action: { resetForm: () => void }) => {
//         console.log(" values", values);
//         action.resetForm();
//       },
//     });
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const token = Cookies.get("token");

//   const fetchData = async () => {
//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/fee_collections",
//         {
//           user_name: "THSKRBS1027",
//           academic_year: "2024-2025",
//           collection_date: "2024-10-05",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data, "response");
//       // arr.push();
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   const flattenedData = useMemo(() => {
//     return data?.flatMap(({ collections }) =>
//       collections?.map(
//         (collection: {
//           collection_name: any;
//           due_date: any;
//           particular: any[];
//           discounts: any[];
//           late_fine: any[];
//         }) => ({
//           collection_name: collection.collection_name,
//           due_date: collection.due_date,
//           data: [
//             ...collection.particular?.map(
//               (particular: {
//                 particular_name: any;
//                 amount: any;
//                 previous_paid: any;
//                 balance: any;
//                 discount: any;
//                 amount_paying: any;
//                 excess_amount: any;
//                 type: any;
//               }) => ({
//                 type: particular.type,
//                 name: particular.particular_name,
//                 amount: particular.amount,
//                 previous_paid: particular.previous_paid,
//                 balance: particular.balance,
//                 discount: particular.discount,
//                 amount_paying: particular.amount_paying,
//                 excess_amount: particular.excess_amount,
//               })
//             ),
//             ...collection.discounts?.map(
//               (discount: {
//                 type: any;
//                 particular_name: any;
//                 amount: any;
//                 previous_paid: any;
//                 balance: any;
//                 discount: any;
//                 amount_paying: any;
//                 excess_amount: any;
//               }) => ({
//                 type: discount.type,
//                 name: discount.particular_name,
//                 amount: discount.amount,
//                 previous_paid: discount.previous_paid,
//                 balance: discount.balance,
//                 discount: discount.discount,
//                 amount_paying: discount.amount_paying,
//                 excess_amount: discount.excess_amount,
//               })
//             ),
//             ...collection.late_fine?.map(
//               (late_fine: {
//                 type: any;
//                 particular_name: any;
//                 amount: any;
//                 previous_paid: any;
//                 balance: any;
//                 discount: any;
//                 amount_paying: any;
//                 excess_amount: any;
//               }) => ({
//                 type: late_fine.type,
//                 name: late_fine.particular_name,
//                 amount: late_fine.amount,
//                 previous_paid: late_fine.previous_paid,
//                 balance: late_fine.balance,
//                 discount: late_fine.discount,
//                 amount_paying: late_fine.amount_paying,
//                 excess_amount: late_fine.excess_amount,
//               })
//             ),
//           ],
//         })
//       )
//     );
//   }, [data]);

//   const handleHeaderCheckboxChange = (event: { target: { checked: any } }) => {
//     const isChecked = event.target.checked;
//     setSelectAll(isChecked);
//     setSelectedRows(isChecked ? flattenedData?.map((_, index) => index) : []);
//   };

//   const handleRowCheckboxChange = (index: number) => {
//     setSelectedRows((prevSelectedRows) =>
//       prevSelectedRows.includes(index)
//         ? prevSelectedRows.filter((selectedIndex) => selectedIndex !== index)
//         : [...prevSelectedRows, index]
//     );
//   };
//   const handleDiscountChange = (
//     e: { target: { value: any } },
//     parentIndex: number,
//     itemIndex: string | number,
//     iteem: any
//   ) => {
//     const { value } = e.target;
//     console.log(value, parentIndex, itemIndex);

//     setData((prevData) => {
//       const newData = [...prevData];
//       const no_of_consession = newData[0]?.collections[parentIndex]?.discounts?.length;

//       console.log(
//         value,
//         parentIndex,
//         itemIndex,
//         newData[0].collections[parentIndex],
//         no_of_consession,
//         iteem
//       );
//       if (newData[0].collections[parentIndex] && iteem.type) {
//         // Check the type and use "late" if the type is "late"
//         const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

//         // Ensure the path exists before accessing properties
//         if (
//           newData[0].collections[parentIndex][typeKey] &&
//           newData[0].collections[parentIndex][typeKey][0]
//         ) {
//           newData[0].collections[parentIndex][typeKey][0].discount = parseInt(value);
//           newData[0].collections[parentIndex][typeKey][0].amount_paying =
//             parseInt(newData[0].collections[parentIndex][typeKey][0].balance) - parseInt(value);
//         }
//       }

//       return newData;
//     });
//   };
//   const handleAmountPayingChange = (
//     e: { target: { value: any } },
//     parentIndex: number,
//     itemIndex: string | number,
//     iteem: any
//   ) => {
//     const { value } = e.target;
//     console.log(value, parentIndex, itemIndex);

//     setData((prevData) => {
//       const newData = [...prevData];

//       if (newData[0].collections[parentIndex] && iteem.type) {
//         // Check the type and use "late" if the type is "late"
//         const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

//         // Ensure the path exists before accessing properties
//         if (
//           newData[0].collections[parentIndex][typeKey] &&
//           newData[0].collections[parentIndex][typeKey][0]
//         ) {
//           newData[0].collections[parentIndex][typeKey][0].amount_paying = parseInt(value);
//           newData[0].collections[parentIndex][typeKey][0].excess_amount =
//             parseInt(newData[0].collections[parentIndex][typeKey][0].balance) -
//             parseInt(newData[0].collections[parentIndex][typeKey][0].discount) -
//             parseInt(value);
//         }
//       }

//       return newData;
//     });
//   };
//   console.log(data, "updated data");
//   const calculateTotals = (data: any[]) => {
//     const totals = {
//       amount: 0,
//       previous_paid: 0,
//       balance: 0,
//       discount: 0,
//       amount_paying: 0,
//       excess_amount: 0,
//     };

//     data.forEach((row: { data: any[] }) => {
//       row.data.forEach(
//         (item: {
//           amount: string;
//           previous_paid: string;
//           balance: string;
//           discount: string;
//           amount_paying: string;
//           excess_amount: string;
//         }) => {
//           totals.amount += parseInt(item.amount) || 0;
//           totals.previous_paid += parseInt(item.previous_paid) || 0;
//           totals.balance += parseInt(item.balance) || 0;
//           totals.discount += parseInt(item.discount) || 0;
//           totals.amount_paying += parseInt(item.amount_paying) || 0;
//           totals.excess_amount += parseInt(item.excess_amount) || 0;
//         }
//       );
//     });

//     return totals;
//   };
//   const totals = calculateTotals(flattenedData);

//   const dataTableData = useMemo(
//     () => ({
//       columns: [
//         {
//           Header: (
//             <Checkbox
//               checked={selectAll}
//               indeterminate={selectedRows.length > 0 && selectedRows.length < flattenedData.length}
//               onChange={handleHeaderCheckboxChange}
//             />
//           ),
//           accessor: "action",
//           width: "5%",
//         },
//         { Header: "Collection Name", accessor: "collection_name" },
//         { Header: "Name", accessor: "name" },
//         { Header: "FEE", accessor: "amount" },
//         { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
//         { Header: "Balance", accessor: "balance" },
//         { Header: "Discount", accessor: "discount" },
//         { Header: "Amount Paying", accessor: "amount_paying" },
//         { Header: "Excess Amount", accessor: "excess_amount" },
//       ],
//       rows: flattenedData?.map((row, index) => ({
//         collection_name: (
//           <Grid container display="flex" flexDirection="column">
//             <MDTypography variant="p" key={`collection_name_${index}`}>
//               {row.collection_name}
//             </MDTypography>
//             <MDTypography variant="p" key={`due_date_${index}`}>
//               Due Date - {row.due_date}
//             </MDTypography>
//           </Grid>
//         ),
//         action: (
//           <Checkbox
//             checked={selectedRows.includes(index)}
//             onChange={() => handleRowCheckboxChange(index)}
//           />
//         ),
//         name: row.data?.map(
//           (
//             item: {
//               name:
//                 | string
//                 | number
//                 | boolean
//                 | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//                 | React.ReactFragment
//                 | React.ReactPortal;
//             },
//             itemIndex: any
//           ) => (
//             <MDTypography variant="p" key={`name_${index}_${itemIndex}`}>
//               <li>{item.name}</li>
//             </MDTypography>
//           )
//         ),
//         amount: row.data?.map(
//           (
//             item: {
//               amount:
//                 | string
//                 | number
//                 | boolean
//                 | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//                 | React.ReactFragment
//                 | React.ReactPortal;
//             },
//             itemIndex: any
//           ) => (
//             <MDTypography variant="p" key={`amount_${index}_${itemIndex}`}>
//               <ul>{item.amount}</ul>
//             </MDTypography>
//           )
//         ),
//         previous_paid: row.data?.map(
//           (
//             item: {
//               previous_paid:
//                 | string
//                 | number
//                 | boolean
//                 | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//                 | React.ReactFragment
//                 | React.ReactPortal;
//             },
//             itemIndex: any
//           ) => (
//             <MDTypography variant="p" key={`previous_paid_${index}_${itemIndex}`}>
//               <ul>{item.previous_paid}</ul>
//             </MDTypography>
//           )
//         ),
//         balance: row.data?.map(
//           (
//             item: {
//               balance:
//                 | string
//                 | number
//                 | boolean
//                 | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//                 | React.ReactFragment
//                 | React.ReactPortal;
//             },
//             itemIndex: any
//           ) => (
//             <MDTypography variant="p" key={`balance_${index}_${itemIndex}`}>
//               <ul>{item.balance}</ul>
//             </MDTypography>
//           )
//         ),
//         discount: row.data?.map((item: { discount: any; type: any }, itemIndex: any) => (
//           <MDTypography variant="p" key={`discount_${index}_${itemIndex}`}>
//             <ul>
//               <MDInput
//                 size="small"
//                 variant="standard"
//                 onChange={(e: any) => handleDiscountChange(e, index, itemIndex, item)}
//                 sx={{ width: "50px" }}
//                 disabled={item.type == "discount"}
//                 value={item.discount}
//               />
//             </ul>
//           </MDTypography>
//         )),
//         amount_paying: row.data?.map((item: { amount_paying: any; type: any }, itemIndex: any) => (
//           <MDTypography variant="p" key={`amount_paying_${index}_${itemIndex}`}>
//             <ul>
//               <MDInput
//                 size="small"
//                 variant="standard"
//                 sx={{ width: "50px" }}
//                 onChange={(e: any) => handleAmountPayingChange(e, index, itemIndex, item)}
//                 disabled={item.type == "discount" || item.type == "late"}
//                 value={item.amount_paying}
//               />
//             </ul>
//           </MDTypography>
//         )),
//         excess_amount: row.data?.map((item: { excess_amount: any }, itemIndex: any) => (
//           <MDTypography variant="p" key={`excess_amount_${index}_${itemIndex}`}>
//             <ul>
//               <MDInput
//                 disabled
//                 size="small"
//                 variant="standard"
//                 sx={{ width: "50px" }}
//                 value={item.excess_amount}
//               />
//             </ul>
//           </MDTypography>
//         )),

//       })),
//     }),
//     [flattenedData, selectedRows, selectAll]
//   );

//   return (
//     <DataTable
//       table={dataTableData}
//       isSorted={false}
//       entriesPerPage={false}
//       showTotalEntries={false}
//     />
//   );
// };

// export default MyDataTableComponent;

import React, { useState, useEffect, useMemo } from "react";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";

const MyDataTableComponent = () => {
  let { values, handleChange, handleSubmit, setFieldValue, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        class_name: "",
        wing_name: "All",
        academic_year: "2024-2025",
        admission_number: "",
        fee_code: "",
        section_name: "",
        collection_date: "",
        adm_no_or_fee_code: "",
        collected_at: "",
        cheque_number: "",
        cheque_date: "",
        bank_branch: "",
        cheque_status: "",
        online_transaction_no: "",
        draft_number: "",
        draft_date: "",
        discount: "",
        applicable_late_fee: true,
        payment_details: {
          collected_at: "",
          payment_mode: "",
          cheque_number: "",
          cheque_date: "",
          bank_branch: "",
          cheque_status: "",
          online_transaction_no: "",
          draft_number: "",
          draft_date: "",
        },
      },

      onSubmit: (values: any, action: { resetForm: () => void }) => {
        console.log(" values", values);
        action.resetForm();
      },
    });
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/fee_collections",
        {
          user_name: "THSKRBS1027",
          academic_year: "2024-2025",
          collection_date: "2024-10-05",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "response");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const flattenedData = useMemo(() => {
    return data?.flatMap(({ collections }) =>
      collections?.map(
        (collection: {
          collection_name: any;
          due_date: any;
          particular: any[];
          discounts: any[];
          late_fine: any[];
        }) => ({
          collection_name: collection.collection_name,
          due_date: collection.due_date,
          data: [
            ...collection.particular?.map(
              (particular: {
                particular_name: any;
                amount: any;
                previous_paid: any;
                balance: any;
                discount: any;
                amount_paying: any;
                excess_amount: any;
                type: any;
              }) => ({
                type: particular.type,
                name: particular.particular_name,
                amount: particular.amount,
                previous_paid: particular.previous_paid,
                balance: particular.balance,
                discount: particular.discount,
                amount_paying: particular.amount_paying,
                excess_amount: particular.excess_amount,
              })
            ),
            ...collection.discounts?.map(
              (discount: {
                type: any;
                particular_name: any;
                amount: any;
                previous_paid: any;
                balance: any;
                discount: any;
                amount_paying: any;
                excess_amount: any;
              }) => ({
                type: discount.type,
                name: discount.particular_name,
                amount: discount.amount,
                previous_paid: discount.previous_paid,
                balance: discount.balance,
                discount: discount.discount,
                amount_paying: discount.amount_paying,
                excess_amount: discount.excess_amount,
              })
            ),
            ...collection.late_fine?.map(
              (late_fine: {
                type: any;
                particular_name: any;
                amount: any;
                previous_paid: any;
                balance: any;
                discount: any;
                amount_paying: any;
                excess_amount: any;
              }) => ({
                type: late_fine.type,
                name: late_fine.particular_name,
                amount: late_fine.amount,
                previous_paid: late_fine.previous_paid,
                balance: late_fine.balance,
                discount: late_fine.discount,
                amount_paying: late_fine.amount_paying,
                excess_amount: late_fine.excess_amount,
              })
            ),
          ],
        })
      )
    );
  }, [data]);
  useEffect(() => {
    if (flattenedData && flattenedData.length > 0) {
      setSelectedRows(flattenedData.map((_, index) => index)); // Set selectedRows to include all indices
    }
  }, [flattenedData]);
  const handleHeaderCheckboxChange = (event: { target: { checked: any } }) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedRows(isChecked ? flattenedData?.map((_, index) => index) : []);
  };

  const handleRowCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((selectedIndex) => selectedIndex !== index)
        : [...prevSelectedRows, index]
    );
  };

  const handleDiscountChange = (
    e: { target: { value: any } },
    parentIndex: number,
    itemIndex: string | number,
    iteem: any
  ) => {
    const { value } = e.target;
    console.log(value, parentIndex, itemIndex);

    setData((prevData) => {
      const newData = [...prevData];
      const no_of_consession = newData[0]?.collections[parentIndex]?.discounts?.length;

      console.log(
        value,
        parentIndex,
        itemIndex,
        newData[0].collections[parentIndex],
        no_of_consession,
        iteem
      );
      if (newData[0].collections[parentIndex] && iteem.type) {
        const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

        if (
          newData[0].collections[parentIndex][typeKey] &&
          newData[0].collections[parentIndex][typeKey][0]
        ) {
          newData[0].collections[parentIndex][typeKey][0].discount = parseInt(value);
          newData[0].collections[parentIndex][typeKey][0].amount_paying =
            parseInt(newData[0].collections[parentIndex][typeKey][0].balance) - parseInt(value);
        }
      }

      return newData;
    });
  };

  const handleAmountPayingChange = (
    e: { target: { value: any } },
    parentIndex: number,
    itemIndex: string | number,
    iteem: any
  ) => {
    const { value } = e.target;
    console.log(value, parentIndex, itemIndex);

    setData((prevData) => {
      const newData = [...prevData];

      if (newData[0].collections[parentIndex] && iteem.type) {
        const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

        if (
          newData[0].collections[parentIndex][typeKey] &&
          newData[0].collections[parentIndex][typeKey][0]
        ) {
          newData[0].collections[parentIndex][typeKey][0].amount_paying = parseInt(value);
          newData[0].collections[parentIndex][typeKey][0].excess_amount =
            parseInt(value) -
            parseInt(newData[0].collections[parentIndex][typeKey][0].balance) -
            parseInt(newData[0].collections[parentIndex][typeKey][0].discount);
        }
      }

      return newData;
    });
  };

  console.log(data, "updated data");

  const calculateTotals = (data: any[]) => {
    const totals = {
      amount: 0,
      previous_paid: 0,
      balance: 0,
      discount: 0,
      amount_paying: 0,
      excess_amount: 0,
    };

    data.forEach((row: { data: any[] }) => {
      row.data.forEach(
        (item: {
          amount: string;
          previous_paid: string;
          balance: string;
          discount: string;
          amount_paying: string;
          excess_amount: string;
        }) => {
          totals.amount += parseInt(item.amount) || 0;
          totals.previous_paid += parseInt(item.previous_paid) || 0;
          totals.balance += parseInt(item.balance) || 0;
          totals.discount += parseInt(item.discount) || 0;
          totals.amount_paying += parseInt(item.amount_paying) || 0;
          totals.excess_amount += parseInt(item.excess_amount) || 0;
        }
      );
    });

    return totals;
  };

  const totals = calculateTotals(flattenedData);

  const dataTableData = useMemo(
    () => ({
      columns: [
        {
          Header: (
            <Checkbox
              checked={selectAll}
              indeterminate={selectedRows.length > 0 && selectedRows.length < flattenedData.length}
              onChange={handleHeaderCheckboxChange}
            />
          ),
          accessor: "action",
          width: "5%",
        },
        { Header: "Collection Name", accessor: "collection_name" },
        { Header: "Name", accessor: "name" },
        { Header: "FEE", accessor: "amount" },
        { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
        { Header: "Balance", accessor: "balance" },
        { Header: "Discount", accessor: "discount" },
        { Header: "Amount Paying", accessor: "amount_paying" },
        { Header: "Excess Amount", accessor: "excess_amount" },
      ],
      rows: [
        ...flattenedData?.map((row, index) => ({
          collection_name: (
            <Grid container display="flex" flexDirection="column">
              <MDTypography variant="p" key={`collection_name_${index}`}>
                {row.collection_name}
              </MDTypography>
              <MDTypography variant="p" key={`due_date_${index}`}>
                Due Date - {row.due_date}
              </MDTypography>
            </Grid>
          ),
          action: (
            <Checkbox
              checked={selectedRows.includes(index)}
              onChange={() => handleRowCheckboxChange(index)}
            />
          ),
          name: row.data?.map(
            (
              item: {
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | React.ReactFragment
                  | React.ReactPortal;
              },
              itemIndex: any
            ) => (
              <MDTypography variant="p" key={`name_${index}_${itemIndex}`}>
                <li>{item.name}</li>
              </MDTypography>
            )
          ),
          amount: row.data?.map(
            (
              item: {
                amount:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | React.ReactFragment
                  | React.ReactPortal;
              },
              itemIndex: any
            ) => (
              <MDTypography variant="p" key={`amount_${index}_${itemIndex}`}>
                <ul>{item.amount}</ul>
              </MDTypography>
            )
          ),
          previous_paid: row.data?.map(
            (
              item: {
                previous_paid:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | React.ReactFragment
                  | React.ReactPortal;
              },
              itemIndex: any
            ) => (
              <MDTypography variant="p" key={`previous_paid_${index}_${itemIndex}`}>
                <ul>{item.previous_paid}</ul>
              </MDTypography>
            )
          ),
          balance: row.data?.map(
            (
              item: {
                balance:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | React.ReactFragment
                  | React.ReactPortal;
              },
              itemIndex: any
            ) => (
              <MDTypography variant="p" key={`balance_${index}_${itemIndex}`}>
                <ul>{item.balance}</ul>
              </MDTypography>
            )
          ),
          discount: row.data?.map((item: { discount: any; type: any }, itemIndex: any) => (
            <MDTypography variant="p" key={`discount_${index}_${itemIndex}`}>
              <ul>
                <MDInput
                  size="small"
                  variant="standard"
                  onChange={(e: any) => handleDiscountChange(e, index, itemIndex, item)}
                  sx={{ width: "50px" }}
                  disabled={item.type == "discount"}
                  value={item.discount}
                />
              </ul>
            </MDTypography>
          )),
          amount_paying: row.data?.map(
            (item: { amount_paying: any; type: any }, itemIndex: any) => (
              <MDTypography variant="p" key={`amount_paying_${index}_${itemIndex}`}>
                <ul>
                  <MDInput
                    size="small"
                    variant="standard"
                    sx={{ width: "50px" }}
                    onChange={(e: any) => handleAmountPayingChange(e, index, itemIndex, item)}
                    disabled={item.type == "discount" || item.type == "late"}
                    value={item.amount_paying}
                  />
                </ul>
              </MDTypography>
            )
          ),
          excess_amount: row.data?.map((item: { excess_amount: any }, itemIndex: any) => (
            <MDTypography variant="p" key={`excess_amount_${index}_${itemIndex}`}>
              <ul>
                <MDInput
                  disabled
                  size="small"
                  variant="standard"
                  sx={{ width: "50px" }}
                  value={item.excess_amount}
                />
              </ul>
            </MDTypography>
          )),
        })),
        {
          collection_name: (
            <MDTypography variant="h6" fontWeight="bold">
              Total
            </MDTypography>
          ),
          name: <MDTypography variant="h6" fontWeight="bold" />,
          amount: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.amount}
            </MDTypography>
          ),
          previous_paid: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.previous_paid}
            </MDTypography>
          ),
          balance: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.balance}
            </MDTypography>
          ),
          discount: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.discount}
            </MDTypography>
          ),
          amount_paying: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.amount_paying}
            </MDTypography>
          ),
          excess_amount: (
            <MDTypography variant="h6" fontWeight="bold">
              {totals.excess_amount}
            </MDTypography>
          ),
        },
      ],
    }),
    [flattenedData, selectedRows, selectAll]
  );

  return (
    <DataTable
      table={dataTableData}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      importbtn
    />
  );
};

export default MyDataTableComponent;

// import { Autocomplete, FormControl, RadioGroup, FormControlLabel, Card, Grid } from "@mui/material";

// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import React, { useEffect } from "react";
// import FormField from "../account/components/FormField";
// import Cookies from "js-cookie";
// import { useFormik } from "formik";
// import { message } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DataTable from "examples/Tables/DataTable";

// const initialValues = {
//   from_date: "",
//   to_date: "",
//   //   email: "",
//   // marital_status: [] as string[],
// };
// const MyDataTableComponent = () => {
//   const navigate = useNavigate();
//   const [employee, setEmployee] = React.useState([]);
//   const [data, setData] = React.useState([]);

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     // validationSchema: organisationSchema,
//     enableReinitialize: true,
//     onSubmit: (values: any, action: { resetForm: () => void }) => {
//       console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       action.resetForm();
//     },
//   });
//   const token = Cookies.get("token");
//   useEffect(() => {
//     fetchEmployee(); // Fetch data from API on component mount
//   }, []);

//   const fetchEmployee = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const employee = await response.json();
//       console.log(employee, typeof employee);
//       setEmployee(employee);
//     } catch (error) {
//       console.log("Error fetching classdata:", error);
//     }
//   };
//   const emoployee_email = [];

//   if (employee && employee.length > 0) {
//     const uniqueemployeeNames = new Set();

//     for (let i = 0; i < employee.length; i++) {
//       const employeeName = employee[i]["email"];
//       uniqueemployeeNames.add(employeeName);
//     }

//     // Convert the Set to an array if needed
//     emoployee_email.push(...uniqueemployeeNames);
//   }

//   console.log(emoployee_email, "employeeName");
//   const handleFormSubmit = async () => {
//     try {
//       console.log(values, "formdata");

//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/attendance/me`,
//         values,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(response, "responsr");
//       // setData(response);
//       if (response.status === 200) {
//         setData(response.data);
//         console.log(" Created Employee Successfully");
//         message.success(" Fetched Attandance Successfully");
//         // setIsSubmit(true);
//         // navigate("/pages/employee/employee-invitation");
//         // setDataSubmitted(true);
//         // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
//   console.log(data, "dataa");

//   const dataTableData = {
//     columns: [
//       { Header: `${"Date"}`, accessor: "date" },
//       { Header: `${"CheckIn "}`, accessor: "checkin" },
//       { Header: `${"CheckIn "}`, accessor: "checkout" },
//       { Header: `${"Total Hours"}`, accessor: "total_hours" },
//       { Header: `${"Status"}`, accessor: "status" },
//     ],

//     rows: Array.isArray(data)
//       ? data.map(
//           (
//             row: {
//               date: any;
//               day: any;
//               checkin: any;
//               checkout: any;
//               total_hours: any;
//               status: any;
//               //   email_id: any;
//             },
//             index: any
//           ) => ({
//             date: (
//               <p>
//                 <span style={{ color: "black" }}> {row.day}</span>, {row.date}
//               </p>
//             ),
//             checkin: <p>{row.checkin == null ? "-----" : row.checkin}</p>,
//             checkout: <p>{row.checkout == null ? "-----" : row.checkout}</p>,
//             total_hours: <p>{row.total_hours == null ? "-----" : row.total_hours}</p>,
//             status: (
//               <MDTypography
//                 color={
//                   row.status === "Present"
//                     ? "success"
//                     : row.status === "Absent"
//                     ? "error"
//                     : row.status === "Weekend"
//                     ? "warning"
//                     : "default"
//                 }
//                 variant="p"
//               >
//                 {row.status}
//               </MDTypography>
//             ),

//             // email_id: (
//             //   <p onChange={(e: any) => handleDataChange(e, "email_id", index)}>{row.email_id}</p>
//             // ),
//             // end_date: (
//             //   <p onChange={(e: any) => handleDataChange(e, "end_date", index)}> {row.end_date}</p>
//             // ),
//           })
//         )
//       : [],
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <form onSubmit={handleSubmit}>
//           <MDBox p={3}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h5">{"My Attendance"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
//                 <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
//                   {"Search"}
//                 </MDButton>
//               </Grid>
//               {/* <Grid item xs={12} sm={5}>
//                 <Autocomplete
//                   // multiple
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "email", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={emoployee_email}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"EmployeeId"}
//                       InputLabelProps={{ shrink: true }}
//                       name="email"
//                       placeholder="Enter Your EmployeeId"
//                       onChange={handleChange}
//                       value={values.email}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.email && touched.email}
//                       success={!errors.email}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.email && touched.email ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.email}
//                   </MDTypography>
//                 ) : null}
//               </Grid> */}
//               <Grid item xs={12} sm={5}>
//                 <FormField
//                   type="date" inputMode="none"
//                   label="from_date"
//                   name="from_date"
//                   value={values.from_date}
//                   placeholder="Enter Your from_date"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.from_date && touched.from_date}
//                   success={values.from_date.length && !errors.from_date}
//                 />
//                 {errors.from_date && touched.from_date ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.from_date}
//                   </MDTypography>
//                 ) : null}
//               </Grid>{" "}
//               <Grid item xs={12} sm={5}>
//                 <FormField
//                   type="date" inputMode="none"
//                   label="to_date"
//                   name="to_date"
//                   value={values.to_date}
//                   placeholder="Enter Your to_date"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.to_date && touched.to_date}
//                   success={values.to_date.length && !errors.to_date}
//                 />
//                 {errors.to_date && touched.to_date ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.to_date}
//                   </MDTypography>
//                 ) : null}
//               </Grid>{" "}
//             </Grid>
//             {data ? (
//               <MDBox p={3}>
//                 <DataTable
//                   table={dataTableData}
//                   // showTotalEntries={false}
//                   // isSorted={false}
//                   entriesPerPage={false}
//                 />
//               </MDBox>
//             ) : (
//               ""
//             )}
//           </MDBox>
//         </form>
//       </Card>
//     </DashboardLayout>
//   );
// };

// export default MyDataTableComponent;
