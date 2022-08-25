import { FormControl, FormControlLabel, Checkbox } from "@material-ui/core";
// import { CheckBox } from "@material-ui/icons";
import React from "react";

const CheckBoxControl = ({ name, value, label, onChange }) => {
  const converToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(converToDefaultEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckBoxControl;
