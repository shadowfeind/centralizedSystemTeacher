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

const ExamDivisionTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const classes = useStyles();
  return (
    <TableRow key={item.$id}>
      <TableCell>{item.StartRange}</TableCell>
      <TableCell>{item.EndRange}</TableCell>
      <TableCell>{item.Division}</TableCell>
      <TableCell>{item.Comment}</TableCell>
      {/* <TableCell>{item.Created_On.slice(0,10)}</TableCell>
      <TableCell>{item.Updated_On.slice(0,10)}</TableCell> */}
    </TableRow>
  );
};
export default ExamDivisionTableCollapse;
