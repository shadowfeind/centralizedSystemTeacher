import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants";
import VideocamIcon from "@material-ui/icons/Videocam";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DescriptionIcon from "@material-ui/icons/Description";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BookIcon from "@material-ui/icons/Book";
import DvrRoundedIcon from "@material-ui/icons/DvrRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { getHeaderContentAction } from "../examination/dashboard/DashboardActions";
import { GET_HEADER_CONTENT_RESET } from "../examination/dashboard/DashboardConstants";

const useStyles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0",
    height: "100%",
    width: "15%",
    backgroundColor: "#253053",
    position: "fixed",
    overflow: "auto",
    "& h6": {
      fontSize: "13px",
      padding: "13px 13px 13px 20px",
      color: "#fff",
      display: "inline-flex",
      width: "100%",
    },
    "& h6:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      textDecoration: "none",
    },
    "& a": { textDecoration: "none" },
    "& a:hover": { textDecoration: "none" },
  },
});

const SideMenu = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { headerContent, error: headerContentError } = useSelector(
    (state) => state.getHeaderContent
  );

  useEffect(() => {
    dispatch(getHeaderContentAction());
  }, []);
  // if (headerContentError) {
  //   dispatch({ type: GET_HEADER_CONTENT_RESET });
  //   setNotify({
  //     isOpen: true,
  //     message: headerContentError,
  //     type: "error",
  //   });
  // }
  const isActive = {
    color: "#253053",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    textDecoration: "none",
  };
  return (
    <div className={classes.sideMenu}>
      <Typography
        variant="h5"
        style={{ color: "#fff", textAlign: "center", padding: " 17px 0" }}
      >
        <Grid item style={{ alignSelf: "center" }}>
          {headerContent && (
            <img
              src={`${API_URL}${headerContent?.FullPathSchoolLogo}`}
              height="50px"
            />
          )}
        </Grid>
        {/* TEACHER MIS */}
      </Typography>
      <NavLink to={"/"} exact={true} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <DashboardIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; DashBoard
        </Typography>
      </NavLink>

      <NavLink to={"/attendance"} activeStyle={isActive}>
        <Typography variant="h6">
          <HowToRegRoundedIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Attendance
        </Typography>
      </NavLink>
      <NavLink to={"/assignment"} activeStyle={isActive}>
        <Typography variant="h6">
          <AssignmentTurnedInIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Assignment / Homeworks
        </Typography>
      </NavLink>
      <NavLink to={"/exam-mark-approval"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <SystemUpdateAltIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Exam Mark Entry / Update
        </Typography>
      </NavLink>
      {/* <NavLink to={"/exam-schedule"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <SystemUpdateAltIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Exam Schedule
        </Typography>
      </NavLink> */}
      {/* <NavLink to={"/pid"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <AccountCircleIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; User Profile
        </Typography>
      </NavLink> */}
      {/* <NavLink to={"/quick-links"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <Face fontSize="small" />
          &nbsp;&nbsp;&nbsp; Quick Links
        </Typography>
      </NavLink> */}
      <NavLink to={"/class-schedule"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <CalendarTodayIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Class Routine
        </Typography>
      </NavLink>
      <NavLink to={"/syllabus"} activeStyle={isActive}>
        <Typography variant="h6">
          <DescriptionIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Syllabus
        </Typography>
      </NavLink>
      <NavLink to={"/resources"} activeStyle={isActive}>
        <Typography variant="h6">
          <BookIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; E-Material
        </Typography>
      </NavLink>

      <NavLink to={"/old-questions"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <MenuBookIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Old Questions
        </Typography>
      </NavLink>
      <NavLink to={"/announcement"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <AnnouncementIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Announcement
        </Typography>
      </NavLink>
      <NavLink to={"/notification"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <NotificationsIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Notification
        </Typography>
      </NavLink>

      <NavLink to={"/leave-request"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <ReportProblemIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Leave Management
        </Typography>
      </NavLink>

      <NavLink to={"/academic-calendar"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <EventBusyIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Academic Calendar
        </Typography>
      </NavLink>

      <NavLink to={"/academic-grading"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <TrendingUpIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Academic Grading
        </Typography>
      </NavLink>
      <NavLink to={"/exam-division"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <DvrRoundedIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Exam Division
        </Typography>
      </NavLink>
      <NavLink to={"/video-conference"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <VideocamIcon fontSize="small" />
          &nbsp;&nbsp;&nbsp; Video Conference
        </Typography>
      </NavLink>
    </div>
  );
};

export default SideMenu;
