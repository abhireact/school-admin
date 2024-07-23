import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const token = Cookies.get("token");

interface DataType {
  key: React.Key;
  name: string;
  disabled: boolean;
  checked: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "COLLECTION NAME",
    dataIndex: "name",
  },
];

export default function ManageConcession(props: any) {
  const [manageconcession, setManageconcession] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const initialValues = props.data;
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, [props.data]); // Ensure props.data is included as a dependency

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/fee_concession/collection`,
        props.data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setGetdata(response.data);
        const fetchedData = response.data.map((dataa: any, index: number) => ({
          key: index,
          name: dataa.collection_name,
          disabled: dataa.is_disabled,
          checked: dataa.select,
        }));
        setManageconcession(fetchedData);

        // Set the initial selected row keys based on the fetched data
        const initiallySelectedKeys = fetchedData
          .filter((item: DataType) => item.checked)
          .map((item: DataType) => item.key);
        setSelectedRowKeys(initiallySelectedKeys);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.disabled,
      name: record.name,
    }),
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      const editedvalue = manageconcession;
      getdata.forEach((item: any, index) => {
        item.select = selectedRowKeys.includes(index);
      });

      axios
        .put(
          "http://10.0.20.200:8000/fee_concession/collection",
          { ...props.data, discount_collections: getdata },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            // message.success(response.data.message);
            props.onSuccess();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  });
  return (
    <I18nextProvider i18n={createTrans}>
      <Card>
        <MDBox p={3}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  {t("manage_scheduled_concession")}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "center" }} m={2}>
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={manageconcession}
                pagination={false}
                scroll={{ y: 400, x: true }}
              />
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
              <Grid item>
                <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                  {t("back")}
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  {t("save")}
                </MDButton>
              </Grid>
            </Grid>
          </form>
        </MDBox>
      </Card>
    </I18nextProvider>
  );
}
