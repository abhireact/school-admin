import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GroupsIcon from "@mui/icons-material/Groups";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { Icon, IconButton, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
const token = Cookies.get("token");
import * as Yup from "yup";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

const StudentPhotoUpload = () => {
  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      stud_upload: [],
    },

    onSubmit: async (values, action) => {
      try {
        const payload = await Promise.all(
          uploadedImages.map(async (file) => {
            const admissionNumber = file.name.split(".")[0].replace(/-/g, "/"); // Assuming the file name is the admission number

            const base64Image = await toBase64(file);
            return {
              admission_number: admissionNumber,
              image: base64Image,
            };
          })
        );

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/mg_student/student_avatar_file`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          message.success("Student photos uploaded successfully!");
          action.resetForm();
          setUploadedImages([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } catch (error) {
        console.error("Error uploading student photos:", error);
        message.error("Error uploading student photos.");
      }
    },
  });

  const handleImages = (e: any) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const validFiles: any = [];

    fileArray.forEach((file: any) => {
      if (file.size > 5 * 1024 * 1024) {
        message.error(`File ${file.name} exceeds 5 MB limit.`);
        return;
      }

      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        validFiles.push(file);
      } else {
        message.error(`File ${file.name} is not a valid PNG, JPEG, or HEIC image.`);
      }
    });

    setUploadedImages((prevImages) => [...prevImages, ...validFiles]);
    setFieldValue("stud_upload", validFiles);
  };

  const toBase64 = (file: any) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <BaseLayout>
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Student Bulk Photo Upload
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}></Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "90%" }}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Student Images with image name must be admission number
                    </MDTypography>
                  }
                  type="file"
                  accept="image/*"
                  name="stud_img"
                  onChange={handleImages}
                  inputProps={{ multiple: true }}
                  variant="standard"
                  inputRef={fileInputRef}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                py={2}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Grid item>
                  <MDButton
                    color="info"
                    variant="contained"
                    type="submit"
                    disabled={uploadedImages.length < 1}
                  >
                    submit&nbsp;<Icon>save</Icon>
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </BaseLayout>
  );
};

export default StudentPhotoUpload;
