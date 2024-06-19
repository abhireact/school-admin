import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Cookies from "js-cookie";
import SMSConfigurationCreate from "./sms_configuration_create";
const token = Cookies.get("token");
const initialValues = {
  url: "",
  mobile_number_attribute: "",
  attribute: "",
  unicode_key: "",
  unicode_value: "",
  request_type: "",
  sender_id: "",
  sender_id_value: "",
  vender_name: "",
  english_key: "",
  maximum_sms_Support: 0,
  english_value: "",
  support_multiple_sms: false,
};

export default function SMSConfiguration() {
  return (
    <DashboardLayout>
      <SMSConfigurationCreate />
    </DashboardLayout>
  );
}
