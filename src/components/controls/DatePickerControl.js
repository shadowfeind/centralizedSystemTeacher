import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePickerControl = ({ name, label, value, onChange }) => {
  const converToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd-MM-yyyy"
        inputVariant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={(date) => {
          onChange(converToDefaultEventPara(name, date));
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerControl;
