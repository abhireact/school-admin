// import React, { useEffect, useState } from "react";
// import { Table, message } from "antd";
// import { TableRowSelection } from "antd/es/table/interface";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useFormik } from "formik";
// import DataTable from "examples/Tables/DataTable";
// import { Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// const token = Cookies.get("token");
// let today = new Date().toISOString().split("T")[0];

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const PayFee = (props: any) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchFeeCollection(props.mainData);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       class_name: "",
//       wing_name: "All",
//       academic_year: "2024-2025",
//       admission_number: "",
//       fee_code: "",
//       section_name: "",
//       collection_date: today,
//       adm_no_or_fee_code: "",
//       collected_at: "",
//       cheque_number: "",
//       cheque_date: "",
//       bank_branch: "",
//       cheque_status: "",
//       online_transaction_no: "",
//       draft_number: "",
//       draft_date: "",
//       discount: "",
//       payment_mode: [] as string[],
//       KeyData: KeyDataProps(data),
//     },
//     onSubmit: (values, action) => {
//       axios
//         .post(
//           "http://10.0.20.200:8000/fee_collections/pay_fee",
//           {
//             values,
//             data,
//             user_name: props.mainData.user_name,
//             academic_year: props.mainData.academic_year,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           message.success("Fetched Data Successfully!");
//           setData(response.data);
//           action.resetForm();
//         })
//         .catch(() => {
//           message.error("Error on fetching data!");
//         });
//     },
//   });

//   const fetchFeeCollection = (data: any) => {
//     axios
//       .post(
//         "http://10.0.20.200:8000/fee_collections",
//         { user_name: data.user_id, academic_year: data.academic_year, collection_date: today },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const columns = [
//     { title: "Collection Name", dataIndex: "collection_name", key: "collection_name" },
//     { title: "Due Date", dataIndex: "due_date", key: "due_date" },
//   ];

//   function KeyDataProps(data: any) {
//     const collections = data.collections || [];
//     return collections.map((collection: any, index: any) => ({
//       key: index + 1,
//       ...collection,
//     }));
//   }

//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection: TableRowSelection<DataType> = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//     selections: [
//       Table.SELECTION_ALL,
//       Table.SELECTION_INVERT,
//       Table.SELECTION_NONE,
//       {
//         key: "odd",
//         text: "Select Odd Row",
//         onSelect: (changeableRowKeys) => {
//           let newSelectedRowKeys = [];
//           newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
//           setSelectedRowKeys(newSelectedRowKeys);
//         },
//       },
//       {
//         key: "even",
//         text: "Select Even Row",
//         onSelect: (changeableRowKeys) => {
//           let newSelectedRowKeys = [];
//           newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
//           setSelectedRowKeys(newSelectedRowKeys);
//         },
//       },
//     ],
//   };

//   const KeyData = KeyDataProps(data);

//   const Particular = (
//     index: number,
//     handleChange: any,
//     values: {
//       KeyData: any;
//       discount: any;
//       class_name?: string;
//       wing_name?: string;
//       academic_year?: string;
//       admission_number?: string;
//       fee_code?: string;
//       section_name?: string;
//       collection_date?: string;
//       adm_no_or_fee_code?: string;
//       collected_at?: string;
//       cheque_number?: string;
//       cheque_date?: string;
//       bank_branch?: string;
//       cheque_status?: string;
//       online_transaction_no?: string;
//       draft_number?: string;
//       draft_date?: string;
//       payment_mode?: string[];
//       keyData?: any;
//     },
//     setFieldValue: (field: string, value: any) => void
//   ) => {
//     const rowData = KeyData[index]?.particular || [];

//     return {
//       columns: [
//         { Header: "Particular", accessor: "particular_name" },
//         { Header: "Fee", accessor: "amount" },
//         { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
//         { Header: "Fee", accessor: "balance" },
//         { Header: "Discount", accessor: "discount" },
//         { Header: "Amount Paying", accessor: "amount_paying" },
//         { Header: "Excess Amount", accessor: "excess_amount" },
//       ],
//       rows: rowData?.map(
//         (
//           row: { particular_name: any; previous_paid: any; balance: any; discount: any },
//           rowIndex: string | number
//         ) => ({
//           particular_name: (
//             <MDTypography onChange={handleChange} variant="p">
//               {row.particular_name}
//             </MDTypography>
//           ),
//           previous_paid: (
//             <MDTypography onChange={handleChange} variant="p">
//               {row.previous_paid}
//             </MDTypography>
//           ),
//           balance: (
//             <MDTypography onChange={handleChange} variant="p">
//               {row.balance}
//             </MDTypography>
//           ),
//           discount: (
//             <MDInput
//               name={`KeyData.${index}.particular.${rowIndex}.discount`}
//               value={row.discount || values.KeyData[index]?.particular[0]?.discount}
//               onChange={(e: { target: { value: any } }) =>
//                 setFieldValue(`KeyData.${index}.particular.${rowIndex}.discount`, e.target.value)
//               }
//             />
//           ),
//           amount_paying: (
//             <MDInput
//               name={`KeyData.${index}.particular.${rowIndex}.amount_paying`}
//               value={values.KeyData[index]?.particular[rowIndex]?.amount_paying || ""}
//               onChange={(e: { target: { value: any } }) =>
//                 setFieldValue(
//                   `KeyData.${index}.particular.${rowIndex}.amount_paying`,
//                   e.target.value
//                 )
//               }
//             />
//           ),
//           excess_amount: (
//             <MDTypography variant="p" onChange={handleChange}>
//               {values.KeyData[index]?.particular[rowIndex]?.excess_amount || 0}
//             </MDTypography>
//           ),
//         })
//       ),
//     };
//   };

//   useEffect(() => {
//     console.log("KeyData:", KeyData);
//   }, [KeyData]);

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Card>
//         <Grid container px={3}>
//           <Grid item xs={12} sm={6} mt={2}>
//             <MDTypography variant="h4" fontWeight="bold" color="secondary">
//               Fee Collection
//             </MDTypography>
//           </Grid>
//           <Grid item xs={12} sm={4} py={1} display="flex">
//             <MDButton color="info" variant="contained" type="submit">
//               Submit
//             </MDButton>
//           </Grid>
//         </Grid>
//         <Grid xs={12} sm={12} py={2}>
//           <Table
//             rowSelection={rowSelection}
//             columns={columns}
//             expandable={{
//               expandedRowRender: (KeyData, index: number) => (
//                 <Card>
//                   <Grid container px={3}>
//                     <Grid item xs={12} sm={12} mt={2}>
//                       <MDTypography variant="h6" fontWeight="bold" color="secondary">
//                         Particular
//                       </MDTypography>
//                       <DataTable
//                         table={Particular(
//                           index,
//                           formik.handleChange,
//                           formik.values,
//                           formik.setFieldValue
//                         )}
//                         isSorted={false}
//                         entriesPerPage={false}
//                         showTotalEntries={false}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Card>
//               ),
//               defaultExpandedRowKeys: KeyData.map((item: { key: any }) => item.key),
//             }}
//             dataSource={KeyData}
//             scroll={{ y: "100%" }}
//             bordered
//             expandRowByClick
//           />
//         </Grid>
//       </Card>
//     </form>
//   );
// };

// export default PayFee;
import DataTable from "examples/Tables/DataTable";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import axios from "axios";
import Cookies from "js-cookie";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import StudentCard from "../student_card";
const token = Cookies.get("token");
let today = new Date().toISOString().split("T")[0];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const PayFee = (props: any) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  console.log(props, "props");

  useEffect(() => {
    fetchFeeCollection(props.mainData);
  }, [props.mainData, props.collection_date]);

  let { values, handleChange, handleSubmit, setFieldValue, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        class_name: "",
        wing_name: "All",
        academic_year: "2024-2025",
        admission_number: "",
        fee_code: "",
        section_name: "",
        collection_date: props.collection_date,
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
        KeyData: KeyDataProps(data),
      },

      onSubmit: (values: any, action: { resetForm: () => void }) => {
        console.log(" values", values);
        action.resetForm();
      },
    });

  const fetchFeeCollection = (data: any) => {
    axios
      .post(
        "http://10.0.20.200:8000/fee_collections",
        {
          user_name: data.user_id,
          academic_year: data.academic_year,
          collection_date: props.collection_date,
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
        setOriginalData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");

      const updatedValues = mergeDataWithUpdates(originalData, values.KeyData, selectedRowKeys);
      console.log(updatedValues, "updatedValues values data");
      const response = await axios.post(
        "http://10.0.20.200:8000/fee_collections/pay_fee",
        { ...values, collections: updatedValues, user_name: props?.mainData?.user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);

      if (response.status === 200) {
        console.log(" Created Employee Successfully");
        message.success("Data fetched successfully!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const columns = [
    { title: "Collection Name", dataIndex: "collection_name", key: "collection_name" },
    { title: "Due Date", dataIndex: "due_date", key: "due_date" },
  ];

  function KeyDataProps(data: any) {
    const collections = data.collections || [];
    return collections.map((collection: any, index: any) => {
      return {
        key: index + 1,
        ...collection,
      };
    });
  }
  const mergeDataWithUpdates = (originalData: any, updatedData: any, selectedRowKeys: any) => {
    console.log(originalData, updatedData, "data for merge");

    if (!Array.isArray(originalData.collections)) {
      console.error("Original data is not an array");
      return [];
    }

    return originalData.collections
      .filter((_: any, index: number) => selectedRowKeys.includes(index + 1))
      .map((originalItem: any, filteredIndex: number) => {
        const originalIndex = selectedRowKeys[filteredIndex];
        const updatedItem = updatedData[originalIndex] || {};
        return {
          ...originalItem,
          ...updatedItem,
          particular: (originalItem.particular || []).map((part: any, partIndex: number) => {
            const updatedPart = (updatedItem.particular || [])[partIndex] || {};
            return {
              ...part,
              ...updatedPart,
            };
          }),
        };
      });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const KeyData = KeyDataProps(data);

  const Particular = (
    index: number,
    handleChange: any,
    values: {
      KeyData: any;
      discount: any;
      class_name?: string;
      wing_name?: string;
      academic_year?: string;
      admission_number?: string;
      fee_code?: string;
      section_name?: string;
      collection_date?: string;
      adm_no_or_fee_code?: string;
      collected_at?: string;
      cheque_number?: string;
      cheque_date?: string;
      bank_branch?: string;
      cheque_status?: string;
      online_transaction_no?: string;
      draft_number?: string;
      draft_date?: string;
      payment_mode?: string[];
      keyData?: any;
    },
    setFieldValue: (field: string, value: any) => void
  ) => {
    const rowData = KeyData[index]?.particular || [];
    console.log(rowData, "rowdata particular");
    return {
      columns: [
        { Header: "Particular", accessor: "particular_name" },
        { Header: "Fee", accessor: "amount" },
        { Header: "PAID + DISCOUNT", accessor: "previous_paid" },
        { Header: "Fee", accessor: "balance" },
        { Header: "Discount", accessor: "discount", width: "10%" },
        { Header: "Amount Paying", accessor: "amount_paying", width: "10%" },
        { Header: "Excess Amount", accessor: "excess_amount", width: "10%" },
      ],
      rows: rowData?.map(
        (
          row: {
            particular_name: any;
            previous_paid: any;
            balance: any;
            discount: any;
            amount_paying: any;
            amount: any;
            excess_amount: any;
          },
          rowIndex: string | number
        ) => ({
          particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
          previous_paid: <MDTypography variant="p">{row.previous_paid}</MDTypography>,
          balance: <MDTypography variant="p">{row.balance}</MDTypography>,
          discount: (
            <MDInput
              type="number"
              size="small"
              sx={{ width: "6rem" }}
              name={`KeyData.${index}.particular.${rowIndex}.discount`}
              // value={row.discount || values.KeyData[index]?.particular[0]?.discount}
              onChange={(e: { target: { value: any } }) => {
                const discountValue = e.target.value;
                const balance = row.balance || 0; // Get balance value
                const newAmountPaying = balance - discountValue; // Calculate new amount paying
                const excessAmount = newAmountPaying < 0 ? Math.abs(newAmountPaying) : 0; // Calculate excess amount
                // Update form values
                setFieldValue(`KeyData.${index}.particular.${rowIndex}.discount`, discountValue);
                setFieldValue(
                  `KeyData.${index}.particular.${rowIndex}.amount_paying`,
                  newAmountPaying
                );
                setFieldValue(
                  `KeyData.${index}.particular.${rowIndex}.excess_amount`,
                  excessAmount
                );
              }}
            />
          ),
          amount_paying: (
            <MDInput
              type="number"
              size="small"
              sx={{ width: "6rem" }}
              name={`KeyData.${index}.particular.${rowIndex}.amount_paying`}
              value={values.KeyData[index]?.particular[rowIndex]?.amount_paying || 0}
              onChange={(e: { target: { value: any } }) => {
                const amountPayingValue = e.target.value;
                const balance = row.balance || 0;
                const discount = values.KeyData[index]?.particular[rowIndex]?.discount || 0;
                const excessAmount = amountPayingValue - (balance - discount); // Calculate excess amount
                // Update form values
                setFieldValue(
                  `KeyData.${index}.particular.${rowIndex}.amount_paying`,
                  amountPayingValue
                );
                setFieldValue(
                  `KeyData.${index}.particular.${rowIndex}.excess_amount`,
                  excessAmount > 0 ? excessAmount : 0 // Ensure excess amount is non-negative
                );
              }}
            />
          ),
          excess_amount: (
            <MDInput
              sx={{ width: "6rem" }}
              size="small"
              type="number"
              name={`KeyData.${index}.particular.${rowIndex}.excess_amount`}
              value={values.KeyData[index]?.particular[rowIndex]?.excess_amount || 0}
              disabled // Make the field disabled
              onChange={handleChange} // No need to handle onChange for disabled field
            />
          ),
        })
      ),
    };
  };
  function Discount(
    index: number,
    handleChange: any,
    values: {
      KeyData: any;
      discount: any;
      class_name?: string;
      wing_name?: string;
      academic_year?: string;
      admission_number?: string;
      fee_code?: string;
      section_name?: string;
      collection_date?: string;
      adm_no_or_fee_code?: string;
      collected_at?: string;
      cheque_number?: string;
      cheque_date?: string;
      bank_branch?: string;
      cheque_status?: string;
      online_transaction_no?: string;
      draft_number?: string;
      draft_date?: string;
      payment_mode?: string[];
      keyData?: any;
    },
    setFieldValue: (field: string, value: any) => void
  ) {
    console.log(KeyData[index]?.discounts, "keyData index");
    const rowData = KeyData[index]?.discounts;

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
      rows: rowData?.map((row: any, rowIndex: number) => ({
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
  function LateFee(
    index: number,
    handleChange: any,
    values: {
      applicable_late_fee: boolean;
      KeyData: any;
      discount: any;
      class_name?: string;
      wing_name?: string;
      academic_year?: string;
      admission_number?: string;
      fee_code?: string;
      section_name?: string;
      collection_date?: string;
      adm_no_or_fee_code?: string;
      collected_at?: string;
      cheque_number?: string;
      cheque_date?: string;
      bank_branch?: string;
      cheque_status?: string;
      online_transaction_no?: string;
      draft_number?: string;
      draft_date?: string;
      payment_mode?: string[];
      keyData?: any;
    },
    setFieldValue: (field: string, value: any) => void
  ) {
    // Ensure KeyData[index] and KeyData[index].late_fine are defined
    // if (!KeyData || !KeyData[index] || !KeyData[index].late_fine) {
    //   console.warn(`No late fee data available for index ${index}`);
    //   return {
    //     columns: [],
    //     rows: [],
    //   };
    // }

    const rowData = KeyData[index]?.late_fine || [];
    console.log(rowData, "rowdata");

    return {
      columns: [
        {
          Header: "Applicable",
          accessor: "action",
        },
        { Header: "Particular", accessor: "particular_name" },
        { Header: "Balance", accessor: "balance" },
        { Header: "Discount", accessor: "discontnt" },
        { Header: "Amount Paying", accessor: "amt_paying" },
      ],
      rows: rowData?.map((row: any, rowIndex: number) => {
        // if (!row) {
        //   return {}; // Skip undefined rows
        // }
        return {
          particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
          balance: <MDTypography variant="p">{row.balance}</MDTypography>,
          discontnt:
            row.balance > 0 ? (
              <MDInput
                sx={{ width: "50%" }}
                size="small"
                type="number"
                name={`KeyData.${index}.late_fine.${rowIndex}.discontnt`}
                // value={values.KeyData[index]?.late_fine[rowIndex]?.discontnt || ""}
                onChange={(e: { target: { value: any } }) => {
                  const discontntValue = e.target.value || 0;
                  const balance = row.balance || 0;
                  const newAmountPaying = balance - discontntValue;
                  setFieldValue(`KeyData.${index}.late_fine.${rowIndex}.discontnt`, discontntValue);
                  setFieldValue(
                    `KeyData.${index}.late_fine.${rowIndex}.amt_paying`,
                    newAmountPaying > 0 ? newAmountPaying : 0
                  );
                }}
              />
            ) : (
              <MDTypography variant="p">{row.balance}</MDTypography>
            ),
          amt_paying:
            row.balance > 0 ? (
              <MDInput
                sx={{ width: "50%" }}
                size="small"
                type="number"
                name={`KeyData.${index}.late_fine.${rowIndex}.amt_paying`}
                // value={values.KeyData[index]?.late_fine[rowIndex]?.amt_paying || 0}
                disabled
                onChange={handleChange}
              />
            ) : (
              <MDTypography variant="p">{row.amt_paying}</MDTypography>
            ),
        };
      }),
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container px={3}>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Collection
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container px={3} display="flex" justifyContent={"center"}>
          <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
            <StudentCard data={props.mainData} />
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} py={2}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            expandable={{
              expandedRowRender: (KeyData: any, index: number) => (
                <Card>
                  <Grid container px={3}>
                    <Grid item xs={12} sm={12} mt={2}>
                      <MDTypography variant="body" fontWeight="bold" color="secondary">
                        Particular
                      </MDTypography>
                      <DataTable
                        table={Particular(index, handleChange, values, setFieldValue)}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Grid>
                    {KeyData[index]?.discounts.length > 0 ? (
                      <Grid item xs={12} sm={12} mt={2}>
                        <MDTypography variant="body" fontWeight="bold" color="secondary">
                          Concession
                        </MDTypography>
                        <DataTable
                          table={Discount(index, handleChange, values, setFieldValue)}
                          isSorted={false}
                          entriesPerPage={false}
                          showTotalEntries={false}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={12} sm={12} mt={2}>
                      <MDTypography variant="body" fontWeight="bold" color="secondary">
                        Late Fees
                      </MDTypography>
                      <DataTable
                        table={LateFee(index, handleChange, values, setFieldValue)}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ),
            }}
            dataSource={KeyData}
            // scroll={{ y: "100%" }}
            bordered
          />
        </Grid>

        <Grid container px={3}>
          <Grid item xs={12} sm={4} py={1}>
            <FormControl>
              <MDTypography
                variant="h6"
                fontWeight="bold"
                color="secondary"
                sx={{ marginLeft: "20px" }}
              >
                Payment Mode :
              </MDTypography>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="female"

                name="radio-buttons-group"
              >
                <FormControlLabel
                  //   value="female"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Class")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="By Cash"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Cash{" "}
                    </MDTypography>
                  }
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Addmission No")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="By Cheque"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Cheque
                    </MDTypography>
                  }
                />
                {values.payment_details.payment_mode === "By Cheque" ? (
                  <>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.cheque_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Cheque Number
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.cheque_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.cheque_number && Boolean(errors.cheque_number)}
                        success={values.cheque_number.length && !errors.cheque_number}
                        helperText={touched.cheque_number && errors.cheque_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.cheque_date"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Date
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.cheque_date}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.cheque_date && Boolean(errors.cheque_date)}
                        success={values.cheque_date.length && !errors.cheque_date}
                        helperText={touched.cheque_date && errors.cheque_date}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.bank_branch"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Bankname And Branch
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.bank_branch}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.bank_branch && Boolean(errors.bank_branch)}
                        success={values.bank_branch.length && !errors.bank_branch}
                        helperText={touched.bank_branch && errors.bank_branch}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <Autocomplete
                        sx={{ width: "70%" }}
                        value={values.cheque_status || "Admission Number"}
                        onChange={(event, value) => {
                          handleChange({
                            target: { name: "payment_details.cheque_status", value },
                          });
                        }}
                        options={["Admission Number", "Fee Code"]}
                        renderInput={(params: any) => (
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            name="payment_details.cheque_status"
                            placeholder="2022-23"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Cheque Status
                              </MDTypography>
                            }
                            onChange={handleChange}
                            value={values.cheque_status}
                            {...params}
                            variant="standard"
                            error={touched.cheque_status && Boolean(errors.cheque_status)}
                            helperText={touched.cheque_status && errors.cheque_status}
                          />
                        )}
                      />
                    </Grid>{" "}
                  </>
                ) : null}
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Addmission No")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="Online Payment"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Online Payment
                    </MDTypography>
                  }
                />
                {values.payment_details.payment_mode === "Online Payment" ? (
                  <Grid item xs={12} sm={12} py={1}>
                    <MDInput
                      sx={{ width: "80%" }}
                      name="payment_details.online_transaction_no"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Online Transaction No
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.online_transaction_no}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.online_transaction_no && Boolean(errors.online_transaction_no)}
                      success={values.online_transaction_no.length && !errors.online_transaction_no}
                      helperText={touched.online_transaction_no && errors.online_transaction_no}
                    />
                  </Grid>
                ) : null}
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Addmission No")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="By Draft"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Draft
                    </MDTypography>
                  }
                />{" "}
                {values.payment_details.payment_mode === "By Draft" ? (
                  <>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.draft_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Draft Number
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.draft_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.draft_number && Boolean(errors.draft_number)}
                        success={values.draft_number.length && !errors.draft_number}
                        helperText={touched.draft_number && errors.draft_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.draft_date"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Date
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.draft_date}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.draft_date && Boolean(errors.draft_date)}
                        success={values.draft_date.length && !errors.draft_date}
                        helperText={touched.draft_date && errors.draft_date}
                      />
                    </Grid>{" "}
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Bankname And Branch
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                  </>
                ) : null}
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Addmission No")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="By Pos"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Pos
                    </MDTypography>
                  }
                />
                {values.payment_details.payment_mode === "By Pos" ? (
                  <>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Invoice Number
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Bank Name
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Date Of Transaction
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                  </>
                ) : null}
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      // checked={values.payment_details.payment_mode.includes("Addmission No")}
                      onChange={handleChange}
                      name="payment_details.payment_mode"
                      value="By Neft"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Neft
                    </MDTypography>
                  }
                />
                {values.payment_details.payment_mode === "By Neft" ? (
                  <>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Cheque No/Transaction Id{" "}
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Bank Name
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>{" "}
                    <Grid item xs={12} sm={12} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="payment_details.admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Date Of Transaction
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                  </>
                ) : null}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} py={1}>
            <MDInput
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
              InputLabelProps={{ shrink: true }}
              sx={{ width: "80%" }}
              name="collection_date"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Collection Date{" "}
                </MDTypography>
              }
              onChange={handleChange}
              value={values.collection_date}
              variant="standard"
              onBlur={handleBlur}
              error={touched.collection_date && Boolean(errors.collection_date)}
              success={values.collection_date.length && !errors.collection_date}
              helperText={touched.collection_date && errors.collection_date}
            />
          </Grid>
          <Grid item xs={12} sm={4} py={1}>
            <Autocomplete
              sx={{ width: "70%" }}
              value={values.adm_no_or_fee_code || "School"}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "adm_no_or_fee_code", value },
                });
              }}
              options={["School ", "Online", "Bank Details"]}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="adm_no_or_fee_code"
                  placeholder="2022-23"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Collected At
                    </MDTypography>
                  }
                  onChange={handleChange}
                  value={values.adm_no_or_fee_code}
                  {...params}
                  variant="standard"
                  error={touched.adm_no_or_fee_code && Boolean(errors.adm_no_or_fee_code)}
                  helperText={touched.adm_no_or_fee_code && errors.adm_no_or_fee_code}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} display={"flex"} justifyContent={"end"}>
            <MDButton
              color="info"
              variant="contained"
              type="submit"
              onClick={() => {
                handleFormSubmit();
              }}
            >
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default PayFee;
