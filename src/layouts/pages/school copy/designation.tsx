import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "components/MDButton";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Updatedes from "./updatedes";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
// import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useSelector } from "react-redux";
const validationSchema = yup.object({
  designations: yup.string().required("Please enter designation name"),
});

const Designations = () => {
  interface MyError {
    response?: {
      data?: {
        detail?: string;
      };
    };
  }
  //   const { t } = useTranslation("translation");
  const rbacData = useSelector((state: any) => state?.rbacData);
  console.log("rbac data", rbacData);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const token = Cookies.get("token");
  const UserRole = Cookies.get("UserRole");
  console.log("UserRole", UserRole);

  console.log("token", token);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //sending props to component
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);

  const [openupdate, setOpenupdate] = useState(false); //for dialog box start
  console.log(tasks, "tasking");
  const handleOpenupdate = (index: number) => {
    const main_data = tasks[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditTaskData(main_data);
  };
  console.log(editTaskData, "taskata");

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //end

  const handleDeleteTask = async (des_name: any) => {
    console.log(des_name, "ehcfdki");
    try {
      const response = await axios.delete("http://10.0.20.133:8000/designation/", {
        data: { des_name: des_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        message.error("Deleted successFully");
        window.location.reload();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as MyError;
      message.error(myError?.response?.data?.detail || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/designation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const dataTableData = {
    columns: [
      { Header: "DESIGNATION NAME", accessor: "des_name" },
      { Header: "Action", accessor: "action", width: "20%" },
    ],

    rows: data.map((row, index) => ({
      des_name: <p>{row.des_name}</p>,
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "designationupdate") ? (
              <IconButton
                onClick={() => {
                  handleOpenupdate(index);
                }}
              >
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {rbacData ? (
            rbacData?.find((element: string) => element === "designationdelete") ? (
              <IconButton onClick={() => handleDeleteTask(row.dept_name)}>
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),
    })),
  };

  const formik = useFormik({
    initialValues: {
      designations: "",
      dateee: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(
          "http://10.0.20.133:8000/designation",
          {
            des_name: values.designations,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values);

      action.resetForm();
      window.location.reload();
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDTypography variant="h3">{"Desc"}</MDTypography> */}

      <Grid container spacing={3} pb={2}>
        <Grid item xs={12} sm={9}>
          <MDTypography variant="h5">{"Designations"}</MDTypography>
        </Grid>
        {rbacData ? (
          rbacData?.find((element: string) => element === "designationcreate") ? (
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit" onClick={handleOpen}>
                + New Designations
              </MDButton>
            </Grid>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Grid>
      <Card>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={formik.handleSubmit}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid sm={12}>
                  <MDInput
                    sx={{ width: 500 }}
                    variant="standard"
                    name="designations"
                    autoComplete="off"
                    label="Designation Name"
                    value={formik.values.designations}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.designations && Boolean(formik.errors.designations)}
                    helperText={formik.touched.designations && formik.errors.designations}
                    mb={10}
                    mt={10}
                  />
                </Grid>

                <Grid mt={3}>
                  <Button
                    color="info"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid ml={2} mt={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </MDBox>
          </form>
        </Dialog>
      </Card>

      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Updatedes openupdate={openupdate} setOpenupdate={setOpenupdate} task={editTaskData} />
      </Dialog>
      {rbacData ? (
        rbacData?.find((element: string) => element === "designationread") ? (
          <DataTable table={dataTableData} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </DashboardLayout>
  );
};

export default Designations;
