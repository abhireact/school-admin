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
import Update from "./upate";
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
const token = Cookies.get("token");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const ManageSchedule = (props: any) => {
  const { handleClose, manageData } = props;
  const monthFeeKey = categoryKey(manageData);
  const monthFeeValues = categoryValue(manageData);
  const [data, setData] = useState([]);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);

  function filterSectionData(data: any, class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }

  console.log(filteredSection, "section name");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: "",
        class_name: "",
        section_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/search`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log("may 20", response.data);
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  const [editData, setEditData] = useState(null);
  const [updatepage, setUpdatepage] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setEditData(main_data);
    setUpdatepage(true);
  };

  return (
    <>
      {updatepage ? (
        <Update editData={editData} handleClose={setUpdatepage} />
      ) : (
        <>
          <MDBox p={4}>
            <table
              style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f0f2f5" }}
            >
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      border: "1px solid #f0f2f5",
                    }}
                  >
                    {monthFeeKey}: {monthFeeValues}
                  </td>

                  <td></td>
                  <td></td>
                </tr>
              </thead>
            </table>
          </MDBox>
          <Grid p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
