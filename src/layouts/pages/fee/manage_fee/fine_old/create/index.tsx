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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  fine_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),

  index: Yup.number().required("Required *"),
});
const treeData: TreeDataNode[] = [
  {
    title: "wings",
    key: "wings",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "class",
    key: "class",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "section",
    key: "section",
  },
];
const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;

  const [academicdata, setAcademicdata] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["wings"]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["class"]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccountData(response.data);

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
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: "",

      fine_name: "",
      description: "",
      amount: "",
      account_name: "",
      fine_from: "",
      start_date: "",
      end_date: "",
      due_date: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/sub_subjects", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          action.resetForm();
          handleShowPage();
        })
        .catch(() => {
          message.error("Error on creating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="fine_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fine Name
                  </MDTypography>
                }
                value={values.fine_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fine_name && Boolean(errors.fine_name)}
                helperText={touched.fine_name && errors.fine_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
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
                    error={touched.academic_year && Boolean(errors.academic_year)}
                    helperText={touched.academic_year && errors.academic_year}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                disableClearable
                sx={{ width: "70%" }}
                value={values.account_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "account_name", value },
                  });
                }}
                options={accountData.map((acd) => acd.account_name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="account_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Account
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.account_name}
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.account_name && Boolean(errors.account_name)}
                    helperText={touched.account_name && errors.account_name}
                    success={values.account_name.length && !errors.account_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="description"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description
                  </MDTypography>
                }
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="amount"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Amount
                  </MDTypography>
                }
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="fine_from"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fine From
                  </MDTypography>
                }
                value={values.fine_from}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fine_from && Boolean(errors.fine_from)}
                helperText={touched.fine_from && errors.fine_from}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="start_date"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Start Date
                  </MDTypography>
                }
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.start_date && Boolean(errors.start_date)}
                helperText={touched.start_date && errors.start_date}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="end_date"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    End Date
                  </MDTypography>
                }
                value={values.end_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.end_date && Boolean(errors.end_date)}
                helperText={touched.end_date && errors.end_date}
              />
            </Grid>

            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="due_date"
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Due Date
                  </MDTypography>
                }
                value={values.due_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.due_date && Boolean(errors.due_date)}
                helperText={touched.due_date && errors.due_date}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              {" "}
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
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
                <MDButton
                  color="dark"
                  variant="contained"
                  onClick={() => {
                    handleShowPage();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item mt={2} ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
