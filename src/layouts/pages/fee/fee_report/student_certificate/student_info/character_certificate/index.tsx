import { usePDF } from "react-to-pdf";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

const CharacterCertificate = (props: any) => {
  const { toPDF, targetRef } = usePDF({ filename: "character_certificate.pdf" });
  return (
    <MDBox p={4}>
      <Grid container ref={targetRef} style={{ border: "1px solid #ffff" }}>
        <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography style={{ textDecoration: "underline" }} variant="h5">
            CHARACTER CERTIFICATE
          </MDTypography>
        </Grid>
        <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography>
            {" "}
            This is to certify that Master. ADVIK YADAV S /o/ MAHENDRA SINGH YADAV and MEENU YADAV
            is/was a bonifide student of class KG-II - A in the session 2023-2024 . As far as I know
            he bears good moral character and during his stay, has not violated the rules and
            regulations of this institution. I wish him all success in his future
          </MDTypography>
        </Grid>

        <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography>Date: {getCurrentDate()}</MDTypography>
          <MDTypography>Principal</MDTypography>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <MDButton color="info" onClick={() => toPDF()}>
          Download as PDF
        </MDButton>
      </Grid>
    </MDBox>
  );
};
export default CharacterCertificate;
