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

  const TrainingTableCollapse =({
      item,
      updateCollegeHandler,
      deleteCollegeHandler,
  })=>{
    const classes = useStyles(); 

    return(
        <TableRow>
          <TableCell>{item.TrainingTitle}</TableCell>
          <TableCell>{item.TrainingType}</TableCell>
          <TableCell>{item.FromDate.slice(0,10)}</TableCell>
          <TableCell>{item.ToDate.slice(0,10)}</TableCell>
          <TableCell>{item.Venue}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => updateCollegeHandler(item.IDHRTraining)}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => deleteCollegeHandler(item.IDHRTraining)}
            >
              <DeleteIcon style={{ fontSize: 12 }} />
            </Button>
          </TableCell>
          </TableRow>
    )
    };
  
export default TrainingTableCollapse;