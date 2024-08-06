import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Tree } from "antd";
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
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const academic_year = Cookies.get("academic_year");
  const [checked, setChecked] = useState([]);
  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const { handleShowPage, fetchingData } = props;
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  const [result, setResult] = useState([]);
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  function filterClassData(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }

  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_section", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsectiondata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://10.0.20.200:8000/mg_accademic_year", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://10.0.20.200:8000/mg_class", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",
      section_name: "",
      exam_type: "",
      academic_year: academic_year,
      description: "",
      index: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(selectedKeys, "selected keys");
      console.log(checkedKeys, "checkedKeys keys");

      // axios
      //   .post("http://10.0.20.200:8000/exam_type", values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then(() => {
      //     message.success(" Created successfully!");
      //     fetchingData();
      //     handleShowPage();
      //     action.resetForm();
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

  const treeData: TreeDataNode[] = result;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid>
          <Card sx={{ width: "80%", margin: "auto" }}>
            {" "}
            <MDBox p={2}>
              <Grid container px={2}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Create Exam Type
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        sx={{ width: "100%" }}
                        variant="standard"
                        name="exam_type"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Exam Type Name
                          </MDTypography>
                        }
                        value={values.exam_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        sx={{ width: "100%" }}
                        type="number"
                        variant="standard"
                        name="index"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Index
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
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                  <Grid item>
                    <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
                      Back
                    </MDButton>
                  </Grid>
                  <Grid item ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Save
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default Create;
