import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { createSingleHobbyAction, hobbyCreateAction } from "./HobbyActions";

const initialFormValues = {
  IDHRHobby: 0,
  IDHREmployee: 0,
  Heading: "",
  HeadingType: "",
  Details: "",
  IsActive: true,
  Created_On: "2022-01-11T04:51:47.618Z",
  Updated_On: "2022-01-11T04:51:47.618Z",
};

const HobbyForm = ({ hobbyForm, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.Heading = !fieldValues.Heading
      ? "This feild is required"
      : fieldValues.Heading.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Heading.trim()
      ? "This feild is required"
      : "";

    temp.HeadingType = !fieldValues.HeadingType
      ? "This feild is required"
      : fieldValues.HeadingType.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.HeadingType.trim()
      ? "This feild is required"
      : "";

    temp.Details = !fieldValues.Details
      ? "This feild is required"
      : fieldValues.Details.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Details.trim()
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
      if (values.IDHRHobby === 0) {
        dispatch(hobbyCreateAction(values));
      } else {
      dispatch(createSingleHobbyAction(values));
    }
  }
  };
  useEffect(() => {
    if (hobbyForm) {
      setValues({ ...hobbyForm.dbModel });
    }
  }, [hobbyForm]);
  const test = [{ Key: "", value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="Heading"
            label="Hobby Heading"
            value={values.Heading}
            onChange={handleInputChange}
            errors={errors.Heading}
          />
          </Grid>
          <Grid item xs={6}>
          <SelectControl
            name="HeadingType"
            label="Hobby Type"
            value={values.HeadingType}
            options={hobbyForm ? hobbyForm.ddlType : test}
            onChange={handleInputChange}
            errors={errors.HeadingType}
          />
          </Grid>
          <Grid item xs={6}>
          <InputControl
            name="Details"
            label="Hobby Details"
            value={values.Details}
            onChange={handleInputChange}
            errors={errors.Details}
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

export default HobbyForm;
