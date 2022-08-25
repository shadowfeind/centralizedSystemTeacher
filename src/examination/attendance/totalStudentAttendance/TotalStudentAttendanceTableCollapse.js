import React from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const TotalStudentAttendanceTableCollapse = ({ item, attendance }) => {
  const classes = useStyles();
  const currentAttendance = attendance?.filter(
    (a) => a.IDHREmployee === item.IDHREmployee
  );
  return (
    <TableRow>
      <TableCell>
        {currentAttendance.length !== 0 ? currentAttendance[0]?.Total : ""}
      </TableCell>
      <TableCell>{item.FullName}</TableCell>
      <TableCell>{item.RollNo}</TableCell>
      <TableCell>{item.MobileNumber}</TableCell>
      <TableCell>{item.EmailID}</TableCell>
    </TableRow>
  );
};

export default TotalStudentAttendanceTableCollapse;
