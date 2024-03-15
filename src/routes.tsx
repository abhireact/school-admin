// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";

import SignInCover from "layouts/authentication/sign-in";

import SignUpCover from "layouts/authentication/sign-up";
import ResetCover from "layouts/authentication/reset-password";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SchoolIcon from "@mui/icons-material/School";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import profilePicture from "assets/images/team-3.jpg";
import School from "layouts/pages/school/create";
import Roles from "layouts/pages/rbac/roles";
import SchoolInfo from "layouts/pages/school";
import User from "layouts/pages/user";
import Student from "layouts/pages/student";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import mainroutes from "mainroutes";

let route2 = mainroutes;
console.log(route2, "my mainroutes");

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
        component: <Sales />,
      },
    ],
  },

  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: (
      <Icon fontSize="medium">
        <VpnKeyIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        route: "/authentication/sign-in/cover",
        component: <SignInCover />,
      },
      {
        name: "Sign Up",
        key: "sign-up",
        route: "/authentication/sign-up/cover",
        component: <SignUpCover />,
      },
      {
        name: "Reset Password",
        key: "reset-password",
        route: "/authentication/reset-password/cover",
        component: <ResetCover />,
      },
    ],
  },
  {
    type: "collapse",
    name: "School",
    key: "school",
    icon: (
      <Icon fontSize="medium">
        <SchoolIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "New School",
        key: "new-school",
        route: "pages/school/new-school",
        component: <School />,
      },
      {
        name: "School Information",
        key: "schoolinfo",
        route: "pages/school/schoolinfo",
        component: <SchoolInfo />,
      },
      {
        name: "User",
        key: "user",
        route: "pages/school/user",
        component: <User />,
      },
      {
        name: "Student",
        key: "student",
        route: "pages/school/student",
        component: <Student />,
      },
    ],
  },
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
    ],
  },
];

export default routes;
export { route2 };
