// import MDBox from "components/MDBox";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import { useFormik } from "formik";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import MDInput from "components/MDInput";
// import { message } from "antd";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Autocomplete from "@mui/material/Autocomplete";
// import Cookies from "js-cookie";
// import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";

// import { useSelector } from "react-redux";
// import {
//   FormControlLabel,
//   FormControl,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   FormLabel,
//   FormGroup,
//   Tooltip,
//   Icon,
// } from "@mui/material";
// import * as Yup from "yup";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// const validationSchema = Yup.object().shape({
//   class_name: Yup.string().required("Required *"),
//   subject_name: Yup.string().required("Required *"),
//   collection_date: Yup.date().required("Required"),

//   academic_year: Yup.string()
//     .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
//     .required("Required *"),
// });
// const FeeCollection = (props: any) => {
//   const token = Cookies.get("token");

//   const { handleShowPage, setData } = props;
//   const [showadvanceSearch, setShowadvanceSearch] = useState(false);
//   const [academicdata, setAcademicdata] = useState([]);
//   const [classdata, setClassdata] = useState([]);
//   const [filteredClass, setFilteredClass] = useState([]);
//   const { wings, academicyear, classes, student } = useSelector((state: any) => state);
//   console.log(wings, academicyear, student, "redux Data");
//   const [concessiondata, setConcessiondata] = useState([]);

//   useEffect(() => {
//     setConcessiondata(student);
//   }, []);
//   //  const {wings,academicyear,classes}=useSelector
//   function filterClassData(data: any, academic_year: any) {
//     let filtereddata = data
//       .filter((item: any) => item.academic_year === academic_year)
//       .map((item: any) => item.class_name);
//     setFilteredClass(filtereddata);
//   }
//   const [sectiondata, setsectiondata] = useState([]);
//   const [filteredSection, setFilteredSection] = useState([]);
//   function filterSectionData(data: any, class_name: any) {
//     let filtereddata = data
//       .filter((item: any) => item.class_name === class_name)
//       .map((item: any) => item.section_name);
//     setFilteredSection(filtereddata);
//   }

//   const [filteredSubject, setFilteredSubject] = useState([]);
//   function filterSubjectData(data: any, class_name: any) {
//     let filtereddata = data
//       .filter((item: any) => item.class_name === class_name)
//       .map((item: any) => item.subject_name);
//     setFilteredSubject(filtereddata);
//   }
//   useEffect(() => {
//     axios
//       .get("http://10.0.20.200:8000/mg_section", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setsectiondata(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });

//     axios
//       .get("http://10.0.20.200:8000/mg_accademic_year", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setAcademicdata(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//     axios
//       .get("http://10.0.20.200:8000/mg_class", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setClassdata(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
//     initialValues: {
//       class_name: "",
//       wing_name: "",
//       academic_year: "2024-25",
//       admission_number: "",
//       fee_code: "",
//       section_name: "",
//       collection_date: "",
//       adm_no_or_fee_code: "",
//       search_by: [] as string[],
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values, action) => {
//       console.log(values, "values");

//       axios
//         .post("http://10.0.20.200:8000/fee_collection", values, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           message.success(" Fetched Data Successfully!");
//           setData(response.data);
//           action.resetForm();
//           handleShowPage();
//         })
//         .catch(() => {
//           message.error("Error on fetching data !");
//         });
//     },
//   });
//   const handleAdvanceSearch = () => {
//     setShowadvanceSearch(true);
//   };
//   console.log(values, "values");

//   const dataTableData = {
//     columns: [
//       { Header: "Student Name", accessor: "full_name" },
//       { Header: "User ID", accessor: "user_id" },
//       { Header: "Admission Number", accessor: "admission_number" },
//       { Header: "Class", accessor: "class_name" },
//       { Header: "Section", accessor: "section_name" },
//       { Header: "FATHER NAME", accessor: "father_name" },
//       { Header: "Action", accessor: "action" },
//     ],

//     rows: student?.map(
//       (
//         row: {
//           father_name: any;
//           admission_number: any;
//           user_id: any;
//           first_name: any;
//           middle_name: null;
//           last_name: any;
//           class_name: any;
//           gender: any;
//           section_name: any;
//           mobile_number: any;
//         },
//         index: any
//       ) => ({
//         admission_number: row.admission_number,
//         user_id: row.user_id,

//         // action: (
//         //   <MDTypography variant="p">
//         //     {rbacData ? (
//         //       rbacData?.find((element: string) => element === "studentdetailsupdate") ? (
//         //         <IconButton
//         //           onClick={() => {
//         //             handleOpenupdate(index);
//         //           }}
//         //         >
//         //           <CreateRoundedIcon />
//         //         </IconButton>
//         //       ) : (
//         //         ""
//         //       )
//         //     ) : (
//         //       ""
//         //     )}

//         //     <IconButton
//         //       onClick={() => {
//         //         handleDelete(row.user_id);
//         //       }}
//         //     >
//         //       <DeleteIcon />
//         //     </IconButton>
//         //   </MDTypography>
//         // ),

//         full_name: `${row.first_name} ${row.middle_name == null ? "" : row.middle_name} ${
//           row.last_name
//         }`,
//         class_name: row.class_name,
//         section_name: row.section_name,
//         father_name: row.father_name,
//       })
//     ),
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <form onSubmit={handleSubmit}>
//         <Card>
//           {" "}
//           <MDBox p={4}>
//             <Grid container>
//               <Grid item xs={12} sm={6}>
//                 <MDTypography variant="h5" fontWeight="bold" color="secondary">
//                   Fee Collection
//                 </MDTypography>
//               </Grid>
//             </Grid>
//             <Grid container>
//               <Grid item xs={12} sm={4} py={1}>
//                 <Autocomplete
//                   onChange={(_event, value) => {
//                     handleChange({ target: { name: "academic_year", value } });
//                   }}
//                   options={
//                     classes
//                       ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
//                       : []
//                   }
//                   renderInput={(params) => (
//                     <MDInput
//                       required
//                       defaultValue="2024-2025"
//                       name="academic_year"
//                       onChange={handleChange}
//                       value={values.academic_year}
//                       label={
//                         <MDTypography variant="button" fontWeight="bold" color="secondary">
//                           Academic Year
//                         </MDTypography>
//                       }
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4} py={1}>
//                 <MDInput
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   sx={{ width: "80%" }}
//                   name="collection_date"
//                   label={
//                     <MDTypography variant="button" fontWeight="bold" color="secondary">
//                       Collection Date{" "}
//                     </MDTypography>
//                   }
//                   onChange={handleChange}
//                   value={values.collection_date}
//                   variant="standard"
//                   onBlur={handleBlur}
//                   error={touched.collection_date && Boolean(errors.collection_date)}
//                   success={values.collection_date.length && !errors.collection_date}
//                   helperText={touched.collection_date && errors.collection_date}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4} py={1} display="flex" justifyContent="flex-end">
//                 <MDButton color="info" variant="contained" type="submit">
//                   Submit
//                 </MDButton>
//               </Grid>
//               <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
//                 {showadvanceSearch ? (
//                   <MDButton
//                     color="info"
//                     variant="text"
//                     type="submit"
//                     onClick={() => setShowadvanceSearch(false)}
//                   >
//                     Normal Search
//                   </MDButton>
//                 ) : (
//                   <MDButton color="info" variant="text" type="submit" onClick={handleAdvanceSearch}>
//                     Advance Search
//                   </MDButton>
//                 )}
//               </Grid>
//               {showadvanceSearch ? (
//                 <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
//                   <FormControl>
//                     <MDTypography
//                       variant="h6"
//                       fontWeight="bold"
//                       color="secondary"
//                       sx={{ marginLeft: "20px" }}
//                     >
//                       Search By:
//                     </MDTypography>

//                     <RadioGroup
//                       aria-labelledby="demo-radio-buttons-group-label"
//                       // defaultValue="female"
//                       row
//                       name="radio-buttons-group"
//                     >
//                       <FormControlLabel
//                         //   value="female"
//                         control={
//                           <Radio
//                             // checked={values.search_by.includes("Class")}
//                             onChange={handleChange}
//                             name="search_by"
//                             value="Class"
//                           />
//                         }
//                         label={
//                           <MDTypography variant="button" fontWeight="bold" color="secondary">
//                             Class{" "}
//                           </MDTypography>
//                         }
//                       />
//                       <FormControlLabel
//                         // value="male"
//                         control={
//                           <Radio
//                             // checked={values.search_by.includes("Addmission No")}
//                             onChange={handleChange}
//                             name="search_by"
//                             value="Addmission No"
//                           />
//                         }
//                         label={
//                           <MDTypography variant="button" fontWeight="bold" color="secondary">
//                             Addmission No{" "}
//                           </MDTypography>
//                         }
//                       />
//                     </RadioGroup>
//                   </FormControl>
//                 </Grid>
//               ) : null}

//               {showadvanceSearch && values.search_by && values.search_by[0] === "C" ? (
//                 // Render the first set of components
//                 <>
//                   {" "}
//                   <Grid item xs={12} sm={4} py={1}>
//                     <Autocomplete
//                       onChange={(_event, value) => {
//                         handleChange({ target: { name: "class_name", value } });
//                       }}
//                       options={
//                         values.academic_year !== ""
//                           ? classes
//                               .filter((item: any) => item.academic_year === values.academic_year)
//                               .map((item: any) => item.class_name)
//                           : []
//                       }
//                       renderInput={(params) => (
//                         <MDInput
//                           required
//                           name="class_name"
//                           onChange={handleChange}
//                           value={values.class_name}
//                           label={
//                             <MDTypography variant="button" fontWeight="bold" color="secondary">
//                               Class
//                             </MDTypography>
//                           }
//                           {...params}
//                           variant="standard"
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4} py={1}>
//                     <Autocomplete
//                       onChange={(_event, value) => {
//                         handleChange({ target: { name: "section_name", value } });
//                       }}
//                       options={
//                         values.class_name !== ""
//                           ? classes
//                               .filter(
//                                 (item: any) =>
//                                   item.academic_year === values.academic_year &&
//                                   item.class_name === values.class_name
//                               )[0]
//                               .section_data.map((item: any) => item.section_name)
//                           : []
//                       }
//                       renderInput={(params) => (
//                         <MDInput
//                           required
//                           name="section_name"
//                           onChange={handleChange}
//                           value={values.section_name}
//                           label={
//                             <MDTypography variant="button" fontWeight="bold" color="secondary">
//                               Section
//                             </MDTypography>
//                           }
//                           {...params}
//                           variant="standard"
//                         />
//                       )}
//                     />
//                   </Grid>
//                 </>
//               ) : showadvanceSearch && values.search_by && values.search_by[0] === "A" ? (
//                 // Render the second set of components
//                 <>
//                   {" "}
//                   <Grid item xs={12} sm={4} py={1}>
//                     <Autocomplete
//                       sx={{ width: "70%" }}
//                       value={values.wing_name}
//                       onChange={(event, value) => {
//                         handleChange({
//                           target: { name: "wing_name", value },
//                         });
//                         // filterClassData(classdata, value);
//                       }}
//                       options={wings?.map((acd: { wing_name: any }) => acd?.wing_name)}
//                       renderInput={(params: any) => (
//                         <MDInput
//                           InputLabelProps={{ shrink: true }}
//                           name="wing_name"
//                           placeholder="2022-23"
//                           label={
//                             <MDTypography variant="button" fontWeight="bold" color="secondary">
//                               Wing Name{" "}
//                             </MDTypography>
//                           }
//                           onChange={handleChange}
//                           value={values.wing_name}
//                           {...params}
//                           variant="standard"
//                           error={touched.wing_name && Boolean(errors.wing_name)}
//                           helperText={touched.wing_name && errors.wing_name}
//                         />
//                       )}
//                     />
//                   </Grid>{" "}
//                   <Grid item xs={12} sm={4} py={1}>
//                     <Autocomplete
//                       sx={{ width: "70%" }}
//                       value={values.adm_no_or_fee_code}
//                       onChange={(event, value) => {
//                         handleChange({
//                           target: { name: "adm_no_or_fee_code", value },
//                         });
//                         filterClassData(classdata, value);
//                       }}
//                       options={["Admission Number", "Fee Code"]}
//                       renderInput={(params: any) => (
//                         <MDInput
//                           InputLabelProps={{ shrink: true }}
//                           name="adm_no_or_fee_code"
//                           placeholder="2022-23"
//                           label={
//                             <MDTypography variant="button" fontWeight="bold" color="secondary">
//                               Admission Number/Fee Code
//                             </MDTypography>
//                           }
//                           onChange={handleChange}
//                           value={values.adm_no_or_fee_code}
//                           {...params}
//                           variant="standard"
//                           error={touched.adm_no_or_fee_code && Boolean(errors.adm_no_or_fee_code)}
//                           helperText={touched.adm_no_or_fee_code && errors.adm_no_or_fee_code}
//                         />
//                       )}
//                     />
//                   </Grid>{" "}
//                   {values.adm_no_or_fee_code == "Fee Code" ? (
//                     <Grid item xs={12} sm={4} py={1}>
//                       <MDInput
//                         sx={{ width: "80%" }}
//                         name="fee_code"
//                         label={
//                           <MDTypography variant="button" fontWeight="bold" color="secondary">
//                             Fee Code
//                           </MDTypography>
//                         }
//                         onChange={handleChange}
//                         value={values.fee_code}
//                         variant="standard"
//                         onBlur={handleBlur}
//                         error={touched.fee_code && Boolean(errors.fee_code)}
//                         success={values.fee_code.length && !errors.fee_code}
//                         helperText={touched.fee_code && errors.fee_code}
//                       />
//                     </Grid>
//                   ) : (
//                     <Grid item xs={12} sm={4} py={1}>
//                       <MDInput
//                         sx={{ width: "80%" }}
//                         name="admission_number"
//                         label={
//                           <MDTypography variant="button" fontWeight="bold" color="secondary">
//                             Admission Number
//                           </MDTypography>
//                         }
//                         onChange={handleChange}
//                         value={values.admission_number}
//                         variant="standard"
//                         onBlur={handleBlur}
//                         error={touched.admission_number && Boolean(errors.admission_number)}
//                         success={values.admission_number.length && !errors.admission_number}
//                         helperText={touched.admission_number && errors.admission_number}
//                       />
//                     </Grid>
//                   )}
//                 </>
//               ) : null}
//               <Grid item xs={12} sm={12}>
//                 {concessiondata ? (
//                   <Card>
//                     <DataTable
//                       table={dataTableData}
//                       isSorted={false}
//                       entriesPerPage={false}
//                       showTotalEntries={false}
//                     />
//                   </Card>
//                 ) : null}
//               </Grid>
//             </Grid>
//           </MDBox>
//         </Card>
//       </form>
//     </DashboardLayout>
//   );
// };

// export default FeeCollection;

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
import Cookies from "js-cookie";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";

import { useSelector } from "react-redux";
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  FormLabel,
  FormGroup,
  Tooltip,
  Icon,
} from "@mui/material";
import * as Yup from "yup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  subject_name: Yup.string().required("Required *"),
  collection_date: Yup.date().required("Required"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});
const FeeCollection = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, setData } = props;
  const [showadvanceSearch, setShowadvanceSearch] = useState(false);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  const { wings, academicyear, classes, student } = useSelector((state: any) => state);
  console.log(wings, academicyear, student, "redux Data");
  const [concessiondata, setConcessiondata] = useState([]);

  useEffect(() => {
    setConcessiondata(student);
  }, []);
  //  const {wings,academicyear,classes}=useSelector
  function filterClassData(data: any, academic_year: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === academic_year)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }

  const [filteredSubject, setFilteredSubject] = useState([]);
  function filterSubjectData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.subject_name);
    setFilteredSubject(filtereddata);
  }
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_section", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsectiondata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://10.0.20.200:8000/mg_accademic_year", {
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
      .get("http://10.0.20.200:8000/mg_class", {
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

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",
      wing_name: "",
      academic_year: "2024-25",
      admission_number: "",
      fee_code: "",
      section_name: "",
      collection_date: "",
      adm_no_or_fee_code: "",
      search_by: [] as string[],
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values, "values");

      axios
        .post("http://10.0.20.200:8000/fee_collection", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(" Fetched Data Successfully!");
          setData(response.data);
          action.resetForm();
          handleShowPage();
        })
        .catch(() => {
          message.error("Error on fetching data !");
        });
    },
  });
  const handleAdvanceSearch = () => {
    setShowadvanceSearch(true);
  };
  console.log(values, "values");

  const dataTableData = {
    columns: [
      { Header: "Student Name", accessor: "full_name" },
      { Header: "User ID", accessor: "user_id" },
      { Header: "Admission Number", accessor: "admission_number" },
      { Header: "Class", accessor: "class_name" },
      { Header: "Section", accessor: "section_name" },
      { Header: "FATHER NAME", accessor: "father_name" },
      { Header: "Action", accessor: "action" },
    ],

    rows: student?.map(
      (
        row: {
          father_name: any;
          admission_number: any;
          user_id: any;
          first_name: any;
          middle_name: null;
          last_name: any;
          class_name: any;
          gender: any;
          section_name: any;
          mobile_number: any;
        },
        index: any
      ) => ({
        admission_number: row.admission_number,
        user_id: row.user_id,

        // action: (
        //   <MDTypography variant="p">
        //     {rbacData ? (
        //       rbacData?.find((element: string) => element === "studentdetailsupdate") ? (
        //         <IconButton
        //           onClick={() => {
        //             handleOpenupdate(index);
        //           }}
        //         >
        //           <CreateRoundedIcon />
        //         </IconButton>
        //       ) : (
        //         ""
        //       )
        //     ) : (
        //       ""
        //     )}

        //     <IconButton
        //       onClick={() => {
        //         handleDelete(row.user_id);
        //       }}
        //     >
        //       <DeleteIcon />
        //     </IconButton>
        //   </MDTypography>
        // ),

        full_name: `${row.first_name} ${row.middle_name == null ? "" : row.middle_name} ${
          row.last_name
        }`,
        class_name: row.class_name,
        section_name: row.section_name,
        father_name: row.father_name,
      })
    ),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        {" "}
        <MDBox p={4}>
          {/* <Grid container>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h5" fontWeight="bold" color="secondary">
                  Fee Collection
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "academic_year", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      defaultValue="2024-2025"
                      name="academic_year"
                      onChange={handleChange}
                      value={values.academic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <MDInput
                  type="date"
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
              <Grid item xs={12} sm={4} py={1} display="flex" justifyContent="flex-end">
                <MDButton color="info" variant="contained" type="submit">
                  Submit
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
                {showadvanceSearch ? (
                  <MDButton
                    color="info"
                    variant="text"
                    type="submit"
                    onClick={() => setShowadvanceSearch(false)}
                  >
                    Normal Search
                  </MDButton>
                ) : (
                  <MDButton color="info" variant="text" type="submit" onClick={handleAdvanceSearch}>
                    Advance Search
                  </MDButton>
                )}
              </Grid>
<<<<<<< HEAD
              <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel value="disabled" disabled control={<Radio />} label="other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.class_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "class_name", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={academicdata.map((acd) => acd.class_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="class_name"
                      placeholder="2022-23"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Class{" "}
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.class_name}
                      {...params}
                      variant="standard"
                      error={touched.class_name && Boolean(errors.class_name)}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.section_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "section_name", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={academicdata.map((acd) => acd.section_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="section_name"
                      placeholder="2022-23"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section{" "}
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.section_name}
                      {...params}
                      variant="standard"
                      error={touched.section_name && Boolean(errors.section_name)}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.class_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "class_name", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={academicdata.map((acd) => acd.class_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="class_name"
                      placeholder="2022-23"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Wing Name{" "}
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.class_name}
                      {...params}
                      variant="standard"
                      error={touched.class_name && Boolean(errors.class_name)}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.class_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "class_name", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={academicdata.map((acd) => acd.class_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="class_name"
                      placeholder="2022-23"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Admission Number/Fee Code
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.class_name}
                      {...params}
                      variant="standard"
                      error={touched.class_name && Boolean(errors.class_name)}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={4} py={1}>
                <MDInput
                  sx={{ width: "80%" }}
                  name="admission_number"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Admission Number
=======
              {showadvanceSearch ? (
                <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
                  <FormControl>
                    <MDTypography
                      variant="h6"
                      fontWeight="bold"
                      color="secondary"
                      sx={{ marginLeft: "20px" }}
                    >
                      Search By:
>>>>>>> main
                    </MDTypography>

                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="female"
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        //   value="female"
                        control={
                          <Radio
                            // checked={values.search_by.includes("Class")}
                            onChange={handleChange}
                            name="search_by"
                            value="Class"
                          />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Class{" "}
                          </MDTypography>
                        }
                      />
                      <FormControlLabel
                        // value="male"
                        control={
                          <Radio
                            // checked={values.search_by.includes("Addmission No")}
                            onChange={handleChange}
                            name="search_by"
                            value="Addmission No"
                          />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Addmission No{" "}
                          </MDTypography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              ) : null}

              {showadvanceSearch && values.search_by && values.search_by[0] === "C" ? (
                // Render the first set of components
                <>
                  {" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "class_name", value } });
                      }}
                      options={
                        values.academic_year !== ""
                          ? classes
                              .filter((item: any) => item.academic_year === values.academic_year)
                              .map((item: any) => item.class_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="class_name"
                          onChange={handleChange}
                          value={values.class_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Class
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section_name", value } });
                      }}
                      options={
                        values.class_name !== ""
                          ? classes
                              .filter(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.class_name
                              )[0]
                              .section_data.map((item: any) => item.section_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="section_name"
                          onChange={handleChange}
                          value={values.section_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Section
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : showadvanceSearch && values.search_by && values.search_by[0] === "A" ? (
                // Render the second set of components
                <>
                  {" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      sx={{ width: "70%" }}
                      value={values.wing_name}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "wing_name", value },
                        });
                        // filterClassData(classdata, value);
                      }}
                      options={wings?.map((acd: { wing_name: any }) => acd?.wing_name)}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="wing_name"
                          placeholder="2022-23"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Wing Name{" "}
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.wing_name}
                          {...params}
                          variant="standard"
                          error={touched.wing_name && Boolean(errors.wing_name)}
                          helperText={touched.wing_name && errors.wing_name}
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      sx={{ width: "70%" }}
                      value={values.adm_no_or_fee_code}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "adm_no_or_fee_code", value },
                        });
                        filterClassData(classdata, value);
                      }}
                      options={["Admission Number", "Fee Code"]}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="adm_no_or_fee_code"
                          placeholder="2022-23"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Admission Number/Fee Code
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
                  {values.adm_no_or_fee_code == "Fee Code" ? (
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="fee_code"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Fee Code
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.fee_code}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.fee_code && Boolean(errors.fee_code)}
                        success={values.fee_code.length && !errors.fee_code}
                        helperText={touched.fee_code && errors.fee_code}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        sx={{ width: "80%" }}
                        name="admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Admission Number
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
                  )}
                </>
              ) : null}
              <Grid item xs={12} sm={12}>
                {student ? (
                  <Card>
                    <DataTable
                      table={dataTableData}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                    />
                  </Card>
                ) : null}
              </Grid>
            </Grid> */}
          <Grid item xs={12} sm={12}>
            {student ? (
              <Card>
                <DataTable
                  table={dataTableData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </Card>
            ) : null}
          </Grid>
        </MDBox>
      </form>
    </DashboardLayout>
  );
};

export default FeeCollection;
