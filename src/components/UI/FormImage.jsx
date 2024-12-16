import React from "react";
import { FormControl, FormLabel, FormHelperText } from "@mui/joy";
import { Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import DropZone from "../DropZone/DropZone";
const FormImage = ({
  name,
  register,
  setValue,
  rules,
  label,
  error,
  placeholder,
  accept,
  numFiles,
  folder,
  defaultValue,
}) => {
  const handleDrop = (acceptedFiles) => {
    setValue(name, acceptedFiles);
  };
  React.useEffect(() => {
    register(name, rules);
    if (defaultValue) {
      setValue(name, defaultValue); 
    }
  }, [register, name, rules, setValue, defaultValue]);

  return (
    <FormControl
      error={error}
      sx={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 1,
        alignItems: "center",
      }}
    >
      <FormLabel>{label}</FormLabel>
      <DropZone
        onDrop={handleDrop}
        accept={accept}
        numFiles={numFiles}
        folder={folder}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {error && (
        <FormHelperText>
          <InfoOutlined />
          {label} is required
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormImage;
