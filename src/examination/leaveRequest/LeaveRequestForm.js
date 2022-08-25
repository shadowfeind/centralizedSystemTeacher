import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import SelectControl from "../../components/controls/SelectControl";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { API_URL } from "../../constants";
import {
  postLeaveRequestAction,
  putLeaveRequestAction,
} from "./LeaveRequestActions";

const initialFormValues = {
  IDLeaveRequest: 0,
  SenderID: 0,
  ReceiverID: 0,
  LeaveDecription: "",
  Status: "",
  DocumentName: "",
  FromDate: "2022-04-16T08:14:34.805Z",
  ToDate: "2022-04-16T08:14:34.805Z",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-04-16T08:14:34.805Z",
  Updated_On: "2022-04-16T08:14:34.805Z",
};

const LeaveRequestForm = ({
  leaveRequestEdit,
  leaveRequestEditApproval,
  leaveRequestCreate,
  setOpenPopUp,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.LeaveDecription = !fieldValues.LeaveDecription
      ? "This feild is required"
      : fieldValues.LeaveDecription && fieldValues.LeaveDecription?.length > 160
      ? "Must be less than 160 characters"
      : "";

    temp.ReceiverID = !fieldValues.ReceiverID ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDLeaveRequest === 0) {
        dispatch(
          postLeaveRequestAction(
            values,
            image,
            leaveRequestCreate.SchoolShortName
          )
        );
      } else {
        dispatch(
          putLeaveRequestAction(values, image, leaveRequestEdit.SchoolShortName)
        );
        setOpenPopUp(false);
      }
    }
  };

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (leaveRequestCreate) {
      setValues({
        ...leaveRequestCreate.dbModel,
        ReceiverID: leaveRequestCreate?.ddlTeacher[0]?.Key,
      });
    }
  }, [leaveRequestCreate]);

  useEffect(() => {
    if (leaveRequestEdit) {
      setValues({ ...leaveRequestEdit.dbModel });
    }
  }, [leaveRequestEdit]);

  const gender = [{ Key: "", Value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="ReceiverID"
            label="Reciever Name"
            value={values.ReceiverID}
            onChange={handleInputChange}
            options={
              leaveRequestEdit
                ? leaveRequestEdit.ddlTeacher
                : leaveRequestCreate
                ? leaveRequestCreate.ddlTeacher
                : gender
            }
            errors={errors.ReceiverID}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            name="LeaveDecription"
            label="Leave Decription*"
            onFocus={(e) => {
              e.target.select();
            }}
            multiline
            rows={4}
            value={values.LeaveDecription}
            onChange={handleInputChange}
            errors={errors.LeaveDecription}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerControl
            name="FromDate"
            label="FromDate*"
            value={values.FromDate}
            onChange={handleInputChange}
            errors={errors.FromDate}
          />

          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={
              leaveRequestEdit
                ? leaveRequestEdit.ddlIsActive
                : leaveRequestCreate
                ? leaveRequestCreate.ddlIsActive
                : gender
            }
          />
          <InputControl
            name="ImageUploaded"
            // label="Select Profile Photo"
            // value={values.ClassLocation}
            onChange={(e) => handleImage(e)}
            type="file"
            // errors={errors.ClassLocation}
          />
          <img
            src={
              imgSrc
                ? imgSrc
                : leaveRequestEdit && `${API_URL}${leaveRequestEdit.FullPath}`
            }
            height={200}
            width={200}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePickerControl
            name="ToDate"
            label="ToDate*"
            value={values.ToDate}
            onChange={handleInputChange}
            errors={errors.ToDate}
          />
          <InputControl
            disabled
            name="Status"
            label="Status"
            value={values.Status}
            onChange={null}
            options={
              leaveRequestEdit
                ? leaveRequestEdit.ddlStatus
                : leaveRequestCreate
                ? leaveRequestCreate.ddlStatus
                : gender
            }
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
          onClick={() => setOpenPopUp(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default LeaveRequestForm;
