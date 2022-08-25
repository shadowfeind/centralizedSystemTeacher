import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Notification from "../../../components/Notification";
import { API_URL } from "../../../constants";
import CustomContainer from "../../../components/CustomContainer";
import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import {
  GET_EDIT_CLASS_SCHEDULE_RESET,
  GET_LIST_CLASS_SCHEDULE_RESET,
  PUT_CLASS_SCHEDULE_RESET,
} from "../pg/ClassPgScheduleConstants";
import {
  getAllPgClassScheuleAction,
  getEditClassScheuleAction,
  getListClassScheuleAction,
} from "../pg/ClassPgScheduleActions";
import ClassPgScheduleForm from "../pg/ClassPgScheduleForm";

const ClassNurserySchedule = () => {
  const [url, setUrl] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

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
  const dispatch = useDispatch();

  const { allClassScheduleList, error: allClassScheduleListError } =
    useSelector((state) => state.getListClassSchedule);
 
  if (allClassScheduleListError) {
    setNotify({
      isOpen: true,
      message: allClassScheduleListError,
      type: "error",
    });
    dispatch({ type: GET_LIST_CLASS_SCHEDULE_RESET });
  }

  useEffect(() => {
    
      dispatch(getListClassScheuleAction(2));
  
  }, []);

  useEffect(() => {
    if (allClassScheduleList) {
      setUrl(`${API_URL}${allClassScheduleList.FullPath}`);
    }
  }, [allClassScheduleList]);

  
  return (
    <>
      <CustomContainer>
        
        {allClassScheduleList && <iframe src={url} width="100%" height="700" />}
      </CustomContainer>
     
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ClassNurserySchedule;
