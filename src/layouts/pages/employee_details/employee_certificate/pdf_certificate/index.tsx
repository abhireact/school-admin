import { forwardRef, LegacyRef } from "react";
import MDTypography from "components/MDTypography";
import { Box, Grid } from "@mui/material";

interface CertificatePDFProps {
  values: {
    department: string;
    employee: string;
    title: string;
    employee_name: string;
    guardian_title: string;
    guardian_name: string;
    subjects: string;
    designation: string;
    joining_date: string;
    last_working_date: string;
    title_sub: string;
    title_sub1: string;
    title_sub2: string;
  };
}

const CertificatePDF = forwardRef<HTMLDivElement, CertificatePDFProps>(({ values }, ref) => {
  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="report-pdf-container">
      <Grid my={10} container>
        <Grid item container display="flex" justifyContent="center">
          <MDTypography
            style={{ fontStyle: "italic", textDecoration: "underline" }}
            variant="h5"
            color="dark"
            gutterBottom
          >
            TO WHOMSOEVER IT MAY CONCERN
          </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography
            style={{ fontStyle: "italic" }}
            fontWeight="bold"
            variant="subtitle2"
            gutterBottom
          >
            <Box display="flex" flexWrap="wrap" alignItems="baseline">
              This is to certify that {values.title} {values.employee_name} {values.guardian_title}{" "}
              {values.guardian_name} has worked as a {values.subjects} {values.designation} at our
              School from {values.joining_date} to {values.last_working_date}.
            </Box>
          </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography
            style={{ fontStyle: "italic" }}
            fontWeight="bold"
            variant="subtitle2"
            gutterBottom
          >
            We found {values.title_sub} {values.title_sub2} {values.title_sub1} can prove to be an
            asset for any organization. We wish {values.title_sub} {values.title_sub2} future
            endeavors.
          </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography
            style={{ fontStyle: "italic" }}
            fontWeight="bold"
            variant="subtitle2"
            gutterBottom
          >
            This experience certificate is being issued at the request of {values.title}{" "}
            {values.employee_name}
          </MDTypography>
        </Grid>
        <Grid container display="flex" justifyContent="space-between" marginTop="40px">
          <Grid item>
            <MDTypography style={{ fontStyle: "italic" }} fontWeight="bold" variant="subtitle2">
              Date :
              {new Date()
                .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                .replace(/\//g, "/")}
            </MDTypography>
          </Grid>
          <Grid item>
            <MDTypography
              style={{ fontStyle: "italic" }}
              fontWeight="bold"
              variant="subtitle2"
              align="right"
            >
              Principal
            </MDTypography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default CertificatePDF;
