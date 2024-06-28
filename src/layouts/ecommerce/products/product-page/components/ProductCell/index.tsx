import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Declaring props types for ProductCell
interface Props {
  image: string;
  name: string;
  borderColor?: string; // Optional prop for border color
}

function ProductCell({ image, name, borderColor }: Props): JSX.Element {
  return (
    <MDBox display="flex" alignItems="center" pr={2}>
      <MDAvatar
        src={image}
        alt={name}
        style={{
          border: `5px solid ${borderColor || "green"}`,
          borderRadius: "50%",
        }}
        size="xl"
      />
    </MDBox>
  );
}

export default ProductCell;
