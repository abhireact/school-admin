import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Form from "../form";
export default function ScholasticPerticular(props: any) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Form />
    </DashboardLayout>
  );
}
