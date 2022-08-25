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
import { CREATE_SINGLE_HOBBY_RESET, CREATE_SINGLE_HOBBY_SUCCESS, GET_ALL_HOBBY_CREATE_RESET, GET_ALL_HOBBY_RESET, HOBBY_CREATE_RESET, HOBBY_CREATE_SUCCESS} from "./HobbyConstants";
import { getAllHobbyAction, getAllHobbyCreateAction } from "./HobbyActions";
import ListHobby from "../listComponent/ListHobby";
import HobbyForm from "./HobbyForm";
import HobbyTableCollapse from "./HobbyTableCollapse";
import ConfirmDialog from "../../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "Heading", label: "Heading" },
  { id: "HeadingType", label: "Heading Type" },
  { id: "Details", label: "Details" },
  { id: "Actions", label: "Actions", disableSorting: true},
];

const Hobby = () => {
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
  
      const { getAllHobby, error } = useSelector((state) => state.getAllHobby);
      const { getAllHobbyCreate, error: getAllHobbyCreateError} = useSelector(
        (state) => state.getAllHobbyCreate
      );
      const {createSingleHobby, error: createSingleHobbyError} = useSelector(
        (state) => state.createSingleHobby
      );
      const { success: hobbyCreateSuccess, error: hobbyCreateError } =
    useSelector((state) => state.hobbyCreate);
      if (error) {
        setNotify({
            isOpen: true,
            message: error,
            type: "error",
        });
        dispatch({ type: GET_ALL_HOBBY_RESET });
    }

    if (getAllHobbyCreateError) {
      setNotify({
        isOpen: true,
        message: getAllHobbyCreateError,
        type: "error",
      });
      dispatch({ type: GET_ALL_HOBBY_CREATE_RESET });
      setOpenPopup(false);
    }

    if (hobbyCreateSuccess) {
      setNotify({
        isOpen: true,
        message: "Created Succesfully",
        type: "success",
      });
      setOpenPopup(false);
      dispatch({type: HOBBY_CREATE_SUCCESS});
      dispatch({ type: HOBBY_CREATE_RESET });
    }

    if (hobbyCreateError) {
      setNotify({
        isOpen: true,
        message: hobbyCreateError,
        type: "error",
      });
      dispatch({ type: HOBBY_CREATE_RESET });
    }

    if (createSingleHobbyError) {
      setNotify({
        isOpen: true,
        message: createSingleHobbyError,
        type: "error",
      });
      dispatch({ type: CREATE_SINGLE_HOBBY_RESET });
      setOpenPopup(false);
    }

    if (createSingleHobby) {
      setNotify({
        isOpen: true,
        message: "Successfully Updated",
        type: "success",
      });
      dispatch({type: CREATE_SINGLE_HOBBY_SUCCESS})
      dispatch({ type: CREATE_SINGLE_HOBBY_RESET });
      setOpenPopup(false);
    }
    const updateCollegeHandler = (id) => {
      dispatch(getAllHobbyCreateAction());
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
      dispatch(getAllHobbyCreateAction())
      setOpenPopup(true);
    };

    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/" });
      if (!getAllHobby) {
          dispatch(getAllHobbyAction());
      }
      if(getAllHobby) {
        setTableData(getAllHobby.dbModelLst);
      }
  }, [dispatch, getAllHobby]);

  useEffect(() => {
    dispatch(getAllHobbyCreateAction());
  }, []); 

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
            Add Hobby{" "}
          </Button>
          {getAllHobby && <ListHobby list={getAllHobby && getAllHobby.staffSummary}/>}
          <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <HobbyTableCollapse
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
        title="Hobby New Form"
      > <HobbyForm hobbyForm={getAllHobbyCreate && getAllHobbyCreate} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
  </CustomContainer>;
};

export default Hobby;
