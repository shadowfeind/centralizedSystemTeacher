import React, { useEffect, useState } from "react";
import {
  Button,
  makeStyles,
  Toolbar,
  TableBody,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import LoadingComp from "../../../components/LoadingComp";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import { Search } from "@material-ui/icons";
import {
  getAllTotalStudentAttendanceAction,
  getListTotalStudentAttendanceAction,
} from "./TotalStudentAttendanceActions";
import {
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_RESET,
} from "./TotalStudentAttendanceConstant";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { getSubjectOptionsForSelectAction } from "../studentMonthlyPresentSheet/StudentMonthlyPresentSheetActions";
import { GET_SUBJECT_OPTIONS_FOR_SELECT_RESET } from "../studentMonthlyPresentSheet/StudentMonthlyPresentSheetConstants";
import useCustomTable from "../../../customHooks/useCustomTable";
import TotalStudentAttendanceTableCollapse from "./TotalStudentAttendanceTableCollapse";
import InputControl from "../../../components/controls/InputControl";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const tableHeader = [
  { id: "Total", label: "Total Attendance" },
  { id: "FullName", label: "Student Name" },
  { id: "RollNo", label: "RollNo" },
  { id: "MobileNumber", label: "Mobile Number" },
  { id: "EmailID", label: "Email ID" },
];

const TotalStudentAttendance = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);

  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.FullName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const test = [{ Key: "", Value: "" }];

  const {
    allTotalStudentAttendanceData,
    error: allStudentAttendanceDataError,
  } = useSelector((state) => state.getAllTotalStudentAttendance);

  const { subjectOptions, error: subjectOptionsError } = useSelector(
    (state) => state.getSubjectOptionsForSelect
  );

  const {
    listTotalStudentAttendanceData,
    loading,
    success: listTotalStudentAttendanceDataSuccess,
    error: listTotalStudentAttendanceDataError,
  } = useSelector((state) => state.getListTotalStudentAttendance);

  if (allStudentAttendanceDataError) {
    setNotify({
      isOpen: true,
      message: allStudentAttendanceDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET });
  }
  if (subjectOptionsError) {
    setNotify({
      isOpen: true,
      message: subjectOptionsError,
      type: "error",
    });
    dispatch({ type: GET_SUBJECT_OPTIONS_FOR_SELECT_RESET });
  }
  if (listTotalStudentAttendanceDataError) {
    setNotify({
      isOpen: true,
      message: listTotalStudentAttendanceDataError,
      type: "error",
    });
    dispatch({ type: GET_LIST_TOTAL_STUDENT_ATTENDANCE_RESET });
  }

  useEffect(() => {
    if (allTotalStudentAttendanceData) {
      // setProgramDdl(
      //   allTotalStudentAttendanceData?.searchFilterModel.ddlFacultyProgramLink
      // );
      setProgramValue(
        allTotalStudentAttendanceData?.searchFilterModel
          .ddlFacultyProgramLink[0].Key
      );
      setDdlClass(allTotalStudentAttendanceData?.searchFilterModel.ddlClass);
      setClassId(
        allTotalStudentAttendanceData?.searchFilterModel.ddlClass[0]?.Key
      );
      setAcademicYearDdl(
        allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicYear
      );
      setAcaYear(
        allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlShift(
        allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicShift
      );
      setShift(
        allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicShift[0]
          ?.Key
      );
      setDdlSection(
        allTotalStudentAttendanceData?.searchFilterModel.ddlSection
      );
      setSection(
        allTotalStudentAttendanceData?.searchFilterModel.ddlSection[0]?.Key
      );
      setStartDate(
        allTotalStudentAttendanceData?.searchFilterModel.currentDate?.slice(
          0,
          10
        )
      );
      setEndDate(
        allTotalStudentAttendanceData?.searchFilterModel.currentDate?.slice(
          0,
          10
        )
      );
      if (
        allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicYear
          ?.length > 0 &&
        allTotalStudentAttendanceData?.searchFilterModel.ddlFacultyProgramLink
          ?.length > 0 &&
        allTotalStudentAttendanceData?.searchFilterModel.ddlClass?.length > 0
      ) {
        dispatch(
          getSubjectOptionsForSelectAction(
            allTotalStudentAttendanceData?.searchFilterModel.ddlAcademicYear[0]
              ?.Key,
            allTotalStudentAttendanceData?.searchFilterModel
              .ddlFacultyProgramLink[0]?.Key,
            allTotalStudentAttendanceData?.searchFilterModel.ddlClass[0]?.Key
          )
        );
      }
    }
  }, [allTotalStudentAttendanceData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_LIST_TOTAL_STUDENT_ATTENDANCE_RESET });
    dispatch(getAllTotalStudentAttendanceAction());
  }, []);

  // useEffect(() => {
  //   if (subjectOptions) {
  //     setDdlSubject(subjectOptions);
  //   }
  // }, [subjectOptions]);

  useEffect(() => {
    if (listTotalStudentAttendanceData) {
      setTableData(
        listTotalStudentAttendanceData.dbModelTotalStudentAttendanceCountLst
      );
    }
  }, [listTotalStudentAttendanceData]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchAttendance = () => {
    if (validate()) {
      dispatch(
        getListTotalStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          startDate,
          endDate
        )
      );
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if ((programValue, classId)) {
      dispatch(getSubjectOptionsForSelectAction(value, programValue, classId));
    }
    setDdlSubject([]);
    setSubject("");
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    if ((acaYear, programValue)) {
      dispatch(getSubjectOptionsForSelectAction(acaYear, programValue, value));
    }
    setDdlSubject([]);
    setSubject("");
  };

  const handleShiftChange = (value) => {
    setShift(value);
    if ((acaYear, programValue, classId)) {
      dispatch(
        getSubjectOptionsForSelectAction(acaYear, programValue, classId, value)
      );
    }
    setDdlSubject([]);
    setSubject("");
  };

  const handleSectionChange = (value) => {
    setSection(value);
    if ((acaYear, programValue, classId, shift)) {
      dispatch(
        getSubjectOptionsForSelectAction(
          acaYear,
          programValue,
          classId,
          shift,
          value
        )
      );
    }
    setDdlSubject([]);
    setSubject("");
  };

  useEffect(() => {
    if (subjectOptions) {
      setDdlSubject(subjectOptions);
      setSubject(subjectOptions[0]?.Key);
    }
  }, [subjectOptions]);

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramChange(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass ? ddlClass : test}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShiftChange(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={errors.shift}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => handleSectionChange(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Sujbect"
                label="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                options={ddlSubject ? ddlSubject : test}
                errors={errors.subject}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="StartDate"
                  label="Start Date"
                  value={startDate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    setStartDate(newDate.toLocaleDateString()?.slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="EndDate"
                  label="End Date"
                  value={endDate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    setEndDate(newDate.toLocaleDateString()?.slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleSearchAttendance}
              >
                SEARCH
              </Button>
              <div style={{ height: "10px" }}></div>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "10px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student by Student Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {listTotalStudentAttendanceData && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <TotalStudentAttendanceTableCollapse
                      item={item}
                      key={item.$id}
                      attendance={
                        listTotalStudentAttendanceData &&
                        listTotalStudentAttendanceData.dbModelTotalStudentAttendanceCountLst
                      }
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listTotalStudentAttendanceData && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default TotalStudentAttendance;
