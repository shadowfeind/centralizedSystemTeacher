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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    button: {
      marginRight: "1px",
      padding: "5px",
      minWidth: "10px",
      fontSize: "12px",
    },
  });

  const FamilyMemberTableCollapse = ({
    item,
    updateCollegeHandler,
    deleteCollegeHandler,
  }) => {
    const classes = useStyles();

return(
    <TableRow>
      <TableCell>{item.FullName}</TableCell>
      <TableCell>{item.Relationship}</TableCell>
      <TableCell>{item.Nationality}</TableCell>
      <TableCell>{item.Current_Address}</TableCell>
      <TableCell>{item.Mobile_no}</TableCell>
      <TableCell>{item.Status}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => updateCollegeHandler(item.IDHRFamilyMember)}
        >
          <EditIcon style={{ fontSize: 12 }} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => deleteCollegeHandler(item.IDHRFamilyMember)}
        >
          <DeleteIcon style={{ fontSize: 12 }} />
        </Button>
      </TableCell>
      </TableRow>
)
};

export default FamilyMemberTableCollapse;