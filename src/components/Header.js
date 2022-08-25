import React, { useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Popper,
  Toolbar,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { API_URL } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GET_HEADER_CONTENT_RESET } from "../examination/dashboard/DashboardConstants";
import Notification from "./Notification";
import { getHeaderContentAction } from "../examination/dashboard/DashboardActions";
import { UPLOADPHOTO_RESET } from "../examination/pid/uploadPhoto/UploadPhotoConstants";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    transform: "translate(0)",
    color: "#272c34",
    "& h6": {
      fontSize: "13px",
      display: "inline-block",
      paddingRight: "1.5vw",
    },
  },
  searchInput: {
    fontSize: "12px",
    padding: "0 8px",
    opacity: "0.6",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  list: {
    "& li": {
      display: "inline-block",
      listStyleType: "none",
      paddingRight: "10px",
      paddingLeft: "10px",
      marginTop: "-5px",
      fontSize: "12px",
    },
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
    "& li:hover": {
      borderBottom: "1px solid #000",
    },
  },
  activeList: {
    borderBottom: "1px solid #000",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  popUp: {
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "5px 5px 5px #d3d3d3",

    "& h4": {
      borderBottom: "1px solid #d3d3d3",
      margin: "0",
      padding: "10px",
      fontWeight: "300",
      fontSize: "14px",
      cursor: "pointer",
    },
    "& h4:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
});

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleProfileClick = () => {
    history.push("/pid");
    setOpen(false);
  };

  const dispatch = useDispatch();

  const { headerContent, error: headerContentError } = useSelector(
    (state) => state.getHeaderContent
  );
  const { success: uploadPhotoSuccess } = useSelector(
    (state) => state.uploadPhoto
  );

  if (uploadPhotoSuccess) {
    dispatch({ type: UPLOADPHOTO_RESET });
    dispatch(getHeaderContentAction());
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

  const handleLogout = () => {
    dispatch({ type: GET_HEADER_CONTENT_RESET });
    sessionStorage.removeItem("blueberrytoken");
    window.location.href = "http://103.90.86.151:106";
    // window.location.href = "https://divinelight.vidyacube.com";
    // window.location.href = "https://mis.vidyacube.com";
    // window.location.href = "https://creation.vidyacube.com";
  };

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              {" "}
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  paddingRight: "10px",
                }}
              >
                TEACHER DASHBOARD
              </span>
            </Grid>
            <Grid item></Grid>
            <Grid item sm></Grid>
            <Grid item>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <IconButton>
                  {headerContent && (
                    <div>
                      <span style={{ fontSize: "12px" }}>Welcome</span>{" "}
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          paddingRight: "10px",
                        }}
                      >
                        {headerContent.FullName}
                      </span>
                    </div>
                  )}
                  <Badge color="secondary" onClick={handleClick("top-end")}>
                    {headerContent && (
                      <img
                        src={`${API_URL}${headerContent.FullPath}`}
                        height="30px"
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </Badge>
                </IconButton>
              </ClickAwayListener>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <div className={classes.popUp}>
                      {headerContent && (
                        <div>
                          <div
                            style={{
                              padding: "40px 40px 0px 40px",
                              borderBottom: "1px solid #d3d3d3",
                            }}
                          >
                            <img
                              src={`${API_URL}${headerContent.FullPath}`}
                              width="70px"
                              height="70px"
                              style={{ borderRadius: "50%" }}
                            />
                            <h3
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                paddingRight: "10px",
                              }}
                            >
                              {headerContent.FullName}
                            </h3>
                          </div>
                          <h4 onClick={handleProfileClick}>Profile</h4>
                          <h4 onClick={handleLogout}>Logout</h4>
                        </div>
                      )}
                    </div>
                  </Fade>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Header;
