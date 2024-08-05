import { usePDF } from "react-to-pdf";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const TransferCertificate = (props: any) => {
  const { toPDF, targetRef } = usePDF({ filename: "transfer_certificate.pdf" });
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      admission_number: "",
    },

    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/transfer_certificate", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success("Fetched Data Successfully!");

          action.resetForm();
        })
        .catch(() => {
          message.error("Error on fetching data !");
        });
    },
  });
  return (
    <MDBox p={4}>
      <Grid container ref={targetRef} style={{ border: "1px solid #ffff" }}>
        <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="h4">Transfer Certificate</MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                School No.
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Book No.
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                S R No.
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Admission Number
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Affiliation No.
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Renewed Upto
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            label={
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Status of School
              </MDTypography>
            }
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            Registration No. of the Candidate
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            In case Class
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            to
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <MDInput
            sx={{ width: "80%" }}
            name="admission_number"
            onChange={handleChange}
            value={values.admission_number}
            variant="standard"
            onBlur={handleBlur}
            error={touched.admission_number && Boolean(errors.admission_number)}
            success={values.admission_number.length && !errors.admission_number}
            helperText={touched.admission_number && errors.admission_number}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            Prepared By
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            Checked By
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            Signature of Principal
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            (Name and Designation )
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            (Name and Designation )
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDTypography variant="button" fontWeight="bold" color="secondary">
            (with Official Seal )
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} py={2}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Name of the pupil
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Mother&apos;s Name
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Father&apos;s Name
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Nationality
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Whether pupil belongs to SC/ST/OBC Category:
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Date of Birth according to Admission Register(in figures and words):
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Whether the student is failed
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Subjects offered
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Class in which pupil last studied(in figures adn words)
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  School/Board Annual Examination last taken with result
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Whether qualified for promotion to the higher class
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Whether the pupil has paid all dues to the Vidyalaya
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Whether the pupil was in receipt of any fee concession.if so, the nature of such
                  concession
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  The pupil is NCC cadet/boy Scout/Girl guide
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Date of joining the school
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Games played or extra curricular activities in which the pupil usually took part
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Reason of leaving the School
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  No. of meetings upto date
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  No. of school days the pupil attended
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Any other remarks:
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3">
                  Date of issue of certificate
                </MDTypography>
              </th>
              <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>
                <MDTypography variant="button" color="body3"></MDTypography>
              </th>
            </tr>
          </table>
        </Grid>
        <Grid item sm={12}>
          <MDButton color="info" onClick={() => toPDF()}>
            Download as PDF
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};
export default TransferCertificate;
