import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import Header from "layouts/pages/account/settings/components/Header";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";
import ChangePassword from "layouts/pages/account/settings/components/ChangePassword";
import Authentication from "layouts/pages/account/settings/components/Authentication";
import Accounts from "layouts/pages/account/settings/components/Accounts";
import Notifications from "layouts/pages/account/settings/components/Notifications";
import Sessions from "layouts/pages/account/settings/components/Sessions";
import DeleteAccount from "layouts/pages/account/settings/components/DeleteAccount";

function Settings(): JSX.Element {
  return (
    <BaseLayout>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav
              item={[
                { icon: "person", label: "profile", href: "profile" },
                { icon: "receipt_long", label: "basic info", href: "basic-info" },
                { icon: "lock", label: "change password", href: "change-password" },
                { icon: "security", label: "2FA", href: "2fa" },
                { icon: "badge", label: "accounts", href: "accounts" },
                { icon: "campaign", label: "notifications", href: "notifications" },
                { icon: "settings_applications", label: "sessions", href: "sessions" },
                { icon: "delete", label: "delete account", href: "delete-account" },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} id="profile">
                  <Header />
                </Grid>
                <Grid item xs={12} id="basic-info">
                  <BasicInfo />
                </Grid>
                <Grid item xs={12} id="change-password">
                  <ChangePassword />
                </Grid>
                <Grid item xs={12} id="2fa">
                  <Authentication />
                </Grid>
                <Grid item xs={12} id="accounts">
                  <Accounts />
                </Grid>
                <Grid item xs={12} id="notifications">
                  <Notifications />
                </Grid>
                <Grid item xs={12} id="sessions">
                  <Sessions />
                </Grid>
                <Grid item xs={12} id="delete-account">
                  <DeleteAccount />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default Settings;
