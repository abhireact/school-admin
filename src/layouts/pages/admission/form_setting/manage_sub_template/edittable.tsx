import { Checkbox, Autocomplete, TextField } from "@mui/material";
import React from "react";
import MDInput from "components/MDInput";

interface EditableCellProps {
  value: any;
  onChange: (newValue: any) => void;
  type?: string;
  options?: string[];
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange, type, options }) => {
  if (type === "checkbox") {
    return <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />;
  }

  if (type === "autocomplete" && options) {
    return (
      <Autocomplete
        options={options}
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => <MDInput {...params} variant="outlined" size="small" />}
        disableClearable
      />
    );
  }

  return (
    <MDInput
      sx={{ width: "80px" }}
      variant="outlined"
      size="small"
      value={value}
      onChange={(e: { target: { value: any } }) => onChange(e.target.value)}
    />
  );
};

export default EditableCell;
