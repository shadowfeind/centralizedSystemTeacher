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

  const EducationTableCollapse =({
    item,
    updateCollegeHandler,
    deleteCollegeHandler,
  })=> {
    const classes = useStyles();

    return(
        <TableRow>
          <TableCell>{item.EducationLevel}</TableCell>
          <TableCell>{item.InstituteName}</TableCell>
          <TableCell>{item.PassDate}</TableCell>
          <TableCell>{item.ScoreIn}</TableCell>
          <TableCell>{item.Score}</TableCell>
          <TableCell>{item.MajorSpecialization}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => updateCollegeHandler(item.IDHREducation)}
            >
              <EditIcon style={{ fontSize: 12 }} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => deleteCollegeHandler(item.IDHREducation)}
            >
              <DeleteIcon style={{ fontSize: 12 }} />
            </Button>
          </TableCell>
          </TableRow>
    )
    };

    export default EducationTableCollapse;