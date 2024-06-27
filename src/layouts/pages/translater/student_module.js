import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Configuration for i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Edit: "Edit",
        school_details: "School Details",
        school_name: "School Name",
        school_code: "School Code",
        start_time: "Start Time",
        end_time: "End Time",
        affiliated_to: "Affiliated To",
        affiliated_no_reg_no: " Affiliation No/Reg No",
        leave_calender_start_date: "Leave Calendar Start Date",
        address_details: "Address Details",
        address_line_1: "Address Line 1",
        address_line_2: "Address Line 2",
        street: "Street",
        city: "City",
        state: "State",
        pincode: "Pincode",
        landmark: "Landmark",
        country: "Country",
        phone_number: "Phone Number",
        contact_details: "Contact Details",
        email: "Email",
        fax_number: "Fax Number",
        College: "College",
        School: "School",
      },
    },
    hi: {
      translation: {
        Edit: "संपादन करना",
        school_details: "स्कूल विवरण",
        school_name: "स्कूल के नाम",
        school_code: "स्कूल कोड",
        start_time: "समय शुरू",
        end_time: "अंत समय",
        affiliated_to: "से संबद्ध",
        affiliated_no_reg_no: "संबद्धता संख्या/पंजीकरण संख्या",
        leave_calender_start_date: "कैलेंडर आरंभ तिथि छोड़ें",
        address_details: "पते का विवरण",
        address_line_1: "पता पंक्ति 1",
        address_line_2: "पता पंक्ति 2",
        street: "गली",
        city: "शहर",
        state: "राज्य",
        pincode: "पिन कोड",
        landmark: "लैंडमार्क",
        country: "देश",
        phone_number: "फ़ोन नंबर",
        contact_details: "सम्पर्क करने का विवरण",
        email: "ईमेल",
        fax_number: "फैक्स नंबर",
        College: "कॉलेज",
        School: "स्कूल",
      },
    },
  },
  fallbackLng: "hi",
  lng: "hi",
  interpolation: {
    escapeValue: false, // React already escapes the values, so no need for additional escaping
  },
});

export default i18n;
