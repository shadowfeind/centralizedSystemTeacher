import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export const useForm = (initialFormValues) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, setValues, handleInputChange, errors, setErrors };
};

const useStyles = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: "8px",
    },
  },
});

export const Form = (props) => {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
};
