import React, { useEffect, useState } from "react";
import './Profile.css'
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Edit, Search } from "@material-ui/icons";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import {API_URL} from "../../../constants";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DraftsIcon from "@material-ui/icons/Drafts";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import {
  getAllPersonalInformationAction,
  getSinglePersonalInformationAction,
} from "./PersonalInformationActions";
import {
  GET_ALL_PERSONALINFORMATION_RESET,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_RESET,
  UPDATE_SINGLE_PERSONALINFORMATION_RESET,
} from "./PersonalInformationConstants";
import ListPersonalInformation from "../listComponent/ListPersonalInformation";
import PersonalInformationForm from "./PersonalInformationForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button:{
    margin:"0",
  }
}));

const MainContainer = styled.div`
max-height:1128px;
`

const  Box = styled.div`
height: 300px;
border-radius: 0 0 10px 10px;
width:100%;
background:#283356;
padding-top:0;
margin-top: -25px;`

const ImageContainer = styled.div`
height:200px;
width:200px;
border-radius:50%;
background:blue;
display: flex;
flex:1;
margin: -100px auto 0px auto;
border:0px;
position: relative;`

const Image = styled.img`
height:200px;
width:200px;
border-radius:50%;
position:relative;
`

const User = styled.div`
display:flex;
flex:1;
align-items:center;
justify-content:center;
text-align:center;`

const H2 =styled.h2`
margin:0;
margin-top:14px;`

const H4 =styled.h4`
margin:0`

const Upload = styled.button`
position:absolute;
float:right;
height:30px;
padding:2px;
border-radius:50%;
border:0px;
cursor:pointer;
top: 43%;
    left: 61%;
`
const Line = styled.div`
width:90%;
height:2px;
justify-content:center;
background:#253053;
margin: auto;`

const About = styled.div`
height:400px;
border-radius:10px;
background:#5a85bd45;
margin:auto;
margin-top:30px;
justify-content:center;
`
const Center = styled.div`
display:flex;
flex:1;
margin-bottom:16px;
align-items:center;
justify-content:center;
text-align:center;`

const PersonalInformation = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllPersonalInformation, error } = useSelector(
    (state) => state.getAllPersonalInformation
  );
  const { singlePersonalInformation, error: singlePersonalInformationError } =
    useSelector((state) => state.getSinglePersonalInformation);
  const {
    success: updateSinglePersonalInformationSuccess,
    error: updateSinglePersonalInformationError,
  } = useSelector((state) => state.updateSinglePersonalInformation);

  const { headerContent, error: headerContentError } = useSelector(
    (state) => state.getHeaderContent
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_PERSONALINFORMATION_RESET });
  }
  if (updateSinglePersonalInformationSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: GET_ALL_PERSONALINFORMATION_SUCCESS});
    dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_RESET });
    setOpenPopup(false);
  }
  if (updateSinglePersonalInformationError) {
    setNotify({
      isOpen: true,
      message: updateSinglePersonalInformationError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_RESET });
    setOpenPopup(false);
  }
  if (singlePersonalInformationError) {
    setNotify({
      isOpen: true,
      message: singlePersonalInformationError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_RESET });
    setOpenPopup(false);
  }
  const editHandler = () => {
    dispatch(getSinglePersonalInformationAction());
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllPersonalInformation) {
      dispatch(getAllPersonalInformationAction());
    }
  }, [dispatch, getAllPersonalInformation]);

  return (
    <div>
    <CustomContainer>
    
    
    <h1 id="profile">My Profile</h1>
    <div id="container">
            <div class="content-img">
            <Image src={`${API_URL}${headerContent?.FullPath}`} />
    <Upload><CameraEnhanceIcon style={{'width':"30px"}}/></Upload>
    <button id="btn-edit">Edit Profile</button>
            </div>
        <form id="content">
        <div id="leftContent">
            <div class="names">
                <div id="fname" class="sideBy"><label for="fname">First Name</label><br /><input type="text" name="fname" value={headerContent.FullName} disabled /></div>
                <div id="lname" class="sideBy"><label for="lname">Last Name</label><br /><input type="text" name="lname" /></div>
            </div>
            <div class="password"><label for="password">Password</label><br /><input type="text" name="password" />
            <div><button class="btn">CHANGE PASSWORD</button></div></div>
            <div class="email"><label for="email">Email</label><br /><input type="text" name="email"/></div>
            <div class="phone"><label for="phone">Phone</label><br /><input type="text" name="phone"/></div>
            <div class="address"><label for="address">Address</label><br /><input type="text" name="address"/></div>
            <div class="nation"><label for="nation">Nation</label><br /><input type="text" name="nation"/></div>
        </div>
        <div id="rightContent">
            <div class="names">
                <div id="gender" class="sideBy"><label for="gender">Gender</label><br /><input type="text" name="gender"/></div>
                <div id="language" class="sideBy"><label for="language">Language</label><br />
               <input type="text" name="language"/>
                </div>
            </div>
            <div class="dob"><label for="dob">Date of Birth</label><br /><input type="text" name="dob"/></div>
            <div class="names">
                <div id="test" class="sideBy"><label for="test">Test</label><br /><input type="text" name="test"/></div>
                <div id="test" class="sideBy"><label for="test">Test</label><br /><input type="text" name="test"/></div>
            </div>
            <div class="names">
                <div id="test" class="sideBy"><label for="test">Test</label><br /><input type="text" name="test"/></div>
               <div id="test" class="sideBy"><label for="test">Test</label><br /><input type="text" name="test"/></div>
            </div>
        </div>
            </form>
    </div>


      {/* <Button
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        className={classes.button}
        onClick={editHandler}
      >
        Edit{" "}
      </Button>
      {getAllPersonalInformation && (
        <ListPersonalInformation
          list={getAllPersonalInformation && getAllPersonalInformation.dbModel}
        />
      )}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Personal Information Edit Form"
      >
        {" "}
        <PersonalInformationForm
          personalInformation={
            singlePersonalInformation && singlePersonalInformation
          }
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} /> */}
      
    </CustomContainer>
    
    </div>
    
  );
};

export default PersonalInformation;
