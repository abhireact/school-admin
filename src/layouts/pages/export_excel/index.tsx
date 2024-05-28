import React, { useState } from "react";
import MDButton from "components/MDButton"; // Assuming MDButton is a typed component
import * as XLSX from "xlsx";

interface ExportExcelProps {
  data: Record<string, unknown>[]; // Assuming data is an array of objects
  fileName: string;
}

const ExportExcel: React.FC<ExportExcelProps> = ({ data, fileName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleClick = () => {
    setIsExporting(true);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${fileName}.xlsx`, { bookType: "xlsx", type: "binary" });

    setIsExporting(false);
  };

  return (
    <MDButton variant="contained" disabled={isExporting} onClick={handleClick}>
      {isExporting ? "Exporting..." : "Export to Excel"}
    </MDButton>
  );
};

export default ExportExcel;
