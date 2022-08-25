import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import { Edit} from "@material-ui/icons";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import { getAllEmailAction, getSingleEmailAction } from "./EmailActions";
import { GET_ALL_EMAIL_RESET, GET_ALL_EMAIL_SUCCESS, GET_SINGLE_EMAIL_RESET, UPDATE_SINGLE_EMAIL_RESET } from "./EmailConstants";
import ListEmail from "../listComponent/ListEmail";
import EmailForm from "./EmailForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },

}));



const Email = () => {
      const [openPopup, setOpenPopup] = useState(false);
      const [notify, setNotify] = useState({
          isOpen: false,
          message: "",
          type: "",
      });
  
      const classes = useStyles();
  
      const dispatch = useDispatch();
  
      const { getAllEmail, error } = useSelector((state) => state.getAllEmail);
      const { singleEmail, error: singleEmailError} = useSelector(
        (state) => state.getSingleEmail
    );
    const {
      success: updateSingleEmailSuccess,
      error: updateSingleEmailError,
    } = useSelector((state) => state.updateSingleEmail);
    
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_EMAIL_RESET });
    }
    if (updateSingleEmailSuccess) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type: GET_ALL_EMAIL_SUCCESS})
      dispatch({ type: UPDATE_SINGLE_EMAIL_RESET });
      setOpenPopup(false);
    }
    if (updateSingleEmailError) {
      setNotify({
        isOpen: true,
        message: updateSingleEmailError,
        type: "error",
      });
      dispatch({ type: UPDATE_SINGLE_EMAIL_RESET });
      setOpenPopup(false);
    }
    if (singleEmailError) {
      setNotify({
        isOpen: true,
        message: singleEmailError,
        type: "error",
      });
      dispatch({ type: GET_SINGLE_EMAIL_RESET });
      setOpenPopup(false);
    }
    const editHandler = () => {
      dispatch(getSingleEmailAction());
      setOpenPopup(true);
    };
  
    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllEmail) {
          dispatch(getAllEmailAction());
      }
  }, [dispatch, getAllEmail]);

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

      {getAllEmail && <ListEmail list={getAllEmail && getAllEmail.dbModel}/>}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Email Edit Form"
      >
        <EmailForm emailForm={singleEmail && singleEmail.dbModel} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
  </CustomContainer>
  )
};

export default Email;
