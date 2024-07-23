import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete, FormLabel, Tooltip, Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Drawer } from "antd";
import { Table, message } from "antd";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const token = Cookies.get("token");
const current_academic_year = Cookies.get("academic_year");

interface DataType {
  key: React.Key;
  name: string;
  userid: string;
}

let initialValues = {
  template_name: "",
  message_type: "SMS",
  subject: "",
  message: "",
  academic_year: current_academic_year,
  send_to: "",
  class_name: "",
  section_name: "",
  filter: "",
  schedule: "",
  department: "",
};

export default function SendMail() {
  const [base64String, setBase64String] = useState([""]);
  const [attachedFileName, setAttachedFileName] = useState([""]);
  const [department, setDepartmentData] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [sending, setSending] = React.useState<boolean>(false);
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_templates/school_incharge/view`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "template datataaa");
        setTemplates(response.data);
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
        if (values.send_to != "All" && selectedRowKeys.length == 0) {
          message.error("select user");
        } else {
          setSending(true);
          if (values.message_type === "Email") {
            const emailsubmitvalue = {
              to: selectedRowKeys.map((item: any) => item.guardian_email),
              subject: values.subject,
              body: values.message,
            };
            axios
              .post("http://10.0.20.200:8000/email_service/send_mail", emailsubmitvalue, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                message.success(response.data.message);
                setReceiverData([]);
                setOpen(false);
                action.resetForm();
                setSelectedRowKeys([]);
              })
              .catch((error) => {
                message.error(error.response.data.detail);
              });
          } else if (values.message_type === "Intra-Portal") {
            const submitValue = {
              to_user: selectedRowKeys,
              subject: values.subject,
              description: values.template_name
                ? templates.find((item) => item.sms_activity === values.template_name).message
                : values.message,
              status: false,
              notification_type: "",
              file_attach: base64String.length == 1 && base64String[0] == "" ? [] : base64String,
              content_type:
                attachedFileName.length == 1 && attachedFileName[0] == "" ? [] : attachedFileName,
              user_type: values.send_to,
            };
            axios
              .post(`${process.env.REACT_APP_BASE_URL}/internal_portal/`, submitValue, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                message.success(response.data.message);
                setReceiverData([]);
                setOpen(false);
                action.resetForm();
                setBase64String([""]);
                setSending(false);
                setSelectedRowKeys([]);
              })
              .catch((error) => {
                message.error(error.response.data.detail);
                setSending(false);
              });
          } else if (values.message_type === "SMS") {
            const SMSSubmitValue = {
              message: values.template_name
                ? templates.find((item) => item.sms_activity === values.template_name).message
                : values.message,
              receiver_type: values.send_to,
              sms_type: "",
              to_user: values.send_to == "All" ? [] : selectedRowKeys,
            };
            axios
              .post(`${process.env.REACT_APP_BASE_URL}/sms_notification/`, SMSSubmitValue, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                message.success(response.data.message);
                setReceiverData([]);
                setOpen(false);
                action.resetForm();
                setBase64String([""]);
                setSending(false);
                setSelectedRowKeys([]);
              })
              .catch((error) => {
                message.error(error.response.data.detail);
                setSending(false);
              });
          }
        }
      },
    });
  const getFilteredInterportalData = () => {
    if (values.template_name == "" && values.message_type === "SMS") {
      message.error("Select Template");
    }
    if (values.message == "" && values.message_type != "SMS") {
      message.error("Enter Message");
    } else if (values.subject == "" && values.message_type != "SMS") {
      message.error("Enter Subject");
    } else {
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
        .post(`${process.env.REACT_APP_BASE_URL}/mg_sms_notifications/filter_by`, postvalue, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReceiverData(response.data);
          if (response.data.length == 0) {
            message.error("No Sender Data fount for this Filter");
          } else {
            showLoading();
          }
        })
        .catch((error) => {
          message.error(error.response.data.detail);
        });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => (
        <MDTypography variant="button" fontWeight="bold" color="secondary">
          {text}
        </MDTypography>
      ),
    },
    {
      title: "User Id",
      dataIndex: "userid",
      render: (text: string) => (
        <MDTypography variant="button" fontWeight="bold" color="secondary">
          {text}
        </MDTypography>
      ),
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
        : values.send_to === "Student"
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
    selectedRowKeys,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handleReset = () => {
    handleSubmit();
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
  };
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedFields = [...attachedFileName];
      updatedFields[index] = file.name;
      setAttachedFileName(updatedFields);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const updatedFieldsbase64 = [...base64String];
        updatedFieldsbase64[index] = base64;
        setBase64String(updatedFieldsbase64);
      };
      reader.readAsDataURL(file);
    }
  };
  const addInputField = () => {
    setAttachedFileName([...attachedFileName, ""]);
    setBase64String([...base64String, ""]);
  };
  const removeInputField = (indexToRemove: any) => {
    const updatedAttachedFileNames = [...attachedFileName];
    const updatedBase64Strings = [...base64String];

    updatedAttachedFileNames.splice(indexToRemove, 1);
    updatedBase64Strings.splice(indexToRemove, 1);

    setAttachedFileName(updatedAttachedFileNames);
    setBase64String(updatedBase64Strings);
  };
  // console.log(base64String, "selected fileeee");
  console.log(values.message, "indent field");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
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
                  <Grid item xs={12} sm={9}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Message Type
                        </MDTypography>
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        name="message_type"
                        value={values.message_type}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              SMS
                            </MDTypography>
                          }
                          value="SMS"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Intra Portal
                            </MDTypography>
                          }
                          value="Intra-Portal"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Email
                            </MDTypography>
                          }
                          value="Email"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      disabled
                      sx={{ width: "100%" }}
                      name="academic_year"
                      onChange={handleChange}
                      value={values.academic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
                        </MDTypography>
                      }
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable={values.message_type === "SMS"}
                      value={values.template_name}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "template_name", value } });
                      }}
                      options={templates.map((item: any) => item.sms_activity)}
                      renderInput={(params) => (
                        <MDInput
                          required={values.message_type === "SMS"}
                          name="template_name"
                          onChange={handleChange}
                          value={values.template_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Template
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  {values.message_type === "SMS" ? null : (
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        required
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
                  )}
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      value={values.send_to}
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
                          disableClearable
                          value={values.class_name}
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
                          disableClearable
                          value={values.section_name}
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
                          disableClearable
                          value={values.filter}
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "filter", value } });
                          }}
                          options={["All", "Absent Today"]}
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
                            disableClearable
                            value={values.schedule}
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
                        disableClearable
                        value={values.department}
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

                  <Grid item xs={12} sm={8}>
                    <MDInput
                      required
                      sx={{ width: "100%" }}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Message
                        </MDTypography>
                      }
                      name="message"
                      value={
                        values.template_name
                          ? templates.find((item) => item.sms_activity === values.template_name)
                              .message
                          : values.message
                      }
                      variant="standard"
                      onChange={handleChange}
                      multiline
                    />
                  </Grid>
                  {values.message_type === "Intra-Portal" ? (
                    <Grid item xs={12} sm={4}>
                      {base64String.map((_item, index) => (
                        <>
                          <MDInput
                            InputLabelProps={{ shrink: true }}
                            key={index}
                            variant="standard"
                            type="file"
                            onChange={(event: any) => handleFileInputChange(event, index)}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Attach File
                              </MDTypography>
                            }
                          />
                          {index != 0 && (
                            <Tooltip title="Delete" placement="top">
                              <Icon
                                fontSize="small"
                                color="secondary"
                                onClick={() => removeInputField(index)}
                              >
                                delete
                              </Icon>
                            </Tooltip>
                          )}
                        </>
                      ))}
                      <MDButton
                        color="info"
                        variant="text"
                        onClick={addInputField} // Call addInputField function when "+" button is clicked
                      >
                        + add
                      </MDButton>
                    </Grid>
                  ) : null}
                </Grid>

                <Grid container px={3} pb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {values.send_to === "All" ? (
                    <Grid item ml={2}>
                      {sending ? (
                        <MDButton color="info" variant="text" disabled>
                          SENDING...
                        </MDButton>
                      ) : (
                        <MDButton color="info" variant="contained" type="submit">
                          SEND
                        </MDButton>
                      )}
                    </Grid>
                  ) : (
                    <Grid item ml={2}>
                      <MDButton
                        color="info"
                        variant="contained"
                        onClick={getFilteredInterportalData}
                      >
                        SHOW RECEIVERS
                      </MDButton>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Drawer
            closable
            destroyOnClose
            title={
              <MDTypography variant="h6" fontWeight="bold" color="secondary">
                Select Receivers
              </MDTypography>
            }
            placement="right"
            size={"large"}
            open={open}
            onClose={() => {
              setOpen(false), setSelectedRowKeys([]);
            }}
          >
            <Grid item xs={12} sm={12}>
              {receiverData.length > 0 ? (
                <>
                  {/* <Card> */}
                  <Table
                    rowSelection={{
                      type: "checkbox",
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    size="small"
                  />
                  <Grid
                    container
                    px={3}
                    pb={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Grid item ml={2}>
                      {sending ? (
                        <MDButton color="info" variant="text" disabled>
                          SENDING...
                        </MDButton>
                      ) : (
                        <MDButton
                          color="info"
                          variant="contained"
                          type="submit"
                          onClick={handleReset}
                        >
                          SEND
                        </MDButton>
                      )}
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Drawer>
        </Grid>
        <Grid container p={3}>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="button" color="secondary">
              Defination of Terms
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$User_ID]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">User ID of SMS Recipient</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$User_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">Name of SMS Recipient</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$Current_date]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">Currrent Date</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$School_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">School Name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$Child_name]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">Child name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$Class_section]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">Class and Section</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography variant="caption" color="secondary">
              [$Amount]
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="caption">Amount</MDTypography>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
