import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { updateSingleEmailAction } from "./EmailActions";

const initialFormValues = {
  IDHREmployee: 0,
  EmailID: "",
  AlternateEmailID: "",
  SkypeID: "",
  IDHRRole: 0,
};

const EmailForm = ({ emailForm, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.EmailID = !fieldValues.EmailID
    ? "This feild is required"
    : fieldValues.EmailID.length > 50
    ? "Must be less than 20 characters"
    : !fieldValues.EmailID.trim()
    ? "This feild is required"
    : "";

  temp.AlternateEmailID = !fieldValues.AlternateEmailID
    ? "This feild is required"
    : fieldValues.AlternateEmailID.length > 50
    ? "Must be less than 20 characters"
    : !fieldValues.AlternateEmailID.trim()
    ? "This feild is required"
    : "";

  temp.SkypeID = !fieldValues.SkypeID
    ? "This feild is required"
    : fieldValues.SkypeID.length > 50
    ? "Must be less than 20 characters"
    : !fieldValues.SkypeID.trim()
    ? "This feild is required"
    : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validate()) {
          dispatch(updateSingleEmailAction(values));
          // alert("working");
        }
      };
    
      useEffect(() => {
        if (emailForm) {
          setValues({ ...emailForm });
        }
      }, [emailForm]);

      return (
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <InputControl
                name="EmailID"
                label="Email Address"
                value={values.EmailID}
                onChange={handleInputChange}
                errors={errors.EmailID}
              />
              </Grid>
    <Grid item xs={6}>
              <InputControl
                name="AlternateEmailID"
                label="Alternate Email Address"
                value={values.AlternateEmailID}
                onChange={handleInputChange}
                errors={errors.AlternateEmailID}        
              />
    </Grid>
    <Grid item xs={6}>
              <InputControl
                name="SkypeID"
                label="Skype ID"
                value={values.SkypeID}
                onChange={handleInputChange}
                errors={errors.SkypeID}
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

export default EmailForm;
