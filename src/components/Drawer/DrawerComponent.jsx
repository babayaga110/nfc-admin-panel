import React from "react";
import {
  Drawer,
  Divider,
  DialogTitle,
  ModalClose,
  Box,
  Typography,
  Button,
} from "@mui/joy";
import { useDrawer } from "../../useContext/DrawerContext";
import { useDispatch } from "react-redux";
import { setSelectedDrawer } from "../../reduxStore/Slice/appSlice";
const DrawerComponent = ({
  title,
  subtitle,
  closeBtn,
  loading,
  anchor = "right",
  children,
}) => {
  const dispatch = useDispatch();
  const { drawerState, toggleDrawer } = useDrawer();

  return (
    <Drawer
      key={anchor}
      anchor={anchor}
      open={drawerState[anchor]}
      // onClose={toggleDrawer(anchor, false)}
      size="lg"
      sx={{
        zIndex: 10,
        backdropFilter: "blur(1px)",
        ".MuiDrawer-content": {
          height: "100vh",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: 2,
          flex: "0 0 auto",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box>
          <Typography level="title-md">{title}</Typography>
          <Typography level="body-sm">{subtitle}</Typography>
        </Box>
        {closeBtn && (
          <ModalClose
            size="sm"
            variant="outlined"
            onClick={() => {
              toggleDrawer(anchor, false)();
              dispatch(setSelectedDrawer(null));
            }}
            sx={{
              position: "relative",
              top: 0,
              right: 0,
            }}
          />
        )}
      </Box>
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
