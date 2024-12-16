import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { LinearProgress } from "@mui/joy";

function getIcon(type) {
  switch (type) {
    case "info":
      return <InfoIcon />;
    case "warning":
      return <WarningIcon />;
    case "error":
      return <ReportIcon />;
    case "success":
      return <CheckCircleIcon />;
    default:
      return null;
  }
}

export default function AlertComponent({ title, desc, color, type, hideAlert }) {
  return (
    <Box
      sx={{

        display: "flex" ,
        gap: 2,
        width: "calc(100% - 20px)",
        maxWidth: 400,
        flexDirection: "column",
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 9999,
      }}
    >
      <Alert
        key={title}
        sx={{ alignItems: "flex-start" }}
        startDecorator={getIcon(type)}
        variant="soft"
        color={color}
        endDecorator={
          <IconButton variant="soft" color={color}  onClick={hideAlert}>
            <CloseRoundedIcon />
          </IconButton>
        }
        
      >
        <div>
          <div>{title}</div>
          <Typography level="body-sm" color={color}>
            {desc}
          </Typography>
        </div>
        <LinearProgress
          variant="solid"
          color={color}
          value={40}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Alert>
    </Box>
  );
}
