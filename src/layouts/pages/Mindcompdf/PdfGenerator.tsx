import React, { forwardRef, LegacyRef } from "react";
import HeaderPdf from "./HeaderPdf";
import "./PdfGenerator.css";

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
}

const formatKey = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const PdfGenerator = forwardRef<HTMLDivElement, PdfGeneratorProps>(
  ({ data, hiddenText, isPdfMode, additionalInfo, extraData }, ref) => {
    const renderCellContent = (value: any) => {
      if (typeof value === "object" && value !== null) {
        return (
          <ul className="cell-list">
            {Object?.entries(value)?.map(([key, val]) => (
              <li key={key}>{` ${val}`}</li>
            ))}
          </ul>
        );
      }
      return String(value);
    };

    const renderAdditionalInfo = () => (
      <div className="additional-info">
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
          <table className="extra-data-table">
            {/* <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead> */}
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
      <div className="extra-data">
        <div className="left-data">
          {extraData?.leftData && renderExtraDataContent(extraData?.leftData)}
        </div>
        <div className="right-data">
          {extraData?.rightData && renderExtraDataContent(extraData?.rightData)}
        </div>
      </div>
    );

    return (
      <div ref={ref as LegacyRef<HTMLDivElement>} className="pdf-container">
        {isPdfMode && <HeaderPdf isPdfMode={true} />}
        {additionalInfo && renderAdditionalInfo()}
        {Array.isArray(data) && data.length > 0 ? (
          <table className="pdf-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{formatKey(key)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>{renderCellContent(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{typeof data === "string" ? data : "No data available"}</p>
        )}
        {extraData && renderExtraData()}
        <hr
          style={{
            width: "100%",
            borderBottom: "1px solid #e4e4e4",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <div style={{ justifyContent: "center", textAlign: "center" }} className="hidden-text">
          {hiddenText}
        </div>
      </div>
    );
  }
);

export default PdfGenerator;
