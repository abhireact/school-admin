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
import ExportEmployeeData from "layouts/pages/employee_details/export_employee_data";
import StudentOverview from "layouts/pages/student_details/student_report/overview_student_data";
import EmployeeProfile from "layouts/pages/employee_details/employee_profile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PortraitIcon from "@mui/icons-material/Portrait";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EmployeeType from "layouts/pages/employee_details/employee_type";
import EmployeeDetails from "layouts/pages/employee_details/employee";
import Academic from "layouts/pages/school/school_academic_year";
import Class from "layouts/pages/school/school_class";
import Wings from "layouts/pages/school/school_wings";
import Department from "layouts/pages/employee_details/department";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
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
import StudentCertificate from "layouts/pages/student_details/student_certificate";
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
import Scholastic from "layouts/pages/exam/scholastic_particular";
import OtherParticular from "layouts/pages/exam/other_particular";
import OtherComponent from "layouts/pages/exam/other_component";
import AssignClassTeacher from "layouts/pages/employee_details/asign_class_teacher";
import EmployeeWeekDays from "layouts/pages/employee_details/employee_week_days";
import StudentWeekDays from "layouts/pages/student_details/student_week_days";
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
import EmployeeArchive from "layouts/pages/employee_details/employee_archive";
import EmployeeArchivePDF from "layouts/pages/employee_details/export_archive_data";
import StudentLeaveApply from "layouts/pages/Attendance/student/leave_apply";
import EmployeeCertificate from "layouts/pages/employee_details/employee_certificate";
import ManagePrincipal from "layouts/pages/employee_details/manage_principal";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import EventTypes from "layouts/pages/event/event_type";
import EventCommittee from "layouts/pages/event/event_committee";
import EventCalendar from "layouts/pages/event/event_calendar";
import Guests from "layouts/pages/event/guests";
import EventAlbum from "layouts/pages/event/event_album";
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
import StudentPhotoUpload from "layouts/pages/student_details/student_bulk_upload";
import FeeCollectionReport from "layouts/pages/fee/fee_report/fee_collection_report";
import EmployeeCategory from "layouts/pages/employee_details/employee_category";
import ManageFeeAdmission from "layouts/pages/admission/manage_fee_admission";
import AdmissionReport from "layouts/pages/admission/admission_report";

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
        key: "student_promotion",
        route: "student/student_promoton",
        component: <StudentPromotion />,
      },
      {
        name: "Student Section Change",
        key: "student_section_change",
        route: "student/student_section_change",
        component: <StudentSectionChange />,
      },
      {
        name: "Student Week Days",
        key: "student_week_days",
        route: "student/student_week_days",
        component: <StudentWeekDays />,
      },
      {
        name: "Student Photo Upload",
        key: "student_photo_upload",
        route: "student/student_photo_upload",
        component: <StudentPhotoUpload />,
      },

      {
        name: "Student Report",
        key: "student_report",
        icon: <Icon fontSize="medium">S</Icon>,
        collapse: [
          {
            name: "Overview of Student Data ",
            key: "student_overview",
            route: "student/student_overview",
            component: <StudentOverview />,
          },
          {
            name: "Student Admission Report",
            key: "student_admission_report",
            route: "student/student_admission_report",
            component: <StudentAdmissionReport />,
          },

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
    name: "Events",
    key: "event",
    icon: (
      <Icon fontSize="medium">
        <EventTwoToneIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Event Types",
        key: "event_types",
        route: "event/event_types",
        component: <EventTypes />,
      },
      {
        name: "Event Committee",
        key: "event_committee",
        route: "event/event_committee",
        component: <EventCommittee />,
      },
      {
        name: "Event Calendar",
        key: "event_calendar",
        route: "event/event_calendar",
        component: <EventCalendar />,
      },
      {
        name: "Event Album",
        key: "album",
        route: "event/album",
        component: <EventAlbum />,
      },
      {
        name: "Guests",
        key: "guests",
        route: "event/guests",
        component: <Guests />,
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
      {
        name: "Scholastic Particular",
        key: "scholastic_particular",
        route: "/pages/exam/scholastic_particular",
        component: <Scholastic />,
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
        name: "Apply Student Leave",
        key: "student_leave_apply",
        route: "attendance/student_leave_apply",
        component: <StudentLeaveApply />,
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
        <AssignmentIndOutlinedIcon />
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
        name: "Assign Class Teacher",
        key: "assignclassteacher",
        route: "employee/assignclassteacher",
        component: <AssignClassTeacher />,
      },
      {
        name: "Employee Week Days",
        key: "employee_week_days",
        route: "employee/employee_week_days",
        component: <EmployeeWeekDays />,
      },
      {
        name: "Employee Archive",
        key: "employee_archive",
        route: "employee/employee_archive",
        component: <EmployeeArchive />,
      },
      {
        name: "Manage Principal",
        key: "manage_principal",
        route: "employee/manage_principal",
        component: <ManagePrincipal />,
      },

      {
        name: "Experience Certificate",
        key: "employee_certificate",
        route: "employee/employee_certificate",
        component: <EmployeeCertificate />,
      },
      {
        name: "Export Employee Data",
        key: "employee_export_data",
        route: "employee/employee_export_data",
        component: <ExportEmployeeData />,
      },
      {
        name: "Export Archive Employee Data",
        key: "export_archived_employee",
        route: "employee/export_archived_employee",
        component: <EmployeeArchivePDF />,
      },
      {
        name: "Employee Category",
        key: "employee_category",
        route: "employee/employee_category",
        component: <EmployeeCategory />,
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
            name: "Fee Register",
            key: "feeregister",
            route: "pages/fee/feeregister",
            component: <FeeRegister />,
          },
          {
            name: "Fee Collection",
            key: "fee_collection_report",
            route: "pages/fee/fee_collection_report",
            component: <FeeCollectionReport />,
          },

          {
            name: "Fee Receipt ",
            key: "feereceiptreport",
            route: "/fee/reports/feereceiptreport",
            component: <FeeReceiptReport />,
          },
          {
            name: "Fee Concession ",
            key: "feeconcessionreport",
            route: "/fee/reports/feeconcessionreport",
            component: <FeeConcessionReport />,
          },
          {
            name: "Fee Defaulter ",
            key: "feedefaulterreport",
            route: "/fee/reports/feedefaulterreport",
            component: <FeeDefaulterReport />,
          },
          {
            name: "Fee Certificate",
            key: "fee_certificate",
            route: "/fee/reports/fee_certificate",
            component: <FeeCertificate />,
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
      {
        name: "Manage Admission",
        key: "manage_admission",
        route: "/pages/admission/manage_admission",
        component: <ManageFeeAdmission />,
      },
      {
        name: "Admission Report",
        key: "admission_report",
        route: "/pages/admission/admission_report",
        component: <AdmissionReport />,
      },
    ],
  },
];

export default routes;
