import { TextField } from "@material-ui/core";
import React from "react";

const InputControl = ({
  name,
  label,
  value,
  errors = null,
  onChange,
  ...other
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(errors && { error: true, helperText: errors })}
    />
  );
};

export default InputControl;
