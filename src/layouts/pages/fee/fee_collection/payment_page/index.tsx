import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

var Razorpay: any;

const token = Cookies.get("token");

const PaymentDialog = (props: {
  open: any;
  onClose: any;
  amount: any;
  onPaymentSuccess: () => void;
}) => {
  const { open, onClose, amount, onPaymentSuccess } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [trxnData, setTrxnData] = useState("");

  // useEffect(() => {
  //   console.log("Full location object:", location);

  //   const queryParams = new URLSearchParams(location.search);
  //   const transactionId = queryParams.get("transaction_id");
  //   setTrxnData(transactionId);
  //   console.log(transactionId, trxnData, "transactionID");

  //   if (transactionId || trxnData) {
  //     const confirmPayment = async () => {
  //       try {
  //         const response = await axios.post(
  //           "http://10.0.20.200:8000/phonepay_payments/status",
  //           { transaction_id: transactionId || trxnData },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log(response, "response from confirmation");
  //         if (response.data.status === "PAYMENT_SUCCESS") {
  //           onPaymentSuccess();
  //           message.success("Payment Successful");
  //         } else {
  //           message.error("Payment failed");
  //         }
  //       } catch (error) {
  //         console.error("Error handling return:", error);
  //         message.error("Error confirming payment");
  //       }
  //     };

  //     confirmPayment();
  //   }
  // }, [location]);

  // const handlePhonePayClick = async () => {
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       "http://10.0.20.200:8000/phonepay_payments/token",
  //       {
  //         amount,
  //         return_url: `${window.location.origin}${window.location.pathname}`,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(`Return URL:, ${window.location.origin}${window.location.pathname}`);

  //     if (response.data.url) {
  //       const transactionId = response.data.transaction_id;
  //       localStorage.setItem("transactionId", transactionId);

  //       const paymentUrl = response.data.url.replace("TRANSACTION_ID", transactionId);
  //       console.log("Stored transaction ID:", localStorage.getItem("transactionId"));
  //       window.location.href = paymentUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     message.error("Error initiating payment");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transaction_id");
    if (transactionId) {
      setTrxnData(transactionId);
    } else {
      const storedTransactionId = localStorage.getItem("transactionId");
      if (storedTransactionId) {
        setTrxnData(storedTransactionId);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (trxnData) {
      const confirmPayment = async () => {
        try {
          const response = await axios.post(
            "http://10.0.20.200:8000/phonepay_payments/status",
            { transaction_id: trxnData },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.status === "PAYMENT_SUCCESS") {
            onPaymentSuccess();
            message.success("Payment Successful");
            setTrxnData("");
            localStorage.removeItem("transactionId");
          } else {
            message.error("Payment failed");
          }
        } catch (error) {
          console.error("Error handling return:", error);
          message.error("Error confirming payment");
        }
      };

      confirmPayment();
    }
  }, [trxnData, location]);

  const handlePhonePayClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/phonepay_payments/token",
        {
          amount,
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
        const transactionId = response.data.transaction_id;
        localStorage.setItem("transactionId", transactionId);
        const paymentUrl = response.data.url.replace("TRANSACTION_ID", transactionId);
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      message.error("Error initiating payment");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRazorpayClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/razorpay/token",
        {
          amount: amount * 100,
          user_email: "abcd@ghh.com", // Use actual user email
          user_phone: "7415555547", // Use actual user phone
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const loadRazorpayScript = () => {
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = resolve;
            document.body.appendChild(script);
          });
        };

        await loadRazorpayScript();

        const options = {
          key: response.data?.key_id,
          amount: response.data?.amount,
          currency: "INR",
          name: "Mindcom",
          description: "Test Transaction",
          order_id: response.data?.order_id,
          handler: function (response: {
            razorpay_payment_id: any;
            razorpay_order_id: any;
            razorpay_signature: any;
          }) {
            console.log(response, "response");

            axios
              .post(
                "http://10.0.20.200:8000/razorpay/validate",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res, "res");
                if (res.data?.message === "SUCCESS") {
                  console.log(res.data?.message, "Payment Successful");
                  onPaymentSuccess();
                  message.success("Payment Successful");
                  navigate(location.pathname);
                } else {
                  message.error("Payment failed");
                }
              })
              .catch((error) => {
                console.error("Error validating payment:", error);
                message.error("Error validating payment");
              });
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      message.error("Error initiating Razorpay payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Payment Method</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <MDButton
              variant="contained"
              color="light"
              onClick={handlePhonePayClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay with PhonePe"}
            </MDButton>
          </Grid>
          <Grid item xs={10}>
            <MDButton
              variant="contained"
              color="light"
              onClick={handleRazorpayClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay with Razorpay"}
            </MDButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;

// **********************************************************************//
// import React, { useState, useEffect } from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from "@mui/material";
// import MDButton from "components/MDButton";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useLocation, useNavigate } from "react-router-dom";
// import { message } from "antd";

// var Razorpay: any;

// const token = Cookies.get("token");

// const PaymentDialog = (props: {
//   open: any;
//   onClose: any;
//   amount: any;
//   onPaymentSuccess: () => void;
// }) => {
//   const { open, onClose, amount, onPaymentSuccess } = props;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentInitiated, setPaymentInitiated] = useState(false);
//   useEffect(() => {
//     const confirmPayment = async (transactionId: string) => {
//       try {
//         const response = await axios.post(
//           "http://10.0.20.200:8000/phonepay_payments/status",
//           { transaction_id: transactionId },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response, "response from confirmation");
//         if (response.data.status === "PAYMENT_SUCCESS") {
//           onPaymentSuccess();
//           message.success("Payment Successful");
//           localStorage.removeItem("transactionId");
//           setPaymentInitiated(false);
//           window.location.reload();
//         } else {
//           message.error("Payment failed");
//         }
//       } catch (error) {
//         console.error("Error handling return:", error);
//         message.error("Error confirming payment");
//       }
//     };

//     const queryParams = new URLSearchParams(location.search);
//     const transactionId = queryParams.get("transaction_id");

//     if (transactionId) {
//       confirmPayment(transactionId);
//       // Remove transaction_id from URL without reloading the page
//       const newUrl = `${window.location.pathname}${window.location.search.replace(
//         /[?&]transaction_id=[^&]+/,
//         ""
//       )}`;
//       window.history.replaceState({}, "", newUrl);
//     } else if (paymentInitiated) {
//       const storedTransactionId = localStorage.getItem("transactionId");
//       if (storedTransactionId) {
//         confirmPayment(storedTransactionId);
//       }
//     }
//   }, [location, paymentInitiated, onPaymentSuccess]);

//   const handlePhonePayClick = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/phonepay_payments/token",
//         {
//           amount,
//           return_url: `${window.location.origin}${window.location.pathname}`,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.url) {
//         const transactionId = response.data.transaction_id;
//         localStorage.setItem("transactionId", transactionId);

//         const paymentUrl = response.data.url.replace("TRANSACTION_ID", transactionId);
//         setPaymentInitiated(true);
//         window.location.href = paymentUrl;
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       message.error("Error initiating payment");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRazorpayClick = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/razorpay/token",
//         {
//           amount: amount * 100,
//           user_email: "abcd@ghh.com", // Use actual user email
//           user_phone: "7415555547", // Use actual user phone
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         const loadRazorpayScript = () => {
//           return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = resolve;
//             document.body.appendChild(script);
//           });
//         };

//         await loadRazorpayScript();

//         const options = {
//           key: response.data?.key_id,
//           amount: response.data?.amount,
//           currency: "INR",
//           name: "Mindcom",
//           description: "Test Transaction",
//           order_id: response.data?.order_id,
//           handler: function (response: {
//             razorpay_payment_id: any;
//             razorpay_order_id: any;
//             razorpay_signature: any;
//           }) {
//             console.log(response, "response");

//             axios
//               .post(
//                 "http://10.0.20.200:8000/razorpay/validate",
//                 {
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_signature: response.razorpay_signature,
//                 },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               )
//               .then((res) => {
//                 console.log(res, "res");
//                 if (res.data?.message === "SUCCESS") {
//                   console.log(res.data?.message, "Payment Successful");
//                   onPaymentSuccess();
//                   message.success("Payment Successful");
//                   navigate(location.pathname);
//                 } else {
//                   message.error("Payment failed");
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error validating payment:", error);
//                 message.error("Error validating payment");
//               });
//           },
//           prefill: {
//             name: "Gaurav Kumar",
//             email: "gaurav.kumar@example.com",
//             contact: "9000090000",
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const rzp1 = new (window as any).Razorpay(options);
//         rzp1.open();
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       message.error("Error initiating Razorpay payment");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Choose Payment Method</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={10}>
//             <MDButton
//               variant="contained"
//               color="light"
//               onClick={handlePhonePayClick}
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : "Pay with PhonePe"}
//             </MDButton>
//           </Grid>
//           <Grid item xs={10}>
//             <MDButton
//               variant="contained"
//               color="light"
//               onClick={handleRazorpayClick}
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : "Pay with Razorpay"}
//             </MDButton>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PaymentDialog;

// ***************************************** *********************************//

// import React, { useState, useEffect, useCallback } from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from "@mui/material";
// import MDButton from "components/MDButton";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useLocation, useNavigate } from "react-router-dom";
// import { message } from "antd";

// var Razorpay: any;

// const token = Cookies.get("token");

// const PaymentDialog = (props: {
//   open: boolean;
//   onClose: () => void;
//   amount: number;
//   onPaymentSuccess: () => void;
// }) => {
//   const { open, onClose, amount, onPaymentSuccess } = props;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentInitiated, setPaymentInitiated] = useState(false);

//   const confirmPayment = useCallback(
//     async (transactionId: string) => {
//       try {
//         const response = await axios.post(
//           "http://10.0.20.200:8000/phonepay_payments/status",
//           { transaction_id: transactionId },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response, "response from confirmation");
//         if (response.data.status === "PAYMENT_SUCCESS") {
//           onPaymentSuccess();
//           message.success("Payment Successful");
//         } else {
//           message.error("Payment failed");
//         }
//       } catch (error) {
//         console.error("Error handling return:", error);
//         message.error("Error confirming payment");
//       } finally {
//         localStorage.removeItem("transactionId");
//         setPaymentInitiated(false);
//       }
//     },
//     [onPaymentSuccess]
//   );

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const transactionId = queryParams.get("transaction_id");

//     if (transactionId) {
//       confirmPayment(transactionId);
//       // Remove transaction_id from URL without reloading the page
//       const newUrl = `${window.location.pathname}${window.location.search.replace(
//         /[?&]transaction_id=[^&]+/,
//         ""
//       )}`;
//       window.history.replaceState({}, "", newUrl);
//     } else if (paymentInitiated) {
//       const storedTransactionId = localStorage.getItem("transactionId");
//       if (storedTransactionId) {
//         confirmPayment(storedTransactionId);
//       }
//     }
//   }, [location, paymentInitiated, confirmPayment]);

//   const handlePhonePayClick = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/phonepay_payments/token",
//         {
//           amount,
//           return_url: `${window.location.origin}${window.location.pathname}`,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.url) {
//         const transactionId = response.data.transaction_id;
//         localStorage.setItem("transactionId", transactionId);

//         const paymentUrl = response.data.url.replace("TRANSACTION_ID", transactionId);
//         setPaymentInitiated(true);
//         window.location.href = paymentUrl;
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       message.error("Error initiating payment");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRazorpayClick = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://10.0.20.200:8000/razorpay/token",
//         {
//           amount: amount * 100,
//           user_email: "abcd@ghh.com", // Use actual user email
//           user_phone: "7415555547", // Use actual user phone
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         const loadRazorpayScript = () => {
//           return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = resolve;
//             document.body.appendChild(script);
//           });
//         };

//         await loadRazorpayScript();

//         const options = {
//           key: response.data?.key_id,
//           amount: response.data?.amount,
//           currency: "INR",
//           name: "Mindcom",
//           description: "Test Transaction",
//           order_id: response.data?.order_id,
//           handler: function (response: {
//             razorpay_payment_id: any;
//             razorpay_order_id: any;
//             razorpay_signature: any;
//           }) {
//             console.log(response, "response");

//             axios
//               .post(
//                 "http://10.0.20.200:8000/razorpay/validate",
//                 {
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_signature: response.razorpay_signature,
//                 },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               )
//               .then((res) => {
//                 console.log(res, "res");
//                 if (res.data?.message === "SUCCESS") {
//                   console.log(res.data?.message, "Payment Successful");
//                   onPaymentSuccess();
//                   message.success("Payment Successful");
//                   navigate(location.pathname);
//                 } else {
//                   message.error("Payment failed");
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error validating payment:", error);
//                 message.error("Error validating payment");
//               });
//           },
//           prefill: {
//             name: "Gaurav Kumar",
//             email: "gaurav.kumar@example.com",
//             contact: "9000090000",
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const rzp1 = new (window as any).Razorpay(options);
//         rzp1.open();
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       message.error("Error initiating Razorpay payment");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Choose Payment Method</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={10}>
//             <MDButton
//               variant="contained"
//               color="light"
//               onClick={handlePhonePayClick}
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : "Pay with PhonePe"}
//             </MDButton>
//           </Grid>
//           <Grid item xs={10}>
//             <MDButton
//               variant="contained"
//               color="light"
//               onClick={handleRazorpayClick}
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : "Pay with Razorpay"}
//             </MDButton>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PaymentDialog;
