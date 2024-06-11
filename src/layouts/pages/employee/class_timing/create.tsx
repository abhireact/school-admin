import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Typography, Box, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";
import { TimePicker } from "antd";
import MDBox from "components/MDBox";

import { useSelector } from "react-redux";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
interface Class {
  wing_name: string;
  class_name: string;
}
const initialValues = {
  academic_year: "",
  start_time: TimePicker,
  end_time: TimePicker,
  class_number: 0,
  weekdays: [] as string[],
  is_break: false,
};
export default function ClassTimingCreate() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [result, setResult] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const class_check = checkedKeys
        .filter((key) => key.toString().includes("class:"))
        .map((item) => {
          const [classKey, sectionKey] = item.toString().split(",");
          const classValue = classKey.split(":")[1];
          return classValue;
        });
      const submit_value = {
        academic_year: values.academic_year,
        class_name: class_check,
        weekdays: selectedDays,
        class_time_name: values.class_number,
        start_time: values.start_time,
        end_time: values.end_time,
        is_break: values.is_break,
      };
      console.log(submit_value, "llllkkk");
    },
  });

  const handleDayToggle = (day: any) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const isChecked = (day: any) => selectedDays.includes(day);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => {
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    filteredClassData.forEach(({ wing_name, class_name }: Class, index: number) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: wing_name,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `class:${class_name}`,
        });
      }
    });

    setResult(result);
  }, [values.academic_year]);
  const treeData: TreeDataNode[] = result;
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox px={3}>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={6} mt={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Class Timing
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={3}>
                <MDInput
                  required
                  type="time"
                  sx={{ width: "100%" }}
                  name="start_time"
                  onChange={handleChange}
                  value={values.start_time}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Start Time
                    </MDTypography>
                  }
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDInput
                  required
                  type="time"
                  sx={{ width: "100%" }}
                  name="end_time"
                  onChange={handleChange}
                  value={values.end_time}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      End Time
                    </MDTypography>
                  }
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDInput
                  required
                  type="number"
                  min="1"
                  max="10"
                  sx={{ width: "100%" }}
                  name="class_number"
                  onChange={handleChange}
                  value={values.class_number}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class Number
                    </MDTypography>
                  }
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Checkbox
                  checked={values.is_break}
                  name="is_break"
                  value="true"
                  onChange={handleChange}
                />
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Is Breake
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={8} pb={2}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    options={
                      classes
                        ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Select Week Days
                </MDTypography>
                <Box display="flex" className="weekDays-selector">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <Box
                      key={index}
                      onClick={() => handleDayToggle(index)}
                      sx={{
                        bgcolor: isChecked(index) ? "#2AD705" : "#dddddd",
                        color: isChecked(index) ? "#ffffff" : "#000000",
                        borderRadius: "6px",
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                        lineHeight: "40px",
                        cursor: "pointer",
                        marginRight: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="dark">
                        {day}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} style={{ maxHeight: "250px", overflowY: "auto" }}>
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Select Class & sections
                </MDTypography>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} pb={2}>
              <Grid item>
                <MDButton color="dark" variant="contained">
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
