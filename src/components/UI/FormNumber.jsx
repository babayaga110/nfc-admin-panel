import * as React from "react";
import { FormControl, FormLabel, FormHelperText, Input } from "@mui/joy";
import { Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

const FormNumber = ({
  name,
  control,
  rules,
  label,
  error,
  placeholder,
  ...inputProps
}) => {
  const inputRef = React.useRef(null);
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
          <Input
            size="sm"
              type="number"
            {...field}
            {...inputProps}
            placeholder={placeholder}
            slotProps={{
              input: {
                ref: inputRef,
                min: 1,
                max: 5,
              },
            }}
            sx={[
              {
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
              },
              inputProps.sx,
            ]}
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

export default FormNumber;
