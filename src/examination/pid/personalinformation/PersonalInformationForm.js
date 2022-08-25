import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl"
import { updateSinglePersonalInformationAction } from "./PersonalInformationActions";

const initialFormValues = {
  IDHREmployee: 0,
  LoginIDHREmployee: "",
  Title: "",
  JoinedPosition: "",
  Position: "",
  IDHRSalaryScale: "",
  JoinedLevel: "",
  DOJ: "2022-01-11T04:51:47.812Z",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Sex: "",
  Married: "",
  DOB: "2022-01-11T04:51:47.812Z",
  BloodGroup: "",
  SpeakingLanguage: "",
  ReadingWritingLanguage: "",
  ComputerLiteracyLevel: "",
  ComputerLiteracyArea: "",
  IsNepaliResident: "",
  VehicleFacility: true,
  HomeFacility: true,
  ComputerFacility: true,
  MobileFacility: true,
  BankAC: "",
  Religion: "",
  IDHRRole: 0,
};

const PersonalInformationForm =({personalInformation, setOpenPopup})=>{
    const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

      temp.Title = !fieldValues.Title
      ? "This feild is required"
      : fieldValues.Title.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Title.trim()
      ? "This feild is required"
      : "";

      temp.LoginIDHREmployee = !fieldValues.LoginIDHREmployee
      ? "This feild is required"
      : fieldValues.LoginIDHREmployee.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.LoginIDHREmployee.trim()
      ? "This feild is required"
      : "";

      temp.JoinedPosition = !fieldValues.JoinedPosition
      ? "This feild is required"
      : fieldValues.JoinedPosition.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.JoinedPosition.trim()
      ? "This feild is required"
      : "";

      temp.Position = !fieldValues.Position
      ? "This feild is required"
      : fieldValues.Position.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Position.trim()
      ? "This feild is required"
      : "";

      temp.DOJ = !fieldValues.DOJ
      ? "This feild is required"
      : fieldValues.DOJ.length > 20
      ? "Must be less than 20 characters"
      : "";

      temp.FirstName = !fieldValues.FirstName
      ? "This feild is required"
      : fieldValues.FirstName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FirstName.trim()
      ? "This feild is required"
      : "";

      temp.MiddleName = fieldValues.MiddleName && fieldValues.MiddleName.length > 20
      ? "Must be less than 20 characters"
      : "";

      temp.LastName = !fieldValues.LastName
      ? "This feild is required"
      : fieldValues.LastName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.LastName.trim()
      ? "This feild is required"
      : "";

      temp.Sex = !fieldValues.Sex
      ? "This feild is required"
      : fieldValues.Sex.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Sex.trim()
      ? "This feild is required"
      : "";

      temp.Married = !fieldValues.Married
      ? "This feild is required"
      : "";

      temp.DOB = !fieldValues.DOB
      ? "This feild is required"
      : fieldValues.DOB.length > 20
      ? "Must be less than 20 characters"
      : "";

      temp.BloodGroup = !fieldValues.BloodGroup
      ? "This feild is required"
      : fieldValues.BloodGroup.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.BloodGroup.trim()
      ? "This feild is required"
      : "";

      temp.SpeakingLanguage = !fieldValues.SpeakingLanguage
      ? "This feild is required"
      : fieldValues.SpeakingLanguage.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.SpeakingLanguage.trim()
      ? "This feild is required"
      : "";

      temp.ReadingWritingLanguage = !fieldValues.ReadingWritingLanguage
      ? "This feild is required"
      : fieldValues.ReadingWritingLanguage.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.ReadingWritingLanguage.trim()
      ? "This feild is required"
      : "";

      temp.ComputerLiteracyLevel = !fieldValues.ComputerLiteracyLevel
      ? "This feild is required"
      : fieldValues.ComputerLiteracyLevel.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.ComputerLiteracyLevel.trim()
      ? "This feild is required"
      : "";

      temp.ComputerLiteracyArea = !fieldValues.ComputerLiteracyArea
      ? "This feild is required"
      : fieldValues.ComputerLiteracyArea.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.ComputerLiteracyArea.trim()
      ? "This feild is required"
      : "";

      temp.IsNepaliResident = !fieldValues.IsNepaliResident
      ? "This feild is required"
      : "";

      temp.BankAC = !fieldValues.BankAC
      ? "This feild is required"
      : fieldValues.BankAC.length > 20
      ? "Must be less than 20 characters"
      : "";

      temp.Religion = !fieldValues.Religion
      ? "This feild is required"
      : "";

      setErrors({ ...temp });
      return Object.values(temp).every((x) => x === "");
  }
  const { values, setValues, handleInputChange, errors, setErrors } =
  useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(updateSinglePersonalInformationAction(values));
    }
  };  

  useEffect(() => {
    if (personalInformation) {
      setValues({ ...personalInformation.dbModel });
    }
  }, [personalInformation]);

  const test = [{Key:"", value:""}]

  const citizenOption = [{Key:"0", Value:"No"},{Key:"1", Value:"Yes"}]
  const religionOption = [{Key:"0", Value:"Hinduism"},{Key:"1", Value:"Buddhism"},{Key:"2", Value:"Kiratism"},{Key:"3", Value:"Christianity"},{Key:"4", Value:"Islam"},{Key:"5", Value:"Others"}]
  return(
    <Form onSubmit={handleSubmit}>
    <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
        <InputControl
          name="LoginIDHREmployee"
          label="Login ID"
          value={values.LoginIDHREmployee}
          onChange={handleInputChange}
          errors={errors.LoginIDHREmployee}
        />
         <SelectControl
          name="Title"
          label="Title"
          value={values.Title}
          options={personalInformation ? personalInformation.ddlTitle: test}
          onChange={handleInputChange}
          errors={errors.Title}
        />
        
         <InputControl
          name="FirstName"
          label="First Name"
          value={values.FirstName}
          onChange={handleInputChange}
          errors={errors.FirstName}
        />
         <InputControl
          name="MiddleName"
          label="Middle Name"
          value={values.MiddleName}
          onChange={handleInputChange}
          errors={errors.MiddleName}
        />
         <InputControl
          name="LastName"
          label="Last Name"
          value={values.LastName}
          onChange={handleInputChange}
          errors={errors.LastName}
        />
         <InputControl
          name="Position"
          label="Position"
          value={values.Position}
          onChange={handleInputChange}
          errors={errors.Position}
        />
         <DatePickerControl
          name="DOB"
          label="Date Of Birth"
          value={values.DOB}
          onChange={handleInputChange}
          errors={errors.DOB}
        />
        <InputControl
          name="JoinedLevel"
          label="Joined Position"
          value={values.JoinedLevel}
          onChange={handleInputChange}
          errors={errors.JoinedLevel}
        />
        <SelectControl
          name="BloodGroup"
          label="Blood Group"
          value={values.BloodGroup}
          options={personalInformation ? personalInformation.ddlBloodGroup: test}
          onChange={handleInputChange}
          errors={errors.BloodGroup}
        />
        </Grid>
        <Grid item xs={6}>
        <InputControl
          name="SpeakingLanguage"
          label="Speaking Language"
          value={values.SpeakingLanguage}
          onChange={handleInputChange}
          errors={errors.SpeakingLanguage}
        />
        <SelectControl
          name="ComputerLiteracyLevel"
          label="Computer Literacy Level"
          value={values.ComputerLiteracyLevel}
          options={personalInformation ? personalInformation.ddlComputerLiteracyLevel: test}
          onChange={handleInputChange}
          errors={errors.ComputerLiteracyLevel}
        />
        <SelectControl
          name="Sex"
          label="Gender"
          value={values.Sex}
          options={personalInformation ? personalInformation.ddlGender: test}
          onChange={handleInputChange}
          errors={errors.Sex}
        />
        <SelectControl
          name="IsNepaliResident"
          label="Is Nepali Resident"
          value={values.IsNepaliResident}
          options={citizenOption}
          onChange={handleInputChange}
          errors={errors.IsNepaliResident}
        />
        <SelectControl
          name="Religion"
          label="Religion"
          value={values.Religion}
          options={religionOption}
          onChange={handleInputChange}
          errors={errors.Religion}
        />
        <InputControl
          name="ReadingWritingLanguage"
          label="Reading And Writing Language"
          value={values.ReadingWritingLanguage}
          onChange={handleInputChange}
          errors={errors.ReadingWritingLanguage}
        />
        
        <InputControl
          name="ComputerLiteracyArea"
          label="Computer Literacy Area"
          value={values.ComputerLiteracyArea}
          onChange={handleInputChange}
          errors={errors.ComputerLiteracyArea}
        />
        <SelectControl
          name="Married"
          label="Is Married"
          value={values.Married}
          options={personalInformation ? personalInformation.ddlIsActive: test}
          onChange={handleInputChange}
          errors={errors.Married}
        />
        <DatePickerControl
          name="DOJ"
          label="Date Of Joining"
          value={values.DOJ}
          onChange={handleInputChange}
          errors={errors.DOJ}
        />
        <InputControl
          name="BankAC"
          label="Bank Account"
          value={values.BankAC}
          onChange={handleInputChange}
          errors={errors.BankAC}
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

export default PersonalInformationForm;