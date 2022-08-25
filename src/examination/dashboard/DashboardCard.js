import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";

export const DashboardCard = ({ subject, subCount }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      borderRadius: "10px",
      boxShadow: "5px 5px 5px #d3d3d3",
      margin: "10px",
      "& a": {
        textDecoration: "none",
      },
      "& h5": {
        fontSize: "12px",
        fontWeight: "lighter",
      },
    },
    CardContent: {
      marginBottom: "-25px",
    },
    media: {
      height: 0,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      paddingTop: "45.25%", // 16:9
    },
    topHeading: {
      color: "#000",
      fontSize: "18px",
      paddingBottom: "3px",
      marginBottom: "-10px",
    },
    badge: {
      minWidth: "15px",
      minHeight: "15px",
      color: "white",
      fontSize: "12px",
      bottom: "10px",
      position: "absolute",
      backgroundColor: "red",
      borderRadius: "50%",
    },
  }));
  const classes = useStyles();
  const history = useHistory();

  const currentSubCount = subCount.find(
    (x) => x.IDAcademicFacultySubjectLink === subject.Key
  );
  console.log(currentSubCount);

  return subject ? (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        // image="https://i.ibb.co/5s20zQR/ss.jpg"
        title="Paella dish"
      />
      <CardContent className={classes.CardContent}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h4"
          className={classes.topHeading}
        >
          {subject.Value}
        </Typography>

        {/* <Typography variant="body2" color="textSecondary" component="h6">
          Suresh M. Sanu
          <IconButton aria-label="add to favorites">
            <EmailIcon />
          </IconButton>
          SureshMandarSanu@gmail.com
        </Typography> */}
      </CardContent>
      <CardActions>
        <Link to={`/assignment/${subject.Key}`}>
          <IconButton aria-label="add to favorites">
            <AssignmentIcon style={{ fontSize: "16px" }} />

            <h5 style={{ position: "relative" }}>
              Assignment{" "}
              {currentSubCount?.totalAssignmentcount > 0 && (
                <span className={classes.badge}>
                  {currentSubCount && currentSubCount?.totalAssignmentcount}
                </span>
              )}
            </h5>
          </IconButton>
        </Link>

        <Link to={`/resources/${subject.Key}`}>
          <IconButton aria-label="share">
            <ImportContactsIcon style={{ fontSize: "16px" }} />
            <h5>Resources</h5>
          </IconButton>
        </Link>
        <IconButton aria-label="share">
          <NotificationsActiveIcon style={{ fontSize: "16px" }} />
          <h5>Notification</h5>
        </IconButton>
      </CardActions>
    </Card>
  ) : (
    <></>
  );
};
export default DashboardCard;
