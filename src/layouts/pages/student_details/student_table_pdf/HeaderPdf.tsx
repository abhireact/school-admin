import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import "./PdfGenerator.css";

const token = Cookies.get("token");

function HeaderPdf({ isPdfMode }: { isPdfMode: boolean }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

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

  useEffect(() => {
    fetchImages();
    getTextDataFromAPI();
  }, []);

  if (!isPdfMode) return null;

  return (
    <EditorProvider>
      <MDBox className="hidden-text">
        <MDBox className="container">
          <MDBox className="receipt-box" ref={captureRef}>
            <div className="actual-receipt image-container">
              <span style={{ display: "flex" }}>
                {images.map((image, index) => (
                  <Draggable
                    key={index}
                    position={{
                      x: image.x_coordinate,
                      y: image.y_coordinate,
                    }}
                  >
                    <div className="image-container" style={{ display: "flex" }}>
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
            </div>
          </MDBox>
        </MDBox>
      </MDBox>
    </EditorProvider>
  );
}

export default HeaderPdf;
