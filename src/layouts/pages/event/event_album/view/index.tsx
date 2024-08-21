import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Grid, Card, Modal, IconButton, Icon } from "@mui/material";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Cookies from "js-cookie";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

interface EventData {
  image_id: string;
  image: string;
}

interface AlbumData {
  academic_year: string;
  album_name: string;
  event_name: string;
  description: string;
  event_album?: EventData[];
}

const token = Cookies.get("token");

export default function ViewAlbum() {
  const location = useLocation();
  const { editData } = location.state as { editData: AlbumData };

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const navigate = useNavigate();

  const chunk = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const handleImageClick = (imageUrl: string) => {
    setZoomedImage(imageUrl);
    setZoomLevel(1);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                View Album
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
                Back
              </MDButton>
            </Grid>

            {editData && (
              <>
                <Grid item xs={12} sm={3}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Album Name
                  </MDTypography>
                  <MDTypography variant="body2">{editData.album_name}</MDTypography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Event Name
                  </MDTypography>
                  <MDTypography variant="body2">{editData.event_name}</MDTypography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Academic Year
                  </MDTypography>
                  <MDTypography variant="body2">{editData.academic_year}</MDTypography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description
                  </MDTypography>
                  <MDTypography variant="body2">{editData.description}</MDTypography>
                </Grid>

                {editData.event_album && editData.event_album.length > 0 && (
                  <Grid item xs={12}>
                    <MDBox mt={2}>
                      {chunk(editData.event_album, 5).map((row, rowIndex) => (
                        <MDBox
                          key={rowIndex}
                          display="flex"
                          flexWrap="nowrap"
                          gap={2}
                          mb={2}
                          justifyContent={"center"}
                        >
                          {row.map((image, index) => (
                            <MDBox
                              key={index}
                              width="calc(25% - 12px)"
                              height="200px"
                              borderRadius="10px"
                              overflow="hidden"
                              boxShadow="0 4px 8px rgba(0,0,0,0.1)"
                              transition="transform 0.3s ease-in-out"
                              sx={{
                                "&:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                                },
                                cursor: "pointer",
                              }}
                              onClick={() => handleImageClick(image.image)}
                            >
                              <img
                                src={image.image}
                                alt={`Album Image ${rowIndex * 4 + index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </MDBox>
                          ))}
                        </MDBox>
                      ))}
                    </MDBox>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </MDBox>
      </Card>

      <Modal
        open={Boolean(zoomedImage)}
        onClose={handleCloseZoom}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Grid container>
          <Grid item sm={12} xs={12}>
            <MDBox
              position="relative"
              // bgcolor="background.paper"
              borderRadius="10px"
              maxWidth="100%"
              maxHeight="100%"
            >
              <img
                src={zoomedImage ?? ""}
                alt="Zoomed Image"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item sm={12} xs={12}>
            <MDBox
              position="absolute"
              top={8}
              right={8}
              zIndex={1}
              display="flex"
              alignItems="top"
              sx={{
                bgcolor: "dark",
                border: "2.5px solid white",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              <IconButton size="large" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
                <Icon color="warning">zoom_in_map</Icon>
              </IconButton>
              <br />
              <IconButton size="large" onClick={handleZoomIn} disabled={zoomLevel >= 3}>
                <Icon color="warning">zoom_out_map</Icon>
              </IconButton>
              <br />
              <IconButton size="large" onClick={handleCloseZoom}>
                <Icon color="warning">logout</Icon>
              </IconButton>
              <br />
            </MDBox>
          </Grid>
        </Grid>
      </Modal>
    </DashboardLayout>
  );
}
