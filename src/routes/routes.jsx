import React from "react";
import EventAdmins from "../pages/Admins";
import Dashboard from "../pages/Dashboard";
import {
  Collections,
  DashboardRounded,
  GroupRounded,
  Hive,
  Work,
  MovieFilter,
  ShoppingCart,
  VideoCameraBack,
  Report,
} from "@mui/icons-material";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: <DashboardRounded />,
    allowedRoles: ["SA_USER", "DA_USER", "DM_USER", "DN_USER"],
  },
  {
    path: "/users/admins",
    element: <EventAdmins />,
    label: "Admins",
    icon: <GroupRounded />,
    allowedRoles: ["SA_USER"],
  },
  {
    path: "/users/managers",
    element: <EventAdmins />,
    label: "Managers",
    icon: <GroupRounded />,
    allowedRoles: ["SA_USER", "DA_USER"],
  },
  {
    path: "/users/nurses",
    element: <EventAdmins />,
    label: "Nurses",
    icon: <GroupRounded />,
    allowedRoles: ["SA_USER", "DA_USER", "DM_USER"],
  },
  {
    path: "/users/doctors",
    element: <EventAdmins />,
    label: "Doctors",
    icon: <GroupRounded />,
    allowedRoles: ["SA_USER", "DA_USER", "DM_USER", "DN_USER"],
  },
  {
    path: "/devices/management",
    element: <EventAdmins />,
    label: "Devices Management",
    icon: <Hive />,
    allowedRoles: ["SA_USER", "DA_USER", "DM_USER"],
  },{
    path:"/devices/layouts",
    element:<EventAdmins />,
    label:"Device Layouts",
    icon:<Collections />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER"]
  },{
    path:"/devices/logs",
    element:<EventAdmins />,
    label:"Device Logs",
    icon:<Collections />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER"]
  },
  {
    path:"/hospital/management",
    element:<EventAdmins />,
    label:"Hospital Management",
    icon:<Work />,
    allowedRoles:["SA_USER", "DA_USER"]
  },
  {
    path:"/hospital/location",
    element:<EventAdmins />,
    label:"Hospital Location",
    icon:<Work />,
    allowedRoles:["SA_USER", "DA_USER"]
  },
  {
    path:"/templates/layouts",
    element:<EventAdmins />,
    label:"Templates Layouts",
    icon:<MovieFilter />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER", "DN_USER"]
  },{
    path:"/templates/ads",
    element:<EventAdmins />,
    label:"Ads",
    icon:<MovieFilter />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER", "DN_USER"]
  },{
    path:"/templates/announcements",
    element:<EventAdmins />,
    label:"Announcements",
    icon:<MovieFilter />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER", "DN_USER"]
  },
  {
    path:"/schedule",
    element:<EventAdmins />,
    label:"Scheduling",
    icon:<ShoppingCart />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER", "DN_USER"]
  },
  {
    path:"changelog",
    element:<EventAdmins />,
    label:"Change log",
    icon:<Report />,
    allowedRoles:["SA_USER", "DA_USER", "DM_USER", "DN_USER"]
  }
];

export default routes;
