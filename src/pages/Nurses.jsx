import * as React from "react";
import Layout from "../Layout/Layout";
import { Typography, Box, Breadcrumbs, Link, Button } from "@mui/joy";
import NurseTable from "../components/Tables/UserTable";
import {
  AddCircle,
  ChevronRightRounded,
  HomeRounded,
} from "@mui/icons-material";
import DrawerComponent from "../components/Drawer/DrawerComponent";
import { useDrawer } from "../useContext/DrawerContext";
import CreateAdmin from "../components/Forms/CreateUser";
import { nurses } from "../utils/const";

export default function Nurses() {
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
           Users
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Nurses
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
          Nurses List
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircle />}
          size="sm"
          onClick={()=>{
            setSelectedRow(null);
            toggleDrawer("right", true)();
          }}
        >
          Create Nurse
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          px : { xs: 1, sm: 1 },
        }}
      >
        <NurseTable data={nurses}/>
        <DrawerComponent
          title={selectedRow ? "Edit Nurse" : "Create Nurse"}
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
