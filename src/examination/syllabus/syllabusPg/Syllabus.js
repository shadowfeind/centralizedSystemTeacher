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
} from "./SyllabusConstants";
import { getAllSyllabusAction, getListSyllabusAction } from "./SyllabusActions";

const Syllabus = () => {
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

  const { allSyllabus, error: allSyllabusError } = useSelector(
    (state) => state.getAllSyllabus
  );
  const { listSyllabus, error: listSyllabusError } = useSelector(
    (state) => state.getListSyllabus
  );

  if (allSyllabusError) {
    setNotify({
      isOpen: true,
      message: allSyllabusError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SYLLABUS_RESET });
  }

  if (listSyllabusError) {
    setNotify({
      isOpen: true,
      message: listSyllabusError,
      type: "error",
    });
    dispatch({ type: GET_LIST_SYLLABUS_RESET });
  }

  useEffect(() => {
    if (allSyllabus?.length > 0) {
      dispatch(getListSyllabusAction(allSyllabus.dbModelLst[0]?.Id));
    }
  }, [allSyllabus]);

  useEffect(() => {
    dispatch(getAllSyllabusAction());
  }, []);

  useEffect(() => {
    if (listSyllabus) {
      setUrl(`${API_URL}${listSyllabus.FullPath}`);
    }
  }, [listSyllabus]);

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

export default Syllabus;
