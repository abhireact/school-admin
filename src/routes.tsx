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
import SignInCover from "layouts/pages/authentication/sign-in";
import SignUpCover from "layouts/pages/authentication/sign-up";
import ResetCover from "layouts/pages/authentication/reset-password";
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
import CloudAdminRouts from "cloud_admin_routs";
import Academic from "layouts/pages/academic_year";
import Section from "layouts/pages/section";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/school/school_wings";
import Cookies from "js-cookie";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import MYProfile from "layouts/pages/authentication/myprofile";
import FeeCertificate from "layouts/pages/fee/fee_report/fee_certificate";
import FeeRegister from "layouts/pages/fee/fee_report/fee_register_wtihout_paymentmode";
import MyDashboard from "layouts/pages/dashboard";
import CreateFeeCategory from "layouts/pages/fee/manage_fee/fee_category/create";
import CreateFeeParicularAmount from "layouts/pages/fee/manage_fee/fee_category/fee_perticular/create_fee_perticular_amount";
import EditFeeParicularAmount from "layouts/pages/fee/manage_fee/fee_category/fee_perticular/edit_fee_perticular_amount";
import ManageFeeAmountPerticular from "layouts/pages/fee/manage_fee/fee_category/fee_perticular";

import CreateConcession from "layouts/pages/fee/manage_fee/fee_concession/create_concession";
import SendMail from "layouts/pages/Notification_deb/email/send_mail";
let route2 = mainroutes;
console.log(route2, "my mainroutes");
interface RouteItem {
  type: "collapse" | "title"; // Define the type of the route item
  name: string; // Name of the route
  key: string; // Unique key for the route
  icon: JSX.Element; // Icon element for the route
  route?: string; // Optional route path
  component?: JSX.Element; // Optional component for the route
  collapse?: RouteItem[]; // Optional array of nested routes if the type is "collapse"
}
let submm: string[] = [];

const token = Cookies.get("token");
const url = window.location.href;
const parts = url.substring(url.indexOf("http://") + 7).split(".");

// Get the first part which is before the first dot
const trimmed = parts[0];

console.log(trimmed, "school code "); // Output: "mindcom"
try {
  if (token) {
    const response = await axios.get("http://10.0.20.200:8000/mg_rbac_current_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      submm = response.data;
      console.log(" my api routes", submm);
    }
  }
} catch (error) {
  console.error(error);
}
let routes = [
  // pages not to show in left navbar
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
        component: <MyDashboard />,
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
        name: "Reset Password",
        key: "reset-password",
        route: "/authentication/reset-password/cover",
        component: <ResetCover />,
      },
      {
        name: "My Profile",
        key: "myprofile",
        route: "/pages/authentication/myprofile",
        component: <MYProfile />,
      },
    ],
  },
  {
    name: "createfee category",
    key: "createfeecategory",
    route: "/fee/create_fee_category",
    component: <CreateFeeCategory />,
  },
  {
    name: "create fee amount perticular",
    key: "createfeeamountperticular",
    route: "/fee/create_fee_amount_perticular",
    component: <CreateFeeParicularAmount />,
  },
  {
    name: "edit fee amount perticular",
    key: "editfeeamountperticular",
    route: "/fee/edit_fee_amount_perticular",
    component: <EditFeeParicularAmount />,
  },
  {
    name: "Fee amount Perticular",
    key: "manage_fee_amount_perticular",
    route: "/fee/fee_category/manage_fee_amount_perticular",
    component: <ManageFeeAmountPerticular />,
  },

  {
    name: "create conssion",
    key: "createconcession",
    route: "/fee/create_concession",
    component: <CreateConcession />,
  },
  {
    name: "mail send",
    key: "mailsend",
    route: "/notification/send_mail",
    component: <SendMail />,
  },
];

if (token && trimmed == "mindcom") {
  routes = CloudAdminRouts;
} else {
  for (const i of route2 as RouteItem[]) {
    const module: any = {};
    module.name = i.name;
    module.key = i.key;
    module.type = i.type;
    module.icon = i.icon;
    const submodule: any[] = [];

    if (i.collapse) {
      for (const j of i.collapse) {
        if (submm.includes(j.key)) {
          submodule.push(j);
        } else {
          if (submm.includes(j.key)) {
            submodule.push(j);
          }
        }
      }
    }

    module.collapse = submodule;
    if (module.collapse.length > 0) {
      routes.push(module);
    }
    console.log(" my complete routes", routes);
  }
}

export default routes;

export { route2 };
