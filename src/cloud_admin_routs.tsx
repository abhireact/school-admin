// Material Dashboard 2 PRO React layouts
import Icon from "@mui/material/Icon";
import Roles from "layouts/pages/rbac/roles";
import User from "layouts/pages/user";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

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
];
export default CloudAdminRouts;
