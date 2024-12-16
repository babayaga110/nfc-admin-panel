import * as React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  Typography,
} from "@mui/joy";
import { Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
export default function FormSwitch({
  name,
  control,
  rules,
  label,
  error,
  placeholder,
  disabled,
}) {
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
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Switch
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            ref={ref}
            size="sm"
            disabled={disabled}
            slotProps={{
              track: {
                children: (
                  <React.Fragment>
                    <Typography
                      component="span"
                      level="inherit"
                      sx={{ ml: "10px" }}
                    >
                      On
                    </Typography>
                    <Typography
                      component="span"
                      level="inherit"
                      sx={{ mr: "10px" }}
                    >
                      Off
                    </Typography>
                  </React.Fragment>
                ),
              },
            }}
            sx={{
              "--Switch-thumbSize": "27px",
              "--Switch-trackWidth": "64px",
              "--Switch-trackHeight": "31px",
            }}
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
}
