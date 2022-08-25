import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { postBulkExamMarkApprovalAction } from "./ExamMarkAprrovalActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
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

const ExamMarkApprovalBulk = ({
  bulkData,
  statusData,
  search,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();

  const validate = () => {
    let temp = {};
    temp.submit = bulk?.length <= 0 ? "Cannot Submit When Data is Empty!" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const onChangeHandler = (subject, value, name, index) => {
    let showValue =
      name === "ObtainedMark" ? subject.FullMark : subject.FullMarkPractical;

    if ((value <= showValue) & (value >= 0)) {
      setBulk((prev) => {
        const newReassoc = {
          ...subject,
          [name]: Number(value),
        };

        let newArray = [...prev];
        newArray[index] = newReassoc;

        return [...newArray];
      });
    } else {
      alert(`${name} must be equal or less than ${showValue}`);
    }
  };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      setActive(true);
      dispatch(postBulkExamMarkApprovalAction(bulk, search));
    }
  };

  useEffect(() => {
    if (bulkData) {
      bulkData.forEach((bulk) => {
        if (bulk.StudentExamStatus === null) {
          bulk.StudentExamStatus = 1;
        }
      });
      setBulk(bulkData);
    }
  }, [bulkData]);

  const symbolsArr = ["e", "E", "+", "-"];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="center">
                Mark Obtained(TH)
              </StyledTableCell>
              {bulk &&
                bulk?.length > 0 &&
                bulk[0].FullMarkPractical !== 0 &&
                bulk[0].FullMarkPractical !== null && (
                  <StyledTableCell align="center">
                    Mark Obtained(PT)
                  </StyledTableCell>
                )}
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Full Mark</StyledTableCell>
              <StyledTableCell align="center">Full Mark(PT)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {subject.RollNo}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {subject.FullName}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <TextField
                      id={`theory_${subject.IDHREmployee}`}
                      name="ObtainedMark"
                      value={subject.ObtainedMark}
                      onKeyDown={(e) =>
                        symbolsArr.includes(e.key) && e.preventDefault()
                      }
                      type="number"
                      label="Obtained Mark"
                      variant="outlined"
                      inputProps={{ tabIndex: "1" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  {subject.FullMarkPractical !== 0 &&
                    subject.FullMarkPractical !== null && (
                      <StyledTableCell align="right">
                        <TextField
                          id={`practical_${subject.IDHREmployee}`}
                          value={subject.ObtainedMarkPractical}
                          name="ObtainedMarkPractical"
                          onKeyDown={(e) =>
                            symbolsArr.includes(e.key) && e.preventDefault()
                          }
                          type="number"
                          label="Obtained Practical Mark"
                          variant="outlined"
                          inputProps={{ tabIndex: "2" }}
                          onChange={(e) =>
                            onChangeHandler(
                              subject,
                              e.target.value,
                              e.target.name,
                              index
                            )
                          }
                        />
                      </StyledTableCell>
                    )}
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
                        defaultValue={subject.StudentExamStatus}
                        name="StudentExamStatus"
                        id={`status_${subject.IDHREmployee}`}
                        onChange={(e) =>
                          onChangeHandler(
                            subject,
                            e.target.value,
                            e.target.name,
                            index
                          )
                        }
                      >
                        {statusData &&
                          statusData.map((section) => (
                            <option key={section.Value} value={section.Key}>
                              {section.Value}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="center  ">
                    {subject.FullMark}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {subject.FullMarkPractical === 0
                      ? ""
                      : subject.FullMarkPractical}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {bulk?.length <= 0 && (
        <div>
          <h3 style={{ color: "red", textAlign: "center" }}>No Data Found</h3>
        </div>
      )}
      {errors.submit && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "12px",
            paddingTop: "8px",
          }}
        >
          {errors.submit}
        </div>
      )}
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
          onClick={formCheckSubmitHandler}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </>
  );
};

export default ExamMarkApprovalBulk;
