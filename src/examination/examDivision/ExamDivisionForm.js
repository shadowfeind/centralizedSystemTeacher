import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  createExamDivisionAction,
  updateSingleExamDivisionAction,
} from "./ExamDivisionActions";

const initialFormValues = {
  IDAcademicExamDivision: 0,
  IDFacultyProgramLink: 6,
  StartRange: 0,
  EndRange: 0,
  Division: "",
  Comment: "",
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const ExamDivisionForm = ({ examDivision, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.StartRange = !fieldValues.StartRange
      ? "This feild is required"
      : fieldValues.StartRange.length > 20
      ? "Must be less than 20 characters"
      : "";
    temp.EndRange = !fieldValues.EndRange
      ? "This feild is required"
      : fieldValues.EndRange.length > 20
      ? "Must be less than 20 characters"
      : "";
    temp.Division = !fieldValues.Division
      ? "This feild is required"
      : !fieldValues.Division.trim()
      ? "This feild is required"
      : fieldValues.Division.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.Comment = !fieldValues.Comment
      ? "This feild is required"
      : !fieldValues.Comment.trim()
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
      if (values.IDAcademicExamDivision === 0) {
        dispatch(createExamDivisionAction(values));
      } else {
        dispatch(updateSingleExamDivisionAction(values));
      }
    }
  };

  useEffect(() => {
    if (examDivision) {
      setValues({ ...examDivision });
    }
  }, [examDivision]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="StartRange"
            label="Start Range"
            value={values.StartRange}
            onChange={handleInputChange}
            type="number"
            errors={errors.StartRange}
          />

          <InputControl
            name="Division"
            label="Division"
            value={values.Division}
            onChange={handleInputChange}
            errors={errors.Division}
          />
          <InputControl
            name="Comment"
            label="Comment"
            value={values.Comment}
            onChange={handleInputChange}
            errors={errors.Comment}
          />
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="EndRange"
            label="End Range"
            type="number"
            value={values.EndRange}
            onChange={handleInputChange}
            errors={errors.EndRange}
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
export default ExamDivisionForm;
