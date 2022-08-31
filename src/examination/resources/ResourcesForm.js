import React, { useEffect, useState } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { postResourceAction } from "./ResourcesActions";
import DialogFooter from "../../components/DialogFooter";

const initialFormValues = {
  Id: 0,
  IDTeacher: 0,
  IDYearFacultyLink: 0,
  IDAcademicFacultySubjectLink: 0,
  Level: 0,
  Section: 0,
  IDAcademicShift: 0,
  CourseName: "",
  CourseDescription: "",
  DocumentFile: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  IsActive: true,
  Created_On: "2022-02-02T09:24:30.676Z",
  Updated_On: "2022-02-02T09:24:30.676Z",
};

const ResourcesForm = ({ setOpenPopup, searchFilterModel, dbModel }) => {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CourseName = !fieldValues.CourseName
      ? "This feild is required"
      : !fieldValues.CourseName.trim()
      ? "This feild is required"
      : "";

    temp.CourseDescription = !fieldValues.CourseDescription
      ? "This feild is required"
      : !fieldValues.CourseDescription.trim()
      ? "This feild is required"
      : "";

    temp.image = !image ? "This feild is required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(postResourceAction(image, values, searchFilterModel, dbModel));
    }
  };
  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <InputControl
                name="CourseName"
                label="Resource Name"
                value={values.CourseName}
                onChange={handleInputChange}
                errors={errors.CourseName}
              />

              <InputControl
                name="ImageUploaded"
                onChange={(e) => handleImage(e)}
                type="file"
                errors={errors.image}
              />

              <img src={imgSrc} height={200} width={200} />
            </Grid>
            <Grid item xs={6}>
              <InputControl
                name="CourseDescription"
                label="Resource Description"
                value={values.CourseDescription}
                onChange={handleInputChange}
                errors={errors.CourseDescription}
              />
              <CheckBoxControl
                label="isActive"
                value={values.IsActive}
                onChange={handleInputChange}
                name="isActive"
              />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogFooter>
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
          disabled={active}
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ResourcesForm;
