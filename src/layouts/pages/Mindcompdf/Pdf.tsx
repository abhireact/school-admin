import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import Cookies from "js-cookie";
import BasicTable from "./Table";
// import Table from "./Table";
const token = Cookies.get("token");

function App() {
  const [loader, setLoader] = useState(false);
  const [selectedSize, setSelectedSize] = useState("A4");
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);
  const captureRef = useRef<HTMLDivElement>(null);
  const [organizationName, setOrganizationName] = useState("Edit text");
  const [footerName, setFooterName] = useState("Edit Footer");
  const [textData, setTextData] = useState<any[]>([]);
  const [footerData, setFooterData] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [editorFooterEnabled, setEditorFooterEnabled] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://10.0.20.200:8000/mg_image", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error("Failed to fetch images from API");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getTextDataFromAPI = async () => {
    try {
      const response = await fetch("http://10.0.20.200:8000/text_positions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTextData(data);
        console.log("Text data from API:", data);
      } else {
        console.error("Failed to fetch text data from API");
      }
    } catch (error) {
      console.error("Error fetching text data:", error);
    }
  };

  const getFooter = async () => {
    try {
      const response = await fetch("http://10.0.20.200:8000/text_positions_footer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
        console.log("Text data from API:", data);
      } else {
        console.error("Failed to fetch text data from API");
      }
    } catch (error) {
      console.error("Error fetching text data:", error);
    }
  };

  const uploadTextDataToAPI = async (textData: any) => {
    try {
      const response = await fetch("http://10.0.20.200:8000/text_positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(textData),
      });

      if (response.ok) {
        console.log("Successfully uploaded text data to API");
      } else {
        console.error("Failed to upload text data to API");
      }
    } catch (error) {
      console.error("Error uploading text data:", error);
    }
  };

  const uploadFooterData = async (footerData: any) => {
    try {
      const response = await fetch("http://10.0.20.200:8000/text_positions_footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(footerData),
      });
      if (response.ok) {
        console.log("Successfully uploaded text data to API");
      } else {
        console.error("Failed to upload text data to API");
      }
    } catch (error) {
      console.error("Error uploading text data:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    getTextDataFromAPI();
    getFooter();
  }, []);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    await uploadImageToAPI(file);
    await fetchImages();
  };

  const uploadImageToAPI = async (imageFile: string | Blob) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("http://10.0.20.200:8000/mg_image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Successfully uploaded");
      } else {
        console.error("Failed to upload image to API");
      }

      setLoader(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoader(false);
    }
  };

  const handleDeleteImage = async (index: number) => {
    try {
      const updatedImages = [...images];
      const deletedImage = updatedImages.splice(index, 1)[0];
      setImages(updatedImages);

      const fileName = deletedImage.file_name.split("/").pop();

      const deleteResponse = await fetch("http://10.0.20.200:8000/mg_image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          file_name: fileName,
          x_coordinate: deletedImage.x_coordinate,
          y_coordinate: deletedImage.y_coordinate,
        }),
      });

      if (!deleteResponse.ok) {
        console.error("Failed to delete image via API");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const onChange = (e: any) => {
    setOrganizationName(e.target.value);
  };

  const onChangefooter = (e: any) => {
    setFooterName(e.target.value);
  };

  const handleImageDrag = (e: DraggableEvent, data: DraggableData, index: number) => {
    const updatedImages = [...images];
    updatedImages[index].x_coordinate = data.x;
    updatedImages[index].y_coordinate = data.y;
    setImages(updatedImages);

    const image = updatedImages[index];
    const fileName = image.file_name.split("/").pop();

    fetch("http://10.0.20.200:8000/mg_image/position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        file_name: fileName,
        x_coordinate: data.x,
        y_coordinate: data.y,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to update image position via API");
        }
      })
      .catch((error) => {
        console.error("Error updating image position:", error);
      });
  };

  const handleImageMouseEnter = (index: any) => {
    setHoveredImageIndex(index);
  };

  const handleImageMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  const downloadPDF = () => {
    setLoader(true);
    const captureElement = captureRef.current;

    const ensureImagesLoaded = (element: HTMLDivElement) => {
      const imgElements = element.querySelectorAll("img");
      const promises: any[] = [];
      imgElements.forEach((img) => {
        if (!img.complete) {
          promises.push(
            new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            })
          );
        }
      });
      return Promise.all(promises);
    };

    ensureImagesLoaded(captureElement)
      .then(() => {
        return html2canvas(captureElement, { scale: 2, useCORS: true });
      })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.7);
        const doc = new jsPDF({
          unit: "mm",
          format: selectedSize === "A3" ? "a3" : [customWidth, customHeight],
        });
        const width = doc.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        doc.addImage(imgData, "JPEG", 0, 0, width, height);
        setLoader(false);
        // Save PDF to local file
        doc.save("pdf-editor.pdf");
      })
      .catch((error) => {
        console.error("Error capturing the canvas:", error);
        setLoader(false);
      });
  };

  const handleSizeChange = (e: any) => {
    const value = e.target.value;
    setSelectedSize(value);
    if (value === "custom") {
      setCustomWidth(210);
      setCustomHeight(297);
    }
  };

  const handleCustomWidthChange = (e: any) => {
    setCustomWidth(parseInt(e.target.value));
  };

  const handleCustomHeightChange = (e: any) => {
    setCustomHeight(parseInt(e.target.value));
  };

  const editName = () => {
    setEditorEnabled(true);
  };

  const editFooter = () => {
    setEditorFooterEnabled(true);
  };

  const SaveName = async () => {
    setEditorEnabled(false);
    // Prepare the updated text data
    const updatedTextData = {
      text_line_1: organizationName,
      line_1_x_position: textData[0]?.line_1_x_position || -3,
      line_1_y_position: textData[0]?.line_1_y_position || 1,
      text_line_2: textData[0]?.text_line_2 || "",
      line_2_x_position: textData[0]?.line_2_x_position || -3,
      line_2_y_position: textData[0]?.line_2_y_position || 1,
      text_line_3: textData[0]?.text_line_3 || "",
      line_3_x_position: textData[0]?.line_3_x_position || -3,
      line_3_y_position: textData[0]?.line_3_y_position || 1,
    };
    // Upload the updated text data to API
    await uploadTextDataToAPI(updatedTextData);
    // Fetch the updated text data again
    await getTextDataFromAPI();
  };

  const handleTextDrag = (e: any, data: any, index: number) => {
    const originalTextData = [...textData];
    const updatedTextData = {
      ...originalTextData[index],
      line_1_x_position: data.x,
      line_1_y_position: data.y,
    };
    originalTextData[index] = updatedTextData;

    console.log("originalTextData", originalTextData);
    setTextData(originalTextData);
  };

  const SaveFooter = async () => {
    setEditorFooterEnabled(false);
    // Prepare the updated text data
    const updatedFooterData = {
      address_line_1: footerName,
      address_line_1_x_position: footerData[0]?.address_line_1_x_position || -3,
      address_line_1_y_position: footerData[0]?.address_line_1_x_position || 1,
    };
    // Upload the updated text data to API
    await uploadFooterData(updatedFooterData);
    // Fetch the updated text data again
    await getFooter();
  };

  // const handleFooterDrag = (e: any, data: any, index: number) => {
  //   const footerTextData = [...footerData];
  //   const updatedFooterData = {
  //     ...footerTextData[index],
  //     address_line_1_x_position: data.x,
  //     address_line_1_y_position: data.y,
  //   };
  //   footerTextData[index] = updatedFooterData;
  //   console.log("footerTextData", footerTextData);
  //   setFooterData(footerTextData);
  // };

  const handleFooterDrag = (e: any, data: any) => {
    const updatedFooterData = {
      ...footerData[0], // Access the first (and only) item in footerData
      address_line_1_x_position: data.x,
      address_line_1_y_position: data.y,
    };
    setFooterData([updatedFooterData]); // Update footerData with the modified item
  };

  return (
    <EditorProvider>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox>
          <MDBox style={{ display: "flex", paddingBottom: "10px" }}>
            <MDBox style={{ paddingLeft: "20px" }}>
              <MDButton onClick={() => inputRef.current.click()}>+Add Image</MDButton>
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </MDBox>
            <MDBox style={{ paddingLeft: "20px" }}>
              <label>
                Select PDF Size:
                <select value={selectedSize} onChange={handleSizeChange}>
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
              {selectedSize === "custom" && (
                <div>
                  Custom Width (mm):
                  <input type="number" value={customWidth} onChange={handleCustomWidthChange} />
                  Custom Height (mm):
                  <input type="number" value={customHeight} onChange={handleCustomHeightChange} />
                </div>
              )}
            </MDBox>

            <MDBox style={{ paddingLeft: "20px" }}>
              <MDButton
                type="button"
                className="receipt-modal-download-button btn btn-outline-primary"
                onClick={downloadPDF}
                disabled={loader}
              >
                {loader ? "Downloading" : "Download"}
              </MDButton>
            </MDBox>

            <MDBox style={{ paddingLeft: "20px" }}>
              {!editorEnabled ? (
                <MDButton onClick={editName}>Edit</MDButton>
              ) : (
                <MDBox style={{ display: "flex" }}>
                  <MDBox style={{ height: "50px" }}>
                    <Editor value={organizationName} onChange={onChange} tagName="p" />
                  </MDBox>
                  <MDButton type="button" onClick={() => SaveName()} style={{ height: "20px" }}>
                    Save
                  </MDButton>
                </MDBox>
              )}
            </MDBox>

            <MDBox style={{ paddingLeft: "20px" }}>
              {!editorFooterEnabled ? (
                <MDButton onClick={editFooter}>Edit Footer</MDButton>
              ) : (
                <MDBox style={{ display: "flex" }}>
                  <MDBox style={{ height: "50px" }}>
                    <Editor value={footerName} onChange={onChangefooter} tagName="p" />
                  </MDBox>
                  <MDButton type="button" onClick={() => SaveFooter()} style={{ height: "20px" }}>
                    Save
                  </MDButton>
                </MDBox>
              )}
            </MDBox>
          </MDBox>

          <Card sx={{ width: 794, height: 1123 }}>
            <MDBox className="container">
              <MDBox className="receipt-box" ref={captureRef}>
                <div className="actual-receipt image-container">
                  <span style={{ display: "flex" }}>
                    {images.map((image, index) => (
                      <Draggable
                        key={index}
                        position={{ x: image.x_coordinate, y: image.y_coordinate }}
                        onDrag={(e, data) => handleImageDrag(e, data, index)}
                      >
                        <div
                          className="image-container"
                          style={{ display: "flex" }}
                          onMouseEnter={() => handleImageMouseEnter(index)}
                          onMouseLeave={handleImageMouseLeave}
                        >
                          <img
                            src={image.file_name}
                            alt={`Image ${index}`}
                            style={{
                              width: "120px",
                              height: "120px",
                              cursor: "move",
                            }}
                            crossOrigin="anonymous"
                          />

                          {hoveredImageIndex === index && (
                            <DeleteIcon
                              className="delete-icon"
                              onClick={() => handleDeleteImage(index)}
                              cursor="pointer"
                            />
                          )}
                        </div>
                      </Draggable>
                    ))}
                  </span>

                  {textData.map((data, index) => (
                    <Draggable
                      key={index}
                      position={{
                        x: data.line_1_x_position,
                        y: data.line_1_y_position,
                      }}
                      onStop={(e, data) => handleTextDrag(e, data, index)}
                    >
                      <MDTypography variant="h6">{data.text_line_1}</MDTypography>
                    </Draggable>
                  ))}

                  <hr
                    style={{
                      width: "100%",
                      borderBottom: "1px solid #e4e4e4",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                  <BasicTable />
                  <div className="grading-system">
                    <hr
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #e4e4e4",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    />
                    <MDBox className="grade-row">
                      {/* footer part */}
                      {/* {footerData.map((data) => ( */}
                      {/* <Draggable
                        position={{
                          x: footerData[0]?.address_line_1_x_position,
                          y: footerData[0]?.address_line_1_y_position,
                        }}
                        onStop={(e, data) => handleFooterDrag(e, data)}
                      > */}
                      <MDTypography variant="h6" style={{ textAlign: "center" }}>
                        {footerData[0]?.address_line_1}
                      </MDTypography>

                      {/* </Draggable> */}
                      {/* ))} */}
                    </MDBox>
                  </div>
                </div>
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </DashboardLayout>
    </EditorProvider>
  );
}

export default App;
function saveAs(compressedPdf: Blob, arg1: string) {
  throw new Error("Function not implemented.");
}
