import React, { useState } from "react";
import MDButton from "components/MDButton"; // Assuming MDButton is a typed component
import * as XLSX from "xlsx";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
const token = Cookies.get("token");

interface ExportExcelProps {
  exceldata: Record<string, unknown>; // Assuming data is an array of objects
  fileName: string;
}

const ExportExcel: React.FC<ExportExcelProps> = ({ exceldata, fileName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/student_report/export_student_data`,
        exceldata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsExporting(true);

        const worksheet = XLSX.utils.json_to_sheet(response.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, `${fileName}.xlsx`, { bookType: "xlsx", type: "binary" });

        setIsExporting(false);
        console.log("export excel data", response.data);
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };

  return (
    <MDButton
      variant="contained"
      
      color="info"
      type="submit"
     onClick={handleExport} 
    >
      {isExporting ? "Exporting..." : "Export to Excel"}
    </MDButton>
  );
};

export default ExportExcel;
