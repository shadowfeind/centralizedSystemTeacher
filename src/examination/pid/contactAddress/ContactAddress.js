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
import { GET_ALL_CONTACTADDRESS_RESET, GET_ALL_CONTACTADDRESS_SUCCESS, UPDATE_SINGLE_CONTACTADDRESS_RESET } from "./ContactAddressConstants";
import { getAllContactAddressAction, getSingleContactAddressAction } from "./ContactAddressActions";
import ListComponent from "../listComponent/ListComponent";
import ContactAddressForm from "./ContactAddressForm";

  const useStyles = makeStyles((theme) => ({
    searchInput: {
      width: "75%",
      fontSize: "12px",
    },
  }));
  
  
  const ContactAddress = () => {
      const [openPopup, setOpenPopup] = useState(false);
      const [notify, setNotify] = useState({
          isOpen: false,
          message: "",
          type: "",
      });
  
      const classes = useStyles();
  
      const dispatch = useDispatch();
  
      const { getAllContactAddress, error } = useSelector((state) => state.getAllContactAddress);
      const { singleContactAddress, error: singleContactAddressError} = useSelector(
        (state) => state.getSingleContactAddress
      );
      const {
        success: updateSingleContactAddressSuccess,
        error: updateSingleContactAddressError,
      } = useSelector((state) => state.updateSingleContactAddress);
      
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_CONTACTADDRESS_RESET });
    }
    if (updateSingleContactAddressSuccess) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type : GET_ALL_CONTACTADDRESS_SUCCESS});
      dispatch({ type: UPDATE_SINGLE_CONTACTADDRESS_RESET });
      setOpenPopup(false);
    }
    if (updateSingleContactAddressError) {
      setNotify({
        isOpen: true,
        message: updateSingleContactAddressError,
        type: "error",
      });
      dispatch({ type: UPDATE_SINGLE_CONTACTADDRESS_RESET });
      setOpenPopup(false);
    }
  
    const editHandler = () => {
      dispatch(getSingleContactAddressAction());
      setOpenPopup(true);
    };

    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllContactAddress) {
          dispatch(getAllContactAddressAction());
      }
  }, [dispatch, getAllContactAddress]);

  return(
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
      {getAllContactAddress && <ListComponent list={getAllContactAddress && getAllContactAddress.dbModel}/>}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="ContactAddress Edit Form"
      > <ContactAddressForm contactAddress={singleContactAddress && singleContactAddress} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
     
      </CustomContainer>
  )
};

export default ContactAddress;
