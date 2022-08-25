import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Edit, Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import { GET_ALL_GUARDIAN_RESET, GET_ALL_GUARDIAN_SUCCESS, UPDATE_SINGLE_GUARDIAN_RESET } from "./GuardianConstants";
import { getAllGuardianAction, getSingleGuardianAction } from "./GuardianActions";
import ListGuardian from "../listComponent/ListGuardian";
import GuardianForm from "./GuardianForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));


const Guardian = () => {
      const [openPopup, setOpenPopup] = useState(false);
      const [notify, setNotify] = useState({
          isOpen: false,
          message: "",
          type: "",
      });
  
      const classes = useStyles();
  
      const dispatch = useDispatch();
  
      const { getAllGuardian, error } = useSelector((state) => state.getAllGuardian);
      const { singleGuardian, error: singleGuardianError} = useSelector(
        (state) => state.getSingleGuardian
      );
      const {
        success: updateSingleGuardianSuccess,
        error: updateSingleGuardianError,
      } = useSelector((state) => state.updateSingleGuardian);
      
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_GUARDIAN_RESET });
    }
    if (updateSingleGuardianSuccess) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type: GET_ALL_GUARDIAN_SUCCESS})
      dispatch({ type: UPDATE_SINGLE_GUARDIAN_RESET });
      setOpenPopup(false);
    }
    if (updateSingleGuardianError) {
      setNotify({
        isOpen: true,
        message: updateSingleGuardianError,
        type: "error",
      });
      dispatch({ type: UPDATE_SINGLE_GUARDIAN_RESET });
      setOpenPopup(false);
    }
    const editHandler = () => {
      dispatch(getSingleGuardianAction());
      setOpenPopup(true);
    };

    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllGuardian) {
          dispatch(getAllGuardianAction());
      }
  }, [dispatch, getAllGuardian]);

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
      {getAllGuardian && <ListGuardian list={getAllGuardian && getAllGuardian.dbModel} />}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Guardian Edit Form"
      > <GuardianForm guardianForm={singleGuardian && singleGuardian.dbModel} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      </CustomContainer>
  )
};

export default Guardian;
