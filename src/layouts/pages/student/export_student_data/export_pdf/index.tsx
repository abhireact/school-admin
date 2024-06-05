// import { useState, useRef, useEffect } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { saveAs } from "file-saver";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
// import dataTableData from "layouts/applications/data-tables/data/dataTableData";
// import MDButton from "components/MDButton";
// import MDBox from "components/MDBox";
// import Card from "@mui/material/Card";
// import DataTable from "examples/Tables/DataTable";
// import axios from "axios";
// import Cookies from "js-cookie";
// const token = Cookies.get("token");

// function App() {
//   const [loader, setLoader] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("A4");
//   const [customWidth, setCustomWidth] = useState(210);
//   const [customHeight, setCustomHeight] = useState(297);
//   const captureRef = useRef<HTMLDivElement>(null);

//   const [images, setImages] = useState({
//     school_name: "",
//     school_code: "",
//     start_time: "",
//     end_time: "",
//     affilicated_to: "",
//     reg_num: "",
//     mg_leave_calendar_start_date: "",
//     address_line1: "",
//     address_line2: "",
//     street: "",
//     landmark: "",
//     city: "",
//     state: "",
//     pin_code: "",
//     country: "",
//     mobile_number: "",
//     fax_number: "000000000000",
//     email_id: "",
//     timezone: "IST",
//     currency_type: "INR",

//     school_logo: null,
//   });

//   const fetchImages = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setImages(data);
//       } else {
//         console.error("Failed to fetch images from API");
//       }
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const downloadPDF = () => {
//     setLoader(true);
//     const captureElement = captureRef.current;

//     const ensureImagesLoaded = (element: HTMLDivElement) => {
//       const imgElements = element.querySelectorAll("img");
//       const promises: any[] = [];
//       imgElements.forEach((img) => {
//         if (!img.complete) {
//           promises.push(
//             new Promise((resolve, reject) => {
//               img.onload = resolve;
//               img.onerror = reject;
//             })
//           );
//         }
//       });
//       return Promise.all(promises);
//     };

//     ensureImagesLoaded(captureElement)
//       .then(() => {
//         return html2canvas(captureElement, { scale: 2, useCORS: true });
//       })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/jpeg", 0.7);
//         const doc = new jsPDF({
//           unit: "mm",
//           format: selectedSize === "A3" ? "a3" : [customWidth, customHeight],
//         });
//         const width = doc.internal.pageSize.getWidth();
//         const height = (canvas.height * width) / canvas.width;
//         doc.addImage(imgData, "JPEG", 0, 0, width, height);
//         setLoader(false);
//         const compressedPdf = doc.output("blob");
//         saveAs(compressedPdf, "pdf-editor.pdf");
//       })
//       .catch((error) => {
//         console.error("Error capturing the canvas:", error);
//         setLoader(false);
//       });
//   };

//   return (
//     <>
//       <MDButton
//         type="button"
//         className="receipt-modal-download-button btn btn-outline-primary"
//         onClick={downloadPDF}
//       >
//         {loader ? "Downloading" : "Download"}
//       </MDButton>

//       <Card sx={{ width: 794, height: 1123 }}>
//         <MDBox className="container">
//           <MDBox className="receipt-box" ref={captureRef}>
//             <div className="actual-receipt image-container">
//               <span style={{ display: "flex" }}>
//                 <img
//                   src={images?.school_logo}
//                   alt={`Image`}
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                   }}
//                   crossOrigin="anonymous"
//                 />
//               </span>

//               <hr
//                 style={{
//                   width: "100%",
//                   borderBottom: "1px solid #e4e4e4",
//                   marginTop: "20px",
//                   marginBottom: "20px",
//                 }}
//               />
//             </div>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </>
//   );
// }

// export default App;
