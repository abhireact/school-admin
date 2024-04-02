// Material Dashboard 2 PRO React layouts

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
import StudentDetails from "layouts/pages/student";
import EmployeeProfile from "layouts/pages/employee_profile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmployeeType from "layouts/pages/employee_type";
import EmployeeLeave from "layouts/pages/employee_leave";
import Academic from "layouts/pages/academic";
import Section from "layouts/pages/section";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/wings";
import Department from "layouts/pages/department";
import AttributionIcon from "@mui/icons-material/Attribution";
import BadgeIcon from "@mui/icons-material/Badge";
const routes = [
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
        name: "Academic Year",
        key: "academic",
        route: "pages/school/academic",
        component: <Academic />,
      },
      {
        name: "Wings",
        key: "wings",
        route: "pages/school/wings",
        component: <Wings />,
      },
      {
        name: "Class",
        key: "class",
        route: "pages/school/class",
        component: <Class />,
      },
      {
        name: "Section",
        key: "section",
        route: "pages/school/section",
        component: <Section />,
      },
    ],
  },

  {
    type: "collapse",
    name: "Student",
    key: "student",
    icon: (
      <Icon fontSize="medium">
        <BadgeIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Student Details",
        key: "studentdetails",
        route: "/pages/school/studentdetails",
        component: <StudentDetails />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Employee",
    key: "employee",
    icon: (
      <Icon fontSize="medium">
        <AttributionIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Department",
        key: "department",
        route: "pages/employee/department",
        component: <Department />,
      },
      {
        name: "Employee Profile",
        key: "employee_profile",
        route: "pages/employee/employee_profile",
        component: <EmployeeProfile />,
      },
      {
        name: "Employee Type",
        key: "employee_type",
        route: "pages/employee/employee_type",
        component: <EmployeeType />,
      },
      {
        name: "Employee Leave",
        key: "employee_leave",
        route: "pages/employee/employee_leave",
        component: <EmployeeLeave />,
      },
    ],
  },
];

export default routes;
