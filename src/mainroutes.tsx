// Material Dashboard 2 PRO React layouts
import SchoolIcon from "@mui/icons-material/School";
import Icon from "@mui/material/Icon";
import School from "layouts/pages/school/create";
import Roles from "layouts/pages/rbac/roles";
import SchoolInfo from "layouts/pages/school";
import User from "layouts/pages/user";
import StudentDetails from "layouts/pages/student";
import EmployeeProfile from "layouts/pages/profession";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmployeeType from "layouts/pages/employement_type";
import EmployeeLeave from "layouts/pages/leaves_types";
import EmployeeInfo from "layouts/pages/employee_details";
import Subject from "layouts/pages/subject";
import Academic from "layouts/pages/academic";
import Section from "layouts/pages/section";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/wings";
import Department from "layouts/pages/department";
import PortraitIcon from "@mui/icons-material/Portrait";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
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
      {
        name: "Subject",
        key: "subject",
        route: "pages/school/subject",
        component: <Subject />,
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
    name: "Subject",
    key: "subject",
    icon: (
      <Icon fontSize="medium">
        <LocalLibraryIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Subject",
        key: "subjectinfo",
        route: "pages/subject/subjectinfo",
        component: <Subject />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Employee",
    key: "employee",
    icon: (
      <Icon fontSize="medium">
        <PortraitIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Employee Info",
        key: "employee_info",
        route: "pages/employee/employee_info",
        component: <EmployeeInfo />,
      },
      // {
      //   name: "Class Teacher",
      //   key: "class_teacher",
      //   route: "pages/employee/class_teacher",
      //   component: <ClassTeacher />,
      // },

      {
        name: "Profession",
        key: "employee_profile",
        route: "pages/employee/employee_profile",
        component: <EmployeeProfile />,
      },
      {
        name: "Employment Type",
        key: "employee_type",
        route: "pages/employee/employee_type",
        component: <EmployeeType />,
      },
      {
        name: "Leave Types",
        key: "employee_leave",
        route: "pages/employee/employee_leave",
        component: <EmployeeLeave />,
      },
      {
        name: "Department",
        key: "department",
        route: "pages/employee/department",
        component: <Department />,
      },
    ],
  },
];

export default routes;
