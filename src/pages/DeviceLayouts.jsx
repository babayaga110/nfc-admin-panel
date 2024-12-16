import * as React from "react";
import Layout from "../Layout/Layout";
import { Typography, Box, Breadcrumbs, Link, Button } from "@mui/joy";
import {
  AddCircle,
  ChevronRightRounded,
  HomeRounded,
} from "@mui/icons-material";
import DrawerComponent from "../components/Drawer/DrawerComponent";
import { useDrawer } from "../useContext/DrawerContext";
import CreateAdmin from "../components/Forms/CreateUser";

export default function DeviceLayouts() {
  const { toggleDrawer } = useDrawer();
  const [selectedRow, setSelectedRow] = React.useState(null);
  return (
    <Layout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRounded fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRounded />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Devices
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Device Layouts
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Layouts
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircle />}
          size="sm"
          onClick={() => {
            alert("In Demo Mode, You can't add Items");
          }}
        >
          Add Layout
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          px : { xs: 1, sm: 1 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography color="neutral" fontWeight={500} fontSize={12}>
            No Layouts Found
          </Typography>
        </Box>
        <DrawerComponent
          title={selectedRow ? "Edit Device" : "Add Device"}
          anchor="right"
        >
          <CreateAdmin
            role="admin"
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        </DrawerComponent>
      </Box>
    </Layout>
  );
}
