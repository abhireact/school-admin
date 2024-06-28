import React, { forwardRef, LegacyRef } from "react";
import HeaderPdf from "./HeaderPdf";
import "./PdfGenerator.css";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";

interface ExtraDataConfig {
  type: "normal" | "table";
  data: Record<string, any>;
}

interface PdfGeneratorProps {
  data: Array<Record<string, any>> | string;
  hiddenText: string;
  isPdfMode: boolean;
  additionalInfo: any;
  extraData?: {
    leftData: ExtraDataConfig;
    rightData: ExtraDataConfig;
  };
  emptycolumns?: number;
  profilepdf?: boolean;
  handleProfilepdf?: () => void;
}

const formatKey = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const PdfGenerator = forwardRef<HTMLDivElement, PdfGeneratorProps>(
  ({ data, hiddenText, isPdfMode, additionalInfo, extraData, emptycolumns = 0 }, ref) => {
    const renderCellContent = (value: any) => {
      if (typeof value === "object" && value !== null) {
        return (
          <ul className="report-cell-list">
            {Object?.entries(value)?.map(([key, val]) => (
              <li key={key}>{` ${val}`}</li>
            ))}
          </ul>
        );
      }
      return String(value);
    };

    const renderAdditionalInfo = () => (
      <div className="report-additional-info">
        {Object.entries(additionalInfo).map(([key, value]) => (
          <p key={key}>
            <strong>{formatKey(key)}:</strong> {String(value)}
          </p>
        ))}
      </div>
    );

    const renderExtraDataContent = (config: ExtraDataConfig) => {
      if (config.type === "normal") {
        return (
          <div>
            {Object.entries(config?.data).map(([key, value]) => (
              <p key={key}>
                <strong>{formatKey(key)}:</strong> {String(value)}
              </p>
            ))}
          </div>
        );
      } else if (config?.type === "table") {
        return (
          <table className="report-extra-data-table">
            <tbody>
              {Object.entries(config.data).map(([key, value]) => (
                <tr key={key}>
                  <td>{formatKey(key)}</td>
                  <td>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    };

    const renderExtraData = () => (
      <div className="report-extra-data">
        <div className="report-left-data">
          {extraData?.leftData && renderExtraDataContent(extraData?.leftData)}
        </div>
        <div className="report-right-data">
          {extraData?.rightData && renderExtraDataContent(extraData?.rightData)}
        </div>
      </div>
    );

    return (
      <div ref={ref as LegacyRef<HTMLDivElement>} className="report-pdf-container">
        {isPdfMode && <HeaderPdf isPdfMode={true} />}
        {additionalInfo && renderAdditionalInfo()}
        {Array.isArray(data) && data.length > 0 ? (
          <table className="report-pdf-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>
                    <MDTypography
                      color="secondary"
                      variant="button"
                      fontWeight="bold"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatKey(key).toUpperCase()}
                    </MDTypography>
                  </th>
                ))}
                {[...Array(emptycolumns)].map((_, index) => (
                  <th key={`empty-header-${index}`}></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>
                      <MDTypography color="secondary" variant="caption" fontWeight="bold">
                        {renderCellContent(value)}
                      </MDTypography>
                    </td>
                  ))}
                  {[...Array(emptycolumns)].map((_, index) => (
                    <td key={`empty-${index}`}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{typeof data === "string" ? data : "No Data Available"}</p>
        )}
        {extraData && renderExtraData()}
        <div
          style={{ justifyContent: "center", textAlign: "center" }}
          className="report-hidden-text"
        >
          {hiddenText}
        </div>
      </div>
    );
  }
);

export default PdfGenerator;
