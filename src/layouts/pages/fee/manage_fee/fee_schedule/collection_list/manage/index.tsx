import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import AddIcon from "@mui/icons-material/Add";
import Update from "./update";
import { table } from "console";
function categoryKey(data: any) {
  const categoryKeys = Object.keys(data[0].category); // Get all keys of the 'category' object

  const monthFeeKey = categoryKeys[0]; // Get the first key of 'category' object

  return monthFeeKey;
}
function categoryValue(data: any) {
  const categoryKeys = Object.keys(data[0].category); // Get all keys of the 'category' object

  const monthFeeKey = categoryKeys[0]; // Get the first key of 'category' object
  const monthFeeValues = Object.keys(data[0].category[monthFeeKey]); // Get all keys of the 'Month Fee' object

  return monthFeeValues;
}
function getMonthFee(data: any) {
  const fees: number[] = [];

  data.forEach((item: { category: { [x: string]: { [x: string]: any } } }) => {
    if (item.category) {
      for (const categoryKey in item.category) {
        if (item.category[categoryKey]) {
          for (const feeKey in item.category[categoryKey]) {
            const fee = item.category[categoryKey][feeKey];
            if (typeof fee === "number") {
              fees.push(fee);
            }
          }
        }
      }
    }
  });

  return fees;
}
const token = Cookies.get("token");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const ManageSchedule = (props: any) => {
  const { handleClose, manageData, sendData } = props;
  const monthFeeKey = categoryKey(manageData);
  const monthFeeValues = categoryValue(manageData);
  const [feesArray, setFeesArray] = useState(getMonthFee(manageData));

  const [editData, setEditData] = useState(null);
  const [updatepage, setUpdatepage] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = sendData;
    const UpdateData = {
      name: main_data.name,
      particular_id: main_data.particular_id,
      academic_year: main_data.academic_year,
      class_name: main_data.class_name,
      section_name: main_data.section_name,
      user_name: manageData[index].user_name,
      amount: feesArray[index],
    };
    console.log(UpdateData, "update data info");
    setEditData(UpdateData);
    setUpdatepage(true);
  };
  const handleGenerateSchedule = async (index: number) => {
    const main_data = sendData;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/schedule_student`,
        {
          name: main_data.name,
          particular_id: main_data.particular_id,
          academic_year: main_data.academic_year,
          class_name: main_data.class_name,
          section_name: main_data.section_name,
          user_name: manageData[index].user_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
        message.success("Generated SuccessFully");
        // Filter out the deleted user from the data
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };

  const handleDelete = async (index: number) => {
    const main_data = sendData;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/students`,
        {
          data: {
            name: main_data.name,
            particular_id: main_data.particular_id,
            academic_year: main_data.academic_year,
            class_name: main_data.class_name,
            section_name: main_data.section_name,
            user_name: manageData[index].user_name,
            amount: feesArray[index],
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  console.log(feesArray, "fee amount");
  return (
    <>
      {updatepage ? (
        <Update editData={editData} handleClose={setUpdatepage} />
      ) : (
        <>
          <MDBox p={4}>
            <MDTypography variant="h4" color="secondary" fontWeight="bold">
              {sendData.name} &nbsp;For&nbsp;
              {sendData.class_name} - {sendData.section_name}
            </MDTypography>
            <table
              style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f0f2f5" }}
            >
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      paddingLeft: "5px",
                      border: "1px solid #f0f2f5",
                    }}
                  >
                    Admisson Number
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      paddingLeft: "5px",
                      border: "1px solid #f0f2f5",
                    }}
                  >
                    Name
                  </td>

                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      border: "1px solid #f0f2f5",
                      paddingLeft: "5px",
                    }}
                  >
                    {monthFeeKey}
                    <br />
                    <MDTypography variant="button">{monthFeeValues}</MDTypography>
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      border: "1px solid #f0f2f5",
                      paddingLeft: "5px",
                    }}
                  >
                    Discount
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      border: "1px solid #f0f2f5",
                      paddingLeft: "5px",
                    }}
                  >
                    Status
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      border: "1px solid #f0f2f5",
                      paddingLeft: "5px",
                    }}
                  >
                    Action
                  </td>
                </tr>
              </thead>

              <tbody>
                {manageData.map((tableData: any, index: any) => (
                  <tr key={index}>
                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {tableData.admission_no}
                    </td>
                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {tableData.first_name} {tableData.middle_name} {tableData.last_name}
                    </td>

                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {feesArray[index]}
                    </td>

                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {tableData.discount}
                    </td>

                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {" "}
                      {tableData.status}
                    </td>
                    <td
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        border: "1px solid #f0f2f5",
                        paddingLeft: "5px",
                      }}
                    >
                      {" "}
                      <>
                        {tableData.status === "UnScheduled" ? (
                          <Tooltip title="Generate Schedule" placement="top">
                            <IconButton
                              onClick={() => {
                                handleGenerateSchedule(index);
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <>
                            {" "}
                            <Tooltip title=" Edit " placement="top">
                              {tableData.update ? (
                                <IconButton
                                  onClick={() => {
                                    handleOpenupdate(index);
                                  }}
                                >
                                  <CreateRoundedIcon />
                                </IconButton>
                              ) : (
                                <IconButton disabled>
                                  <CreateRoundedIcon />
                                </IconButton>
                              )}
                            </Tooltip>
                            <Tooltip title=" Delete " placement="top">
                              {tableData.delete ? (
                                <IconButton
                                  onClick={() => {
                                    handleDelete(index);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                <IconButton disabled>
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </Tooltip>
                          </>
                        )}
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MDBox>
          <Grid mx={5} mb={2} sx={{ display: "flex" }}>
            <MDButton
              variant="contained"
              color="dark"
              onClick={() => {
                handleClose();
              }}
            >
              Back
            </MDButton>
          </Grid>
        </>
      )}
    </>
  );
};
export default ManageSchedule;
