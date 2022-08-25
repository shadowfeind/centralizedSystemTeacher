import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  TableContainer,
  TableHead,
  Toolbar,
} from "@material-ui/core";

import { Edit } from "@material-ui/icons";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import { getAllContactNumberAction, getSingleContactNumberAction } from "./ContactNumberActions";
import {
  GET_ALL_CONTACTNUMBER_RESET,
  GET_ALL_CONTACTNUMBER_SUCCESS,
  GET_SINGLE_CONTACTNUMBER_RESET,
  UPDATE_SINGLE_CONTACTNUMBER_RESET,
} from "./ContactNumberConstants";
import ListContactNumber from "../listComponent/ListContactNumber";
import ContactNumberForm from "./ContactNumberForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
 
}));

const ContactNumber = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllContactNumber, error } = useSelector(
    (state) => state.getAllContactNumber)

    const { singleContactNumber, error: singleContactNumberError} = useSelector(
      (state) => state.getSingleContactNumber
  );
  const {
    success: updateSingleContactNumberSuccess,
    error: updateSingleContactNumberError,
  } = useSelector((state) => state.updateSingleContactNumber);
  
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_CONTACTNUMBER_RESET });
  }
  if (updateSingleContactNumberSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({type: GET_ALL_CONTACTNUMBER_SUCCESS})
    dispatch({ type: UPDATE_SINGLE_CONTACTNUMBER_RESET });
    setOpenPopup(false);
  }
  if (updateSingleContactNumberError) {
    setNotify({
      isOpen: true,
      message: updateSingleContactNumberError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_CONTACTNUMBER_RESET });
    setOpenPopup(false);
  }
  const editHandler = () => {
    dispatch(getSingleContactNumberAction());
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllContactNumber) {
      dispatch(getAllContactNumberAction());
    }
  }, [dispatch, getAllContactNumber]);



  return (
    <CustomContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        className={classes.button}
        onClick={editHandler}
      >
        Edit{" "}
      </Button>

      {getAllContactNumber && (
        <ListContactNumber
          list={getAllContactNumber && getAllContactNumber.dbModel}
        />
      )}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Contact Number Edit Form"
      >
        <ContactNumberForm contactNumber={singleContactNumber && singleContactNumber.dbModel} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default ContactNumber;
