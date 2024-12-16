import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Experimental_CssVarsProvider } from "@mui/material";
export default function IncomeOverview() {
  return (
    <Experimental_CssVarsProvider>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10],
          scaleType:"linear"
         }]}
        series={[
          {
            curve: "catmullRom",
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
            showMark:false
          },
        ]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true,  }}
      />
    </Experimental_CssVarsProvider>
  );
}
