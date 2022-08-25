import React, { useEffect, useState } from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {
  GET_ALL_UPLOADPHOTO_RESET,
  UPLOADPHOTO_RESET,
} from "./UploadPhotoConstants";
import {
  getAllUploadPhotoAction,
  uploadPhotoActionAction,
} from "./UploadPhotoActions";
import { API_URL } from "../../../constants";
import UploadPhotoForm from "./UploadPhotoForm";
import { getHeaderContentAction } from "../../dashboard/DashboardActions";
import { GET_HEADER_CONTENT_RESET } from "../../dashboard/DashboardConstants";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const UploadPhoto = () => {
  const [url, setUrl] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { headerContent, error: headerContentError } = useSelector(
    (state) => state.getHeaderContent
  );

  const { allUploadPhoto, allUploadPhotoError } = useSelector(
    (state) => state.getAllUploadPhoto
  );
  const { success: uploadPhotoSuccess, error: uploadPhotoError } = useSelector(
    (state) => state.uploadPhoto
  );
  if (allUploadPhotoError) {
    setNotify({
      isOpen: true,
      message: allUploadPhotoError,
      type: "error",
    });
    dispatch({ type: GET_ALL_UPLOADPHOTO_RESET });
  }
  if (uploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    dispatch({ type: UPLOADPHOTO_RESET });
    dispatch(getAllUploadPhotoAction());
  }
  if (uploadPhotoError) {
    setNotify({
      isOpen: true,
      message: "Image Required",
      type: "error",
    });
    dispatch({ type: UPLOADPHOTO_RESET });
  }
  useEffect(() => {
    dispatch(getHeaderContentAction());
  }, []);
  if (headerContentError) {
    dispatch({ type: GET_HEADER_CONTENT_RESET });
    setNotify({
      isOpen: true,
      message: headerContentError,
      type: "error",
    });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/pid" });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUploadPhotoAction());
  }, []);

  return (
    <CustomContainer>
      {/* upload Photo
      <br />
      <UploadPhotoForm uploadPhoto={allUploadPhoto && allUploadPhoto} />
      <Notification notify={notify} setNotify={setNotify} /> */}
      <div style={{ background: "#eaeff5", padding: "10px" }}>
        <Grid container style={{ fontSize: "14px" }}>
          <Grid item xs={2}>
            {headerContent && (
              <img
                src={`${API_URL}${headerContent.FullPath}`}
                style={{ height: "150px", width: "150px", borderRadius: "3%" }}
              />
            )}
          </Grid>
          <Grid item xs={5}>
            <h3>Suresh Mandar Sanu</h3>
            <h4>Class 8</h4>
            <h4>Roll No. 201501</h4>
            <a
              href="#"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <LockOpenOutlinedIcon style={{ fontSize: "16px" }} />
              Password Reset
            </a>
          </Grid>
          <Grid item xs={3} style={{ marginTop: "25px" }}>
            <EmailRoundedIcon style={{ fontSize: "14px", color: "blue" }} />{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              suresh@gmail.com
            </span>
            <br />
            <PersonRoundedIcon
              style={{ fontSize: "14px", marginTop: "15px", color: "blue" }}
            />{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              Anu Thapa Mam
            </span>
          </Grid>
          <Grid item xs={2} style={{ marginTop: "25px" }}>
            <PhoneRoundedIcon style={{ fontSize: "14px", color: "blue" }} />{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              9860099988
            </span>
          </Grid>
        </Grid>
      </div>

      <Grid
        container
        style={{ fontSize: "14px", marginTop: "40px" }}
        justify="space-between"
      >
        <Grid item xs={5} style={{ background: "#eaeff5", padding: "30px" }}>
          <div
            style={{
              position: "relative",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Personal Detail
            </span>
            <CreateRoundedIcon
              style={{ fontSize: "14px", position: "absolute", right: 0 }}
            />
          </div>
          <hr />
          <Grid container>
            <Grid item xs={6}>
              <h4>Gender</h4>
              male
              <h4>Blood Group</h4>
              O+
            </Grid>
            <Grid item xs={6}>
              <h4>Date of Birth</h4>
              30 June 2000
              <h4>Team</h4>
              Red
            </Grid>
          </Grid>
          <h4>Address</h4>
          Baneshwor, Kathmandu, Nepal
          <h4>Bus Stop</h4>
          Shantinagar Gate
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            background: "#eaeff5",
            padding: "30px",
            marginLeft: "40px",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Family Details
            </span>
            <CreateRoundedIcon
              style={{ fontSize: "14px", position: "absolute", right: 0 }}
            />
          </div>
          <hr />
          <Grid container>
            <Grid item xs={6}>
              <h4>Father's Name</h4>
              Xyz
              <h4>Mother's Name</h4>
              hello
              <h4>Guardain's Name</h4>
              hellogsy
            </Grid>
            <Grid item xs={6}>
              <h4>Mobile No.</h4>
              9811222000
              <h4>Mobile No.</h4>
              9985109211
              <h4>Mobile No.</h4>
              9985109211
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default UploadPhoto;
