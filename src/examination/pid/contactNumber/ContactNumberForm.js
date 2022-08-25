import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { updateSingleContactNumberAction } from "./ContactNumberActions";

const initialFormValues = {
  IDHREmployee: 0,
  OfficeNumber: "",
  OfficeNumberExtension: "",
  HomeNumber: "",
  MobileNumber: "",
  OtherNumber: "",
  IDHRRole: 0,
};

const ContactNumberForm = ({ contactNumber, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.OfficeNumber = !fieldValues.OfficeNumber
      ? "This feild is required"
      : fieldValues.OfficeNumber.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.OfficeNumberExtension = !fieldValues.OfficeNumberExtension
      ? "This feild is required"
      : fieldValues.OfficeNumberExtension.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.HomeNumber = !fieldValues.HomeNumber
      ? "This feild is required"
      : fieldValues.HomeNumber.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.MobileNumber = !fieldValues.MobileNumber
      ? "This feild is required"
      : fieldValues.MobileNumber.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.OtherNumber = !fieldValues.OtherNumber
      ? "This feild is required"
      : fieldValues.OtherNumber.length > 20
      ? "Must be less than 20 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(updateSingleContactNumberAction(values));
    }
  };

  useEffect(() => {
    if (contactNumber) {
      setValues({ ...contactNumber });
    }
  }, [contactNumber]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="OfficeNumber"
            label="Office Number"
            value={values.OfficeNumber}
            onChange={handleInputChange}
            errors={errors.OfficeNumber}
            type="number"
          />

          <InputControl
            name="HomeNumber"
            label="Home Number"
            value={values.HomeNumber}
            onChange={handleInputChange}
            errors={errors.HomeNumber}
            type="number"
          />

          <InputControl
            name="OtherNumber"
            label="Other Number"
            value={values.OtherNumber}
            onChange={handleInputChange}
            errors={errors.OtherNumber}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="OfficeNumberExtension"
            label="Office Number Ext"
            value={values.OfficeNumberExtension}
            onChange={handleInputChange}
            errors={errors.OfficeNumberExtension}
            type="number"
          />

          <InputControl
            name="MobileNumber"
            label="Mobile Number"
            value={values.MobileNumber}
            onChange={handleInputChange}
            errors={errors.MobileNumber}
            type="number"
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default ContactNumberForm;
