import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import FormField from "layouts/pages/account/components/FormField";
interface FeeConcessionInterface {
  columns: { Header: string; accessor: string }[];
  rows: {
    bill_no: number;
    name: string;
    guardian_name: string;
    date: string;
    mode: string;
    concession: number;
    fine: number;
    discount: number;
    adjust: number;
    refund: number;
    amount: number;
  }[];
}
export default function FeeRegisterReport() {
  const [feeConcessionReportData, setfeeConcessionReportData] = useState<FeeConcessionInterface>({
    columns: [],
    rows: [],
  });
  const initialValues = {
    academic_year: "",
    class: "",
    section: "",
    archive_student: false,
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: FeeDefaulterSchema,
      enableReinitialize: true,

      onSubmit: async (values, action) => {
        //
        const feeConcessionData = {
          columns: [
            { Header: "BILL NO", accessor: "bill_no" },
            { Header: "NAME", accessor: "name" },
            { Header: "GUARDIAN NAME", accessor: "guardian_name" },
            { Header: "DATE", accessor: "date" },
            { Header: "MODE", accessor: "mode" },
            { Header: "CONCESSION", accessor: "concession" },
            { Header: "FINE", accessor: "fine" },
            { Header: "DISCOUNT", accessor: "discount" },
            { Header: "ADJUST", accessor: "adjust" },
            { Header: "REFUND", accessor: "refund" },
            { Header: "AMOUNT", accessor: "amount" },
          ],
          rows: [
            {
              bill_no: 1,
              name: "Prabhakar",
              guardian_name: "xxxx",
              date: "04/05/2023",
              mode: "by_cheque-school",
              concession: 1000,
              fine: 1000,
              discount: 200,
              adjust: 10,
              refund: 20,
              amount: 40,
            },
          ],
        };
        setfeeConcessionReportData(feeConcessionData);
        console.log("submited", values);
      },
    });
  console.log(feeConcessionReportData, "concession DAtaa");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Fee Register Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "academic_year", value } });
                      }}
                      options={["2023-24", "2024-25"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="academic_year"
                          onChange={handleChange}
                          value={values.academic_year}
                          label="Academic Year"
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={errors.academic_year && touched.academic_year}
                          success={values.academic_year && !errors.academic_year}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "class", value } });
                      }}
                      options={["1st", "2nd", "3rd"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="class"
                          onChange={handleChange}
                          value={values.class}
                          label="Class"
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.class && Boolean(errors.class)}
                          success={values.class && !errors.class}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section", value } });
                      }}
                      options={["1st", "2nd", "3rd"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="section"
                          onChange={handleChange}
                          value={values.section}
                          label="Section"
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={errors.section && touched.section}
                          success={values.section && !errors.section}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Checkbox
                      checked={values.archive_student}
                      name="archive_student"
                      value="true"
                      onChange={handleChange}
                    />
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Archive Student
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                  <Grid item ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Show Data
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} pt={2}>
            {feeConcessionReportData.rows.length > 0 ? (
              <Card>
                <MDBox p={3}>
                  <DataTable
                    table={feeConcessionReportData}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                  />
                </MDBox>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
