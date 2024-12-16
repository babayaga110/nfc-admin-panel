import * as React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/joy";
import { TrendingUp } from "@mui/icons-material";
import { ChartContainer, BarPlot } from "@mui/x-charts";
import { Experimental_CssVarsProvider } from "@mui/material";
export default function TotalUser({ ...props }) {
  return (
    <Card
      sx={{
        minWidth: 300,
        bgcolor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        p: 0,
        borderRadius: 5,
      }}
    >
      <CardContent
        sx={{
          p: 1.5,
        }}
      >
        <Typography
          level="title-md"
          color="neutral"
          fontWeight="normal"
          marginBottom={0}
        >
          Total Users
        </Typography>
        <Typography
          level="h2"
          fontWeight="bold"
          endDecorator={
            <Chip
              sx={{
                borderRadius: 5,
              }}
              color="success"
              startDecorator={<TrendingUp />}
            >
              70.5%
            </Chip>
          }
        >
          78,250
        </Typography>
      </CardContent>
      <Experimental_CssVarsProvider>
        <ChartContainer {...props}>
          <BarPlot />
        </ChartContainer>
      </Experimental_CssVarsProvider>
    </Card>
  );
}
