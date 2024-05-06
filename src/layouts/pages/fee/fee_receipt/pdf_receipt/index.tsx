import { usePDF } from "react-to-pdf";
import MDButton from "components/MDButton";

const PDFComponent = () => {
  const { toPDF, targetRef } = usePDF({ filename: "fee_receipt.pdf" });

  return (
    <div>
      <div ref={targetRef}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <thead style={{ backgroundColor: "#fbc403", color: "#363636" }}>
            <tr>
              <th
                colSpan={4}
                style={{
                  backgroundColor: "#363636",
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Fee Receipt
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Personel NO:</th>
              <td>0123456</td>
              <th>Name</th>
              <td>Chandra</td>
            </tr>
            {/* Additional rows */}
          </tbody>
        </table>

        <br />

        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <thead style={{ backgroundColor: "#fbc403", color: "#363636" }}>
            <tr>
              <th>Earnings</th>
              <th>Amount</th>
              <th>Deductions</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic</td>
              <td>29000</td>
              <td>provident fund</td>
              <td>1900</td>
            </tr>
            {/* Additional rows */}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={{ fontWeight: "bold" }}>
                Gross Earnings
              </td>
              <td colSpan={2} style={{ fontWeight: "bold" }}>
                Gross Deductions
              </td>
            </tr>
            <tr>
              <td colSpan={2}>Rs.38500</td>
              <td colSpan={2}>Rs.3000</td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>
                NET PAY: Rs.35500
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <MDButton color="info" onClick={() => toPDF()}>
        Download as PDF
      </MDButton>
    </div>
  );
};

export default PDFComponent;
