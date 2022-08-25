import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
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
import {
  CREATE_SINGLE_TRAINING_RESET,
  CREATE_SINGLE_TRAINING_SUCCESS,
  GET_ALL_TRAINING_CREATE_RESET,
  GET_ALL_TRAINING_RESET,
  TRAINING_CREATE_RESET,
  TRAINING_CREATE_SUCCESS,
  } from "./TrainingConstants";
import { getAllTrainingAction, getAllTrainingCreateAction } from "./TrainingActions";
import ListTraining from "../listComponent/ListTraining";
import TrainingForm from "./TrainingForm";
import TrainingTableCollapse from "./TrainingTableCollapse";
import ConfirmDialog from "../../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "TrainingTitle", label: "Training Title" },
  { id: "TrainingType", label: "Training Type" },
  { id: "FromDate", label: "FromDate" },
  { id: "ToDate", label: "ToDate" },
  { id: "Venue", label: "Venue" },
  { id: "Actions", label: "Actions", disableSorting: true },
];
const Training = () => {
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

  const { getAllTraining, error } = useSelector(
    (state) => state.getAllTraining
  );
  const { getAllTrainingCreate, error: getAllTrainingCreateError } = useSelector(
    (state) => state.getAllTrainingCreate
  );
  const { createSingleTraining, error: createSingleTrainingError} = useSelector(
    (state) => state.createSingleTraining
  );

  const { trainingCreate, error: trainingCreateError} = useSelector(
    (state) => state.trainingCreate
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_TRAINING_RESET });
  }

  if (trainingCreate) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({type: TRAINING_CREATE_SUCCESS});
    dispatch({ type: TRAINING_CREATE_RESET });
  }

  if (trainingCreateError) {
    setNotify({
      isOpen: true,
      message: trainingCreateError,
      type: "error",
    });
    dispatch({ type: TRAINING_CREATE_RESET });
  }

  if (getAllTrainingCreateError) {
    setNotify({
      isOpen: true,
      message: getAllTrainingCreateError,
      type: "error",
    });
    dispatch({ type: GET_ALL_TRAINING_CREATE_RESET });
    setOpenPopup(false);
  }
  if (createSingleTraining) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({type: CREATE_SINGLE_TRAINING_SUCCESS})
    dispatch({ type: CREATE_SINGLE_TRAINING_RESET });
    setOpenPopup(false);
  }
  if(createSingleTrainingError){
    setNotify({
      isOpen: true,
      message: createSingleTrainingError,
      type : "error",
    });
    dispatch ({type: CREATE_SINGLE_TRAINING_RESET});
  }

  const updateCollegeHandler = (id) => {
    dispatch(getAllTrainingCreateAction());
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
    // dispatch({ type: GET_ALL_TRAINING_CREATE_RESET });
    dispatch(getAllTrainingCreateAction());
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllTraining) {
      dispatch(getAllTrainingAction());
    }
    if (getAllTraining) {
      setTableData(getAllTraining.dbModelLst);
    }
  }, [dispatch, getAllTraining]);

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);
  
  return (
    <CustomContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={addHandler}
      >
        Add Training{" "}
      </Button>
      {getAllTraining && (
        <ListTraining list={getAllTraining && getAllTraining.staffSummary} />
      )}
      <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <TrainingTableCollapse
                item={item}createSingleTraining
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
        title="Training New Form"
      >
        {" "}
        <TrainingForm
          trainingForm={getAllTrainingCreate && getAllTrainingCreate}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </CustomContainer>
  );
};

export default Training;
