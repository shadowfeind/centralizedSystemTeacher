import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import SelectControl from "../../components/controls/SelectControl";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { API_URL } from "../../constants";
import { deleteLeaveRequestAction } from "./LeaveRequestActions";

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

const LeaveRequestDeleteForm = ({ leaveRequestDelete, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleDelete = (e) => {
    e.preventDefault();
    setActive(true);
    dispatch(deleteLeaveRequestAction(values));
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
    if (leaveRequestDelete) {
      setValues({ ...leaveRequestDelete.dbModel });
    }
  }, [leaveRequestDelete]);

  const gender = [{ Key: "", Value: "" }];

  return (
    <Form onSubmit={handleDelete}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            disabled
            name="ReceiverID"
            label="ReceiverID"
            value={values.ReceiverID}
            onChange={null}
            options={
              leaveRequestDelete ? leaveRequestDelete.ddlTeacher : gender
            }
          />

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
          />
          <DatePickerControl
            disabled
            name="FromDate"
            label="FromDate*"
            value={values.FromDate}
            onChange={handleInputChange}
          />
          <SelectControl
            disabled
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={null}
            options={
              leaveRequestDelete ? leaveRequestDelete.ddlIsActive : gender
            }
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerControl
            disabled
            name="ToDate"
            label="ToDate*"
            value={values.ToDate}
            onChange={handleInputChange}
          />
          <InputControl
            disabled
            name="Status"
            label="Status"
            value={values.Status}
            onChange={null}
            options={leaveRequestDelete ? leaveRequestDelete.ddlStatus : gender}
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
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "DELETE"}
        </Button>
      </div>
    </Form>
  );
};

export default LeaveRequestDeleteForm;
