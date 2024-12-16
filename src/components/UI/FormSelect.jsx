import * as React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Option,
} from "@mui/joy";
import { Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
export default function FormSelect({
  name,
  control,
  rules,
  label,
  error,
  placeholder,
  options,
  setValue,
  register,
}) {

  const handleChange = (event, newValue) => {
    setValue(name, newValue);
  };

  React.useEffect(() => {
    register(name, { ...rules });
  }
  , [register, name, rules]);
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
        render={({ field:{
          onBlur,
          value,
        } }) => (
          <Select size="sm" onChange={handleChange} value={value} onBlur={onBlur}>
            {options.length > 0 ?(options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))):(
              <Option value="" disabled>
                No options available
              </Option>
            )}
          </Select>
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
}
