// import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import React, { useState, useEffect } from "react";

// const ExpandableTable = () => {
//   const [expand, setExpand] = useState(false);
//   const [innerData, setInnerData] = useState([]);

//   useEffect(() => {
//     if (expand) {
//       // Fetch inner table data from API
//       fetch("your_api_endpoint")
//         .then((response) => response.json())
//         .then((data) => {
//           // Update state with fetched data
//           setInnerData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching inner table data:", error);
//         });
//     }
//   }, [expand]);

//   const handleExpand = () => {
//     setExpand((prevExpand) => !prevExpand);
//   };

//   return (
//     <Paper>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>One</TableCell>
//             <TableCell>Two</TableCell>
//             <TableCell>Three</TableCell>
//             <TableCell>Expand</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell>1</TableCell>
//             <TableCell>2</TableCell>
//             <TableCell>3</TableCell>
//             <TableCell>
//               <IconButton onClick={handleExpand}>+{/* <SvgMore /> */}</IconButton>
//             </TableCell>
//           </TableRow>
//           {expand && (
//             <TableRow>
//               <TableCell colSpan={4}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>One</TableCell>
//                       <TableCell>Two</TableCell>
//                       <TableCell>Three</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {innerData.map((rowData, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{rowData.one}</TableCell>
//                         <TableCell>{rowData.two}</TableCell>
//                         <TableCell>{rowData.three}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// export default ExpandableTable;
