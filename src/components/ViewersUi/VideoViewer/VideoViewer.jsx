import { Box } from "@mui/joy";
import * as React from "react";

export default function VideoViewer({ src }) {
  // Function to infer the MIME type from the file extension
  const getVideoType = (url) => {
    const extension = url.split('.').pop();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogv':
        return 'video/ogg';
      default:
        return 'video/mp4'; // Default type if the extension is unknown
    }
  };

  const videoType = getVideoType(src);

  return (
    <Box>
      <video controls>
        <source src={videoUrl} type={videoType} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
