import React, { forwardRef, LegacyRef } from "react";
import HeaderPdf from "./HeaderPdf"; // Adjust the import path accordingly
import "./PdfGenerator.css";

interface PdfGeneratorProps {
  data: Array<Record<string, any>> | string;
  hiddenText: string;
  isPdfMode: boolean;
}

const PdfGenerator = forwardRef<HTMLDivElement, PdfGeneratorProps>(
  ({ data, hiddenText, isPdfMode }, ref) => {
    return (
      <div ref={ref as LegacyRef<HTMLDivElement>} className="hidden-text">
        {isPdfMode && <HeaderPdf isPdfMode={true} />}
        {Array.isArray(data) && data.length > 0 ? (
          <table border={1}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{typeof data === "string" ? data : "No data available"}</p>
        )}
        <div className="hidden-text">{hiddenText}</div>
      </div>
    );
  }
);

export default PdfGenerator;
