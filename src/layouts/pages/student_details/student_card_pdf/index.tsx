import { forwardRef, LegacyRef } from "react";

import StudentCard from "./studentCardTemplate";
import Grid from "@mui/material/Grid";

interface PdfGeneratorProps {
  data: Array<Record<string, any>> | string;
}

const PdfGenerator = forwardRef<HTMLDivElement, PdfGeneratorProps>(({ data }, ref) => {
  const renderProfilePage = (item: Record<string, any>, index: number) => (
    <div key={index} className="profile-page">
      <Grid my={2}>
        <StudentCard data={item} />
      </Grid>
    </div>
  );

  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="report-pdf-container">
      {Array.isArray(data) && data.map((item, index) => renderProfilePage(item, index))}
    </div>
  );
});

export default PdfGenerator;
