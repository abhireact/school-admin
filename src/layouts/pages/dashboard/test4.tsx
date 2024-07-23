import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const token = Cookies.get("token");

const PhonePePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if redirected back with a transaction ID
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transaction_id");

    if (transactionId) {
      // Call the API with the transaction ID
      const confirmPayment = async () => {
        try {
          const response = await axios.post(
            "http://10.0.20.200:8000/phonepay_payments/status",
            { transaction_id: transactionId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response, "response from confirmation");
        } catch (error) {
          console.error("Error handling return:", error);
        } finally {
          // Clear the transaction ID from the URL
          // history.replace(location.pathname);
        }
      };

      confirmPayment();
    }
  }, [location]);

  const startPayment = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/phonepay_payments/token",
        {
          amount: 10.0,
          return_url: `${window.location.origin}${window.location.pathname}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.url) {
        // Store the transaction ID in local storage or a state management solution
        const transactionId = response.data.transaction_id;
        localStorage.setItem("transactionId", transactionId);

        // Replace TRANSACTION_ID in the return URL with the actual transaction ID
        const paymentUrl = response.data.url.replace("TRANSACTION_ID", transactionId);
        console.log(paymentUrl, "paymentUrl");

        // Redirect to the payment URL
        window.location.href = paymentUrl;
      }
      console.log(response, "response data");
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBox pl={40}>
      <MDButton onClick={startPayment} disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay with PhonePe"}
      </MDButton>
    </MDBox>
  );
};

export default PhonePePayment;
