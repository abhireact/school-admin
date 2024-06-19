import React, { useState, useEffect, useMemo } from "react";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import StudentCard from "../student_card";
import MDButton from "components/MDButton";
import { message } from "antd";
interface RefundData {
  name: string;
  amount: number;
}
const PayFee = (props: any) => {
  console.log(props, "props");

  let { values, handleChange, handleSubmit, setFieldValue, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        class_name: "",
        wing_name: "All",
        academic_year: "2024-2025",
        admission_number: "",
        fee_code: "",
        section_name: "",
        collection_date: props?.collection_date,
        adm_no_or_fee_code: "",
        collected_at: "",
        cheque_number: "",
        cheque_date: "",
        bank_branch: "",
        cheque_status: "",
        online_transaction_no: "",
        draft_number: "",
        draft_date: "",
        refundcheck: false,
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
  const [fineData, setFineData] = useState([]);
  const [refundData, setRefundData] = useState<RefundData | null>(null); // Updated

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [refundcheck, setRefundCheck] = useState(false);

  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/fee_collections",
        {
          user_name: props?.mainData?.user_id,
          academic_year: props?.mainData?.academic_year,
          collection_date: props.collection_date,
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
      setFineData(response.data[0].fine);
      setRefundData(response.data[0].refund);
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
  }, [data, refundcheck]);
  // useEffect(() => {
  //   if (flattenedData && flattenedData.length > 0) {
  //     setSelectedRows(flattenedData.map((_, index) => index)); // Set selectedRows to include all indices
  //   }
  // }, [flattenedData]);
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
        // Check the type and use "late" if the type is "late"
        const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

        // Ensure the path exists before accessing properties
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
        // Check the type and use "late" if the type is "late"
        const typeKey = iteem.type === "late" ? "late_fine" : iteem.type;

        // Ensure the path exists before accessing properties
        if (
          newData[0].collections[parentIndex][typeKey] &&
          newData[0].collections[parentIndex][typeKey][0]
        ) {
          newData[0].collections[parentIndex][typeKey][0].amount_paying = parseInt(value);
          newData[0].collections[parentIndex][typeKey][0].excess_amount = Math.max(
            0,
            parseInt(value) -
              (parseInt(newData[0].collections[parentIndex][typeKey][0].balance) -
                parseInt(newData[0].collections[parentIndex][typeKey][0].discount))
          );
        }
      }

      return newData;
    });
  };
  const handleFormSubmit = async () => {
    try {
      console.log(values, selectedRows, "formdata");
      const typedData = data as { collections: any[] }[];
      const selectedData = selectedRows.map((index) => typedData[0].collections[index]);
      console.log(selectedData, "selected data");

      const response = await axios.post(
        "http://10.0.20.200:8000/fee_collections/pay_fee",
        { ...values, collections: selectedData, user_name: props?.mainData?.user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Created Employee Successfully");
        message.success("Paid successfully!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  console.log(data, refundcheck, "updated data");

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

  const totals = calculateTotals(selectedRows.map((index) => flattenedData[index]));

  const dataTableData = useMemo(
    () => ({
      columns: [
        {
          Header: (
            <Checkbox
              checked={selectAll}
              name="action"
              indeterminate={selectedRows.length > 0 && selectedRows.length < flattenedData.length}
              onChange={handleHeaderCheckboxChange}
            />
          ),
          accessor: "action",
          width: "3%",
        },
        { Header: "Collection Name", accessor: "collection_name" },
        { Header: "Name", accessor: "name", width: "15%" },
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
              name="action2"
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
                  type="number"
                  variant="standard"
                  onChange={(e: any) => handleDiscountChange(e, index, itemIndex, item)}
                  sx={{ width: "50px" }}
                  disabled={item.type === "discount"}
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
                    type="number"
                    variant="standard"
                    sx={{ width: "50px" }}
                    onChange={(e: any) => handleAmountPayingChange(e, index, itemIndex, item)}
                    disabled={item.type === "discount" || item.type === "late"}
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
        ...(fineData && fineData.length > 0
          ? [
              {
                collection_name: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    Fine
                  </MDTypography>
                ),
                name: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    {fineData[0]?.name || ""}
                  </MDTypography>
                ),
                balance: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    {fineData[0]?.amount || 0}{" "}
                  </MDTypography>
                ),
                discount: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    {fineData[0]?.amount || 0}{" "}
                  </MDTypography>
                ),
              },
            ]
          : []),
        ...(refundData && refundData !== null
          ? [
              {
                collection_name: (
                  <Grid display={"flex"} flexDirection={"row"}>
                    {" "}
                    {/* <MDTypography variant="h6" color="secondary" fontWeight="bold">
                      Refund
                    </MDTypography>
                    <Checkbox
                      checked={refundcheck}
                      value={refundcheck}
                      onChange={handleChange}
                      name="refundcheck"
                    /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="refundcheck"
                          onChange={(e) => {
                            setRefundCheck(e.target.checked);
                            setFieldValue("refundcheck", e.target.checked);
                          }}
                        />
                      }
                      label={
                        <MDTypography variant="h6" color="secondary" fontWeight="bold">
                          Refund
                        </MDTypography>
                      }
                      labelPlacement="end"
                    />
                  </Grid>
                ),
                name: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold" width="140px">
                    {refundData?.name || ""}
                  </MDTypography>
                ),
                balance: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    - {refundData?.amount || 0}{" "}
                  </MDTypography>
                ),
                amount_paying: (
                  <MDTypography variant="h6" color="secondary" fontWeight="bold">
                    - {refundData?.amount || 0}{" "}
                  </MDTypography>
                ),
              },
            ]
          : []),
        // THS/2021/988
        {
          collection_name: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              Total
            </MDTypography>
          ),
          name: <MDTypography variant="h6" color="secondary" fontWeight="bold" />,
          amount: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {totals.amount}
            </MDTypography>
          ),
          previous_paid: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {totals.previous_paid}
            </MDTypography>
          ),
          balance: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {refundcheck
                ? (fineData[0]?.amount ? totals.balance + fineData[0]?.amount : totals.balance) -
                    refundData?.amount || 0
                : fineData[0]?.amount
                ? totals.balance + fineData[0]?.amount
                : totals.balance}
            </MDTypography>
          ),
          discount: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {fineData[0]?.amount ? totals.discount + fineData[0]?.amount : totals.discount}
            </MDTypography>
          ),
          amount_paying: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {refundcheck ? totals.amount_paying - refundData?.amount : totals.amount_paying}
            </MDTypography>
          ),
          excess_amount: (
            <MDTypography variant="h6" color="secondary" fontWeight="bold">
              {totals.excess_amount}
            </MDTypography>
          ),
        },
      ],
    }),
    [flattenedData, selectedRows, selectAll]
  );
  console.log(refundData?.name, "refund");

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Grid container px={3} display="flex" justifyContent={"center"}>
          <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
            <StudentCard data={props.mainData} />
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
            <Grid item xs={12} sm={6} py={1}>
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
            <Grid item xs={12} sm={6} py={1}>
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
            </Grid>{" "}
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} py={2}>
          <DataTable
            table={dataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
          />
        </Grid>
        <Grid container px={3}>
          <Grid item xs={12} sm={12} py={1}>
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
                row
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
                  control={
                    <Radio
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
                />{" "}
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
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={12} py={1}>
            {values.payment_details.payment_mode === "By Cheque" ? (
              <>
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
            {values.payment_details.payment_mode === "Online Payment" ? (
              <Grid item xs={12} sm={3} py={1}>
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
            {values.payment_details.payment_mode === "By Draft" ? (
              <>
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
            {values.payment_details.payment_mode === "By Pos" ? (
              <>
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
            {values.payment_details.payment_mode === "By Neft" ? (
              <>
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
                <Grid item xs={12} sm={3} py={1}>
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
          </Grid>
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
      </>
    </form>
  );
};

export default PayFee;
