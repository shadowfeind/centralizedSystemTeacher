import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";

const RadioGroupControl = ({ name, label, value, onChange, items }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <RadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupControl;
