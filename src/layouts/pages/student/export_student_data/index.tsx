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
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import ExportExcel from "layouts/pages/student/export_student_data/export_excel";
// import * as Yup from "yup";

// import Cookies from "js-cookie";
// import { Document, Page, Image, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { pdf } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//   },
//   schoolLogo: {
//     width: "50%",
//     alignSelf: "flex-end",
//   },
//   content: {
//     marginTop: 20,
//     fontSize: 14,
//   },
// });
// const token = Cookies.get("token");

// const validationSchema = Yup.object().shape({
//   academic_year: Yup.string().required("Required *"),
//   class_name: Yup.string().required("Required *"),
//   section_name: Yup.string().required("Required *"),
// });

// const CollectionList = () => {
//   const [data, setData] = useState([]);
//   const [academicdata, setAcademicdata] = useState([]);
//   const [classdata, setClassdata] = useState([]);
//   const [filteredClass, setFilteredClass] = useState([]);

//   function filterDataByAcdName(data: any, acdName: any) {
//     let filtereddata = data
//       .filter((item: any) => item.academic_year === acdName)
//       .map((item: any) => item.class_name);
//     setFilteredClass(filtereddata);
//   }
//   const [sectiondata, setsectiondata] = useState([]);
//   const [filteredSection, setFilteredSection] = useState([]);

//   function filterSectionData(data: any, class_name: any) {
//     console.log(classdata, "class data");
//     let filtereddata = classdata
//       .filter(
//         (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
//       )
//       .map((item: any) => item.section_data);

//     console.log(filtereddata, "filter section Data");
//     setFilteredSection(filtereddata);
//   }

//   console.log(filteredSection, "section name");

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
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
//       .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
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
//   const [schoolData, setSchoolData] = useState({});
//   const fetchSchoolInfo = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setSchoolData(response.data);
//         console.log(response.data, "school information");
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };
//   useEffect(() => {
//     fetchSchoolInfo();
//   }, []);
//   const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
//     useFormik({
//       initialValues: {
//         academic_year: "",
//         class_name: "",
//         section_name: "",
//       },
//       validationSchema: validationSchema,
//       onSubmit: (values, action) => {},
//     });

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <form onSubmit={handleSubmit}>
//           <MDBox p={4}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "100%" }}
//                   disableClearable
//                   value={values.academic_year}
//                   onChange={(event, value) => {
//                     handleChange({
//                       target: { name: "academic_year", value },
//                     });
//                     filterDataByAcdName(classdata, value);
//                   }}
//                   options={academicdata.map((acd) => acd.academic_year)}
//                   renderInput={(params: any) => (
//                     <MDInput
//                       InputLabelProps={{ shrink: true }}
//                       name="academic_year"
//                       placeholder="eg. 2022-2023"
//                       label={
//                         <MDTypography variant="button" fontWeight="bold" color="secondary">
//                           Academic Year
//                         </MDTypography>
//                       }
//                       onChange={handleChange}
//                       value={values.academic_year}
//                       {...params}
//                       variant="standard"
//                       onBlur={handleBlur}
//                       error={touched.academic_year && Boolean(errors.academic_year)}
//                       success={values.academic_year.length && !errors.academic_year}
//                       helperText={touched.academic_year && errors.academic_year}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "100%" }}
//                   disableClearable
//                   value={values.class_name}
//                   onChange={
//                     filteredClass.length >= 1
//                       ? (event, value) => {
//                           handleChange({
//                             target: { name: "class_name", value },
//                           });
//                           filterSectionData(sectiondata, value);
//                         }
//                       : undefined
//                   }
//                   options={filteredClass}
//                   renderInput={(params: any) => (
//                     <MDInput
//                       InputLabelProps={{ shrink: true }}
//                       name="class_name"
//                       label={
//                         <MDTypography variant="button" fontWeight="bold" color="secondary">
//                           Class Name
//                         </MDTypography>
//                       }
//                       onChange={handleChange}
//                       value={values.class_name}
//                       {...params}
//                       variant="standard"
//                       error={touched.class_name && Boolean(errors.class_name)}
//                       success={values.class_name.length && !errors.class_name}
//                       helperText={touched.class_name && errors.class_name}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "100%" }}
//                   disableClearable
//                   value={values.section_name}
//                   onChange={
//                     filteredSection.length >= 1
//                       ? (event, value) => {
//                           handleChange({
//                             target: { name: "section_name", value },
//                           });
//                         }
//                       : undefined
//                   }
//                   options={
//                     filteredSection[0]
//                       ? filteredSection[0].map((sectiondata: any) => sectiondata.section_name)
//                       : []
//                   }
//                   renderInput={(params: any) => (
//                     <MDInput
//                       InputLabelProps={{ shrink: true }}
//                       name="section_name"
//                       label={
//                         <MDTypography variant="button" fontWeight="bold" color="secondary">
//                           Section Name
//                         </MDTypography>
//                       }
//                       onChange={handleChange}
//                       value={values.section_name}
//                       {...params}
//                       variant="standard"
//                       error={touched.section_name && Boolean(errors.section_name)}
//                       success={values.section_name.length && !errors.section_name}
//                       helperText={touched.section_name && errors.section_name}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid
//                 item
//                 container
//                 xs={12}
//                 sm={12}
//                 sx={{ display: "flex", justifyContent: "flex-end" }}
//                 mr={2}
//               >
//                 <Grid item mt={2} mr={2}></Grid>
//                 <Grid item mt={2}>
//                   <ExportExcel exceldata={values} fileName={"student_data_report"} />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </MDBox>
//         </form>
//       </Card>
//     </DashboardLayout>
//   );
// };
// export default CollectionList;
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

function App() {
  const [loader, setLoader] = useState(false);
  const [selectedSize, setSelectedSize] = useState("A4");
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);
  const captureRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState({
    school_name: "",
    school_code: "",
    start_time: "",
    end_time: "",
    affilicated_to: "",
    reg_num: "",
    mg_leave_calendar_start_date: "",
    address_line1: "",
    address_line2: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    mobile_number: "",
    fax_number: "000000000000",
    email_id: "",
    timezone: "IST",
    currency_type: "INR",

    school_logo: null,
  });

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error("Failed to fetch images from API");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const downloadPDF = () => {
    setLoader(true);
    const captureElement = captureRef.current;

    const ensureImagesLoaded = (element: HTMLDivElement) => {
      const imgElements = element.querySelectorAll("img");
      const promises: any[] = [];
      imgElements.forEach((img) => {
        if (!img.complete) {
          promises.push(
            new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            })
          );
        }
      });
      return Promise.all(promises);
    };

    ensureImagesLoaded(captureElement)
      .then(() => {
        return html2canvas(captureElement, { scale: 2, useCORS: true });
      })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.7);
        const doc = new jsPDF({
          unit: "mm",
          format: selectedSize === "A3" ? "a3" : [customWidth, customHeight],
        });
        const width = doc.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        doc.addImage(imgData, "JPEG", 0, 0, width, height);
        setLoader(false);
        const compressedPdf = doc.output("blob");
        saveAs(compressedPdf, "pdf-editor.pdf");
      })
      .catch((error) => {
        console.error("Error capturing the canvas:", error);
        setLoader(false);
      });
  };

  return (
    <MDBox>
      <MDBox style={{ display: "flex", paddingBottom: "10px" }}>
        <MDBox style={{ paddingLeft: "20px" }}>
          <MDButton
            type="button"
            className="receipt-modal-download-button btn btn-outline-primary"
            onClick={downloadPDF}
            disabled={loader}
          >
            {loader ? "Downloading" : "Download"}
          </MDButton>
        </MDBox>
      </MDBox>

      <Card sx={{ width: 794, height: 1123 }}>
        <MDBox className="container">
          <MDBox className="receipt-box" ref={captureRef}>
            <div className="actual-receipt image-container">
              <span style={{ display: "flex" }}>
                <img
                  src={images?.school_logo}
                  alt={`Image`}
                  style={{
                    width: "120px",
                    height: "120px",
                  }}
                  crossOrigin="anonymous"
                />
              </span>

              <hr
                style={{
                  width: "100%",
                  borderBottom: "1px solid #e4e4e4",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
            </div>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default App;
