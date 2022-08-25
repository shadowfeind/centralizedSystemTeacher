import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  TableContainer,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import { CREATE_SINGLE_JOBHISTORY_RESET, CREATE_SINGLE_JOBHISTORY_SUCCESS, GET_ALL_JOBHISTORY_CREATE_RESET, GET_ALL_JOBHISTORY_RESET, GET_SINGLE_JOBHISTORY_RESET, JOBHISTORY_CREATE_FAIL, JOBHISTORY_CREATE_RESET, JOBHISTORY_CREATE_SUCCESS } from "./JobHistoryConstants";
import { createSingleJobHistoryAction, getAllJobHistoryAction, getAllJobHistoryCreateAction } from "./JobHistoryActions";
import ListJobHistory from "../listComponent/ListJobHistory";
import JobHistoryForm from "./JobHistoryForm";
import ConfirmDialog from "../../../components/ConfirmDialog";
import JobHistoryTableCollapse from "./JobHistoryTableCollapse";
import { getAllJobHistoryCreateReducer } from "./JobHistoryReducers";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "Post", label: "Post" },
  { id: "Organization", label: "Organization" },
  { id: "FromDate", label: "FromDate" },
  { id: "ToDate", label: "ToDate" },
  { id: "IsActiveJob", label: "IsActiveJob" },
  { id: "Actions", label: "Actions", disableSorting: true},
];

const JobHistory = () => {

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
  
      const { getAllJobHistory, error } = useSelector((state) => state.getAllJobHistory);
      const { getAllJobHistoryCreate, error: getAllJobHistoryCreateError} = useSelector(
        (state) => state.getAllJobHistoryCreate
      );
      const { createSingleJobHistory, error: createSingleJobHistoryError} = useSelector(
        (state) => state.createSingleJobHistory
      );
      const { jobHistoryCreate, error: jobHistoryCreateError} = useSelector(
        (state) => state.jobHistoryCreate
      );
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_JOBHISTORY_RESET });
    }
    if (jobHistoryCreateError){
      setNotify({
        isOpen: true,
        message: jobHistoryCreateError,
        type: "error",
      });
      dispatch({type: JOBHISTORY_CREATE_RESET});
      setOpenPopup(false);
    }

    if (getAllJobHistoryCreateError) {
      setNotify({
        isOpen: true,
        message: getAllJobHistoryCreateError,
        type: "error",
      });
      dispatch({ type: GET_ALL_JOBHISTORY_CREATE_RESET });
      setOpenPopup(false);
    }

    if (jobHistoryCreate) {
      setNotify({
        isOpen: true,
        message: "Successfully Created",
        type: "success",
      });
      dispatch({type: JOBHISTORY_CREATE_SUCCESS})
      dispatch({ type: JOBHISTORY_CREATE_RESET });
      setOpenPopup(false);
    }

    if (createSingleJobHistory) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type: CREATE_SINGLE_JOBHISTORY_SUCCESS})
      dispatch({ type: CREATE_SINGLE_JOBHISTORY_RESET });
      setOpenPopup(false);
    }

    if(createSingleJobHistoryError){
      setNotify({
        isOpen: true,
        message: error,
        type : "error",
      });
      dispatch ({type: CREATE_SINGLE_JOBHISTORY_RESET});
    }

    const updateCollegeHandler = (id) => {
      dispatch(getAllJobHistoryCreateReducer());
      setOpenPopup(true);
    };
  
    const deleteCollegeHandler = (id) => {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to Delete this record?",
        subTitle: "You cannot undo this action",
      });
    };

    const addHandler = () => {
      dispatch(getAllJobHistoryCreateAction())
      setOpenPopup(true);
    };

    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllJobHistory) {
          dispatch(getAllJobHistoryAction());
      }
      if (getAllJobHistory) {
        setTableData(getAllJobHistory.dbModelLst);
      }
  }, [dispatch, getAllJobHistory]);

//   useEffect(() => {
//     dispatch({ type: "GET_LINK", payload: "/" });
//     if (!createSingleJobHistory) {
//         dispatch(createSingleJobHistoryAction());
//     }
// }, [dispatch, createSingleJobHistory]);
const {
  TableContainer,
  TblHead,
  TblPagination,
  tableDataAfterPagingAndSorting,
} = useCustomTable(tableData, tableHeader, filterFn);

  return <CustomContainer> 
   <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.button}
            onClick={addHandler}
          >
            Add Job History{" "}
          </Button>
       {getAllJobHistory && <ListJobHistory list={getAllJobHistory && getAllJobHistory.staffSummary}/>}
       <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <JobHistoryTableCollapse
                item={item}
                key={item.$id}
                updateCollegeHandler={updateCollegeHandler}
                deleteCollegeHandler={deleteCollegeHandler}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
       <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Job History Form"
      > <JobHistoryForm jobHistory={getAllJobHistoryCreate && getAllJobHistoryCreate} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
  </CustomContainer>;
};

export default JobHistory;
