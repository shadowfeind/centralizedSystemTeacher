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
  GET_ALL_SYLLABUS_RESET,
  GET_LIST_SYLLABUS_RESET,
} from "../syllabusPg/SyllabusConstants";
import { getListSyllabusAction } from "../syllabusPg/SyllabusActions";

const SyllabusNine = () => {
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

 
  const { listSyllabus, error: listSyllabusError } = useSelector(
    (state) => state.getListSyllabus
  );


  if (listSyllabusError) {
    setNotify({
      isOpen: true,
      message: listSyllabusError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SYLLABUS_RESET });
  }

  useEffect(() => {
    if (listSyllabus) {
      setUrl(`${API_URL}${listSyllabus.FullPath}`);
    }
  }, [listSyllabus]);

  useEffect(() => {
    dispatch(getListSyllabusAction(13));
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/syllabus" });
  }, [dispatch]);

  return (
    <>
      <CustomContainer>
        {listSyllabus && <iframe src={url} width="100%" height="700" />}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default SyllabusNine;
