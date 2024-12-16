import React from "react";
import { FormControl, FormLabel, FormHelperText, Textarea } from "@mui/joy";
import { Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

const FormInput = ({ name, control, rules, label, error, placeholder }) => {
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
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Textarea
            size="sm"
            {...field}
            minRows={3}
            placeholder={placeholder}
          />
        )}
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

export default FormInput;
