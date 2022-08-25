import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";

import {
  createAcademicGradingAction,
  updateSingleAcademicGradingAction,
} from "./AcademicGradingActions";

const initialFormValues = {
  IDFacultyGradingSystem: 0,
  IDFacultyProgramLink: 0,
  LetterGrade: "",
  HonorPoint: "",
  GradeComment: "",
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const AcademicGradingForm = ({ academicGradingEdit, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.LetterGrade = !fieldValues.LetterGrade
      ? "This feild is required"
      : !fieldValues.LetterGrade.trim()
      ? "This feild is required"
      : fieldValues.LetterGrade.length > 2
      ? "Must be less than 2 characters"
      : "";

    temp.HonorPoint = !fieldValues.HonorPoint ? "This feild is required" : "";

    temp.LetterGrade = !fieldValues.LetterGrade
      ? "This feild is required"
      : !fieldValues.LetterGrade.trim()
      ? "This feild is required"
      : fieldValues.LetterGrade.length > 200
      ? "Must be less than 2 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (validate()) {
  //     if (values.IDFacultyGradingSystem === 0) {
  //       dispatch(createAcademicGradingAction(values));
  //     } else {
  //       dispatch(updateSingleAcademicGradingAction(values));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (academicGradingEdit) {
  //     setValues({ ...academicGradingEdit });
  //   }
  // }, [academicGradingEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="LetterGrade"
            label="Grade"
            value={values.LetterGrade}
            onChange={handleInputChange}
            errors={errors.LetterGrade}
          />

          <InputControl
            name="GradeComment"
            label="Comment"
            value={values.GradeComment}
            onChange={handleInputChange}
            errors={errors.GradeComment}
          />
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="HonorPoint"
            label="Honor Point"
            type="number"
            value={values.HonorPoint}
            onChange={handleInputChange}
            errors={errors.HonorPoint}
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
export default AcademicGradingForm;
