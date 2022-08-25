import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { createSingleTrainingAction, trainingCreateAction } from "./TrainingActions";

const initialFormValues = {
  IDHRTraining: 0,
  IDHREmployee: 0,
  TrainingTitle: "",
  TrainingType: "",
  Venue: "",
  FromDate: "2022-01-11T04:51:47.939Z",
  ToDate: "2022-01-11T04:51:47.939Z",
  Learning: "",
  IsActive: true,
  Created_On: "2022-01-11T04:51:47.939Z",
  Updated_On: "2022-01-11T04:51:47.939Z",
};

const TrainingForm =({trainingForm, setOpenPopup})=>{
    const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.TrainingTitle = !fieldValues.TrainingTitle
    ? "This feild is required"
    : fieldValues.TrainingTitle.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.TrainingTitle.trim()
    ? "This feild is required"
    : "";

    temp.TrainingType = !fieldValues.TrainingType
    ? "This feild is required"
    : fieldValues.TrainingType.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.TrainingType.trim()
    ? "This feild is required"
    : "";

    temp.Venue = !fieldValues.Venue
    ? "This feild is required"
    : fieldValues.Venue.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.Venue.trim()
    ? "This feild is required"
    : "";

    temp.FromDate = !fieldValues.FromDate
    ? "This feild is required"
    : "";

    temp.ToDate = !fieldValues.ToDate
    ? "This feild is required"
    : "";

    temp.Learning = !fieldValues.Learning
    ? "This feild is required"
    : fieldValues.Learning.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.Learning.trim()
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
      if (values.IDHRTraining === 0) {
        dispatch(trainingCreateAction(values));
      } else {
      dispatch(createSingleTrainingAction(values));
    }
  }
  };
  useEffect(() => {
    if (trainingForm) {
      setValues({ ...trainingForm.dbModel });
    }
  }, [trainingForm]);

  const test = [{Key:"", value:""}]

  return(
    <Form onSubmit={handleSubmit}>
    <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
        <InputControl
          name="TrainingTitle"
          label="Training Title"
          value={values.TrainingTitle}
          onChange={handleInputChange}
          errors={errors.TrainingTitle}
        />
      
        <InputControl
          name="Venue"
          label="Venue"
          value={values.Venue}
          onChange={handleInputChange}
          errors={errors.Venue}
        />
        <DatePickerControl
          name="FromDate"
          label="From Date"
          value={values.FromDate}
          onChange={handleInputChange}
          errors={errors.FromDate}
        />
        </Grid>
        <Grid item xs={6}>
        <SelectControl
          name="TrainingType"
          label="Training Type"
          value={values.TrainingType}
          options={trainingForm ? trainingForm.ddlTrainingType : test}
          onChange={handleInputChange}
          errors={errors.TrainingType}
        />
        
        <InputControl
          name="Learning"
          label="Learning"
          value={values.Learning}
          onChange={handleInputChange}
          errors={errors.Learning}
        />
        <DatePickerControl
          name="ToDate"
          label="To Date"
          value={values.ToDate}
          onChange={handleInputChange}
          errors={errors.ToDate}
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

export default TrainingForm;