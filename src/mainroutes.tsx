// Material Dashboard 2 PRO React layouts
import SchoolIcon from "@mui/icons-material/School";
import Icon from "@mui/material/Icon";
import Roles from "layouts/pages/rbac/roles";
import SchoolInfo from "layouts/pages/school";
import StudentDetails from "layouts/pages/student";
import EmployeeProfile from "layouts/pages/employee/employee_profile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmployeeType from "layouts/pages/employee/employee_type";
import EmployeeInfo from "layouts/pages/employee/employee_details";
import Academic from "layouts/pages/academic_year";
import Class from "layouts/pages/class";
import Wings from "layouts/pages/school/school_wings";
import Department from "layouts/pages/employee/department";
import PortraitIcon from "@mui/icons-material/Portrait";
import BadgeIcon from "@mui/icons-material/Badge";
import EmpGrade from "layouts/pages/employee/employee_grade";
import Caste from "layouts/pages/student/caste";
import CasteCategory from "layouts/pages/student/caste_category";
import StudentCategory from "layouts/pages/student/student_category";
import HouseDetails from "layouts/pages/student/house_details";
import SchoolAccount from "layouts/pages/school/school_account";
import ExcessFee from "layouts/pages/fee/manage_fee/excess_fee";
import LateFee from "layouts/pages/fee/manage_fee/late_fee";
import FeeSchedule from "layouts/pages/fee/manage_fee/fee_schedule";
import FeeCertificate from "layouts/pages/fee/fee_report/fee_certificate";
import FeeRegister from "layouts/pages/fee/fee_report/fee_register_wtihout_paymentmode";
import StudentCertificate from "layouts/pages/fee/fee_report/student_certificate";
import Admin from "layouts/pages/school/create";
import FeeCategory from "layouts/pages/fee/manage_fee/fee_category";
import FeeConcession from "layouts/pages/fee/manage_fee/fee_concession";
import FeeReceiptReport from "layouts/pages/fee/fee_report/fee_receipt";
import FeeConcessionReport from "layouts/pages/fee/fee_report/fee_concession_report";
import EmailSetting from "layouts/pages/notifications/email";
import FeeCollection from "layouts/pages/fee/fee_collection";
import SendNotification from "layouts/pages/notifications/email/send_mail";
import MessageTemplate from "layouts/pages/notifications/message_template";
import FineParticular from "layouts/pages/fee/manage_fee/fine";
import FeeDefaulterReport from "layouts/pages/fee/fee_report/fee_defaulter";
import FeeReceipt from "layouts/pages/fee/manage_fee/generate_fee_slip";
import StudentPromotion from "layouts/pages/student/student_promotion";
import ExportStudentPage from "layouts/pages/student/export_student_data";

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
        name: "Master Admin",
        key: "master",
        route: "pages/rbac/master",
        component: <Admin />,
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
        name: "Account",
        key: "schoolaccount",
        route: "pages/school/schoolaccount",
        component: <SchoolAccount />,
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
      // {
      //   name: "Section",
      //   key: "section",
      //   route: "pages/school/section",
      //   component: <Section />,
      // },
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
        name: "Export Student Page",
        key: "export_student_data",
        route: "/pages/school/export_student_data",
        component: <ExportStudentPage />,
      },
      // {
      //   name: "Scholastic Grade",
      //   key: "academicgrade",
      //   route: "/pages/school/academicgrade",
      //   component: <AcademicGrade />,
      // },
      // {
      //   name: "Non-Scholastic Grade",
      //   key: "nonacademicgrade",
      //   route: "/pages/school/nonacademicgrade",
      //   component: <NonAcademicGrade />,
      // },
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
      {
        name: "Student Promotion",
        key: "studentpromotion",
        route: "/student/student_promoton",
        component: <StudentPromotion />,
      },
    ],
  },

  // {
  //   type: "collapse",
  //   name: "Subject",
  //   key: "subject",
  //   icon: (
  //     <Icon fontSize="medium">
  //       <LocalLibraryIcon />
  //     </Icon>
  //   ),
  //   collapse: [
  //     {
  //       name: "Subject Info",
  //       key: "subjectinfo",
  //       route: "pages/subject/subjectinfo",
  //       component: <Subject />,
  //     },
  //     {
  //       name: "Sub-Subject",
  //       key: "subsubject",
  //       route: "pages/subject/subsubject",
  //       component: <SubSubject />,
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Exam Setting",
  //   key: "exam",
  //   icon: (
  //     <Icon fontSize="medium">
  //       <EditNoteIcon />
  //     </Icon>
  //   ),
  //   collapse: [
  //     {
  //       name: "Exam Type",
  //       key: "examtype",
  //       route: "pages/exam/examtype",
  //       component: <ExamType />,
  //     },
  //     {
  //       name: "Scholastic Particular",
  //       key: "scholastic_particular",
  //       route: "/pages/exam/scholastic_particular",
  //       component: <Scholastic />,
  //     },
  //     {
  //       name: "Scholastic Component",
  //       key: "scholastic_component",
  //       route: "/pages/exam/scholastic_component",
  //       component: <ScholasticComponent />,
  //     },
  //     {
  //       name: "Other Particular",
  //       key: "other_particular",
  //       route: "/pages/exam/other_particular",
  //       component: <OtherParticular />,
  //     },
  //     {
  //       name: "Other Component",
  //       key: "other_component",
  //       route: "/pages/exam/other_component",
  //       component: <OtherComponent />,
  //     },
  //     {
  //       name: "Exam Schedule",
  //       key: "exam_schedule",
  //       route: "/pages/exam/exam_schedule",
  //       component: <ExamSchedule />,
  //     },
  //   ],
  // },
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
      // {
      //   name: "Leave Types",
      //   key: "employee_leave",
      //   route: "pages/employee/employee_leave",
      //   component: <EmployeeLeave />,
      // },
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
    name: "Notification",
    key: "Notification",
    icon: (
      <Icon fontSize="medium">
        <PortraitIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Email",
        key: "email",
        collapse: [
          {
            name: "Email Configuration",
            key: "emailconfiguration",
            route: "pages/notification/emailconfiguration",
            component: <EmailSetting />,
          },

          // {
          //   name: "SMS",
          //   key: "sms",
          //   route: "pages/notification/sms",
          //   component: <FeeCertificate />,
          // },
        ],
      },
      {
        name: "Send Notification",
        key: "send_notification",
        route: "pages/notification/send_notification",
        component: <SendNotification />,
      },
      {
        name: "Message Template",
        key: "message_template",
        route: "pages/notification/message_template",
        component: <MessageTemplate />,
      },
    ],
  },

  // {
  //   type: "collapse",
  //   name: "Fee",
  //   key: "fee",
  //   icon: (
  //     <Icon fontSize="medium">
  //       <CurrencyRupeeIcon />
  //     </Icon>
  //   ),
  //   collapse: [
  //     {
  //       name: "Late Fee",
  //       key: "latefee",
  //       route: "pages/fee/latefee",
  //       component: <LateFee />,
  //     },
  //     {
  //       name: "Excess Fee ",
  //       key: "excessfee",
  //       route: "pages/fee/excessfee",
  //       component: <ExcessFee />,
  //     },
  //     {
  //       name: "Fine Particular",
  //       key: "fineparticular",
  //       route: "pages/fee/fineparticular",
  //       component: <FineParticular />,
  //     },
  //     {
  //       name: "Fee Collection",
  //       key: "feecollection",
  //       route: "pages/fee/feecollection",
  //       component: <FeeCollection />,
  //     },
  //     {
  //       name: "Fee By Admission Number",
  //       key: "feecollectionbyadmission",
  //       route: "pages/fee/feecollectionbyadmission",
  //       component: <FeeCollectionByAdmission />,
  //     },

  //     {
  //       name: "Fee Schedule",
  //       key: "feeschedule",
  //       route: "pages/fee/feeschedule",
  //       component: <FeeSchedule />,
  //     },
  {
    name: "Fine",
    key: "fineparticular",
    route: "pages/fee/fineparticular",
    component: <FineParticular />,
  },
  {
    name: "Generate Fee Slip",
    key: "feereceipt",
    route: "pages/fee/feereceipt",
    component: <FeeReceipt />,
  },
  //       route: "pages/fee/feeregister",
  //       component: <FeeRegister />,
  //     },
  //     {
  //       name: "Student Certificate",
  //       key: "studentcertificate",
  //       route: "pages/fee/studentcertificate",
  //       component: <StudentCertificate />,
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "Fee",
    key: "fee",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Manage Fee",
        key: "manage_fee",
        collapse: [
          {
            name: "Fee Category",
            key: "fee_category",
            route: "fee/fee_category",
            component: <FeeCategory />,
          },
          {
            name: "Fee Concession",
            key: "fee_concession",
            route: "fee/fee_concession",
            component: <FeeConcession />,
          },
          {
            name: "Late Fee",
            key: "latefee",
            route: "pages/fee/latefee",
            component: <LateFee />,
          },
          {
            name: "Fee Schedule",
            key: "feeschedule",
            route: "pages/fee/feeschedule",
            component: <FeeSchedule />,
          },
          {
            name: "Excess Fee ",
            key: "excessfee",
            route: "pages/fee/excessfee",
            component: <ExcessFee />,
          },

          // {
          //   name: "Fee By Admission No",
          //   key: "feecollectionbyadmission",
          //   route: "pages/fee/feecollectionbyadmission",
          //   component: <FeeCollectionByAdmission />,
          // },

          {
            name: "Fine",
            key: "fineparticular",
            route: "pages/fee/fineparticular",
            component: <FineParticular />,
          },
        ],
      },
      // Fee Collection
      {
        // type: "collapse",
        name: "Fee Collection",
        icon: <Icon fontSize="medium">F</Icon>,
        key: "feecollection",

        collapse: [
          {
            name: "Fee Collection",
            key: "feecollection",
            route: "pages/fee/feecollection",
            component: <FeeCollection />,
          },
        ],
      },
      {
        // type: "collapse",
        name: "Fee Reports",
        icon: <Icon fontSize="medium">F</Icon>,
        key: "feereports",

        collapse: [
          {
            name: "Fee Register without Payment Mode",
            key: "feeregister",
            route: "pages/fee/feeregister",
            component: <FeeRegister />,
          },
          {
            name: "Fee Certificate",
            key: "feecertificate",
            route: "pages/fee/feecertificate",
            component: <FeeCertificate />,
          },
          {
            name: "Student Certificate",
            key: "studentcertificate",
            route: "pages/fee/studentcertificate",
            component: <StudentCertificate />,
          },
          {
            name: "Fee Receipt Report",
            key: "feereceiptreport",
            route: "/fee/reports/feereceiptreport",
            component: <FeeReceiptReport />,
          },
          {
            name: "Fee Concession Report",
            key: "feeconcessionreport",
            route: "/fee/reports/feeconcessionreport",
            component: <FeeConcessionReport />,
          },
          {
            name: "Fee Defaulter Report",
            key: "feedefaulterreport",
            route: "/fee/reports/feedefaulterreport",
            component: <FeeDefaulterReport />,
          },
        ],
      },
    ],
  },
];

export default routes;
