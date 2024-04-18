// Material Dashboard 2 PRO React layouts
import SchoolIcon from "@mui/icons-material/School";
import Icon from "@mui/material/Icon";
import EditNoteIcon from "@mui/icons-material/EditNote";
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
import Academic from "layouts/pages/academic_year";
import Section from "layouts/pages/section";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/wings";
import Department from "layouts/pages/department";
import SubSubject from "layouts/pages/sub-subject";
import PortraitIcon from "@mui/icons-material/Portrait";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EmpGrade from "layouts/pages/emp_grade";
import AcademicGrade from "layouts/pages/scholastic_grade";
import NonAcademicGrade from "layouts/pages/non_scholastic_grade";
import ExamType from "layouts/pages/exam_type";
import Scholastic from "layouts/pages/scholastic_particular";
import ScholasticComponent from "layouts/pages/scholastic_component";
import OtherParticular from "layouts/pages/other_particular";
import OtherComponent from "layouts/pages/other_component";
import ExamSchedule from "layouts/pages/exam_schedule";
import Caste from "layouts/pages/caste";
import CasteCategory from "layouts/pages/caste_category";
import StudentCategory from "layouts/pages/student_category";
import HouseDetails from "layouts/pages/house_details";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FeeCategory from "layouts/pages/fee_category";

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
    name: "School",
    key: "school",
    icon: (
      <Icon fontSize="medium">
        <SchoolIcon />
      </Icon>
    ),
    collapse: [
      // {
      //   name: "New School",
      //   key: "new-school",
      //   route: "pages/school/new-school",
      //   component: <School />,
      // },
      {
        name: "School Information",
        key: "schoolinfo",
        route: "pages/school/schoolinfo",
        component: <SchoolInfo />,
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
        name: "Student Info",
        key: "studentdetails",
        route: "/pages/school/studentdetails",
        component: <StudentDetails />,
      },
      {
        name: "Scholastic Grade",
        key: "academicgrade",
        route: "/pages/school/academicgrade",
        component: <AcademicGrade />,
      },
      {
        name: "Non-Scholastic Grade",
        key: "nonacademicgrade",
        route: "/pages/school/nonacademicgrade",
        component: <NonAcademicGrade />,
      },
      {
        name: "Caste",
        key: "caste",
        route: "/pages/school/caste",
        component: <Caste />,
      },
      {
        name: "Caste Category",
        key: "castecategory",
        route: "/pages/school/castecategory",
        component: <CasteCategory />,
      },
      {
        name: "Student Category",
        key: "studentcategory",
        route: "/pages/school/studentcategory",
        component: <StudentCategory />,
      },
      {
        name: "House Details",
        key: "housedetails",
        route: "/pages/school/housedetails",
        component: <HouseDetails />,
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
        name: "Subject Info",
        key: "subjectinfo",
        route: "pages/subject/subjectinfo",
        component: <Subject />,
      },
      {
        name: "Sub-Subject",
        key: "subsubject",
        route: "pages/subject/subsubject",
        component: <SubSubject />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Exam Setting",
    key: "exam",
    icon: (
      <Icon fontSize="medium">
        <EditNoteIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Exam Type",
        key: "examtype",
        route: "pages/exam/examtype",
        component: <ExamType />,
      },
      {
        name: "Scholastic Particular",
        key: "scholastic_particular",
        route: "/pages/exam/scholastic_particular",
        component: <Scholastic />,
      },
      {
        name: "Scholastic Component",
        key: "scholastic_component",
        route: "/pages/exam/scholastic_component",
        component: <ScholasticComponent />,
      },
      {
        name: "Other Particular",
        key: "other_particular",
        route: "/pages/exam/other_particular",
        component: <OtherParticular />,
      },
      {
        name: "Other Component",
        key: "other_component",
        route: "/pages/exam/other_component",
        component: <OtherComponent />,
      },
      {
        name: "Exam Schedule",
        key: "exam_schedule",
        route: "/pages/exam/exam_schedule",
        component: <ExamSchedule />,
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

      {
        name: "Employee Grade",
        key: "employee_grade",
        route: "pages/employee/employee_grade",
        component: <EmpGrade />,
      },

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
        name: "Fee Category",
        key: "fee_category",
        route: "pages/fee/fee_category",
        component: <FeeCategory />,
      },
    ],
  },
];

export default routes;
