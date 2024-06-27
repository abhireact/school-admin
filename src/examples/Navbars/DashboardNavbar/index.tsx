/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState, useEffect } from "react";

// // react-router components
// import { useLocation } from "react-router-dom";

// // @material-ui core components
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 PRO React TS components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDBadge from "components/MDBadge";

// // Material Dashboard 2 PRO React TS examples components
// import NotificationItem from "examples/Items/NotificationItem";

// // Custom styles for DashboardNavbar
// import {
//   navbar,
//   navbarContainer,
//   navbarRow,
//   navbarIconButton,
//   navbarDesktopMenu,
//   navbarMobileMenu,
// } from "examples/Navbars/DashboardNavbar/styles";

// // Material Dashboard 2 PRO React context
// import {
//   useMaterialUIController,
//   setTransparentNavbar,
//   setMiniSidenav,
//   setOpenConfigurator,
// } from "context";
// import MYAccount from "layouts/pages/authentication/myaccount";
// import { Autocomplete } from "@mui/material";
// import MDTypography from "components/MDTypography";
// import { useFormik } from "formik";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { item } from "examples/Sidenav/styles/sidenavItem";

// // Declaring prop types for DashboardNavbar
// interface Props {
//   absolute?: boolean;
//   light?: boolean;
//   isMini?: boolean;
// }

// function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
//   const [data, setData] = useState([]);
//   const FetchAcademicYear = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);

//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     FetchAcademicYear();
//   }, []);
//   const Cacademic_year = Cookies.get("academic_year");
//   console.log(Cacademic_year, "Cacademic_year");
//   let today = new Date().toISOString().split("T")[0];

//   const currentAcademic = data.find((item) => {
//     const startDate = new Date(item.start_date);
//     const endDate = new Date(item.end_date);
//     const currentDate = new Date(today);

//     return currentDate >= startDate && currentDate <= endDate;
//   });

//   if (currentAcademic) {
//     console.log("Current Academic Year:", currentAcademic?.academic_year);
//   } else {
//     console.log("No matching academic year found for today's date.");
//   }
//   const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
//     initialValues: {
//       academic_year: Cacademic_year || currentAcademic?.academic_year || "2024-2025",
//     },
//     // validationSchema: validationSchema,
//     onSubmit: (values, action) => {
//       console.log(values, "values");
//     },
//   });
//   const [navbarType, setNavbarType] = useState<
//     "fixed" | "absolute" | "relative" | "static" | "sticky"
//   >();
//   const [controller, dispatch] = useMaterialUIController();
//   const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
//   const [openMenu, setOpenMenu] = useState<any>(false);
//   const route = useLocation().pathname.split("/").slice(1);
//   const token = Cookies.get("token");

//   /* eslint-disable react-hooks/exhaustive-deps */

// Add only values.academic_year as a dependency
//   useEffect(() => {
//     // Setting the navbar type
//     if (fixedNavbar) {
//       setNavbarType("sticky");
//     } else {
//       setNavbarType("static");
//     }

//     // A function that sets the transparent state of the navbar.
//     function handleTransparentNavbar() {
//       setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
//     }

//     /**
//      The event listener that's calling the handleTransparentNavbar function when
//      scrolling the window.
//     */
//     window.addEventListener("scroll", handleTransparentNavbar);

//     // Call the handleTransparentNavbar function to set the state with the initial value.
//     handleTransparentNavbar();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("scroll", handleTransparentNavbar);
//   }, [dispatch, fixedNavbar]);
//   /* eslint-disable react-hooks/exhaustive-deps */
//   const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
//   const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
//   const handleCloseMenu = () => setOpenMenu(false);

//   // Render the notifications menu
//   const renderMenu = () => (
//     <Menu
//       anchorEl={openMenu}
//       anchorReference={null}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "left",
//       }}
//       open={Boolean(openMenu)}
//       onClose={handleCloseMenu}
//       sx={{ mt: 2 }}
//     >
//       <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
//       <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
//       <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
//     </Menu>
//   );

//   // Styles for the navbar icons
//   const iconsStyle = ({
//     palette: { dark, white, text },
//     functions: { rgba },
//   }: {
//     palette: any;
//     functions: any;
//   }) => ({
//     color: () => {
//       let colorValue = light || darkMode ? white.main : dark.main;

//       if (transparentNavbar && !light) {
//         colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
//       }

//       return colorValue;
//     },
//   });
//   // eslint-disable-next-line
//   const routees = { route };
//   return (
//     <AppBar
//       position={absolute ? "absolute" : navbarType}
//       color="inherit"
//       sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
//     >
//       <Toolbar sx={navbarContainer}>
//         <MDBox
//           ml={-5.3}
//           color="inherit"
//           mb={{ xs: 1, md: 0 }}
//           sx={(theme) => navbarRow(theme, { isMini })}
//         >
//           {/* <Breadcrumbs icon="home" title={routees[routees.length - 1]} route={""} light={light} /> */}
//           <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
//             <Icon fontSize="medium" sx={iconsStyle}>
//               {miniSidenav ? "menu_open" : "menu"}
//             </Icon>
//           </IconButton>
//         </MDBox>
//         {isMini ? null : (
//           <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
//             <MDBox pr={1}>
//               {/* <MDInput label="Search here" /> */}
//               <Autocomplete
//                 fullWidth
//                 sx={{ width: "100%" }}
//                 defaultValue={currentAcademic?.academic_year}
//                 value={values.academic_year || currentAcademic?.academic_year}
//                 onChange={(_event, value) => {
//                   handleChange({ target: { name: "academic_year", value } });
//                 }}
//                 options={Array.from(
//                   new Set(
//                     data
//                       .filter((item) => item.academic_year)
//                       .map((item) => item.academic_year)
//                       .concat(currentAcademic ? [currentAcademic.academic_year] : [])
//                   )
//                 ).filter((option) => option !== currentAcademic?.academic_year)}
//                 renderInput={(params) => (
//                   <MDInput
//                     required
//                     fullWidth
//                     name="academic_year"
//                     onChange={handleChange}
//                     value={values.academic_year || currentAcademic?.academic_year}
//                     label={"Academic Year"}
//                     {...params}
//                     // variant="standard"
//                   />
//                 )}
//               />
//             </MDBox>
//             <MDBox color={light ? "white" : "inherit"}>
//               <IconButton sx={navbarIconButton} size="medium" disableRipple>
//                 {/* <Icon sx={iconsStyle}>account_circle</Icon> */}
//                 <MYAccount />
//               </IconButton>

//               <IconButton
//                 size="small"
//                 disableRipple
//                 color="inherit"
//                 sx={navbarMobileMenu}
//                 onClick={handleMiniSidenav}
//               >
//                 <Icon sx={iconsStyle} fontSize="medium">
//                   {miniSidenav ? "menu_open" : "menu"}
//                 </Icon>
//               </IconButton>
//               <IconButton
//                 size="small"
//                 disableRipple
//                 color="inherit"
//                 sx={navbarIconButton}
//                 onClick={handleConfiguratorOpen}
//               >
//                 <Icon sx={iconsStyle}>settings</Icon>
//               </IconButton>
//               <IconButton
//                 size="small"
//                 color="inherit"
//                 sx={navbarIconButton}
//                 onClick={handleOpenMenu}
//               >
//                 <MDBadge badgeContent={9} color="error" size="xs" circular>
//                   <Icon sx={iconsStyle}>notifications</Icon>
//                 </MDBadge>
//               </IconButton>
//               {renderMenu()}
//             </MDBox>
//           </MDBox>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// // Declaring default props for DashboardNavbar
// DashboardNavbar.defaultProps = {
//   absolute: false,
//   light: false,
//   isMini: false,
// };

// export default DashboardNavbar;

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import DownloadIcon from "@mui/icons-material/Download";
// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";
import Dialog, { DialogProps } from "@mui/material/Dialog";
// Material Dashboard 2 PRO React TS examples components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { Grid, Card, Autocomplete, Divider, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MYAccount from "layouts/pages/authentication/myaccount";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import { Popconfirm } from "antd";

// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}
interface Notification {
  created_at: string;
  description: string;
  employee_name: string;
  file_content_type: Array<string>;
  file_file_size: string;
  file_name: Array<string>;
  from_user_id: string;
  id: number;
  notification_type: string;
  status: boolean;
  subject: string;
  user_type: string;
}

function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
  const [message, setMessage] = useState([]);
  const [editopen, setEditOpen] = useState(false);
  const [popconfirmVisible, setPopconfirmVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [unread, setUnread] = useState(0);
  const [editdata, setEditdata] = useState<Notification>({
    created_at: "",
    description: "",
    employee_name: "",
    file_content_type: [],
    file_file_size: "",
    file_name: [],
    from_user_id: "",
    id: 2612592,
    notification_type: "",
    status: true,
    subject: "",
    user_type: null,
  });

  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState<any>(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [data, setData] = useState([]);
  const FetchAcademicYear = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    FetchAcademicYear();
  }, []);
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");
  let today = new Date().toISOString().split("T")[0];

  const currentAcademic = data.find((item) => {
    const startDate = new Date(item.start_date);
    const endDate = new Date(item.end_date);
    const currentDate = new Date(today);

    return currentDate >= startDate && currentDate <= endDate;
  });

  if (currentAcademic) {
    console.log("Current Academic Year:", currentAcademic?.academic_year);
  } else {
    console.log("No matching academic year found for today's date.");
  }
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: Cacademic_year || currentAcademic?.academic_year,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values, "values");
    },
  });
  const fetchNotification = async () => {
    axios
      .get("http://10.0.20.200:8000/internal_portal/notifications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.reverse());
        //
        const countOddNumbers: number = response.data.reduce((count: any, data: any) => {
          if (!data.status) {
            return count + 1; // Increment count if the number is odd
          } else {
            return count; // Otherwise, return count unchanged
          }
        }, 0);
        setUnread(countOddNumbers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  useEffect(() => {
    // Cleanup the old cookie before setting the new one
    Cookies.remove("academic_year");
    if (values.academic_year) {
      Cookies.set("academic_year", values.academic_year, { expires: 7 });
    }
  }, [values.academic_year]);
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     The event listener that's calling the handleTransparentNavbar function when
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleClickOpenEdit = (data: any) => {
    console.log(data, "comming data");
    setEditdata(data);
    setEditOpen(true);
    if (data.status) {
    } else {
      axios
        .put(
          `http://10.0.20.200:8000/internal_portal/notifications/${data.id}`,
          {
            status: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          fetchNotification();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {message
        ? message.map((data, index) => (
            <NotificationItem
              key={index}
              icon={
                <Icon color={data.status ? "secondary" : "info"}>
                  {data.status ? <MarkChatReadIcon /> : <MarkChatUnreadIcon />}
                </Icon>
              }
              title={`${data.subject}`}
              onClick={() => handleClickOpenEdit(data)}
            />
          ))
        : []}

      {/* <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  useEffect(() => {
    // Cleanup the old cookie before setting the new one
    Cookies.remove("academic_year");
    if (values.academic_year) {
      Cookies.set("academic_year", values.academic_year, { expires: 7 });
    }
  }, [values.academic_year]);

  const downloadBase64File = (base64Data: string, fileName: string) => {
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    const linkSource = `data:${fileExtension};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Dialog open={editopen} onClose={handleClickCloseEdit}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={10}>
            <MDTypography variant="h6" fontWeight="bold">
              Subject: {editdata.subject}
              <br />
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Sender: {editdata.employee_name}
              </MDTypography>
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <MDTypography variant="h6" fontWeight="bold">
              Message:
              {<pre style={{ whiteSpace: "pre-wrap" }}>{editdata.description}</pre>}
              <br />
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Date: {editdata.created_at}
              </MDTypography>
            </MDTypography>
          </Grid>
          {editdata.file_content_type ? (
            <Grid item xs={12} sm={12}>
              <MDTypography variant="button" fontWeight="bold">
                Attached File:
              </MDTypography>
              <br />
              {editdata.file_name.map((particular, index) => (
                <MDButton
                  key={index}
                  onClick={() =>
                    downloadBase64File(editdata.file_content_type[index], editdata.file_name[index])
                  }
                >
                  <MDTypography variant="button" fontWeight="bold">
                    {index + 1}.
                  </MDTypography>{" "}
                  {editdata.file_name[index]}
                </MDButton>
              ))}
            </Grid>
          ) : null}

          <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MDButton color="info" variant="text" onClick={handleClickCloseEdit}>
              cancel
            </MDButton>
          </Grid>
        </Grid>
      </Dialog>
      <Toolbar sx={navbarContainer}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {/* <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} /> */}
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={3}>
              <Autocomplete
                fullWidth
                sx={{ width: "150%" }}
                disableClearable
                size="small"
                defaultValue={currentAcademic?.academic_year}
                value={values.academic_year || currentAcademic?.academic_year}
                onChange={(_event, value) => {
                  // Instead of directly calling handleChange, open the Popconfirm
                  setSelectedValue(value);
                  setPopconfirmVisible(true);
                }}
                options={Array.from(
                  new Set(
                    data
                      .filter((item) => item.academic_year)
                      .map((item) => item.academic_year)
                      .concat(currentAcademic ? [currentAcademic.academic_year] : [])
                  )
                )}
                renderInput={(params) => (
                  <MDInput
                    required
                    fullWidth
                    name="academic_year"
                    onChange={handleChange}
                    value={values.academic_year || currentAcademic?.academic_year}
                    label={"Academic Year"}
                    {...params}
                  />
                )}
              />
              <Popconfirm
                title="Confirm Selection"
                placement="bottomLeft"
                description="Are you sure you want to change the academic year?"
                open={popconfirmVisible}
                onConfirm={() => {
                  handleChange({ target: { name: "academic_year", value: selectedValue } });
                  setPopconfirmVisible(false);
                  window.location.reload();
                }}
                onCancel={() => {
                  setPopconfirmVisible(false);
                }}
                okText="Yes"
                cancelText="No"
              >
                {/* <div style={{ display: "none" }}></div> */}
              </Popconfirm>
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton sx={navbarIconButton} size="medium" disableRipple>
                <MYAccount />
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenu}
              >
                <MDBadge badgeContent={unread} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </MDBadge>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
