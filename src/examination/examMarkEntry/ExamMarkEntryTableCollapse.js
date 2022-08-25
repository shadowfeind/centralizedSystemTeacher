import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const ExamMarkEntryTableCollapse = ({ item }) => {
  return (
    <>
      <TableRow>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.SubjectName}</TableCell>
        <TableCell>{item.FullMark}</TableCell>
        <TableCell>{item.FullMarkPractical}</TableCell>
        <TableCell>{item.FullMarkPreTerm}</TableCell>
        <TableCell>{item.ObtainedMark}</TableCell>
        <TableCell>{item.ObtainedMarkPractical}</TableCell>
        <TableCell>{item.ObtainedMarkPreTerm}</TableCell>
      </TableRow>
    </>
  );
};

export default ExamMarkEntryTableCollapse;
