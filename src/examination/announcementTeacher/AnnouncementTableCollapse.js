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

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const AnnouncementTableCollapse = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>{item.NewsHeading}</TableCell>
        <TableCell>{item.NewsDescription}</TableCell>
        <TableCell>{item.Created_On?.slice(0, 10)}</TableCell>
        <TableCell>{item.Updated_On?.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
      </TableRow>
    </>
  );
};

export default AnnouncementTableCollapse;
