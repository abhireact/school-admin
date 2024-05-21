// Material Dashboard 2 PRO React layouts
import Icon from "@mui/material/Icon";
import Roles from "layouts/pages/rbac/roles";
import User from "layouts/pages/user";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Module from "layouts/pages/cloud_admin/modules";
import SchoolCreation from "layouts/pages/cloud_admin/school";
import Update from "layouts/pages/cloud_admin/school/update";
import Create from "layouts/pages/cloud_admin/school/create";
const CloudAdminRouts = [
  {
    type: "collapse",
    name: "Module",
    key: "module",
    icon: (
      <Icon fontSize="medium">
        <ManageAccountsIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "All module",
        key: "all_module",
        route: "pages/module/all_module",
        component: <Module />,
      },
    ],
  },
  {
    type: "collapse",
    name: "School",
    key: "school",
    icon: (
      <Icon fontSize="medium">
        <ManageAccountsIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "All school",
        key: "all_school",
        route: "pages/school/all_school",
        component: <SchoolCreation />,
      },
    ],
  },
  {
    name: "Create School",
    key: "create_school",
    route: "/school/create_school",
    component: <Create />,
  },
  {
    name: "Edit School",
    key: "edit_school",
    route: "/school/edit_school",
    component: <Update />,
  },
];
export default CloudAdminRouts;
