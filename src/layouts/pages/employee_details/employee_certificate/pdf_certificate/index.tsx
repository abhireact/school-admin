import { forwardRef, LegacyRef } from "react";
import MDTypography from "components/MDTypography";
import { Box, Grid } from "@mui/material";

interface CertificatePDFProps {
  field1: String;
}

const CertificatePDF = forwardRef<HTMLDivElement, CertificatePDFProps>(({ field1 = "" }, ref) => {
  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="report-pdf-container">
      <Grid my={10}>
        <MDTypography
          style={{ fontStyle: "italic", textDecoration: "underline" }}
          variant="h5"
          align="center"
          color="dark"
          gutterBottom
        >
          TO WHOMSOEVER IT MAY CONCERN
        </MDTypography>
        <MDTypography
          style={{ fontStyle: "italic" }}
          fontWeight="bold"
          variant="subtitle2"
          gutterBottom
        >
          This is to certify that Miss. ANAMIKA SINGH D/o Aman has worked as a teacher role at our
          School from 01/04/2022 to 01/07/2024.
        </MDTypography>
        <MDTypography
          style={{ fontStyle: "italic" }}
          fontWeight="bold"
          variant="subtitle2"
          gutterBottom
        >
          We found her responsible, enthusiastic and hardworking during her work tenure. She can
          prove to be an asset for any organization. We wish her success in her future endeavors.
        </MDTypography>
        <MDTypography
          style={{ fontStyle: "italic" }}
          fontWeight="bold"
          variant="subtitle2"
          gutterBottom
        >
          This experience certificate is being issued at the request of Miss. ANAMIKA SINGH
        </MDTypography>
        <Box display="flex" justifyContent="space-between" marginTop="40px">
          <MDTypography style={{ fontStyle: "italic" }} fontWeight="bold" variant="subtitle2">
            Date : 11/07/2024
          </MDTypography>
          <MDTypography
            style={{ fontStyle: "italic" }}
            fontWeight="bold"
            variant="subtitle2"
            align="right"
          >
            Principal
          </MDTypography>
        </Box>
      </Grid>
    </div>
  );
});

export default CertificatePDF;
