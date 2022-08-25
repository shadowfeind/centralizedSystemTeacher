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
import { educationCreateAction, getAllEducationAction, getAllEducationCreateAction } from "./EducationActions";
import { CREATE_SINGLE_EDUCATION_RESET, CREATE_SINGLE_EDUCATION_SUCCESS, EDUCATION_CREATE_RESET, EDUCATION_CREATE_SUCCESS, GET_ALL_EDUCATION_CREATE_RESET, GET_ALL_EDUCATION_CREATE_SUCCESS, GET_ALL_EDUCATION_RESET, GET_SINGLE_EDUCATION_RESET, UPDATE_SINGLE_EDUCATION_RESET } from "./EducationConstants";
import ListEducation from "../listComponent/ListEducation";
import EducationForm from "./EducationForm";
import EducationTableCollapse from "./EducationTableCollapse";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getAllEducationCreateReducer } from "./EducationReducers";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "EducationLevel", label: "Education Level" },
  { id: "InstituteName", label: "Institute Name" },
  { id: "PassDate", label: "Pass Date" },
  { id: "ScoreIn", label: "ScoreIn" },
  { id: "Score", label: "Score" },
  { id: "MajorSpecialization", label: "Major Specialization" },
  {id:"Actions", label: "Actions", disableSorting: true}
];

const Education = () => {
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
  
      const { getAllEducation, error } = useSelector((state) => state.getAllEducation);
      const { createSingleEducation, error: createSingleEducationError} = useSelector(
        (state) => state.createSingleEducation
      );
      const { getAllEducationCreate, error: getAllEducationCreateError} = useSelector(
        (state) => state.getAllEducationCreate
      );
      const { success: educationCreateSuccess, error: educationCreateError } =
    useSelector((state) => state.educationCreate);
      // const {
      //   success: updateSingleEducationSuccess,
      //   error: updateSingleEducationError,
      // } = useSelector((state) => state.updateSingleEducation);
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_EDUCATION_RESET });
    }
    if (getAllEducationCreateError) {
      setNotify({
        isOpen: true,
        message: getAllEducationCreateError,
        type: "error",
      });
      dispatch({ type: GET_ALL_EDUCATION_CREATE_RESET });
      setOpenPopup(false);
    }
    
    if (educationCreateSuccess) {
      setNotify({
        isOpen: true,
        message: "Created Succesfully",
        type: "success",
      });
      setOpenPopup(false);
      dispatch({type: EDUCATION_CREATE_SUCCESS});
      dispatch({ type: EDUCATION_CREATE_RESET });
    }

    if (educationCreateError) {
      setNotify({
        isOpen: true,
        message: educationCreateError,
        type: "error",
      });
      dispatch({ type: EDUCATION_CREATE_RESET });
    }
    if (createSingleEducation) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type: CREATE_SINGLE_EDUCATION_SUCCESS})
      dispatch({ type: CREATE_SINGLE_EDUCATION_RESET });
      setOpenPopup(false);
    }
    if(createSingleEducationError){
      setNotify({
        isOpen: true,
        message: createSingleEducationError,
        type : "error",
      });
      dispatch ({type: CREATE_SINGLE_EDUCATION_RESET});
    }

    const updateCollegeHandler = (id) => {
      dispatch(getAllEducationCreateAction());
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
      dispatch({ type: GET_ALL_EDUCATION_CREATE_RESET });
      dispatch(getAllEducationCreateAction())
      setOpenPopup(true);
    };
    
    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllEducation) {
          dispatch(getAllEducationAction());
      }
      if (getAllEducation) {
        setTableData(getAllEducation.dbModelLst);
      }
  }, [dispatch, getAllEducation]);

  useEffect(() => {
    dispatch(getAllEducationCreateAction());
  }, []); 

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
            Add New Entry{" "}
          </Button>
      {getAllEducation && <ListEducation list={getAllEducation && getAllEducation.staffSummary}/>}
      <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <EducationTableCollapse
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
        title="Education New Form"
      > <EducationForm educatonForm={getAllEducationCreate && getAllEducationCreate} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </CustomContainer>
  );
};

export default Education;
