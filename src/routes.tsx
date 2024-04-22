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
import Academic from "layouts/pages/academic_year";
import Section from "layouts/pages/section";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/wings";
import Cookies from "js-cookie";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import MYProfile from "layouts/pages/myprofile";
import StudentDetails from "layouts/pages/student";
import NewStudent from "layouts/pages/student/create";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ExcessFee from "layouts/pages/excess_fee";
import LateFee from "layouts/pages/late_fee";
import FineParticular from "layouts/pages/fine";
import FeeCollection from "layouts/pages/fee_collection";
import FeeCollectionByAdmission from "layouts/pages/fee_collection _by_admission";
import FeeReceipt from "layouts/pages/fee_receipt";

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

try {
  if (token) {
    const response = await axios.get("http://10.0.20.121:8000/mg_rbac_current_user", {
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
      {
        type: "collapse",
        name: "Fee",
        key: "fee",
        icon: (
          <Icon fontSize="medium">
            <CurrencyRupeeIcon />
          </Icon>
        ),
        collapse: [
          {
            name: "Late Fee",
            key: "latefee",
            route: "pages/fee/latefee",
            component: <LateFee />,
          },
          {
            name: "Excess Fee ",
            key: "excessfee",
            route: "pages/fee/excessfee",
            component: <ExcessFee />,
          },
          {
            name: "Fine Particular",
            key: "fineparticular",
            route: "pages/fee/fineparticular",
            component: <FineParticular />,
          },
          {
            name: "Fee Collection",
            key: "feecollection",
            route: "pages/fee/feecollection",
            component: <FeeCollection />,
          },
          {
            name: "Fee By Admission Number",
            key: "feecollectionbyadmission",
            route: "pages/fee/feecollectionbyadmission",
            component: <FeeCollectionByAdmission />,
          },
          {
            name: "Fee Receipt",
            key: "feereceipt",
            route: "pages/fee/feereceipt",
            component: <FeeReceipt />,
          },
        ],
      },
    ],
  },
];
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
export default routes;

export { route2 };
