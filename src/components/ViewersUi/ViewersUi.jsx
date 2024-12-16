import * as React from "react";
import ImageViewer from "./ImageViewer/ImageViewer";
import PDFViewer from "./PDFViewer/PDFViewer";
import VideoViewer from "./VideoViewer/VideoViewer";
import IframeViewer from "./IframeViewer/IframeViewer";

const ViewersUi = ({ data:{type, src, ...props} }) => {
  switch (type) {
    case "image":
      return <ImageViewer src={src} {...props} />;
    case "pdf":
      return <PDFViewer src={src} {...props} />;
    case "video":
      return <VideoViewer src={src} {...props} />;
    case "iframe":
      return <IframeViewer src={src} {...props} />;
    default:
      return null;
  }
};

export default ViewersUi;
