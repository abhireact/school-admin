import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, message } from "antd";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
const token = Cookies.get("token");

interface DataType {
  key: React.Key;
  name: string;
  userid: string;
}

let initialValues = {
  message_type: "",
  subject: "",
  message: "",
  academic_year: "",
  send_to: "",
  class_name: "",
  section_name: "",
  filter: "",
  schedule: "",
  department: "",
};

export default function SendMail() {
  const [department, setDepartmentData] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

  useEffect(() => {
    axios
      .get(`http://10.0.20.200:8000/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(selectedRowKeys, "lllllllllll");
        const submitValue = {
          to_user: selectedRowKeys,
          subject: values.subject,
          description: values.message,
          status: false,
          notification_type: "",
        };
        const emailsubmitvalue = {
          to: selectedRowKeys.map((item: any) => item.guardian_email),
          subject: values.subject,
          body: values.message,
          cc: "",
        };

        if (values.message_type === "Email") {
          axios
            .post("http://10.0.20.200:8000/email_service/send_mail", emailsubmitvalue, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              message.success(response.data.message);
              action.resetForm();
            })
            .catch((error) => {
              message.error(error.response.data.detail);
            });
        } else if (values.message_type === "Inter-Portal") {
          axios
            .post(`http://10.0.20.200:8000/internal_portal/`, submitValue, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              message.success(response.data.message);
              action.resetForm();
            })
            .catch((error) => {
              message.error(error.response.data.detail);
            });
        }
      },
    });
  const getFilteredInterportalData = () => {
    console.log(values, "filtered post value");
    const postvalue = {
      user_type: values.send_to,
      class_name: values.class_name != "" ? [values.class_name] : [],
      filter: values.filter,
      section_name: values.section_name != "" ? [values.section_name] : [],
      academic_year: values.academic_year,
      schedule: values.schedule,
      department: values.department,
    };

    axios
      .post(`http://10.0.20.200:8000/mg_sms_notifications/filter_by`, postvalue, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReceiverData(response.data);
        console.log(response.data, "kkkkkkkkkkkkkkkkkkkk");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "User Id",
      dataIndex: "userid",
    },
  ];
  console.log(receiverData, "receivers data");
  const data: DataType[] = receiverData.map((dataItem: any, index: number) => ({
    key:
      values.send_to === "Parent"
        ? dataItem.guardian_user_id
        : values.send_to === "Student"
        ? dataItem.user_id
        : values.send_to === "Employee"
        ? dataItem.employee_user_id
        : null,
    name:
      values.send_to === "Parent"
        ? dataItem.guardian_name
        : values.send_to === "Parent"
        ? `${dataItem.first_name} ${dataItem.middle_name} ${dataItem.last_name}`
        : values.send_to === "Employee"
        ? dataItem.employee_name
        : null,
    userid:
      values.send_to === "Parent"
        ? dataItem.guardian_user_id
        : values.send_to === "Student"
        ? dataItem.user_id
        : values.send_to === "Employee"
        ? dataItem.employee_user_id
        : null,
  }));

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handleReset = () => {
    initialValues = {
      message_type: "",
      subject: "",
      message: "",
      academic_year: "",
      send_to: "",
      class_name: "",
      section_name: "",
      filter: "",
      schedule: "",
      department: "",
    };
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Send Notification
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(e, value) => {
                    handleReset();
                    handleChange({ target: { name: "message_type", value } });
                  }}
                  options={["SMS", "Inter-Portal", "Email"]}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="message_type"
                      value={values.message_type}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Notification Type
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>

            {values.message_type == "Email" || values.message_type == "Inter-Portal" ? (
              <>
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "100%" }}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Subject
                        </MDTypography>
                      }
                      name="subject"
                      value={values.subject}
                      placeholder="Enter Subject"
                      variant="standard"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      sx={{ width: "100%" }}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Message
                        </MDTypography>
                      }
                      name="message"
                      value={values.message}
                      variant="standard"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                </Grid>
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "send_to", value } });
                      }}
                      options={
                        values.message_type == "Email"
                          ? ["Parent", "Employee"]
                          : ["All", "Student", "Parent", "Employee"]
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="send_to"
                          onChange={handleChange}
                          value={values.send_to}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Send To
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  {values.send_to === "Student" || values.send_to === "Parent" ? (
                    <>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "class_name", value } });
                          }}
                          options={
                            values.academic_year !== ""
                              ? classes
                                  .filter(
                                    (item: any) => item.academic_year === values.academic_year
                                  )
                                  .map((item: any) => item.class_name)
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="class_name"
                              onChange={handleChange}
                              value={values.class_name}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Class
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "section_name", value } });
                          }}
                          options={
                            values.class_name !== ""
                              ? classes
                                  .filter(
                                    (item: any) =>
                                      item.academic_year === values.academic_year &&
                                      item.class_name === values.class_name
                                  )[0]
                                  .section_data.map((item: any) => item.section_name)
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="section_name"
                              onChange={handleChange}
                              value={values.section_name}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Section
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "filter", value } });
                          }}
                          options={["All", "Absent Today", "Defaulter", "Birthday Today"]}
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="filter"
                              onChange={handleChange}
                              value={values.filter}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Filter
                                </MDTypography>
                              }
                              {...params}
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      {values.send_to === "Parent" && values.filter == "Defaulter" ? (
                        <Grid item xs={12} sm={4}>
                          <Autocomplete
                            onChange={(_event, value) => {
                              handleChange({ target: { name: "schedule", value } });
                            }}
                            options={["All Student", "Absent Today", "Defaulter", "Birthday Today"]}
                            renderInput={(params) => (
                              <MDInput
                                required
                                name="schedule"
                                onChange={handleChange}
                                value={values.schedule}
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
                                    Schedule
                                  </MDTypography>
                                }
                                {...params}
                                variant="standard"
                              />
                            )}
                          />
                        </Grid>
                      ) : null}
                    </>
                  ) : null}
                  {values.send_to == "Employee" ? (
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        onChange={(_event, value) => {
                          handleChange({ target: { name: "department", value } });
                        }}
                        options={department.map((item: any) => item.dept_name)}
                        renderInput={(params) => (
                          <MDInput
                            required
                            name="department"
                            onChange={handleChange}
                            value={values.department}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Department
                              </MDTypography>
                            }
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </>
            ) : null}

            <Grid container px={3} pb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" onClick={getFilteredInterportalData}>
                  SHOW RECEIVERS
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        {receiverData.length > 0 ? (
          <Card>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
            <Grid container px={3} pb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  SEND
                </MDButton>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </form>
    </DashboardLayout>
  );
}
