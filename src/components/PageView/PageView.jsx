import * as React from "react";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/joy";

export default function PageView() {
  return (
    <List
      variant="outlined"
      sx={{
        borderRadius: "md",
      }}
    >
      {[
        {
          title: "Admin Home",
          url: "/demo/admin/index.html",
        },
        {
          title: "Admin Dashboard",
          url: "/demo/admin/dashboard.html",
        },
        {
          title: "Admin Profile",
          url: "/demo/admin/profile.html",
        },
        {
          title: "Admin Settings",
          url: "/demo/admin/settings.html",
        },
        {
          title: "Admin Settings",
          url: "/demo/admin/settings.html",
        },
        {
          title: "Admin Settings",
          url: "/demo/admin/settings.html",
        },
        {
          title: "Admin Settings",
          url: "/demo/admin/settings.html",
        },
      ].map((item, index) => (
        <ListItem key={index}>
          <ListItemButton
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between ",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flexBasis: "80%",
              }}
            >
              <Typography level="title-sm">Admin Home</Typography>
              <Typography level="body-sm">/demo/admin/index.html</Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "20%",
              }}
            >
              <Typography level="title-lg" color="primary">
                7,890
              </Typography>
              <Typography level="body-sm" color="neutral">
                31.5%
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
