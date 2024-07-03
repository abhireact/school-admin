// Material Dashboard 2 PRO React layouts
import SchoolIcon from "@mui/icons-material/School";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Icon from "@mui/material/Icon";
import Roles from "layouts/pages/rbac/roles";
import SchoolInfo from "layouts/pages/school";
import StudentDetails from "layouts/pages/student_details/student";
import StudentArchive from "layouts/pages/student_details/student_archive";
import StudentClassListReport from "layouts/pages/student_details/student_report/student_classlist_report";
import ExportStudentData from "layouts/pages/student_details/student_report/export_student_data";
import EmployeeProfile from "layouts/pages/employee_details/employee_profile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EmployeeType from "layouts/pages/employee_details/employee_type";
import EmployeeDetails from "layouts/pages/employee_details/employee";
import Academic from "layouts/pages/school/school_academic_year";
import Class from "layouts/pages/school/school_class";
``;
import Wings from "layouts/pages/school/school_wings";
import Department from "layouts/pages/employee_details/department";
import PortraitIcon from "@mui/icons-material/Portrait";
import BadgeIcon from "@mui/icons-material/Badge";
import EmpGrade from "layouts/pages/employee_details/employee_grade";
import Caste from "layouts/pages/student_details/caste";
import CasteCategory from "layouts/pages/student_details/caste_category";
import StudentCategory from "layouts/pages/student_details/student_category";
import HouseDetails from "layouts/pages/student_details/house_details";
import SchoolAccount from "layouts/pages/school/school_account";
import ExcessFee from "layouts/pages/fee/manage_fee/excess_fee";
import LateFee from "layouts/pages/fee/manage_fee/late_fee";
import FeeSchedule from "layouts/pages/fee/manage_fee/fee_schedule";
import FeeCertificate from "layouts/pages/fee/fee_report/fee_certificate";
import FeeRegister from "layouts/pages/fee/fee_report/fee_register";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import StudentCertificate from "layouts/pages/fee/fee_report/student_certificate";
import FeeCategory from "layouts/pages/fee/manage_fee/fee_category";
import FeeConcession from "layouts/pages/fee/manage_fee/fee_concession";
import FeeReceiptReport from "layouts/pages/fee/fee_report/fee_receipt";
import FeeConcessionReport from "layouts/pages/fee/fee_report/fee_concession_report";
import EmailSetting from "layouts/pages/notifications/email";
import FeeCollection from "layouts/pages/fee/fee_collection";
import SendNotification from "layouts/pages/notifications/email/send_notification";
import MessageTemplate from "layouts/pages/notifications/templates/message_template";
import FineParticular from "layouts/pages/fee/manage_fee/fine";
import FeeDefaulterReport from "layouts/pages/fee/fee_report/fee_defaulter";
import FeeReceipt from "layouts/pages/fee/manage_fee/generate_fee_slip";
import StudentPromotion from "layouts/pages/student_details/student_promotion";
import SubjectDetails from "layouts/pages/subject_details/subject";
import SectionSubject from "layouts/pages/subject_details/section_subject";
import SubjectTeacher from "layouts/pages/subject_details/subject_teacher";
import StudentSectionChange from "layouts/pages/student_details/student_section_change";

//EXAMINATION module
import Examtype from "layouts/pages/exam/exam_type";
import AssignClassTeacher from "layouts/pages/employee_details/asign_class_teacher";
import WeekDays from "layouts/pages/employee_details/week_days";
import ClassTiming from "layouts/pages/employee_details/class_timing";
import TimeTable from "layouts/pages/Attendance/time_table";
import SMSConfigurationCreateSchoolAdmin from "layouts/pages/notifications/sms/school_admin_sms_configuration";
import StudentSubject from "layouts/pages/subject_details/student_subject";
import SubjectReport from "layouts/pages/subject_details/subject_report";
import SmsStatusReport from "layouts/pages/notifications/reports/sms_status";
import IntraPortalStatusReport from "layouts/pages/notifications/reports/intra-portal_status";
import StudentAttendance from "layouts/pages/Attendance/student";
import FormSetting from "layouts/pages/admission/form_setting";
import StudentAdmission from "layouts/pages/admission";
import StudentAdmissionReport from "layouts/pages/student_details/student_report/student_admission_report";
import StudentAttendanceReport from "layouts/pages/Attendance/reports/student_attendance_report";
import StudentAttendanceDateWiseReport from "layouts/pages/Attendance/reports/student_date_wise";
import Consolidiration from "layouts/pages/Attendance/reports/consolidiration";
import EmployeeAttendance from "layouts/pages/Attendance/employee/employee_attendance";
import TakeAttandance from "layouts/pages/Attendance/employee/take_attendance";
import MYAttandance from "layouts/pages/Attendance/employee/my_attendance";
// Define your variables
const collegee: "College" | "School" = "School"; // Adjust this based on your actual logic
const languagee: "hi" | "en" = "en"; // Adjust this based on your actual logic

// Translation dictionary
const translater = {
  hi: {
    College: "कॉलेज",
    School: "स्कूल",
    school_information: "स्कूल सूचना",
  },
  en: {
    College: "College",
    School: "School",
    school_information: "School Information",
  },
};
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

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
      // {
      //   name: "Master Admin",
      //   key: "master",
      //   route: "pages/rbac/master",
      //   component: <Admin />,
      // },
    ],
  },

  {
    type: "collapse",
    name: translater[languagee][collegee],
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
        name: translater[languagee].school_information,
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
  // Student
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
        route: "student/student_details",
        component: <StudentDetails />,
      },
      {
        name: "Student Archive",
        key: "studentarchive",
        route: "student/student_archive",
        component: <StudentArchive />,
      },

      {
        name: "Student Promotion",
        key: "studentpromotion",
        route: "student/student_promoton",
        component: <StudentPromotion />,
      },
      {
        name: "Student Section Change",
        key: "studentsectionchange",
        route: "student/student_section_change",
        component: <StudentSectionChange />,
      },
      {
        name: "Student Report",
        key: "student_report",
        icon: <Icon fontSize="medium">S</Icon>,
        collapse: [
          {
            name: "Student Class List Report",
            key: "student_classlist_report",
            route: "student/student_classlist_report",
            component: <StudentClassListReport />,
          },
          {
            name: "Export Student Data",
            key: "student_export_data",
            route: "student/student_export_report",
            component: <ExportStudentData />,
          },
          {
            name: "Student Admission Report",
            key: "student_admission_report",
            route: "student/student_admission_report",
            component: <StudentAdmissionReport />,
          },
        ],
      },
      {
        name: "Caste",
        key: "caste",
        route: "student/caste",
        component: <Caste />,
      },
      {
        name: "Caste Category",
        key: "castecategory",
        route: "student/castecategory",
        component: <CasteCategory />,
      },
      {
        name: "Student Category",
        key: "studentcategory",
        route: "student/studentcategory",
        component: <StudentCategory />,
      },
      {
        name: "House Details",
        key: "housedetails",
        route: "student/housedetails",
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
        name: "Subject Details",
        key: "subject_details",
        route: "subject/subject_details",
        component: <SubjectDetails />,
      },
      {
        name: "Subject Teacher",
        key: "subject_teacher",
        route: "subject/subject_teacher",
        component: <SubjectTeacher />,
      },
      {
        name: "Section Subject",
        key: "section_subject",
        route: "subject/section_subject",
        component: <SectionSubject />,
      },
      {
        name: "Student Subject",
        key: "student_subject",
        route: "subject/student_subject",
        component: <StudentSubject />,
      },
      {
        name: "Subject Report",
        key: "subject_report",
        route: "subject/subject_report",
        component: <SubjectReport />,
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
        component: <Examtype />,
      },
      // {
      //   name: "Scholastic Particular",
      //   key: "scholastic_particular",
      //   route: "/pages/exam/scholastic_particular",
      //   component: <Scholastic />,
      // },
      // {
      //   name: "Scholastic Component",
      //   key: "scholastic_component",
      //   route: "/pages/exam/scholastic_component",
      //   component: <ScholasticComponent />,
      // },
      // {
      //   name: "Other Particular",
      //   key: "other_particular",
      //   route: "/pages/exam/other_particular",
      //   component: <OtherParticular />,
      // },
      // {
      //   name: "Other Component",
      //   key: "other_component",
      //   route: "/pages/exam/other_component",
      //   component: <OtherComponent />,
      // },
      // {
      //   name: "Exam Schedule",
      //   key: "exam_schedule",
      //   route: "/pages/exam/exam_schedule",
      //   component: <ExamSchedule />,
      // },
    ],
  },
  {
    type: "collapse",
    name: "Attendance",
    key: "attendance",
    collapse: [
      {
        name: "Class Timing",
        key: "classtiming",
        route: "attendance/class_timing",
        component: <ClassTiming />,
      },
      {
        name: "Time Table",
        key: "time_table",
        route: "attendance/time_table",
        component: <TimeTable />,
      },
      {
        name: "Student Attendance",
        key: "student_attendance",
        route: "attendance/take_student_attendance",
        component: <StudentAttendance />,
      },
      {
        name: "Reports",
        key: "attendance_reports",
        collapse: [
          {
            name: "Student Attendance Report",
            key: "student_attendance_report",
            route: "attendance/report/student_attendance",
            component: <StudentAttendanceReport />,
          },
          {
            name: "Student Attendance Date Wise",
            key: "student_attendance_dateWise_report",
            route: "attendance/report/student_attendance_dateWise_report",
            component: <StudentAttendanceDateWiseReport />,
          },
          {
            name: "Student Consolidate",
            key: "student_consolidate",
            route: "attendance/report/student_consolidate",
            component: <Consolidiration />,
          },
        ],
      },
      {
        name: "Employee Attendance",
        key: "employee_attendance",
        collapse: [
          {
            name: "Employee Attendance",
            key: "employee_atendance",
            route: "attendance/employee_attendance",
            component: <EmployeeAttendance />,
          },
          {
            name: "Take Attendance",
            key: "take_atendance",
            route: "attendance/take_employee_attendance",
            component: <TakeAttandance />,
          },
          {
            name: "My Attendance",
            key: "my_atendance",
            route: "attendance/my_attendance",
            component: <MYAttandance />,
          },
        ],
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
        name: "Employee Details",
        key: "employee_details",
        route: "employee/employee_details",
        component: <EmployeeDetails />,
      },

      {
        name: "Employee Grade",
        key: "employee_grade",
        route: "employee/employee_grade",
        component: <EmpGrade />,
      },

      {
        name: "Employee Profile",
        key: "employee_profile",
        route: "employee/employee_profile",
        component: <EmployeeProfile />,
      },
      {
        name: "Employee Type",
        key: "employee_type",
        route: "employee/employee_type",
        component: <EmployeeType />,
      },

      {
        name: "Department",
        key: "department",
        route: "employee/department",
        component: <Department />,
      },
      {
        name: "Assign Class Teacher",
        key: "assignclassteacher",
        route: "employee/assignclassteacher",
        component: <AssignClassTeacher />,
      },
      {
        name: "Week Days",
        key: "weekdays",
        route: "employee/week_days",
        component: <WeekDays />,
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
        ],
      },
      {
        name: "SMS",
        key: "sms",
        collapse: [
          {
            name: "SMS Configuration",
            key: "smsconfiguration",
            route: "notification/smsconfiguration",
            component: <SMSConfigurationCreateSchoolAdmin />,
          },
        ],
      },
      {
        name: "Reports",
        key: "notification_reports",
        collapse: [
          {
            name: "SMS Status",
            key: "smsstatusreport",
            route: "/notification/reports/sms_status_report",
            component: <SmsStatusReport />,
          },
          {
            name: "Intra-portal Status",
            key: "intraportalstatusreport",
            route: "/notification/reports/intra-portal_status_report",
            component: <IntraPortalStatusReport />,
          },
        ],
      },
      {
        name: "Send Notification",
        key: "send_notification",
        route: "pages/notification/send_notification",
        component: <SendNotification />,
      },
      {
        name: "Template Setting",
        key: "message_template",
        route: "pages/notification/message_template",
        component: <MessageTemplate />,
      },
    ],
  },

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

  // Fee
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

  {
    type: "collapse",
    name: "Admission",
    key: "admissionfolder",
    icon: (
      <Icon fontSize="medium">
        <BookOnlineIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Form Setting",
        key: "formsetting",
        route: "pages/admission/formsetting",
        component: <FormSetting />,
      },
      {
        name: "Admission",
        key: "admissionpage",
        route: "pages/admission/studentAdmission",
        component: <StudentAdmission />,
      },
    ],
  },
];

export default routes;
