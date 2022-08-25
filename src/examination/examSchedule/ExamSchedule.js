import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import { GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET } from "./ExamScheduleConstants";
import {
  getAllExamScheduleInitialDataAction,
  getExamScheduleListAction,
} from "./ExamScheduleActions";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import ExamScheduleTableCollapse from "./ExamScheduleTableCollapse";

//event api came from exam mark entry

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

const test = [{ Key: "", Value: "" }];

const tableHeader = [
  { id: "EventName", label: "Event Name" },
  // { id: "StudentName", label: "Subject" },
  { id: "ExamType", label: "Type" },
  { id: "DisplayName", label: "Display Name" },
  { id: "ExamScheduleFromDate", label: "From Date" },
  { id: "ExamScheduleToDate", label: "To Date" },
  { id: "FullMark", label: "FullMarks" },
  { id: "FullMarkPractical", label: "FullMarks(PT/UT)" },
  { id: "PassMark", label: "PassMark" },
  { id: "SubjectOrder", label: "Subject Order" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

const ExamSchedule = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState(null);
  const [acaYear, setAcaYear] = useState(55);
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
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
            x.EventName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { examScheduleInitialData, error: examScheduleInitialDataError } =
    useSelector((state) => state.getAllExamScheduleInitialData);

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { examScheduleList, loading } = useSelector(
    (state) => state.getExamScheduleList
  );

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  if (examScheduleInitialDataError) {
    setNotify({
      isOpen: true,
      message: examScheduleInitialDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET });
  }

  useEffect(() => {
    if (examScheduleInitialData) {
      setProgramDdl(
        examScheduleInitialData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(examScheduleInitialData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        examScheduleInitialData.searchFilterModel.ddlAcademicYear
      );
    }
  }, [examScheduleInitialData, dispatch]);

  useEffect(() => {
    dispatch(getAllExamScheduleInitialDataAction());
  }, []);

  useEffect(() => {
    if (examScheduleList) {
      setTableData(examScheduleList.dbModelLst);
    }
  }, [examScheduleList]);
  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getEventAction(acaYear, programValue, value));
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }
  };

  const handleExamScheduleSearch = () => {
    if ((acaYear, programValue, classId, event)) {
      dispatch(
        getExamScheduleListAction(acaYear, programValue, classId, event)
      );
    }
  };

  const updateExamSchedule = () => {
    setOpenPopup(true);
  };

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
                options={academicYearDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                // onChange={handleInputChange}
                options={programDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
              />
            </Grid>

            <Grid item xs={3}>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleCreate}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamScheduleSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Faculty"
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
            {examScheduleList && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <ExamScheduleTableCollapse item={item} key={item.$id} />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {examScheduleList && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Exam Schedule Form"
      >
        {/* <ExamMarkEntryBulk
      statusData={
        bulkData && bulkData.searchFilterModel.ddlStudentExamStatus
      }
      bulkData={bulkData && bulkData.dbModelLsts}
    /> */}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ExamSchedule;
