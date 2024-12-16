import * as React from "react";
import Layout from "../Layout/Layout";
import {
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Button,
  Card,
  Chip,
  CardContent,
  ButtonGroup,
  Select,
  Option,
  IconButton,
  Grid,
} from "@mui/joy";
import {
  AddCircle,
  ArrowDropDown,
  ChevronRightRounded,
  Download,
  HomeRounded,
  SaveAlt,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  AreaPlot,
  BarPlot,
  ChartContainer,
  LineChart,
  BarChart,
  PieChart,
} from "@mui/x-charts";
import IncomeOverview from "../components/Charts/IncomeOverview";
import PageView from "../components/PageView/PageView";
import { Experimental_CssVarsProvider } from "@mui/material";

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 3420, 2590, 1490, 3490,
];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
  "Page H",
  "Page I",
  "Page J",
  "Page K",
  "Page L",
];

const dataset = [
  { name: 1, earnings: 2 },
  { name: 2, earnings: 3 },
  { name: 3, earnings: 5.5 },
  // Add more data as needed
];

export default function Dashboard() {
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
            Dashboard
          </Link>
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
          Dashboard
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <div
            style={{
              boxShadow: "0 0 5px 0 rgba(0,0,0,.1)",
              padding: ".75rem",
              borderRadius: ".25rem",
              border: "1px solid #d7d7d7",
              flex: "1",
            }}
          >
            <Typography level="title-md" color="neutral" fontWeight="normal">
              Status Base Dashboard
            </Typography>
            <Experimental_CssVarsProvider>
              <BarChart
                series={[
                  { data: [4, 2, 5, 4, 1], stack: "A", label: "Series A1" },
                  { data: [2, 8, 1, 3, 1], stack: "A", label: "Series A2" },
                  { data: [14, 6, 5, 8, 9], label: "Series B1" },
                ]}
                barLabel={(item, context) => {
                  if ((item.value ?? 0) > 10) {
                    return "High";
                  }
                  return context.bar.height < 60
                    ? null
                    : item.value?.toString();
                }}
                sx={{ width: "100%" }}
                height={300}
              />
            </Experimental_CssVarsProvider>
          </div>
          <div
            style={{
              boxShadow: "0 0 5px 0 rgba(0,0,0,.1)",
              padding: ".75rem",
              borderRadius: ".25rem",
              border: "1px solid #d7d7d7",
              flex: "1",
            }}
          >
            <Typography level="title-lg" color="neutral" fontWeight="normal">
              Non-Operational Sites
            </Typography>
            <Experimental_CssVarsProvider>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
                height={300}
                sx={{ width: "100%" }}
              />
            </Experimental_CssVarsProvider>
          </div>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
          }}
        >
          <Grid xs={12} md={8}>
            <Typography
              level="title-md"
              color="neutral"
              fontWeight="normal"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Device Status Overview
            </Typography>
            <Card
              sx={{
                bgcolor: "#fff",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 5,
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    level="title-md"
                    color="danger"
                    startDecorator={<ArrowDropDown />}
                  >
                    20.5%
                  </Typography>
                  <Typography
                    level="body-sm"
                    color="neutral"
                    fontWeight="normal"
                    marginBottom={0}
                  >
                    Compare to : 01 Dec 2021-08 Jan 2022
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <ButtonGroup size="sm">
                    <Button disabled>Week</Button>
                    <Button>Month</Button>
                  </ButtonGroup>
                  <Select variant="outlined" defaultValue="bySales" size="sm">
                    <Option value="bySales">By Status</Option>
                    <Option value="byMargin">By Margin</Option>
                    <Option value="byVolume">By Volume</Option>
                  </Select>
                  <IconButton variant="outlined" size="sm">
                    <SaveAlt />
                  </IconButton>
                </Box>
              </CardContent>
              <IncomeOverview />
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography
              level="title-lg"
              color="neutral"
              fontWeight="normal"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Page Views by Title
            </Typography>
            <PageView />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
