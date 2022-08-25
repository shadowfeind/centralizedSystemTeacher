import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { updateSingleGuardianAction } from "./GuardianActions";

const initialFormValues = {
  IDHREmployee: 0,
  FatherName: "",
  FatherContactNo: "",
  FatherOccupation: "",
  FatherWorkingDesignation: "",
  FatherWorkingOrganization: "",
  FatherEmail: "",
  MotherName: "",
  MotherContactNo: "",
  MotherOccupation: "",
  MotherWorkingDesignation: "",
  MotherWorkingOrganization: "",
  MotherEmail: "",
  LocalGuardianName: "",
  LocalGuardianContactNo: "",
  LocalGuardianOccupation: "",
  LocalGuardianWorkingDesignation: "",
  LocalGuardianWorkingOrganization: "",
  LocalGuardianEmail: "",
  IDHRRole: 0,
};

const GuardianForm = ({ guardianForm, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.FatherName = !fieldValues.FatherName
      ? "This feild is required"
      : fieldValues.FatherName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FatherName.trim()
      ? "This feild is required"
      : "";

    temp.FatherContactNo = !fieldValues.FatherContactNo
      ? "This feild is required"
      : fieldValues.FatherContactNo.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.FatherOccupation = !fieldValues.FatherOccupation
      ? "This feild is required"
      : fieldValues.FatherOccupation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FatherOccupation.trim()
      ? "This feild is required"
      : "";

    temp.FatherWorkingDesignation = !fieldValues.FatherWorkingDesignation
      ? "This feild is required"
      : fieldValues.FatherWorkingDesignation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FatherWorkingDesignation.trim()
      ? "This feild is required"
      : "";

    temp.FatherEmail = !fieldValues.FatherEmail
      ? "This feild is required"
      : fieldValues.FatherEmail.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FatherEmail.trim()
      ? "This feild is required"
      : "";

    temp.MotherName = !fieldValues.MotherName
      ? "This feild is required"
      : fieldValues.MotherName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.MotherName.trim()
      ? "This feild is required"
      : "";

    temp.MotherContactNo = !fieldValues.MotherContactNo
      ? "This feild is required"
      : fieldValues.MotherContactNo.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.MotherOccupation = !fieldValues.MotherOccupation
      ? "This feild is required"
      : fieldValues.MotherOccupation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.MotherOccupation.trim()
      ? "This feild is required"
      : "";

    temp.MotherWorkingDesignation = !fieldValues.MotherWorkingDesignation
      ? "This feild is required"
      : fieldValues.MotherWorkingDesignation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.MotherWorkingDesignation.trim()
      ? "This feild is required"
      : "";

    temp.MotherWorkingOrganization = !fieldValues.MotherWorkingOrganization
      ? "This feild is required"
      : fieldValues.MotherWorkingOrganization.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.MotherWorkingOrganization.trim()
      ? "This feild is required"
      : "";

    temp.MotherEmail = !fieldValues.MotherEmail
      ? "This feild is required"
      : fieldValues.MotherEmail.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.MotherEmail.trim()
      ? "This feild is required"
      : "";

    temp.LocalGuardianName = !fieldValues.LocalGuardianName
      ? "This feild is required"
      : fieldValues.LocalGuardianName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.LocalGuardianName.trim()
      ? "This feild is required"
      : "";

    temp.LocalGuardianContactNo = !fieldValues.LocalGuardianContactNo
      ? "This feild is required"
      : fieldValues.LocalGuardianContactNo.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.LocalGuardianOccupation = !fieldValues.LocalGuardianOccupation
      ? "This feild is required"
      : fieldValues.LocalGuardianOccupation.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.LocalGuardianOccupation.trim()
      ? "This feild is required"
      : "";

    temp.LocalGuardianWorkingDesignation =
      !fieldValues.LocalGuardianWorkingDesignation
        ? "This feild is required"
        : fieldValues.LocalGuardianWorkingDesignation.length > 20
        ? "Must be less than 20 characters"
        : !fieldValues.LocalGuardianWorkingDesignation.trim()
        ? "This feild is required"
        : "";

    temp.LocalGuardianWorkingOrganization =
      !fieldValues.LocalGuardianWorkingOrganization
        ? "This feild is required"
        : fieldValues.LocalGuardianWorkingOrganization.length > 20
        ? "Must be less than 20 characters"
        : !fieldValues.LocalGuardianWorkingOrganization.trim()
        ? "This feild is required"
        : "";

    temp.LocalGuardianEmail = !fieldValues.LocalGuardianEmail
      ? "This feild is required"
      : fieldValues.LocalGuardianEmail.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.LocalGuardianEmail.trim()
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
      dispatch(updateSingleGuardianAction(values));
      // alert("working");
    }
  };
  useEffect(() => {
    if (guardianForm) {
      setValues({ ...guardianForm });
    }
  }, [guardianForm]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="FatherName"
            label="Father Name"
            value={values.FatherName}
            onChange={handleInputChange}
            errors={errors.FatherName}
          />

          <InputControl
            name="FatherContactNo"
            label="Father Contact No"
            value={values.FatherContactNo}
            onChange={handleInputChange}
            errors={errors.FatherContactNo}
            type="number"
          />

          <InputControl
            name="FatherOccupation"
            label="Father Occupation"
            value={values.FatherOccupation}
            onChange={handleInputChange}
            errors={errors.FatherOccupation}
          />
          <InputControl
            name="FatherWorkingDesignation"
            label="Father Working Designation"
            value={values.FatherWorkingDesignation}
            onChange={handleInputChange}
            errors={errors.FatherWorkingDesignation}
          />
          <InputControl
            name="FatherEmail"
            label="Father Email"
            value={values.FatherEmail}
            onChange={handleInputChange}
            errors={errors.FatherEmail}
          />
          <InputControl
            name="MotherName"
            label="Mother Name"
            value={values.MotherName}
            onChange={handleInputChange}
            errors={errors.MotherName}
          />
          <InputControl
            name="MotherContactNo"
            label="Mother Contact No"
            value={values.MotherContactNo}
            onChange={handleInputChange}
            errors={errors.MotherContactNo}
            type="number"
          />
          <InputControl
            name="MotherOccupation"
            label="Mother Occupation"
            value={values.MotherOccupation}
            onChange={handleInputChange}
            errors={errors.MotherOccupation}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="MotherWorkingDesignation"
            label="Mother Working Designation"
            value={values.MotherWorkingDesignation}
            onChange={handleInputChange}
            errors={errors.MotherWorkingDesignation}
          />
          <InputControl
            name="MotherWorkingOrganization"
            label="Mother Working Organization"
            value={values.MotherWorkingOrganization}
            onChange={handleInputChange}
            errors={errors.MotherWorkingOrganization}
          />

          <InputControl
            name="MotherEmail"
            label="Mother Email"
            value={values.MotherEmail}
            onChange={handleInputChange}
            errors={errors.MotherEmail}
          />
          <InputControl
            name="LocalGuardianName"
            label="LocalGuardian Name"
            value={values.LocalGuardianName}
            onChange={handleInputChange}
            errors={errors.LocalGuardianName}
          />
          <InputControl
            name="LocalGuardianContactNo"
            label="LocalGuardian Contact No"
            value={values.LocalGuardianContactNo}
            onChange={handleInputChange}
            errors={errors.LocalGuardianContactNo}
            type="number"
          />
          <InputControl
            name="LocalGuardianOccupation"
            label="LocalGuardian Occupation"
            value={values.LocalGuardianOccupation}
            onChange={handleInputChange}
            errors={errors.LocalGuardianOccupation}
          />
          <InputControl
            name="LocalGuardianWorkingDesignation"
            label="LocalGuardian Working Designation"
            value={values.LocalGuardianWorkingDesignation}
            onChange={handleInputChange}
            errors={errors.LocalGuardianWorkingDesignation}
          />
          <InputControl
            name="LocalGuardianWorkingOrganization"
            label="LocalGuardian Working Organization"
            value={values.LocalGuardianWorkingOrganization}
            onChange={handleInputChange}
            errors={errors.LocalGuardianWorkingOrganization}
          />
          <InputControl
            name="LocalGuardianEmail"
            label="LocalGuardian Email"
            value={values.LocalGuardianEmail}
            onChange={handleInputChange}
            errors={errors.LocalGuardianEmail}
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

export default GuardianForm;
