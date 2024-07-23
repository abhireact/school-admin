// import React, { useState } from "react";
// import axios from "axios";
// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import Cookies from "js-cookie";
// declare var Razorpay: any; // Add this line
// const token = Cookies.get("token");

// const RazorpayPayment = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentData, setPaymentData] = useState(null);

//   const startPayment = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/razorpay/token",
//         { amount: 10000.0, user_email: "abcd@ghh.com", user_phone: "7415555547" },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         setPaymentData(response.data);
//         const loadRazorpayScript = () => {
//           const script = document.createElement("script");
//           script.src = "https://checkout.razorpay.com/v1/checkout.js";
//           script.onload = () => {
//             const options = {
//               key: response.data?.key_id, // Enter the Key ID generated from the Dashboard
//               amount: "10000", // Amount is in currency subunits
//               currency: "INR",
//               name: "Mindcom", // Your business name
//               description: "Test Transaction",
//               callback_url: "http://10.0.20.200:8000/razorpay/validate",
//               order_id: response.data?.order_id, // Pass the order ID obtained in the response
//               prefill: {
//                 name: "Gaurav Kumar", // Your customer's name
//                 email: "gaurav.kumar@example.com",
//                 contact: "9000090000", // Customer's phone number
//               },
//               notes: {
//                 address: "Razorpay Corporate Office",
//               },
//               theme: {
//                 color: "#3399cc",
//               },
//             };
//             const rzp1 = new Razorpay(options);
//             rzp1.open();
//           };
//           document.body.appendChild(script);
//         };
//         loadRazorpayScript();
//       }
//       console.log(response, "response data");
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <MDBox pl={40}>
//       <MDButton onClick={startPayment} disabled={isLoading}>
//         {isLoading ? "Processing..." : "Pay with Razorpay"}
//       </MDButton>
//     </MDBox>
//   );
// };

// export default RazorpayPayment;

//                                handler function

import React, { useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";

declare var Razorpay: any;

const token = Cookies.get("token");

const RazorpayPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const startPayment = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/razorpay/token",
        {
          amount: 10000.0,
          user_email: "abcd@ghh.com",
          user_phone: "7415555547",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setPaymentData(response.data);
        const loadRazorpayScript = () => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            const options = {
              key: response.data?.key_id, // Enter the Key ID generated from the Dashboard
              amount: "10000", // Amount is in currency subunits
              currency: "INR",
              name: "Mindcom", // Your business name
              description: "Test Transaction",
              order_id: response.data?.order_id, // Pass the order ID obtained in the response
              handler: function (response: {
                razorpay_payment_id: any;
                razorpay_order_id: any;
                razorpay_signature: any;
              }) {
                // Call the backend API with the payment response
                axios
                  .post(
                    "http://10.0.20.200:8000/razorpay/validate",
                    {
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature,
                      redirect_url: window.location.href, // Include the return URL
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  //   .then(() => {
                  //     // Redirect the user back to the original URL
                  //     // window.location.href = window.location.href;
                  //   })
                  .catch((error) => {
                    console.error("Error validating payment:", error);
                  });
              },
              prefill: {
                name: "Gaurav Kumar", // Your customer's name
                email: "gaurav.kumar@example.com",
                contact: "9000090000", // Customer's phone number
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
          };
          document.body.appendChild(script);
        };
        loadRazorpayScript();
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
        {isLoading ? "Processing..." : "Pay with Razorpay"}
      </MDButton>
    </MDBox>
  );
};

export default RazorpayPayment;
