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
import {
  getAllAcademicStudentExamdataAction,
  getEventAction,
  getEventScheduleAction,
  getExamEntryBulkAction,
  getExamEntrySearchDataAction,
} from "./ExamMarkEntryActions";
import SelectControl from "../../components/controls/SelectControl";
import {
  GET_EVENT_RESET,
  GET_EXAM_SCHEDULE_HEADER_RESET,
} from "./ExamMarkEntryConstants";
import ExamMarkEntryTableCollapse from "./ExamMarkEntryTableCollapse";
import ExamMarkEntryBulk from "./ExamMarkEntryBulk";

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
  { id: "RollNo", label: "Roll No" },
  { id: "FullName", label: "Full Name" },
  { id: "SubjectName", label: "Subject" },
  { id: "FullMark", label: "Full Marks(TH)" },
  { id: "FullMarkPractical", label: "Full Marks(PR)" },
  { id: "FullMarkPreTerm", label: "Full Marks(Pre Term)" },
  { id: "ObtainedMark", label: "ObtainedMark(TH)" },
  { id: "ObtainedMarkPractical", label: "ObtainedMark(PR)" },
  { id: "ObtainedMarkPreTerm", label: "ObtainedMark(Pre Term)" },
];

const ExamMarkEntry = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlSchedule, setDdlSchedule] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState(55);
  const [shift, setShift] = useState(2);
  const [section, setSection] = useState(1);
  const [event, setEvent] = useState();
  const [schedule, setSchedule] = useState();
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
            x.FullName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { allAcademicStudentExamData } = useSelector(
    (state) => state.getAllAcademicStudentExamdata
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { allSchedule, success: getScheduleSuccess } = useSelector(
    (state) => state.getEventSchedule
  );

  const { searchData,loading } = useSelector((state) => state.getExamEntrySearchData);

  const { bulkData ,loading:loadingBulk} = useSelector((state) => state.getExamEntryBulk);

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  if (getScheduleSuccess) {
    setDdlSchedule(allSchedule);
    dispatch({ type: GET_EXAM_SCHEDULE_HEADER_RESET });
  }
  useEffect(() => {
    if (!allAcademicStudentExamData) {
      dispatch(getAllAcademicStudentExamdataAction());
    }
    if (allAcademicStudentExamData) {
      setProgramDdl(
        allAcademicStudentExamData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(allAcademicStudentExamData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        allAcademicStudentExamData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(
        allAcademicStudentExamData.searchFilterModel.ddlAcademicShift
      );
      setDdlSection(allAcademicStudentExamData.searchFilterModel.ddlSection);
    }
  }, [allAcademicStudentExamData, dispatch]);

  useEffect(() => {
    if (searchData) {
      setTableData(searchData.dbModelLsts);
    }
  }, [searchData]);

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getEventAction(acaYear, programValue, value));
  };

  const eventHandler = (value) => {
    setEvent(value);
    dispatch(
      getEventScheduleAction(acaYear, programValue, classId, section, value)
    );
  };

  const handleExamMarkEntrySearch = () => {
    dispatch(
      getExamEntrySearchDataAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event,
        schedule
      )
    );
  };

  const handleBulkEdit = () => {
    dispatch(
      getExamEntryBulkAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event,
        schedule
      )
    );
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
                label="Class"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => eventHandler(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="ExamScheduleHeader"
                label="Exam Schedule Header"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                options={ddlSchedule ? ddlSchedule : test}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkEdit}
              >
                EDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamMarkEntrySearch}
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
        {searchData && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <ExamMarkEntryTableCollapse item={item} key={item.$id} />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {searchData && <TblPagination />}
        </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
      {loadingBulk ? (
          <LoadingComp />
        ) : (
          <>
        <ExamMarkEntryBulk
          statusData={
            bulkData && bulkData.searchFilterModel.ddlStudentExamStatus
          }
          bulkData={bulkData && bulkData.dbModelLsts}
        />
        </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ExamMarkEntry;
