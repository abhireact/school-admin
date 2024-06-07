import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import BuildIcon from "@mui/icons-material/Build";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Create from "./create";

import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Autocomplete, Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

const token = Cookies.get("token");
const SectionSubject = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("rbac user", response.data);
        setRbacData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRbac();
  }, [token]);
  //End

  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  function filterDataByAcdName(alldata: any, acd: any) {
    let filterData = alldata.filter((info: any) => info.academic_year == acd);
    let array: any = [];
    let classData = filterData.map((info: any) =>
      info.section_data.map((datainfo: any) =>
        array.push({
          class_name: info.class_name,
          section_name: datainfo.section_name,
          academic_year: info.academic_year,
        })
      )
    );

    setFilteredClass(array);
  }
  const fetchAcdClassSection = () => {
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
        filterDataByAcdName(response.data, values.academic_year);
        console.log(filteredClass, "filter class with academic year");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchAcdClassSection();
  }, []);

  const dataTableData = {
    columns: [
      { Header: "Class & Section ", accessor: "classname", width: "20%" },

      { Header: "Action", accessor: "action", width: "20%" },
    ],

    rows: filteredClass.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleSettings(row);
            }}
          >
            <BuildIcon />
          </IconButton>
        </MDTypography>
      ),

      classname: `${row.class_name} ${row.section_name}`,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const [classSectionData, setClassSectionData] = useState({});
  const handleClose = () => {
    setShowpage(!showpage);
  };
  const handleSettings = (info: any) => {
    setShowpage(!showpage);
    setClassSectionData(info);
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: "2023-2024",
    },

    onSubmit: (values, action) => {
      console.log("submit");
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showpage ? (
        <>
          <Create
            handleClose={handleClose}
            fetchData={fetchAcdClassSection}
            classSectionData={classSectionData}
          />
        </>
      ) : (
        <>
          {" "}
          <form onSubmit={handleSubmit}>
            <Card>
              <MDBox p={4}>
                <Grid
                  container
                  spacing={3}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item xs={12} sm={12} pt={2} pl={2}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Section List
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "100%" }}
                      value={values.academic_year}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "academic_year", value },
                        });
                        console.log("academic year autocomplete is changing", filteredClass);

                        filterDataByAcdName(classdata, value);
                      }}
                      options={academicdata.map((acd) => acd.academic_year)}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="academic_year"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Academic Year
                            </MDTypography>
                          }
                          value={values.academic_year}
                          {...params}
                          variant="standard"
                          // onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.academic_year && Boolean(errors.academic_year)}
                          success={values.academic_year.length && !errors.academic_year}
                          helperText={touched.academic_year && errors.academic_year}
                        />
                      )}
                    />
                  </Grid>
                  <DataTable table={dataTableData} canSearch />
                </Grid>
              </MDBox>
            </Card>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default SectionSubject;
