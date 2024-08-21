import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete, IconButton, Icon } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import MDBox from "components/MDBox";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  album_name: Yup.string().required("Required *"),
});
const cookies_academic_year = Cookies.get("academic_year");
const token = Cookies.get("token");

export default function CreateAlbum(): JSX.Element {
  const [eventData, setEventData] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fetchEventCalendar = (): void => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event types:", error);
      });
  };

  useEffect(() => {
    fetchEventCalendar();
  }, []);

  const initialValues: any = {
    album_name: "",
    event_name: "",
    event_description: "",
    event_image: [],
    accessable_employees: {
      employee_department_name: [],
    },
    accessable_teacher: {
      employee_department_name: [],
    },
    accessable_students: {
      class_data: [
        {
          academic_year: "2023-2024",
          class_name: "",
          section_name: "",
        },
      ],
    },
    accessable_guardians: {
      class_data: [
        {
          academic_year: "",
          class_name: "",
          section_name: "",
        },
      ],
    },
    drive_link: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        // Set the event_image field with the base64 image data
        values.event_image = images;

        try {
          await axios.post(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_album`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          action.resetForm();
          setImages([]);
          setImagePreviews([]);
          message.success("Event Committee Created Successfully");
        } catch (error) {
          console.log(error, "error");
          if (axios.isAxiosError(error) && error.response) {
            message.error(error.response.data.detail);
          } else {
            message.error("An error occurred");
          }
        }
      },
    });

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          let quality = 0.7;
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
          }

          const compressAndCheck = () => {
            const base64 = canvas.toDataURL("image/jpeg", quality);
            if (base64.length > 3 * 1024 * 1024) {
              quality -= 0.1;
              if (quality > 0.1) {
                compressAndCheck();
              } else {
                resolve(base64);
              }
            } else {
              resolve(base64);
            }
          };

          compressAndCheck();
        };
        if (event.target && event.target.result) {
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length + images.length > 10) {
        message.error("You can upload a maximum of 10 images");
        return;
      }

      const processedImages = await Promise.all(
        files.map(async (file) => {
          if (file.size > 3 * 1024 * 1024) {
            return await compressImage(file);
          }
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target && e.target.result) {
                resolve(e.target.result as string);
              }
            };
            reader.readAsDataURL(file);
          });
        })
      );

      setImages([...images, ...processedImages]);
      setImagePreviews([...imagePreviews, ...processedImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const navigate = useNavigate();

  const chunk = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChangeButton = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Album
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
                  Back
                </MDButton>
                &nbsp;&nbsp;
                <MDButton color="info" variant="contained" type="submit">
                  Submit&nbsp;
                  <SaveIcon />
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "90%" }}
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Album Name
                    </MDTypography>
                  }
                  variant="standard"
                  name="album_name"
                  value={values.album_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.album_name && Boolean(errors.album_name)}
                  success={values.album_name?.length > 0 && !errors.album_name}
                  helperText={touched.album_name && errors.album_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "90%" }}
                  value={values.event_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "event_name", value: value || "" },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  disableClearable
                  options={eventData.map((acd) => acd.title)}
                  renderInput={(params) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="event_name"
                      required
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Event Name
                        </MDTypography>
                      }
                      value={values.event_name}
                      {...params}
                      variant="standard"
                      error={touched.event_name && Boolean(errors.event_name)}
                      success={Boolean(values.event_name) && !errors.event_name}
                      helperText={touched.event_name && errors.event_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <IconButton
                  size="medium"
                  onClick={handleImageChangeButton}
                  sx={{
                    width: "90%",
                    color: "black",
                    border: "2px dotted black",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  Upload Image &nbsp;&nbsp;
                  <Icon>cloud_upload</Icon>
                </IconButton>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "90%" }}
                  multiline
                  rows={3}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Description
                    </MDTypography>
                  }
                  variant="standard"
                  name="event_description"
                  value={values.event_description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.event_description && Boolean(errors.event_description)}
                  success={values.event_description?.length > 0 && !errors.event_description}
                  helperText={touched.event_description && errors.event_description}
                />
              </Grid>
              {images.length > 0 && (
                <Grid item xs={12}>
                  <MDTypography variant="caption">
                    <b>{images.length} image(s) selected </b> (Max. Images Upload - 10)
                  </MDTypography>
                </Grid>
              )}

              <Grid item xs={12}>
                <MDBox mt={2}>
                  {chunk(imagePreviews, 5).map((row, rowIndex) => (
                    <MDBox key={rowIndex} display="flex" flexWrap="nowrap" gap={2} mb={2}>
                      {row.map((preview, index) => (
                        <MDBox key={index} position="relative" width="calc(20% - 16px)">
                          <img
                            src={preview}
                            alt={`Preview ${rowIndex * 5 + index + 1}`}
                            style={{ width: "100%", height: "100px", objectFit: "cover" }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(rowIndex * 5 + index)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </MDBox>
                      ))}
                    </MDBox>
                  ))}
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
