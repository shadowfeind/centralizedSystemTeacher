import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { createSingleSkillAction, skillCreateAction, updateSingleSkillAction } from "./SkillActions";

const initialFormValues = {
  IDHRSkill: 0,
  IDHREmployee: 0,
  Skill: "",
  ProficiencyLevel: "",
  IsActive: true,
  Created_On: "2022-01-11T04:51:47.881Z",
  Updated_On: "2022-01-11T04:51:47.881Z",
};

const SkillForm =({skillForm, setOpenPopup})=>{
    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
      let temp = { ...errors };

      temp.Skill = !fieldValues.Skill
      ? "This feild is required"
      : fieldValues.Skill.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.Skill.trim()
      ? "This feild is required"
      : "";

      temp.ProficiencyLevel = !fieldValues.ProficiencyLevel
      ? "This feild is required"
      : fieldValues.ProficiencyLevel.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.ProficiencyLevel.trim()
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
      if (values.IDHRSkill === 0) {
        dispatch(skillCreateAction(values));
      } else {
      dispatch(createSingleSkillAction(values));
    }
  }
  };  
  useEffect(() => {
    if (skillForm) {
      setValues({ ...skillForm.dbModel });
    }
  }, [skillForm]);

  const test = [{Key:"", value:""}]

  return(
    <Form onSubmit={handleSubmit}>
    <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
        <InputControl
          name="Skill"
          label="Skill"
          value={values.Skill}
          onChange={handleInputChange}
          errors={errors.Skill}
        />
        </Grid>
        <Grid item xs={12}>
        <SelectControl
          name="ProficiencyLevel"
          label="Proficiency Level"
          value={values.ProficiencyLevel}
          options={skillForm ? skillForm.ddlProficiencyLevel: test}
          onChange={handleInputChange}
          errors={errors.ProficiencyLevel}
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

export default SkillForm;