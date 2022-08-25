import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import LoadingComp from "../../components/LoadingComp";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import ExamDivisionTableCollapse from "./ExamDivisionTableCollapse";

import {
  getAllExamDivisionAction,
  getSingleExamDivisionEditAction,
  updateSingleExamDivisionAction,
} from "./ExamDivisionActions";
import ExamDivisionForm from "./ExamDivisionForm";
import {
  CREATE_EXAM_DIVISION_RESET,
  GET_ALL_EXAM_DIVISION_RESET,
  GET_SINGLE_EXAM_DIVISION_EDIT_RESET,
  UPDATE_SINGLE_EXAM_DIVISION_RESET,
  UPDATE_SINGLE_EXAM_DIVISION_SUCCESS,
} from "./ExamDivisionConstants";

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
  { id: "StartRange", label: "Start Range" },
  { id: "EndRange", label: "End Range" },
  { id: "Division", label: "Division" },
  { id: "Comment", label: "Comment" },
  // { id: "Created_On", label: "Created_On" },
  // { id: "Updated_On", label: "Updated_On" },
];

const ExamDivision = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { examDivision, loading, error } = useSelector(
    (state) => state.getAllExamDivision
  );
  // const { examDivision: singleExamDivision, error: singleExamDivisionError } = useSelector((state) => state.getSingleExamDivision);

  const { singleExamDivision, error: singleExamDivisionError } = useSelector(
    (state) => state.getSingleExamDivisionEdit
  );
  const { success: examDivisionCreateSuccess, error: examDivisionCreateError } =
    useSelector((state) => state.createExamDivision);

  const {
    success: updateSingleExamDivisionSuccess,
    error: updateSingleExamDivisionError,
  } = useSelector((state) => state.updateSingleExamDivision);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EXAM_DIVISION_RESET });
  }

  if (examDivisionCreateSuccess) {
    dispatch(getAllExamDivisionAction());
    setNotify({
      isOpen: true,
      message: "Exam Division Created Successfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: CREATE_EXAM_DIVISION_RESET });
  }

  if (examDivisionCreateError) {
    setNotify({
      isOpen: true,
      message: examDivisionCreateError,
      type: "error",
    });
    dispatch({ type: CREATE_EXAM_DIVISION_RESET });
  }

  if (updateSingleExamDivisionSuccess) {
    dispatch(getAllExamDivisionAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_EXAM_DIVISION_RESET });
  }

  if (updateSingleExamDivisionError) {
    setNotify({
      isOpen: true,
      message: updateExamDivisionError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_EXAM_DIVISION_RESET });
  }

  // const updateCollegeHandler = (
  //   IDAcademicExamDivision,
  //   IDFacultyProgramLink
  // ) => {
  //   dispatch(
  //     getSingleExamDivisionEditAction(
  //       IDAcademicExamDivision,
  //       IDFacultyProgramLink
  //     )
  //   );
  //   setOpenPopup(true);
  // };
  // const deleteCollegeHandler = () => {};

  useEffect(() => {
    if (examDivision) {
      setTableData(examDivision.dbModelLst);
    }
  }, [dispatch, examDivision]);

  useEffect(() => {
    dispatch(getAllExamDivisionAction());
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
            x.Division?.toLowerCase()?.includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  // const addHandler = () => {
  //   dispatch({ type: GET_SINGLE_EXAM_DIVISION_EDIT_RESET });
  //   setOpenPopup(true);
  // };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Exam Division by Division"
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
            <TableContainer className={classes.table}>
              <TblHead />

              <TableBody>
                {tableDataAfterPagingAndSorting().map((item) => (
                  <ExamDivisionTableCollapse
                    key={item.$id}
                    item={item}
                    // updateCollegeHandler={updateCollegeHandler}
                    // deleteCollegeHandler={deleteCollegeHandler}
                  />
                ))}
              </TableBody>
            </TableContainer>
            <TblPagination />
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
export default ExamDivision;
