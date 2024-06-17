import SignInCover from "layouts/pages/authentication/sign-in";
import ResetCover from "layouts/pages/authentication/reset-password";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Icon from "@mui/material/Icon";
import mainroutes from "mainroutes";
import CloudAdminRouts from "cloud_admin_routs";
import Cookies from "js-cookie";
import axios from "axios";
import MYProfile from "layouts/pages/authentication/myprofile";
import MyDashboard from "layouts/pages/dashboard";
import CreateFeeCategory from "layouts/pages/fee/manage_fee/fee_category/create";
import CreateFeeParicularAmount from "layouts/pages/fee/manage_fee/fee_category/fee_perticular/create_fee_perticular_amount";
import EditFeeParicularAmount from "layouts/pages/fee/manage_fee/fee_category/fee_perticular/edit_fee_perticular_amount";
import ManageFeeAmountPerticular from "layouts/pages/fee/manage_fee/fee_category/fee_perticular";
import CreateConcession from "layouts/pages/fee/manage_fee/fee_concession/create_concession";
import CreateTemplate from "layouts/pages/notifications/create_message_template";
import ClassTiming from "layouts/pages/employee/class_timing";
import ClassTimingCreate from "layouts/pages/employee/class_timing/create";
<<<<<<< HEAD
import SMSConfiguration from "layouts/pages/notifications/sms_configuration";
import React, { createRef } from "react";
import Myrbacroutes from "myrbacroutes";
=======

>>>>>>> main
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
// const data = useSelector((state: any) => state);
const rendered: any = <Myrbacroutes />;
console.log(rendered, "rendered component");

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
    name: "Create Template",
    key: "create_template",
    route: "/notification/create_template",
    component: <CreateTemplate />,
  },
  {
    name: "Class Timing",
    key: "classtiming",
    route: "attendance/class_timing",
    component: <ClassTiming />,
  },
  {
    name: "Create Class Timing",
    key: "createclasstiming",
    route: "attendance/create_class_timing",
    component: <ClassTimingCreate />,
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
