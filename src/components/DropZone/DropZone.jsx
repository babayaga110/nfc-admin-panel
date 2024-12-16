import { Close, FileUploadRounded,FilePresent } from "@mui/icons-material";
import {
  Box,
  Typography,
  styled,
  IconButton,
  Card,
  AspectRatio,
  Link,
  LinearProgress,
} from "@mui/joy";
import * as React from "react";
import fileServices from "../../services/fileServices";
import { useDrawer } from "../../useContext/DrawerContext";
import { useAlert } from "../../useContext/AlertContext";
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function DropZone({
  sx,
  onDrop,
  accept,
  numFiles,
  folder,
  clearOnSubmit,
  defaultValue,
  placeholder,
}) {
  const { drawerState } = useDrawer();
  const { showAlert } = useAlert();
  const [dragging, setDragging] = React.useState(false);
  const [images, setImages] = React.useState(defaultValue || []);
  const [uploading, setUploading] = React.useState(false);

  const isUploadDisabled = images.length >= numFiles;

  const uploadImages = async (files) => {
    try {
      setUploading(true);
      const imgArr = await Promise.all(
        files.slice(0, numFiles).map(async (file) => {
          let data = new FormData();
          data.append("file", file);
          data.append("folder", folder);
          return await fileServices.uploadFile(data);
        })
      );
      const uploadedImages = numFiles === 1 ? imgArr[0]?.url : imgArr?.map((img) => img.url);
      setImages(imgArr.map((img) => img.url));
      onDrop(uploadedImages);
    } catch (error) {
      console.error("Failed to upload images:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert(`Error ${errorCode}`, errorMessage, "danger", "error");
      // Optionally, handle the error (e.g., show an error message)
    } finally {
      setUploading(false); // Reset uploading state
    }
  };
  const handleFileSelection = async (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    if (files.length > 0) {
      await uploadImages(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    await handleFileSelection(e);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    await handleFileSelection(e);
  };

  const handleRemove = async (img, index) => {
    try {
      await fileServices.deleteFile({ url: img });
      setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // More efficient state update
    } catch (error) {
      console.error("Failed to delete image:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert(`Error ${errorCode}`, errorMessage, "danger", "error");
      // Optionally, handle the error
    }
  };
  React.useEffect(() => {
    if (clearOnSubmit) {
      setImages([]);
    }
  }, [clearOnSubmit]);

  React.useEffect(() => {
    if (defaultValue) {
      setImages(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
  }, [defaultValue]);
  React.useEffect(() => {
    return () => {
      setImages([]); // Reset images when component unmounts
    };
  }, [drawerState]);

  return (
    <div>
      {uploading && <LinearProgress sx={{mb:1}} />}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        component="label"
        variant="soft"
        sx={[
          {
            borderRadius: "sm",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            px: 3,
            flexGrow: 1,
            boxShadow: "none",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <AspectRatio
          ratio="1"
          variant="solid"
          color="primary"
          sx={{
            minWidth: 32,
            borderRadius: "50%",
            "--Icon-fontSize": "16px",
          }}
        >
          <div>
            <FileUploadRounded />
          </div>
        </AspectRatio>
        <Typography level="body-sm" textAlign="center">
          <Link component="label">
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                handleChange(e); // Handle file change
                e.target.value = ""; // Reset the file input value
              }}
              accept={accept}
              multiple={numFiles > 1}
              disabled={isUploadDisabled}
            />
            Click to upload
          </Link>{" "}
          or drag and drop
          <br /> {placeholder}
        </Typography>
      </Card>
      {images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          {images?.map((img, index) => (
            <AspectRatio
              key={index}
              ratio="1"
              sx={{
                width: 60,
                position: "relative",
                borderRadius: "sm",
                boxShadow: "0 0 2px 1px rgba(0,0,0,.1)",
                mt: 2,
                ".MuiAspectRatio-content": {
                  overflow: "visible !important",
                },
              }}
            >
              {accept.includes("image") ? (
              <img src={img} alt="File" />):<FilePresent/>}
              <IconButton
                onClick={() => handleRemove(img, index)}
                variant="solid"
                color="danger"
                size="sm"
                sx={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: -10,
                  right: -10,
                  minWidth: "1.5rem",
                  minHeight: "1.5rem",
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            </AspectRatio>
          ))}
        </Box>
      )}
    </div>
  );
}
