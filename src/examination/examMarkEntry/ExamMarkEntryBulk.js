import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const ExamMarkEntryBulk = ({ bulkData, statusData }) => {
  const classes = useStyles();
  const inputHandler = (subject, value) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        const newSubject = { ...subject, CreditHour: Number(value) };
        // console.log(newSubject);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].CreditHour = Number(value);
        });
        return [...newArr];
      }
      return [...prev];
    });
  };

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        let newArr = prev.filter(
          (u) => u.IDAcademicSubject !== subject.IDAcademicSubject
        );
        return [...newArr];
      }
      let newCreditHour = Number(
        document.getElementById(`subject_${subject.IDAcademicSubject}`).value
      );
      const newSubject = { ...subject, CreditHour: newCreditHour };
      // console.log(newSubject);
      return [...prev, newSubject];
    });
  };

  const symbolsArr = ["e", "E", "+", "-", "."];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell align="right">FullName</StyledTableCell>
              <StyledTableCell align="right">Subject Name</StyledTableCell>
              <StyledTableCell align="right">Mark Obtained(TH)</StyledTableCell>
              <StyledTableCell align="right">Mark Obtained(PT)</StyledTableCell>
              <StyledTableCell align="right">
                Mark Obtained(Pre Term)
              </StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Full Mark</StyledTableCell>
              <StyledTableCell align="right">Full Mark(PT)</StyledTableCell>
              <StyledTableCell align="right">
                Full Mark(Pre Term)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulkData &&
              bulkData.map((subject) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {subject.RollNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.SubjectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`theory_${subject.IDHREmployee}`}
                      defaultValue={subject.ObtainedMark}
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      type="number"
                      label="Obtained Mark"
                      variant="outlined"
                      inputProps={{ tabIndex: "1" }}
                      //   onChange={(e) => inputHandler(subject, e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`practical_${subject.IDHREmployee}`}
                      defaultValue={subject.ObtainedMarkPractical}
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      type="number"
                      label="Obtained Practical Mark"
                      variant="outlined"
                      inputProps={{ tabIndex: "2" }}
                      //   onChange={(e) => inputHandler(subject, e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`preterm_${subject.IDHREmployee}`}
                      defaultValue={subject.ObtainedMarkPreTerm}
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      type="number"
                      label="Obtained PreTerm Mark"
                      variant="outlined"
                      inputProps={{ tabIndex: "3" }}
                      //   onChange={(e) => inputHandler(subject, e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="filled-age-native-simple">
                        Status
                      </InputLabel>
                      <Select
                        native
                        defaultValue={subject.Section}
                        id={`status_${subject.IDHREmployee}`}
                        // onChange={(e) =>
                        //   sectionHandler(e.target.value, subject)
                        // }
                      >
                        {statusData.map((section) => (
                          <option value={section.Key}>{section.Value}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullMark}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullMarkPractical}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullMarkPreTerm}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
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
              // onClick={() => setOpenPopup(false)}
              style={{ margin: "10px 0 0 10px" }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0 0 10px" }}
              //   onClick={formCheckSubmitHandler}
            >
              SUBMIT
            </Button>
          </div>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExamMarkEntryBulk;
