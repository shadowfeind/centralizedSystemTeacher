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

const HolidayTableCollapse = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell width="20%">{item.HolidayName}</TableCell>
        <TableCell>{item.Description?.slice(0, 50)}</TableCell>
        <TableCell width="18%">{item.FromDate?.slice(0, 10)}</TableCell>
        <TableCell width="20%">{item.ToDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
        {/* <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={() => updateCollegeHandler(item.IDHRHoliday)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDHRHoliday)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell> */}
      </TableRow>
    </>
  );
};

export default HolidayTableCollapse;
