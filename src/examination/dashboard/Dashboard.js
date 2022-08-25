import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { School, PeopleOutline, Face, Settings } from "@material-ui/icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { months } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GET_TEACHER_DASHBOARD_RESET } from "./DashboardConstants";
import { getDashboardContentAction } from "./DashboardActions";
import Notification from "../../components/Notification";
import DashboardCard from "./DashboardCard";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "40px",
    maxWidth: "1600px",
  },
  gridStyle: {
    "&:hover": {
      marginTop: "-10px",
    },
  },
}));

const Dashboard = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dashboardContent, error } = useSelector(
    (state) => state.getDashboardContent
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_TEACHER_DASHBOARD_RESET });
  }

  useEffect(() => {
    dispatch(getDashboardContentAction());
  }, []);
  const localizer = momentLocalizer(moment);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid container>
          {dashboardContent &&
            dashboardContent.searchFilterModel.ddlSubjectForTeacher?.map(
              (s) => (
                <Grid key={s.id} item xs={3} className={classes.gridStyle}>
                  <DashboardCard
                    subject={s}
                    subCount={
                      dashboardContent.searchFilterModel
                        ?.totalAssignmentByTeacherAccordingToSubject
                    }
                  />
                </Grid>
              )
            )}
        </Grid>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Dashboard;
