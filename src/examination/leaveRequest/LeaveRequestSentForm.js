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
  putLeaveRequestApproveAction,
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

const LeaveRequestSentForm = ({
  leaveRequestEditApproval,
  setApprovalPopUp,
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
      dispatch(
        putLeaveRequestApproveAction(
          values,
          leaveRequestEditApproval.SchoolShortName
        )
      );
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
    if (leaveRequestEditApproval) {
      setValues({ ...leaveRequestEditApproval.dbModel });
    }
  }, [leaveRequestEditApproval]);

  const gender = [{ Key: "", Value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        {/* <Grid item xs={6}>
          <SelectControl
            disabled
            name="ReceiverID"
            label="Receiver Name"
            value={values.ReceiverID}
            onChange={null}
            options={
              leaveRequestEditApproval
                ? leaveRequestEditApproval.ddlTeacher
                : gender
            }
            errors={errors.ReceiverID}
          />
        </Grid> */}
        <Grid item xs={12}>
          <InputControl
            disabled
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
            disabled
            name="FromDate"
            label="FromDate*"
            value={values.FromDate}
            onChange={null}
            errors={errors.FromDate}
          />

          <SelectControl
            disabled
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={null}
            options={
              leaveRequestEditApproval
                ? leaveRequestEditApproval.ddlIsActive
                : gender
            }
          />
          <InputControl
            disabled
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
                : leaveRequestEditApproval &&
                  `${API_URL}${leaveRequestEditApproval.FullPath}`
            }
            height={200}
            width={200}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePickerControl
            disabled
            name="ToDate"
            label="ToDate*"
            value={values.ToDate}
            onChange={null}
            errors={errors.ToDate}
          />
          <SelectControl
            name="Status"
            label="Status"
            value={values.Status}
            onChange={handleInputChange}
            options={
              leaveRequestEditApproval
                ? leaveRequestEditApproval.ddlStatus
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
          onClick={() => setApprovalPopUp(false)}
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

export default LeaveRequestSentForm;
