import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { createSingleJobHistoryAction, jobHistoryCreateAction } from "./JobHistoryActions";

const initialFormValues = {
  IDHRJobHistory: 0,
  IDHREmployee: 0,
  Organization: "",
  OrganizationType: 0,
  FromDate: "2022-01-07T05:00:50.497Z",
  ToDate: "2022-01-07T05:00:50.497Z",
  Post: "",
  Responsibility: "",
  IsCurrentlyActiveJob: true,
  IsActive: true,
  Created_On: "2022-01-07T05:00:50.497Z",
  Updated_On: "2022-01-07T05:00:50.497Z",
};

const JobHistoryForm = ({ jobHistory, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.Organization = !fieldValues.Organization
      ? "This feild is required"
      : fieldValues.Organization.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Organization.trim()
      ? "This feild is required"
      : "";

    temp.OrganizationType = !fieldValues.OrganizationType
      ? "This feild is required"
      : fieldValues.OrganizationType.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.OrganizationType.trim()
      ? "This feild is required"
      : "";

    temp.FromDate = !fieldValues.FromDate
      ? "This feild is required"
      : "";

    temp.ToDate = !fieldValues.ToDate
      ? "This feild is required"
      : "";

    temp.Responsibility = !fieldValues.Responsibility
      ? "This feild is required"
      : fieldValues.Responsibility.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Responsibility.trim()
      ? "This feild is required"
      : "";

    temp.Post = !fieldValues.Post
      ? "This feild is required"
      : fieldValues.Post.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Post.trim()
      ? "This feild is required"
      : "";

    temp.IsCurrentlyActiveJob = !fieldValues.IsCurrentlyActiveJob
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
      if (values.IDHRJobHistory === 0){
        dispatch(jobHistoryCreateAction(values));
      }else{
      dispatch(createSingleJobHistoryAction(values));
    }
  }
  };

  useEffect(() => {
    if (jobHistory) {
      setValues({ ...jobHistory.dbModel });
    }
  }, [jobHistory]);

  const test = [{ Key: "", value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="Post"
            label="Post"
            value={values.Post}
            onChange={handleInputChange}
            errors={errors.Post}
          />
          <SelectControl
            name="OrganizationType"
            label="Organization Type"
            value={values.OrganizationType}
            options={jobHistory ? jobHistory.ddlIndustryType : test}
            onChange={handleInputChange}
            errors={errors.OrganizationType}
          />
          <DatePickerControl
            name="FromDate"
            label="From Date"
            value={values.FromDate}
            onChange={handleInputChange}
            errors={errors.FromDate}
          />
          
          <InputControl
            name="Responsibility"
            label="Job Responsibilities"
            value={values.Responsibility}
            onChange={handleInputChange}
            errors={errors.Responsibility}
          />
          </Grid>
        <Grid item xs={6}>
          <InputControl
            name="Organization"
            label="Organization"
            value={values.Organization}
            onChange={handleInputChange}
            errors={errors.Organization}
          />
          <SelectControl
            name="IsCurrentlyActiveJob"
            label="Is Currently Active Job"
            value={values.IsCurrentlyActiveJob}
            options={jobHistory ? jobHistory.ddlIsActive : test}
            onChange={handleInputChange}
            errors={errors.IsCurrentlyActiveJob}
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

export default JobHistoryForm;
