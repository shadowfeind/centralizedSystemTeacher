import React from "react";
import { TableRow, TableCell, makeStyles, Button } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { downloadResourceAction } from "./ResourcesActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const ResourcesTableCollapse = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

const downloadHandler = (id) => {
  dispatch(downloadResourceAction(id));
};


  return (
    <TableRow>
      <TableCell>{item.CourseName}</TableCell>
      <TableCell>{item.CourseDescription}</TableCell>
      <TableCell>{item.FirstName} {item.MiddleName} {item.LastName}</TableCell>
      <TableCell>{item.Created_On.slice(0, 10)}</TableCell>
      <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
      <TableCell>
      <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => downloadHandler(item.Id)}
          >
            <CloudDownloadIcon style={{ fontSize: 12 }} />
            </Button>
      </TableCell>
    </TableRow>
  );
};

export default ResourcesTableCollapse;
