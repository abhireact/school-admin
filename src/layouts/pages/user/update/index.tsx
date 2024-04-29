// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";

const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  const [roleinfo, setRoleinfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_role", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoleinfo(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: editData.username,

      user_role_name: editData.user_role_name,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put("http://10.0.20.200:8000/mg_user/", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchData();
          message.success("Role created successfully!");
        })
        .catch(() => {
          message.error("Error on creating role !");
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              User Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="username"
              value={values.username}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              value={values.user_role_name}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "user_role_name", value },
                });
              }}
              options={roleinfo.map((acd) => acd.role_name)}
              renderInput={(params: any) => (
                <MDInput
                  name="user_role_name"
                  placeholder="eg. 2022-23"
                  onChange={handleChange}
                  value={values.user_role_name}
                  {...params}
                  variant="standard"
                />
              )}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Grid item mt={4}>
              <MDButton
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </MDButton>
            </Grid>
            <Grid item ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
