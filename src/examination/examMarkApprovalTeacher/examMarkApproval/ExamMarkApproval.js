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
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import LoadingComp from "../../../components/LoadingComp";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  getActiveSubjectAction,
  getAllOtherOptionsForSelectTeacherAction,
  getBulkExamMarkApprovalSearchDataAction,
  getExamMarkApprovalScheduleHeaderAction,
  getExamMarkApprovalSearchDataAction,
  getInitialExamMarkApprovalDataAction,
} from "./ExamMarkAprrovalActions";
import { getEventAction } from "../../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../../examMarkEntry/ExamMarkEntryConstants";
import {
  GET_ACTIVE_SUBJECT_RESET,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_RESET,
  GET_BULK_EXAM_MARK_APPROVAL_RESET,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_RESET,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_RESET,
  POST_BULK_EXAM_MARK_APPROVAL_RESET,
} from "./ExamMarkApprovalConstant";
import ExamMarkApprovalTableCollapse from "./ExamMarkApprovalTableCollapse";
import ExamMarkApprovalBulk from "./ExamMarkApprovalBulk";

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
  { id: "FullName", label: "Student Name" },
  { id: "FullMark", label: "Full Marks(TH)" },
  { id: "FullMarkPractical", label: "Full Marks(PR/UT)" },
  { id: "ObtainedMark", label: "ObtainedMark(TH)" },
  { id: "ObtainedMarkPractical", label: "ObtainedMark(PR/UT)" },
  { id: "UpdatedOn", label: "Updated On" },
  { id: "Status", label: "Status" },
];

const ExamMarkApproval = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlSchedule, setDdlSchedule] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [errors, setErrors] = useState([]);
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
            x.FullName?.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const { examMarkApprovalInitialDatas, error } = useSelector(
    (state) => state.getExamMarkApprovalInitialData
  );

  const { allOtherOptions, error: allOtherOptionsError } = useSelector(
    (state) => state.getAllOtherOptionsForSelectTeacher
  );

  const { scheduleHeader, error: scheduleHeaderError } = useSelector(
    (state) => state.getExamMarkApprovalScheduleHeader
  );
  const { activeSubject, success: activeSubjectSuccess } = useSelector(
    (state) => state.getActiveSubject
  );
  const { searchData, loading } = useSelector(
    (state) => state.getExamMarkApprovalSearchData
  );

  const {
    bulkData,
    loading: loadingBulk,
    success: bulkDataSuccess,
  } = useSelector((state) => state.getBulkExamMarkApprovalSearchData);

  const {
    success: postBulkExamMarkApprovalSuccess,
    error: postBulkExamMarkApprovalError,
  } = useSelector((state) => state.postBulkExamMarkApproval);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_RESET });
    setOpenPopup(false);
  }

  if (activeSubjectSuccess) {
    setDdlEvent(activeSubject);
    dispatch({ type: GET_ACTIVE_SUBJECT_RESET });
  }
  if (scheduleHeader) {
    setDdlSchedule(scheduleHeader);
    dispatch({ type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_RESET });
  }
  if (postBulkExamMarkApprovalSuccess) {
    setNotify({
      isOpen: true,
      message: "Succesfully Edited",
      type: "success",
    });
    dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_RESET });
    setOpenPopup(false);
  }
  if (postBulkExamMarkApprovalSuccess) {
    setNotify({
      isOpen: true,
      message: "Succesfully Edited",
      type: "success",
    });
    dispatch(
      getExamMarkApprovalSearchDataAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event,
        schedule
      )
    );
    dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_RESET });
    setOpenPopup(false);
  }
  if (postBulkExamMarkApprovalError) {
    setNotify({
      isOpen: true,
      message: postBulkExamMarkApprovalError,
      type: "error",
    });
    dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_RESET });
    setOpenPopup(false);
  }

  if (allOtherOptionsError) {
    setNotify({
      isOpen: true,
      message: allOtherOptionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_RESET });
  }

  useEffect(() => {
    if (examMarkApprovalInitialDatas) {
      setDdlSchedule(
        examMarkApprovalInitialDatas.searchFilterModel.ddlSubjectForTeacher
      );
      setSchedule(
        examMarkApprovalInitialDatas.searchFilterModel.ddlSubjectForTeacher[0]
          ?.Key
      );
      if (
        examMarkApprovalInitialDatas.searchFilterModel.ddlSubjectForTeacher
          ?.length > 0
      ) {
        dispatch(
          getAllOtherOptionsForSelectTeacherAction(
            examMarkApprovalInitialDatas.modelDb.IDHREmployee,
            examMarkApprovalInitialDatas.searchFilterModel
              .ddlSubjectForTeacher[0]?.Key
          )
        );
      }
    }
  }, [examMarkApprovalInitialDatas, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_RESET });
    dispatch(getInitialExamMarkApprovalDataAction());
  }, []);

  const subjectHandler = (value) => {
    setSchedule(value);
    dispatch(
      getAllOtherOptionsForSelectTeacherAction(
        examMarkApprovalInitialDatas.modelDb.IDHREmployee,
        value
      )
    );
  };

  useEffect(() => {
    if (allOtherOptions) {
      unstable_batchedUpdates(() => {
        setAcademicYearDdl(allOtherOptions.year && allOtherOptions.year);
        setAcaYear(
          allOtherOptions.year.length > 0 ? allOtherOptions.year[0]?.Key : ""
        );
        setProgramDdl(allOtherOptions.program && allOtherOptions.program);
        setProgramValue(
          allOtherOptions.program.length > 0
            ? allOtherOptions.program[0]?.Key
            : ""
        );
        setDdlClass(allOtherOptions.classId && allOtherOptions.classId);
        setClassId(
          allOtherOptions.classId.length > 0
            ? allOtherOptions.classId[0]?.Key
            : ""
        );
        setDdlSection(allOtherOptions.section && allOtherOptions.section);
        setSection(
          allOtherOptions.section.length > 0
            ? allOtherOptions.section[0]?.Key
            : ""
        );
        setDdlShift(allOtherOptions.shift && allOtherOptions.shift);
        setShift(
          allOtherOptions.shift.length > 0 ? allOtherOptions.shift[0]?.Key : ""
        );
        setDdlEvent(allOtherOptions.event && allOtherOptions.event);
        setEvent(
          allOtherOptions.event.length > 0 ? allOtherOptions.event[0]?.Key : ""
        );
      });
    }
  }, [allOtherOptions, dispatch]);
  useEffect(() => {
    if (activeSubject) {
      setDdlEvent([...activeSubject]);
    }
  }, [activeSubject]);

  useEffect(() => {
    if (searchData) {
      setTableData(searchData.dbModelLsts);
    }
  }, [searchData]);

  const validate = () => {
    let temp = {};
    temp.schedule = !schedule ? "This feild is required" : "";
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleExamApprovalSearch = () => {
    if (validate()) {
      dispatch(
        getExamMarkApprovalSearchDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkExamMarkApprovalSearchDataAction(
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
    }
  };

  // useEffect(()=>{
  //   if(bulkDataSuccess){
  //     setOpenPopup(true);
  //   }
  // },[bulkDataSuccess])

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <SelectControl
                name="ExamScheduleHeader"
                label="Subject"
                value={schedule}
                onChange={(e) => subjectHandler(e.target.value)}
                options={ddlSchedule ? ddlSchedule : test}
                errors={errors.schedule}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="AcademicYear"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Classes"
                label="Class"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid> */}
            {/* <Grid item xs={3}>
              
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift}
                errors={errors.shift1}
              />
            </Grid> */}
            {/* <Grid item xs={3}>
            <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection}
                errors={errors.section}
              />
            </Grid> */}
            <Grid item xs={3}>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkEdit}
              >
                BULKEDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamApprovalSearch}
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
            label="Search Exam Mark by Student Name"
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
                    <ExamMarkApprovalTableCollapse item={item} key={item.$id} />
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
            <ExamMarkApprovalBulk
              statusData={
                bulkData && bulkData.searchFilterModel.ddlStudentExamStatus
              }
              search={bulkData && bulkData.searchFilterModel}
              bulkData={bulkData && bulkData.dbModelLsts}
              setOpenPopup={setOpenPopup}
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

export default ExamMarkApproval;
