import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import LoadingComp from "../../../components/LoadingComp";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import SelectControl from "../../../components/controls/SelectControl";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_RESET,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_RESET,
} from "./ClassNotificationConstants";
import {
  getAllNotificationTeacherAction,
  getListNotificationTeacherAction,
} from "./ClassNotificationActions";
import ClassNotificationTeacherTableCollapse from "./ClassNotificationTableCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const tableHeader = [
  { id: "FullName", label: "Message Send By" },
  { id: "MessagesHeading", label: "Messages Heading" },
  { id: "MessagesDescription", label: "Messages Description" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "IsActive", label: "IsActive" },
];

const ClassNotification = () => {
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearValue, setAcademicYearValue] = useState("");
  const [shift, setShift] = useState([]);
  const [shiftValue, setShiftValue] = useState("");
  const [program, setProgram] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [section, setSection] = useState([]);
  const [sectionValue, setSectionValue] = useState("");
  const [classOpt, setClassOpt] = useState([]);
  const [classOptValue, setClassOptValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { classNotificationTeacher, error } = useSelector(
    (state) => state.getAllNotificationTeacher
  );

  const {
    listClassNotificationTeacher,
    error: listClassNotificationTeacherError,
  } = useSelector((state) => state.getListNotificationTeacher);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_TEACHER_NOTIFICATION_TEACHER_RESET });
  }

  if (listClassNotificationTeacherError) {
    setNotify({
      isOpen: true,
      message: listClassNotificationTeacherError,
      type: "error",
    });
    dispatch({ type: GET_LIST_TEACHER_NOTIFICATION_TEACHER_RESET });
  }

  useEffect(() => {
    // dispatch({ type: "GET_LINK", payload: "/notification" });
    if (listClassNotificationTeacher) {
      setTableData(listClassNotificationTeacher.teacherNotificationInboxLst);
    }
  }, [dispatch, listClassNotificationTeacher]);

  useEffect(() => {
    dispatch(getListNotificationTeacherAction());
  }, []);

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
            x.FirstName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  // const listSearchHandler = () => {
  //   if (validate()) {
  //     dispatch(getListNotificationTeacherAction());
  //   }
  // };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Teacher Notification by Name"
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
        <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <ClassNotificationTeacherTableCollapse
                item={item}
                key={item.$id}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ClassNotification;
