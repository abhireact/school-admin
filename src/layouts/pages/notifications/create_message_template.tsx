import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CreateTemplateForm from "./template_form";
export default function CreateTemplate() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CreateTemplateForm />
    </DashboardLayout>
  );
}
