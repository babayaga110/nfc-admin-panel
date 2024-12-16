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
import DeviceTable from "../components/Tables/DeviceTable";
import { devices } from "../utils/const";

export default function DeviceManagement() {
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
            Device Management
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
          Device List
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircle />}
          size="sm"
          onClick={() => {
            alert("In Demo Mode, You can't add Items");
          }}
        >
          Add Device
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          px : { xs: 1, sm: 1 },
        }}
      >
        <DeviceTable data={devices}/>
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
