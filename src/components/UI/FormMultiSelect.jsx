import * as React from "react";
import { Autocomplete, FormControl, FormLabel, FormHelperText } from "@mui/joy";
import { Controller } from "react-hook-form";

export default function FormMultiSelect({
  name,
  control,
  setValue,
  register,
  rules,
  label,
  error,
  placeholder, 
  options 
}) {
  React.useEffect(() => {
    register(name, { ...rules });
  }, [register, name, rules]);

  const handleAddNewOption = (newOption) => {
    setValue(name, (prevValue) => [...prevValue, newOption]);
  };

  const handleKeyDown = (event, params) => {
    if (event.key === "Enter" && params.inputValue !== "") {
      handleAddNewOption(params.inputValue);

      setValue(name, (prevValue) => [...prevValue, params.inputValue]);
      event.preventDefault();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(name, newValue);
  };

  return (
    <React.Fragment>
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
          rules={rules}
          control={control}
          render={({ field: { onBlur, value, ref } }) => {
            return (
              <Autocomplete
                ref={ref}
                multiple
                size="sm"
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={onBlur}
                value={value || []}
                options={options}
                freeSolo
                clearOnEscape
                selectOnFocus
                handleHomeEndKeys
                onKeyDown={(event) =>
                  handleKeyDown(event, { inputValue: event.target.value })
                }
              />
            );
          }}
        />
        {error && <FormHelperText>{label} is required</FormHelperText>}
      </FormControl>
    </React.Fragment>
  );
}
