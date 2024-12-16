import { Box, CircularProgress, Typography } from "@mui/joy";
import * as React from "react";

export default function IframeViewer({ src }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const iframe = document.getElementById("iframe-viewer");
    const fakeProgressInterval = setInterval(() => {
      console.log("Iframe loading...");
      setLoading(true);
    }, 300); // Update progress every 300ms

    iframe.onload = () => {
      clearInterval(fakeProgressInterval);
      setLoading(false);
      console.log("Iframe loaded successfully");
    };
    iframe.onerror = () => {
      clearInterval(fakeProgressInterval);
      setLoading(false);
      console.log("Iframe failed to load");
    }

    return () => clearInterval(fakeProgressInterval);
  }, [src]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {
        loading && (
          <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          backdropFilter: "blur(10px)",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
       <CircularProgress size="sm" />
       <CircularProgress size="sm" />
       <CircularProgress size="sm" />
      </Box>
        )
      }
      <iframe
        id="iframe-viewer"
        src={src}
        title="Iframe Viewer"
        width="100%"
        height="100%" // You can adjust the height as needed
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
}
