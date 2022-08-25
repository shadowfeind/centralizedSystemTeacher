import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl"
import { createSingleFamilyMemberAction, familyMemberCreateAction, getAllFamilyMemberCreateAction } from "./FamilyMemberActions";

const initialFormValues = {
  IDHRFamilyMember: 0,
  IDHREmployee: 0,
  Relationship: 0,
  Gender: "",
  IsMarried:"",
  FullName: "",
  Dob: "2022-01-07T05:00:50.411Z",
  CurrentAddress: "",
  MobileNumber: "",
  Nationality: "",
  BloodGroup: "",
  Employer: "",
  EmployerAddress: "",
  Designation: "",
  OfficePhone: "",
  OfficeEmail: "",
  Occupation: "",
  Status: "",
  Created_On: "2022-01-07T05:00:50.411Z",
  Updated_On: "2022-01-07T05:00:50.411Z",
};

const FamilyMemberForm = ({ familyMember, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.FullName = !fieldValues.FullName
      ? "This feild is required"
      : fieldValues.FullName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FullName.trim()
      ? "This feild is required"
      : "";

    temp.Gender = !fieldValues.Gender
      ? "This feild is required"
      : fieldValues.Gender.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Gender.trim()
      ? "This feild is required"
      : "";

    temp.Dob = !fieldValues.Dob
      ? "This feild is required"
      : "";

    temp.CurrentAddress = !fieldValues.CurrentAddress
      ? "This feild is required"
      : fieldValues.CurrentAddress.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.CurrentAddress.trim()
      ? "This feild is required"
      : "";

    temp.Relationship = !fieldValues.Relationship
      ? "This feild is required"
      : "";

    temp.MobileNumber = !fieldValues.MobileNumber
      ? "This feild is required"
      : fieldValues.MobileNumber.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.Nationality = !fieldValues.Nationality
      ? "This feild is required"
      : "";

    temp.BloodGroup = !fieldValues.BloodGroup
      ? "This feild is required"
      : fieldValues.BloodGroup.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.BloodGroup.trim()
      ? "This feild is required"
      : "";

    temp.Employer = !fieldValues.Employer
      ? "This feild is required"
      : fieldValues.Employer.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Employer.trim()
      ? "This feild is required"
      : "";

    temp.EmployerAddress = !fieldValues.EmployerAddress
      ? "This feild is required"
      : fieldValues.EmployerAddress.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.EmployerAddress.trim()
      ? "This feild is required"
      : "";

    temp.Designation = !fieldValues.Designation
      ? "This feild is required"
      : fieldValues.Designation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Designation.trim()
      ? "This feild is required"
      : "";

    temp.OfficePhone = !fieldValues.OfficePhone
      ? "This feild is required"
      : fieldValues.OfficePhone.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.OfficeEmail = !fieldValues.OfficeEmail
      ? "This feild is required"
      : fieldValues.OfficeEmail.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.OfficeEmail.trim()
      ? "This feild is required"
      : "";

    temp.Occupation = !fieldValues.Occupation
      ? "This feild is required"
      : fieldValues.Occupation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Occupation.trim()
      ? "This feild is required"
      : "";

    temp.Status = !fieldValues.Status
      ? "This feild is required"
      : fieldValues.Status.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Status.trim()
      ? "This feild is required"
      : "";

    temp.IsMarried = !fieldValues.IsMarried
      ? "This feild is required"
      : fieldValues.IsMarried.length > 20
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
      if (values.IDHRFamilyMember === 0) {
        dispatch(familyMemberCreateAction(values));
      } else {
      dispatch(createSingleFamilyMemberAction(values));
    }
  }
  };

  useEffect(() => {
    if (familyMember) {
      setValues({ ...familyMember.dbModel });
    }
  }, [familyMember]);

  const test = [{ Key: "", value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="FullName"
            label="Full Name"
            value={values.FullName}
            onChange={handleInputChange}
            errors={errors.FullName}
          />
          <SelectControl
            name="Gender"
            label="Gender"
            value={values.Gender}
            options={familyMember ? familyMember.ddlGender : test}
            onChange={handleInputChange}
            errors={errors.Gender}
          />
          <DatePickerControl
            name="Dob"
            label="DOB"
            value={values.Dob}
            onChange={handleInputChange}
            errors={errors.Dob}
          />
          <InputControl
            name="MobileNumber"
            label="Mobile Number"
            value={values.MobileNumber}
            onChange={handleInputChange}
            errors={errors.MobileNumber}
            type= "number"
          />
          <SelectControl
            name="BloodGroup"
            label="Blood Group"
            value={values.BloodGroup}
            options={familyMember ? familyMember.ddlBloodGroup : test}
            onChange={handleInputChange}
            errors={errors.BloodGroup}
          />
          <InputControl
            name="Employer"
            label="Employer"
            value={values.Employer}
            onChange={handleInputChange}
            errors={errors.Employer}
          />
          <InputControl
            name="Designation"
            label="Designation"
            value={values.Designation}
            onChange={handleInputChange}
            errors={errors.Designation}
          />
          <InputControl
            name="OfficeEmail"
            label="Office Email"
            value={values.OfficeEmail}
            onChange={handleInputChange}
            errors={errors.OfficeEmail}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            name="Relationship"
            label="Relationship"
            value={values.Relationship}
            options={familyMember ? familyMember.ddlRelationship : test}
            onChange={handleInputChange}
            errors={errors.Relationship}
          />
          <SelectControl
            name="IsMarried"
            label="Maritial Status"
            value={values.IsMarried}
            options={familyMember ? familyMember.ddlStatus : test}
            onChange={handleInputChange}
            errors={errors.IsMarried}
          />
          <InputControl
            name="CurrentAddress"
            label="Current Address"
            value={values.CurrentAddress}
            onChange={handleInputChange}
            errors={errors.CurrentAddress}
          />
          <SelectControl
            name="Nationality"
            label="Nationality"
            value={values.Nationality}
            options={familyMember ? familyMember.ddlCountry : test}
            onChange={handleInputChange}
            errors={errors.Nationality}
          />
          <InputControl
            name="Occupation"
            label="Occupation"
            value={values.Occupation}
            onChange={handleInputChange}
            errors={errors.Occupation}
          />
          <InputControl
            name="EmployerAddress"
            label="Employer Address"
            value={values.EmployerAddress}
            onChange={handleInputChange}
            errors={errors.EmployerAddress}
          />
          <InputControl
            name="OfficePhone"
            label="Office Phone"
            value={values.OfficePhone}
            onChange={handleInputChange}
            errors={errors.OfficePhone}
            type= "number"
          />
          <SelectControl
            name="Status"
            label="Status"
            value={values.Status}
            options={familyMember ? familyMember.ddlStatus : test}
            onChange={handleInputChange}
            errors={errors.Status}
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

export default FamilyMemberForm;