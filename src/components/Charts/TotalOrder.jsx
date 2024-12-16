import * as React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/joy";
import { TrendingDown } from "@mui/icons-material";
import { AreaPlot, ChartContainer } from "@mui/x-charts";
import { Experimental_CssVarsProvider } from "@mui/material";
export default function TotalOrder({ ...props }) {
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
          Total Order
        </Typography>
        <Typography
          level="h2"
          fontWeight="bold"
          endDecorator={
            <Chip
              sx={{
                borderRadius: 5,
              }}
              color="warning"
              startDecorator={<TrendingDown />}
            >
              20.5%
            </Chip>
          }
        >
          18,250
        </Typography>
      </CardContent>
      <Experimental_CssVarsProvider>
        <ChartContainer {...props}>
          <AreaPlot />
        </ChartContainer>
      </Experimental_CssVarsProvider>
    </Card>
  );
}
