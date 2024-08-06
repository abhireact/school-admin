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
import CreateTemplate from "layouts/pages/notifications/templates/create_message_template";
import ClassTiming from "layouts/pages/employee_details/class_timing";
import ClassTimingCreate from "layouts/pages/employee_details/class_timing/create";
import Fee from "layouts/pages/admission/fee_admission";
import AdmissionForm from "layouts/pages/admission/new_admission";
import AddDate from "layouts/pages/admission/form_setting/add_date";
import Myrbacroutes from "myrbacroutes";
import Settings from "layouts/pages/account/settings";
import StudentAttendance from "layouts/pages/Attendance/student";
import SMSConfiguration from "layouts/pages/cloud_admin/sms_config/sms_configuration";
import ManageSubTemplate from "layouts/pages/admission/form_setting/manage_sub_template";
import Pdf from "layouts/pages/Mindcompdf/Pdf";
import MYAttandance from "layouts/pages/Attendance/employee/my_attendance";
import CreateStudent from "layouts/pages/student_details/student/create";
import ShowAdmission from "layouts/pages/admission/show";
import EditAdmission from "layouts/pages/admission/update";
import ManagePayFee from "layouts/pages/admission/manage_fee_admission/pay_fee";
import Second_CC from "layouts/pages/authentication/Certificate/second_cc";
import CC_one from "layouts/pages/authentication/Certificate/CC_one";
import Certificates from "layouts/pages/student_details/student/certificates";
import Character_Certificate from "layouts/pages/student_details/student/certificates/Character_Certificate";
import TransferCertificateTemplate from "layouts/pages/TransferCertificate/template-settings";
import TransferCertificate from "layouts/pages/TransferCertificate";
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

try {
  if (token) {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
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
      {
        name: "Second CC",
        key: "second_cc",
        route: "/pages/authentication/second_cc",
        component: <Second_CC />,
      },
      {
        name: "Pdf Report",
        key: "pdfreport",
        route: "pages/fee/pdfreport",
        component: <Pdf />,
      },
    ],
  },
  {
    name: "Student  Transfer Certificate",
    key: "tc_create",
    route: "/pages/student_details/student/tc_create",
    component: <TransferCertificate />,
  },
  {
    name: "Transfer Certificate Settings",
    key: "tc_settings",
    route: "/pages/student_details/student/tc_settings",
    component: <TransferCertificateTemplate />,
  },
  {
    name: "create student",
    key: "create_student",
    route: "student/create_student",
    component: <CreateStudent />,
  },
  {
    name: "Student Certificates",
    key: "certificates",
    route: "/pages/student_details/student/certificates",
    component: <Certificates />,
  },
  {
    name: "Character Certificates",
    key: "character_ertificates",
    route: "/pages/student_details/student/certificates/Character_Certificate",
    component: <Character_Certificate />,
  },

  {
    name: "Student Attendance",
    key: "student_attendance",
    route: "attendance/student_attendance",
    component: <StudentAttendance />,
  },
  {
    name: "My Attendance",
    key: "my_atendance",
    route: "attendance/my_attendance",
    component: <MYAttandance />,
  },
  {
    name: "setting",
    key: "setting",
    route: "/sidenav/setting",
    component: <Settings />,
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
  {
    name: "Sms Configuration",
    key: "sms_configuration",
    route: "notification/sms_configuration",
    component: <SMSConfiguration />,
  },
  {
    name: "Admission Fee",
    key: "admission_fee",
    route: "/pages/admission/fee",
    component: <Fee />,
  },
  {
    name: "New Admission",
    key: "new_admission",
    route: "/pages/admission/AdmissionForm",
    component: <AdmissionForm />,
  },
  {
    name: "Add Date",
    key: "add_date",
    route: "/pages/admission/add_date",
    component: <AddDate />,
  },
  {
    name: "Manage Sub Template",
    key: "manage_sub_template",
    route: "/pages/admission/formsetting/manage_sub_template",
    component: <ManageSubTemplate />,
  },
  {
    name: "Show Admission",
    key: "show_admission",
    route: "/pages/admission/show_admission",
    component: <ShowAdmission />,
  },
  {
    name: "Edit Admission",
    key: "edit_admission",
    route: "/pages/admission/edit_admission",
    component: <EditAdmission />,
  },
  {
    name: "Manage Pay Fee",
    key: "manage_pay_fee",
    route: "/pages/admission/manage_admission/pay_fee",
    component: <ManagePayFee />,
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
