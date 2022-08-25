import React, { useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const ExamScheduleTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{item.EventName}</TableCell>
      <TableCell>{item.ExamType}</TableCell>
      <TableCell>{item.DisplayName}</TableCell>
      <TableCell>{item.ExamScheduleFromDate.slice(0, 10)}</TableCell>
      <TableCell>{item.ExamScheduleToDate.slice(0, 10)}</TableCell>
      <TableCell>{item.FullMark}</TableCell>
      <TableCell>{item.FullMarkPractical}</TableCell>
      <TableCell>{item.PassMark}</TableCell>
      <TableCell>{item.SubjectOrder}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateCollegeHandler(item.IDAcademicExamSchedule)}
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => deleteCollegeHandler(item.IDAcademicExamSchedule)}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ExamScheduleTableCollapse;
