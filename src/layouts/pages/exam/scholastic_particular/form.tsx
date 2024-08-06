import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Tree, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import type { TreeDataNode, TreeProps } from "antd";
import { useNavigate } from "react-router";
interface SectionData {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface Class {
  wing_name: string;
  class_name: string;
  section_data: SectionData[];
}

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
const Create = (props: any) => {
  const token = Cookies.get("token");
  const academic_year = Cookies.get("academic_year");
  const navigate = useNavigate();
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [result, setResult] = useState([]);
  const { handleShowPage, fetchingData } = props;
  const [academicdata, setAcademicdata] = useState([]);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: props.editData
      ? props.editData
      : {
          name: "",
          best_of_count: "",
          calculation: "",
          academic_year: academic_year,
          description: "",
          weightage: "",
          index: "",
        },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values, checkedKeys, "valuessss");
      // axios
      //   .post("http://10.0.20.200:8000/schol_particular", values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then(() => {
      //     message.success(" Created successfully!");
      //     fetchingData();
      //     action.resetForm();
      //     handleShowPage();
      //   })
      //   .catch(() => {
      //     message.error("Error on creating  !");
      //   });
    },
  });
  useEffect(() => {
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    filteredClassData.forEach(({ wing_name, class_name, section_data }: Class, index: number) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: `wing-${wing_name}`,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `wing-${wing_name},class-${class_name}`,
          children: [],
        });
      }
      const classItem = wing.children?.find((child) => child.title === class_name);
      section_data.forEach((section: any) => {
        if (classItem && classItem.children) {
          classItem.children.push({
            title: `section ${section.section_name}`,
            key: `class:${class_name},section:${section.section_name}`,
          });
        }
      });
    });

    setResult(result);
  }, [values.academic_year]);
  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };
  const treeData: TreeDataNode[] = result;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} px={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {props.editData ? "Edit Scholastic Particulars" : "Create Scholastic Particulars"}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disabled
                    sx={{ width: "100%" }}
                    value={values.academic_year}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "academic_year", value },
                      });
                    }}
                    options={academicdata.map((acd) => acd.academic_year)}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="academic_year"
                        placeholder="2022-23"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.academic_year}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Particular Name
                      </MDTypography>
                    }
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.calculation}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "calculation", value },
                      });
                    }}
                    options={["Summation", "Average", "Best Of"]}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="calculation"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Calculation
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.calculation}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="number"
                    variant="standard"
                    name="best_of_count"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Best of count{" "}
                      </MDTypography>
                    }
                    value={values.best_of_count}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="number"
                    variant="standard"
                    name="weightage"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Weightage
                      </MDTypography>
                    }
                    value={values.weightage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    type="number"
                    variant="standard"
                    name="index"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Index No.
                      </MDTypography>
                    }
                    value={values.index}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="outlined"
                    name="description"
                    multiline
                    rows={4}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Description
                      </MDTypography>
                    }
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Select Class-Section
              </MDTypography>
              <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
            </Grid>
          </Grid>
          <Grid container spacing={1} pt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => (props.editData ? props.onSuccess() : navigate(-1))}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
