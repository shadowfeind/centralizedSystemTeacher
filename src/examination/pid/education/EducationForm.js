import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl"
import { createSingleEducationAction, educationCreateAction, getAllEducationCreateAction, updateSingleEducationAction } from "./EducationActions";

const initialFormValues = {
  IDHREducation: 0,
  IDHREmployee: 0,
  EducationLevel: "",
  InstituteName: "",
  ScoreIn: "",
  Score: 0,
  PassDate: "2022-01-07T05:00:50.369Z",
  MajorSpecialization: "",
  MinorSpecialization: "",
  Division: "",
  ObtainedCountry: "",
  Board: "",
  SymbolNo: "",
  TotalMarks: 0,
  ObtainedMarks: 0,
  PassedYear: "2022-01-07T05:00:50.369Z",
  IsActive: true,
  Created_On: "2022-01-07T05:00:50.369Z",
  Updated_On: "2022-01-07T05:00:50.369Z",
};

const EducationForm = ({educatonForm, setOpenPopup})=>{
    const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.InstituteName = !fieldValues.InstituteName
    ? "This feild is required"
    : fieldValues.InstituteName.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.InstituteName.trim()
    ? "This feild is required"
    : "";

    temp.ScoreIn = !fieldValues.ScoreIn
    ? "This feild is required"
    : fieldValues.InstituteName.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.InstituteName.trim()
    ? "This feild is required"
    : "";

    temp.Score = !fieldValues.Score
    ? "This feild is required"
    : "";

    temp.PassDate = !fieldValues.PassDate
    ? "This feild is required"
    : "";

    temp.MajorSpecialization = !fieldValues.MajorSpecialization
    ? "This feild is required"
    : fieldValues.MajorSpecialization.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.MajorSpecialization.trim()
    ? "This feild is required"
    : "";

    temp.MinorSpecialization = !fieldValues.MinorSpecialization
    ? "This feild is required"
    : fieldValues.MinorSpecialization.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.MinorSpecialization.trim()
    ? "This feild is required"
    : "";

    temp.Division = !fieldValues.Division
    ? "This feild is required"
    : fieldValues.Division.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.Division.trim()
    ? "This feild is required"
    : "";

    temp.ObtainedCountry = !fieldValues.ObtainedCountry
    ? "This feild is required"
    : fieldValues.ObtainedCountry.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.ObtainedCountry.trim()
    ? "This feild is required"
    : "";

    temp.Board = !fieldValues.Board
    ? "This feild is required"
    : fieldValues.Board.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.Board.trim()
    ? "This feild is required"
    : "";

    temp.SymbolNo = !fieldValues.SymbolNo
    ? "This feild is required"
    : fieldValues.SymbolNo.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.SymbolNo.trim()
    ? "This feild is required"
    : "";

    temp.TotalMarks = !fieldValues.TotalMarks
    ? "This feild is required"
    : "";

    temp.ObtainedMarks = !fieldValues.ObtainedMarks
    ? "This feild is required"
    : "";

    temp.PassedYear = !fieldValues.PassedYear
    ? "This feild is required"
    : "";

    temp.EducationLevel = !fieldValues.EducationLevel
    ? "This feild is required"
    : fieldValues.EducationLevel.length > 20
    ? "Must be less than 20 characters"
    : !fieldValues.EducationLevel.trim()
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
      if (values.IDHREducation === 0) {
        dispatch(educationCreateAction(values));
      } else {
      dispatch(createSingleEducationAction(values));
      // alert("working");
    }
  }
  };  
  useEffect(() => {
    if (educatonForm) {
      setValues({ ...educatonForm.dbModel });
    }
  }, [educatonForm]);
  const test = [{Key:"", value:""}]

  return(
    <Form onSubmit={handleSubmit}>
    <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
        <SelectControl
          name="EducationLevel"
          label="Qualification"
          value={values.EducationLevel}
          options={educatonForm ? educatonForm.ddlQualification: test}
          onChange={handleInputChange}
          errors={errors.EducationLevel}
        />
        <InputControl
          name="Board"
          label="Board"
          value={values.Board}
          onChange={handleInputChange}
          errors={errors.Board}
        />
        <InputControl
          name="TotalMarks"
          label="Total Marks"
          value={values.TotalMarks}
          onChange={handleInputChange}
          errors={errors.TotalMarks}
          type = "number"
        />
         <SelectControl
          name="ScoreIn"
          label="Score In"
          value={values.ScoreIn}
          options={educatonForm ? educatonForm.ddlScoreIn: test}
          onChange={handleInputChange}
          errors={errors.ScoreIn}
        />
        <SelectControl
          name="Division"
          label="Division"
          value={values.Division}
          options={educatonForm ? educatonForm.ddlDivision: test}
          onChange={handleInputChange}
          errors={errors.Division}
        />
        
        <InputControl
          name="MajorSpecialization"
          label="Major Specialization"
          value={values.MajorSpecialization}
          onChange={handleInputChange}
          errors={errors.MajorSpecialization}
        />
      <DatePickerControl
          name="PassDate"
          label="Pass Date"
          value={values.PassDate}
          onChange={handleInputChange}
          errors={errors.PassDate}
        />
         </Grid>
        <Grid item xs={6}>
        <InputControl
          name="InstituteName"
          label="Institute Name"
          value={values.InstituteName}
          onChange={handleInputChange}
          errors={errors.InstituteName}
        />
        <InputControl
          name="SymbolNo"
          label="Symbol No"
          value={values.SymbolNo}
          onChange={handleInputChange}
          errors={errors.SymbolNo}
        
        />
        <InputControl
          name="ObtainedMarks"
          label="Obtained Marks"
          value={values.ObtainedMarks}
          onChange={handleInputChange}
          errors={errors.ObtainedMarks}
          type = "number"
        />
        <InputControl
          name="Score"
          label="Score"
          value={values.Score}
          onChange={handleInputChange}
          errors={errors.Score}
          type = "number"
        />
        <DatePickerControl
          name="PassedYear"
          label="Passed Year"
          value={values.PassedYear}
          onChange={handleInputChange}
          errors={errors.PassedYear}
        />
        <InputControl
          name="MinorSpecialization"
          label="Minor Specialization"
          value={values.MinorSpecialization}
          onChange={handleInputChange}
          errors={errors.MinorSpecialization}
        />
        <SelectControl
          name="ObtainedCountry"
          label="Obtained Country"
          value={values.ObtainedCountry}
          options={educatonForm ? educatonForm.ddlCountry: test}
          onChange={handleInputChange}
          errors={errors.ObtainedCountry}
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
)
}

export default EducationForm;