import * as React from "react";
import { AlertProvider } from "./useContext/AlertContext";
import AppRouter from "./routes/AppRouter";
import { DrawerProvider } from "./useContext/DrawerContext";
// import { UserRolesProvider } from "./useContext/UserRolesContext";
import { AlertModalProvider } from "./useContext/AlertModalContext";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./utils/cookies";

export default function App() {

  return (
    <AlertProvider>
      <AlertModalProvider>
        <DrawerProvider>
          {/* <UserRolesProvider> */}
            <AppRouter />
          {/* </UserRolesProvider> */}
        </DrawerProvider>
      </AlertModalProvider>
    </AlertProvider>
  );
}
