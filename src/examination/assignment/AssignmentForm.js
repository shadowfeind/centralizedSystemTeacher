import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { symbolsArrPhone } from "../helpers/excludeSymbol";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { postTeacherAssignmentAction } from "./AssignmentActions";
import { API_URL } from "../../constants";

const initialFormValues = {
  IDAssignment: 0,
  IDHREmployee: 0,
  IDFacultyProgramLink: 0,
  IDAcademicYear: 0,
  IDAcademicFacultySubjectLink: 0,
  IDLevel: 0,
  Section: 0,
  IDAcademicShift: 0,
  ReceiverID: 0,
  AssignmentName: "",
  AssignmentSummary: "",
  TeacherComment: "",
  StudentComment: "",
  FolderName: "",
  DocumentName: "",
  DocumentSubmitted: "",
  TotalMark: "",
  MarksObtained: "",
  AssignmentSubmitCode: 0,
  AssignmentDate: "2022-02-02T00:00:00",
  DueDate: "2022-02-02T00:00:00",
  SubmittedDate: "",
  CreatedBy: "",
  FullName: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  RollNo: "",
  MobileNumber: "",
  SubjectName: "",
  IsActive: false,
  Created_On: "0001-01-01T00:00:00",
  Updated_On: "0001-01-01T00:00:00",
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AssignmentForm = ({ students, formDatas, setOpenPopup }) => {
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [lstStudents, setLstStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AssignmentName = !fieldValues.AssignmentName
      ? "This feild is required"
      : !fieldValues.AssignmentName.trim()
      ? "This feild is required"
      : "";

    temp.TotalMark = !fieldValues.TotalMark ? "This feild is required" : "";

    temp.DueDate =
      fieldValues.DueDate == null || fieldValues.DueDate == ""
        ? "This feild is required"
        : "";

    temp.AssignmentDate =
      fieldValues.AssignmentDate == null || fieldValues.AssignmentDate == ""
        ? "This feild is required"
        : "";

    temp.AssignmentSummary = !fieldValues.AssignmentSummary
      ? "This feild is required"
      : !fieldValues.AssignmentSummary.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (students) {
      setLstStudents([...students]);
    }
  }, [students]);

  useEffect(() => {
    if (formDatas) {
      setValues({ ...formDatas });
    }
  }, [formDatas]);

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setSelectedStudents([...students]);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setSelectedStudents((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDHREmployee !== obj.IDHREmployee
        );
        return [...newCheckList];
      });
    } else {
      setSelectedStudents((prev) => [...prev, obj]);
    }
  };

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      dispatch(postTeacherAssignmentAction(image, values, selectedStudents));
    }
  };
  const symbolsArr = ["e", "E", "+", "-", "."];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No. </StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Mobile No.</StyledTableCell>
              <StyledTableCell>Email ID.</StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                <label>All</label>
                <Checkbox
                  checked={checked}
                  color="primary"
                  onChange={(e) => handleAllChecked(e.target.checked)}
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lstStudents &&
              lstStudents
                ?.sort((a, b) => a.RollNo - b.RollNo)
                ?.map((s) => (
                  <StyledTableRow key={s.IDHREmployee}>
                    <StyledTableCell component="th" scope="row">
                      {s.RollNo}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.FullName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.MobileNumber}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.EmailID}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "right" }}
                    >
                      <Checkbox
                        checked={
                          selectedStudents.filter(
                            (x) => x.IDHREmployee === s.IDHREmployee
                          ).length > 0
                            ? true
                            : false
                        }
                        color="primary"
                        onChange={(e) => handleChecked(e.target.checked, s)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: "30px" }}></div>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <InputControl
              name="AssignmentName"
              label="Assignment Name"
              value={values.AssignmentName}
              onChange={handleInputChange}
              errors={errors.AssignmentName}
            />

            <DatePickerControl
              name="AssignmentDate"
              label="FromDate"
              value={values.AssignmentDate}
              onChange={handleInputChange}
              errors={errors.AssignmentDate}
            />
            <InputControl
              name="ImageUploaded"
              // value={values.ClassLocation}
              onChange={(e) => handleImage(e)}
              type="file"
            />
            <img
              src={
                imgSrc ? imgSrc : formDatas && `${API_URL}${formDatas.FullPath}`
              }
              height={200}
              width={200}
            />
          </Grid>
          <Grid item xs={6}>
            <InputControl
              name="TotalMark"
              label="Full Marks*"
              onKeyDown={(e) =>
                symbolsArrPhone.includes(e.key) && e.preventDefault()
              }
              type="number"
              value={values.TotalMark}
              onChange={handleInputChange}
              errors={errors.TotalMark}
            />
            <DatePickerControl
              name="DueDate"
              label="DueDate*"
              value={values.DueDate}
              onChange={handleInputChange}
              errors={errors.DueDate}
            />
            <InputControl
              name="AssignmentSummary"
              label="Assignment Summary"
              value={values.AssignmentSummary}
              onChange={handleInputChange}
              errors={errors.AssignmentSummary}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "10px",
            marginTop: "10px",
            borderTop: "1px solid #f3f3f3",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPopup(false)}
            style={{ margin: "10px 0 0 10px" }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={active}
            style={{ margin: "10px 0 0 10px" }}
          >
            {active ? "PROCESSING" : "SUBMIT"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AssignmentForm;
