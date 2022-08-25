import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

const SelectControl = ({
  name,
  errors = null,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl
      style={{ minWidth: "80%" }}
      variant="outlined"
      {...(errors && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {/* <MenuItem value="">None</MenuItem> */}

        {options?.map((item) => (
          <MenuItem value={item.Key} key={item.Key}>
            {item.Value}
          </MenuItem>
        ))}

      </Select>
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default SelectControl;
