import * as React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/Not_Found";
import Admins from "../pages/Admins";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Managers from "../pages/Managers";
import Nurses from "../pages/Nurses";
import Doctors from "../pages/Doctors";
import DeviceManagement from "../pages/DeviceManagement";
import DeviceLayout from "../pages/DeviceLayouts";
import DeviceLog from "../pages/DeviceLog";
import Template1 from "../components/TemplateDesgins/Template1";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Admins />} path="/users/admins" />
        <Route element={<Managers />} path="/users/managers" />
        <Route element={<Nurses />} path="/users/nurses" />
        <Route element={<Doctors />} path="/users/doctors" />
        <Route element={<DeviceManagement />} path="/devices/management" />
        <Route element={<DeviceLayout />} path="/devices/layouts" />
        <Route element={<DeviceLog />} path="/devices/logs" />
        <Route element={<Template1/>} path="/template1"/>
      </Route>
      <Route element={<Login />} path="/auth"/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
