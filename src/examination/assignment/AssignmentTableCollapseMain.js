import React from "react";
import { TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  downloadAssignmentAction,
  downloadSubmittedAssignmentAction,
  getSingleToEditTeacherAssignmentAction,
} from "./AssignmentActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const AssignmentTableCollapseMain = ({ item, shift, setOpenPopup3 }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleEdit = (id) => {
    dispatch(getSingleToEditTeacherAssignmentAction(id));
    setOpenPopup3(true);
  };

  const shiftName = shift?.filter((s) => s.Key === item.IDAcademicShift);
  const downloadHandler = (id) => {
    dispatch(downloadAssignmentAction(id));
  };

  const downloadSubmittedHandler = (id) => {
    dispatch(downloadSubmittedAssignmentAction(id));
  };
  return (
    <>
      <TableRow>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{shiftName?.length > 0 && shiftName[0].Value}</TableCell>
        <TableCell>{item.AssignmentName}</TableCell>
        <TableCell>{item.AssignmentDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.DueDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.SubmittedDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.TotalMark}</TableCell>
        <TableCell>{item.ObtainedMarks}</TableCell>
        <TableCell>
          {" "}
          {item.DocumentName !== null &&
            item.DocumentName !== "/Upload/TeacherAssignment/" && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => downloadHandler(item.IDAssignment)}
              >
                <CloudDownloadIcon style={{ fontSize: 12 }} />
              </Button>
            )}
        </TableCell>
        <TableCell>
          {" "}
          {item.DocumentSubmitted !== null &&
            item.DocumentSubmitted !== "/Upload/TeacherAssignment/" && (
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => downloadSubmittedHandler(item.IDAssignment)}
              >
                <CloudDownloadIcon style={{ fontSize: 12 }} />
              </Button>
            )}
        </TableCell>

        <TableCell>
          {" "}
          {item.SubmittedDate !== null && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              <VisibilityIcon style={{ fontSize: 12 }} />
            </Button>
          )}
        </TableCell>

        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleEdit(item.IDAssignment)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button> */}
        </TableCell>
      </TableRow>
    </>
  );
};

export default AssignmentTableCollapseMain;
