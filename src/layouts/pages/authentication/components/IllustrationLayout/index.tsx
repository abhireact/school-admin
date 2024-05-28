import { ReactNode } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Material Dashboard 2 PRO React page layout routes
import pageRoutes from "page.routes";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Declaring props types for IllustrationLayout
interface Props {
  header?: ReactNode;
  title?: string;
  logo?: string;
  description?: string;
  children: ReactNode;
  illustration?: string;
}

function IllustrationLayout({
  header,
  title,
  logo,
  description,
  illustration,
  children,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={12} lg={6}>
          <MDBox
            display={{ xs: "none", lg: "flex" }}
            width="100%"
            height="100%"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${illustration})` }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <MDBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <MDBox py={2} px={2} textAlign="center">
              <MDBox textAlign="center">
                <img src={logo} alt="logo" width={"75%"} />
                <MDTypography variant="h4" fontWeight="bold">
                  {title}
                </MDTypography>
              </MDBox>
              <MDTypography variant="body2" color="text">
                {description}
              </MDTypography>
            </MDBox>
            <MDBox p={3}>{children}</MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Declaring default props for IllustrationLayout
IllustrationLayout.defaultProps = {
  header: "",
  title: "",
  logo: "",
  description: "",
  illustration: "",
};

export default IllustrationLayout;
