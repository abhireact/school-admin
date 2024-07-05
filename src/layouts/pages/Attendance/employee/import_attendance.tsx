import { Autocomplete, Card, Grid } from "@mui/material";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import { string } from "yup";
const initialValues = {
  checkIn: "",
  checkOut: "",
  EmployeeID: "",
  dateFormat: "",
};
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";

interface MainData {
  [key: string]: string[] | undefined;
}

const Importattandance = () => {
  const [data, setData] = useState({});
  const [optionsData, setOptionsData] = useState([]);
  const navigate = useNavigate();
  const [mainData, setMainData] = useState<MainData>({});
  const token = Cookies.get("token");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      action.resetForm();
    },
  });

  const handleFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(fileData, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Filter out undefined or empty rows
      const filteredData: string[][] = jsonData.filter(
        (row: string[]) => row && row.length > 0
      ) as string[][];

      if (filteredData.length === 0) {
        return;
      }

      const headers = filteredData[0] as string[];
      const dataKeys = headers?.map((header: string) => header.toLowerCase().replace(/\s+/g, ""));
      const transformedData: MainData = {} as MainData;

      headers?.forEach((header: any, index: number) => {
        transformedData[dataKeys[index]] = (filteredData.slice(1) as string[][]).map(
          (row: string[]) => row[index]
        );
      });
      setMainData(transformedData);
      setData(dataKeys);
    };

    reader.readAsArrayBuffer(file);
  };

  const emplyid: string = values.EmployeeID;
  const checkinTime: string = values.checkIn;
  const checkoutTimes: string = values.checkOut;

  const emailSchema = Yup.string().email("Invalid email address");

  const invalidItems = mainData[emplyid]?.filter((item) => !isValidEmail(item));

  function isValidEmail(email: string) {
    try {
      emailSchema.validateSync(email); // Validate email using Yup schema
      return true; // Email is valid
    } catch (error) {
      return false; // Email is not valid
    }
  }

  if (invalidItems?.length === 0) {
    console.log("mainData", mainData[emplyid]);
  } else {
    console.error("Invalid data: The following items in the array are not valid:", invalidItems);
  }

  const userSelectedDateFormat = values.dateFormat || "dd/mm/yyyy"; // Example date format chosen by the user
  const dateFormatPattern = getDateFormatPattern(userSelectedDateFormat);
  const dateFormatRegex = new RegExp(`^${dateFormatPattern}$`);

  const invalidDates = mainData[checkinTime]?.filter((date) => {
    const datePart = date.split(" ")[0]; // Extracting the date part before the space
    return !isValidDateFormat(datePart);
  });

  const invalidDates2 = mainData[checkoutTimes]?.filter((date) => {
    const datePart = date.split(" ")[0]; // Extracting the date part before the space
    return !isValidDateFormat(datePart);
  });
  function getDateFormatPattern(format: string) {
    return format
      .replace(/mm/g, "(0[1-9]|1[0-2])")
      .replace(/dd/g, "(0[1-9]|1\\d|2\\d|3[01])")
      .replace(/yyyy/g, "\\d{4}");
  }

  function isValidDateFormat(date: string) {
    return dateFormatRegex.test(date);
  }

  if (invalidDates?.length === 0) {
    console.log("mainData[checkinTime]", mainData[checkinTime]);
  } else {
    console.error(
      "Invalid data: The following dates in the array do not match the selected date format:"
    );
    console.log(invalidDates?.length, "hjasddbhasbhdbhdcbhdc");
  }
  if (invalidDates2?.length === 0) {
    console.log("mainData[checkinTime]", mainData[checkoutTimes]);
  } else {
    console.error(
      "Invalid data: The following dates in the array do not match the selected date format:"
    );
    console.log(invalidDates2, "hjasddbhasbhdbhdcbhdc");
  }

  const handleFormSubmit = async () => {
    console.log(values, "formdata");
    try {
      const response = await axios.post(
        `http://10.0.20.200:8000/attendance/excel`,
        {
          email: mainData[emplyid],
          checkIn: mainData[checkinTime],
          checkOut: mainData[checkoutTimes],
          date_format: values.dateFormat,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/pages");
        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  console.log(data, "dataaaaaaaaaaaaa");
  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            {" "}
            <MDInput type="file" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            {values.checkOut && values.checkIn && values.EmployeeID ? (
              <Grid sm={4}>
                {invalidDates2?.length === 0 &&
                invalidDates.length === 0 &&
                invalidItems?.length === 0 ? (
                  <MDButton
                    variant="gradient"
                    // to="/page/template1/create"
                    onClick={handleFormSubmit}
                    color="info"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </MDButton>
                ) : (
                  ""
                )}
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        {/* <MDInput type="file" onChange={handleFileChange} /> */}
        {Object.keys(data).length > 0 ? (
          <Grid container paddingTop={5}>
            <Grid sm={3}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "EmployeeID", value } });
                }}
                // value={EmployeeID}
                // onChange={handleMainFieldChange}
                options={data as readonly string[]}
                renderInput={(params: any) => (
                  <MDInput
                    label={"EmployeeID"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="EmployeeID"
                    placeholder="Enter Your EmployeeID"
                    onChange={handleChange}
                    value={values.EmployeeID}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.EmployeeID && touched.EmployeeID}
                    success={!errors.EmployeeID}
                    variant="standard"
                  />
                )}
              />
              {errors.EmployeeID && touched.EmployeeID ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.EmployeeID}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid sm={3}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "checkIn", value } });
                }}
                // value={checkIn}
                // onChange={handleMainFieldChange}
                options={data as readonly string[]}
                renderInput={(params: any) => (
                  <MDInput
                    label={"checkIn"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="checkIn"
                    placeholder="Enter Your checkIn"
                    onChange={handleChange}
                    value={values.checkIn}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.checkIn && touched.checkIn}
                    success={!errors.checkIn}
                    variant="standard"
                  />
                )}
              />
              {errors.checkIn && touched.checkIn ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.checkIn}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid sm={3}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "checkOut", value } });
                }}
                // value={checkOut}
                // onChange={handleMainFieldChange}
                options={data as readonly string[]}
                renderInput={(params: any) => (
                  <MDInput
                    label={"checkOut"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="checkOut"
                    placeholder="Enter Your checkOut"
                    onChange={handleChange}
                    value={values.checkOut}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.checkOut && touched.checkOut}
                    success={!errors.checkOut}
                    variant="standard"
                  />
                )}
              />
              {errors.checkOut && touched.checkOut ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.checkOut}
                </MDTypography>
              ) : null}
            </Grid>{" "}
            <Grid sm={3}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "dateFormat", value } });
                }}
                defaultValue="dd/mm/yyyy"
                // value={dateFormat}
                // onChange={handleMainFieldChange}
                options={[
                  "mm-dd-yyyy",
                  "dd-mm-yyyy",
                  "dd-mm-yy",
                  "yyyy-mm-dd",
                  "yy-mm-dd",
                  "dd/mm/yyyy",
                  "mm/dd/yyyy",
                  "yyyy/mm/dd",
                  "dd.mm.yyyy",
                ]}
                renderInput={(params: any) => (
                  <MDInput
                    label={"dateFormat"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="dateFormat"
                    placeholder="Enter Your dateFormat"
                    onChange={handleChange}
                    value={values.dateFormat}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.dateFormat && touched.dateFormat}
                    success={!errors.dateFormat}
                    variant="standard"
                  />
                )}
              />
              {errors.dateFormat && touched.dateFormat ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.dateFormat}
                </MDTypography>
              ) : null}
            </Grid>
            {values.EmployeeID ? (
              <Grid sm={12}>
                {invalidItems?.length > 0 ? (
                  <p> Following items are are not valid Gmail Format</p>
                ) : (
                  ""
                )}
                {invalidItems?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Grid>
            ) : (
              ""
            )}
            {values.checkIn ? (
              <Grid sm={12}>
                {invalidDates?.length > 0 ? (
                  <p> Following items are are not valid Date Format</p>
                ) : (
                  ""
                )}
                {invalidDates?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Grid>
            ) : (
              ""
            )}
            {values.checkOut ? (
              <Grid sm={12}>
                {invalidDates2?.length > 0 ? (
                  <p> Following items are are not valid Date Format</p>
                ) : (
                  ""
                )}

                {invalidDates2?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          ""
        )}
      </MDBox>
    </Card>
    // </DashboardLayout>
  );
};

export default Importattandance;
