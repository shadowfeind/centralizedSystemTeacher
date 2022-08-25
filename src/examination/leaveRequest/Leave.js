import React, { useEffect, useState } from "react";
import { Grid, Button, makeStyles, Card } from "@material-ui/core";
import Popup from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import LeaveRequestApproval from "./LeaveRequestApproval";
import LeaveRequest from "./LeaveRequest";
import LeaveRequestForm from "./LeaveRequestForm";
import {
  getListLeaveRequestAction,
  getSingleCreateLeaveRequestAction,
} from "./LeaveRequestActions";
import {
  DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  POST_LEAVE_REQUESTS_RESET,
} from "./LeaveRequestConstants";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "30px",
  },
  button: {
    float: "right",
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    color: "#253053",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  cardStyle: {
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
  leaveHeading: {
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
}));

const Leave = () => {
  const [leave, setLeave] = useState("approve");
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const { singleCreateLeaveRequest, error: singleCreateLeaveRequestError } =
    useSelector((state) => state.getSingleCreateLeaveRequest);

  const { singleEditLeaveRequest, error: singleEditLeaveRequestError } =
    useSelector((state) => state.getSingleEditLeaveRequest);

  const { success: postLeaveRequestSuccess, error: postLeaveRequestError } =
    useSelector((state) => state.postLeaveRequest);

  const { error: downloadDocError } = useSelector(
    (state) => state.downloadLeaveRequest
  );

  if (singleCreateLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleCreateLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
  }
  if (postLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: postLeaveRequestError,
      type: "error",
    });
    dispatch({ type: POST_LEAVE_REQUESTS_RESET });
  }

  if (downloadDocError) {
    setNotify({
      isOpen: true,
      message: downloadDocError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_DOC_LEAVE_REQUESTS_RESET });
  }

  if (postLeaveRequestSuccess) {
    setNotify({
      isOpen: true,
      message: "Leave Request Send Succesfully",
      type: "success",
    });
    setOpenPopUp(false);
    dispatch(getListLeaveRequestAction());
    dispatch({ type: POST_LEAVE_REQUESTS_RESET });
  }

  if (singleEditLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/leave-request" });
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(getSingleCreateLeaveRequestAction());
    setOpenPopUp(true);
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  };

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid container>
          <Grid item xs={6}>
            <Card className={classes.cardStyle}>
              <div>
                <h4
                  className={classes.leaveHeading}
                  onClick={() => setLeave("approve")}
                  style={{
                    backgroundColor: "#253053",
                    color: "#fff",
                  }}
                >
                  Leave Approve (Inbox)
                </h4>{" "}
                {/* </div> */}
              </div>

              {/* {leave === "approve" ? ( */}
              <LeaveRequestApproval />
            </Card>
          </Grid>
          <Grid item xs={6}>
            {/* ) : ( */}
            <Card className={classes.cardStyle}>
              <div>
                <h4
                  className={classes.leaveHeading}
                  style={{
                    backgroundColor: "#253053",
                    color: "#fff",
                  }}
                  onClick={() => setLeave("request")}
                >
                  Leave Requests (Sent)
                </h4>{" "}
                <h4
                  className={classes.button}
                  style={{
                    backgroundColor: "#254053",
                    color: "#fff",
                  }}
                  onClick={handleCreate}
                >
                  Create
                </h4>
              </div>
              <LeaveRequest />

              {/* )} */}

              <Popup
                openPopup={openPopUp}
                setOpenPopup={setOpenPopUp}
                title="Leave Request Form"
              >
                <LeaveRequestForm
                  // leaveRequestEdit={
                  //   singleEditLeaveRequest && singleEditLeaveRequest
                  // }
                  leaveRequestCreate={
                    singleCreateLeaveRequest && singleCreateLeaveRequest
                  }
                  setOpenPopUp={setOpenPopUp}
                />
              </Popup>
              <Notification notify={notify} setNotify={setNotify} />
              <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Leave;
