import React, { Component, ReactNode } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function Sidenav(): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const sidenavItems: { icon: string; label: string; href: string }[] = [
    { icon: "person", label: "Student Info", href: "student-info" },
    { icon: "family_restroom", label: "Guardian Info", href: "guardian-info" },
    { icon: "sports_martial_arts", label: "Activities", href: "activities" },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;
    return (
      <ErrorBoundary key={itemKey}>
        <MDBox component="li" pt={key === 0 ? 0 : 1}>
          <MDTypography
            component="a"
            href={`#${href}`}
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            sx={({
              borders: { borderRadius },
              functions: { pxToRem },
              palette: { light },
              transitions,
            }: Theme) => ({
              display: "flex",
              alignItems: "center",
              borderRadius: borderRadius.md,
              padding: `${pxToRem(10)} ${pxToRem(16)}`,
              transition: transitions.create("background-color", {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.shorter,
              }),
              "&:hover": {
                backgroundColor: light.main,
              },
            })}
          >
            <MDBox mr={1.5} lineHeight={1} color={darkMode ? "white" : "dark"}>
              <Icon fontSize="small">{icon}</Icon>
            </MDBox>
            {label}
          </MDTypography>
        </MDBox>
      </ErrorBoundary>
    );
  });

  return (
    <ErrorBoundary>
      <Card
        sx={{
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
          position: "sticky",
          top: "1%",
        }}
      >
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={2}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {renderSidenavItems}
        </MDBox>
      </Card>
    </ErrorBoundary>
  );
}

export default Sidenav;
