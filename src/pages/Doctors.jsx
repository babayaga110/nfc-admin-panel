import * as React from "react";
import Layout from "../Layout/Layout";
import { Typography, Box, Breadcrumbs, Link, Button } from "@mui/joy";
import DoctorsTable from "../components/Tables/DoctorTable";
import {
  AddCircle,
  ChevronRightRounded,
  HomeRounded,
} from "@mui/icons-material";
import DrawerComponent from "../components/Drawer/DrawerComponent";
import { useDrawer } from "../useContext/DrawerContext";
import { doctors } from "../utils/const";
import WriteNFC from "../components/Forms/WriteNFC";
import { getDocs, collection, doc } from "firebase/firestore";
import { db_firestore } from "../firebase/config";

export default function Doctors() {
  const { toggleDrawer } = useDrawer();
  const [template , setTemplate] = React.useState([]);
  const coll = collection(db_firestore, "templates");

  React.useEffect(() => {
    const fetchTemplate = async () => {
      let data = [];
      const snap = await getDocs(coll);
      snap.forEach((doc) => {
        data.push({ value: doc.data().id, label: doc.data().label });
      });
      setTemplate(data);
    };
    fetchTemplate();
  }, []);

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
            Doctors
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
          Doctors List
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircle />}
          size="sm"
          onClick={() => {
            alert("In Demo Mode, You can't add Items");
          }}
        >
          Create Doctor
        </Button>
      </Box>
      <Box
        sx={{
          // flexGrow: 'auto',
          overflowX: "hidden",
          px: { xs: 1, sm: 1 },
          flex: 1,
        }}
      >
        <DoctorsTable data={doctors} />
        <DrawerComponent
          title={"Write NFC Card"}
          subtitle="Please select template to write NFC card"
          desc
          anchor="right"
        >
          {/* <CreateAdmin
            role="admin"
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          /> */}
          <WriteNFC template={template} />
        </DrawerComponent>
      </Box>
    </Layout>
  );
}
