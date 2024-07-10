import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

// Declare the AtomPaynetz type
declare global {
  interface Window {
    AtomPaynetz: any;
  }
}

const token = Cookies.get("token");

const Test3 = () => {
  useEffect(() => {
    // Ensure the script is loaded
    const script = document.createElement("script");
    script.src = "https://pgtest.atomtech.in/staticdata/ots/js/atomcheckout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFormSubmit = () => {
    console.log("form submitted");
    axios
      .post(
        "http://10.0.20.200:8000/atom_payments/token",
        { amount: 1.0, user_email: "om.hariomojha@gmail.com", user_phone: "+91 8115620702" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response, "response");

        function openPay() {
          const options = {
            atomTokenId: response.data.tokenid, // Assuming the token is in response.data.token
            // merchId: response.data.merchid,
            merchId: 317156,
            custEmail: "om.hariomojha@gmail.com",
            custMobile: "+91 8115620702",
            returnUrl: "/dashboards/analytics",
          };
          if (window.AtomPaynetz) {
            let atom = new window.AtomPaynetz(options, "uat");
          } else {
            console.error("AtomPaynetz is not loaded");
          }
        }
        openPay(); // Call the function to initiate payment
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <MDBox>
      <MDButton type="submit" onClick={handleFormSubmit}>
        Pay
      </MDButton>
    </MDBox>
  );
};

export default Test3;
