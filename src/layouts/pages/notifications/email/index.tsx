import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ForwardIcon from "@mui/icons-material/Forward";
// import VerticalTabs from "./tablepanal";
import { useState } from "react";
import { Drawer } from "antd";
import PropTypes from "prop-types";

import { Grid, Tab, Tabs } from "@mui/material";
import { AppBar } from "@mui/material";
import theme from "assets/theme";
import SwipeableViews from "react-swipeable-views";

import Templates from "./templates";
import Gateway from "./gateway";
import SentEmail from "./sentemail";
function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EmailSetting = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid
            sm={12}
            py={2}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              borderBottom: "2px solid #3873E8",
            }}
          >
            <MDTypography variant="h5" color="info" px={2}>
              Email Management Tool{" "}
            </MDTypography>
          </Grid>
          <Grid p={2} sm={12}>
            <MDTypography variant="caption" fontWeight={"bold"}>
              This tool allow you to configure email gateway and enable application to send email. |
            </MDTypography>
          </Grid>
          <Grid px={2} sm={12}>
            <MDTypography variant="caption" fontWeight={"bold"}>
              What you can do using this tool
            </MDTypography>
          </Grid>
          <Grid px={2} sm={12}>
            <MDTypography variant="caption">1. Configure email gateway</MDTypography>
          </Grid>
          <Grid px={2} sm={12}>
            <MDTypography variant="caption">2. Set email templates</MDTypography>
          </Grid>{" "}
          <Grid px={2} sm={12}>
            <MDTypography variant="caption">3. check sent email log</MDTypography>
          </Grid>
          <Grid p={2} sm={12}>
            <MDButton
              variant="outlined"
              color="info"
              //   onClick={toggleDrawer(true)}
              onClick={showDrawer}
            >
              Start <ForwardIcon fontSize={"large"} />
            </MDButton>
          </Grid>
        </Grid>

        <Drawer
          //   zIndex={5}
          title="Email Management Tool"
          placement="right"
          onClose={onClose}
          open={open}
          width={900}
          style={{ paddingTop: "10%" }}
        >
          {/* verticle table bar  */}
          <MDBox
            sx={{
              bgcolor: "background.paper",
              // width: 500,
              position: "relative",
              minHeight: 200,
            }}
          >
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="action tabs example"
              >
                <Tab label="Gateway" {...a11yProps(0)} />
                <Tab label="Templates" {...a11yProps(1)} />
                <Tab label="Sent Email" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value}>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Gateway />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Templates />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <SentEmail />{" "}
              </TabPanel>
            </SwipeableViews>
          </MDBox>
        </Drawer>
      </MDBox>
    </DashboardLayout>
  );
};

export default EmailSetting;
