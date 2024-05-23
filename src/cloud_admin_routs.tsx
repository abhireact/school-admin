// Material Dashboard 2 PRO React layouts
import Icon from "@mui/material/Icon";
import Roles from "layouts/pages/rbac/roles";
import User from "layouts/pages/user";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MessageIcon from "@mui/icons-material/Message";
import SmsSetting from "layouts/pages/cloud_admin/sms/sms_setting";
import SmsConfiguration from "layouts/pages/cloud_admin/sms/sms_configuration";
const CloudAdminRouts = [
  {
    type: "collapse",
    name: "RBAC",
    key: "rbac",
    icon: (
      <Icon fontSize="medium">
        <ManageAccountsIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Roles",
        key: "roles",
        route: "pages/rbac/roles",
        component: <Roles />,
      },
      {
        name: "User",
        key: "user",
        route: "pages/rbac/user",
        component: <User />,
      },
    ],
  },
  {
    type: "collapse",
    name: "SMS",
    key: "sms",
    icon: (
      <Icon fontSize="medium">
        <MessageIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "SMS Setting",
        key: "sms_setting",
        route: "sms/sms_setting",
        component: <SmsSetting />,
      },
      {
        name: "SMS Configuration",
        key: "sms_configuration",
        route: "sms/sms_configuration",
        component: <SmsConfiguration />,
      },
    ],
  },
];
export default CloudAdminRouts;
