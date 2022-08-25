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
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getAllFamilyMemberAction, getAllFamilyMemberCreateAction } from "./FamilyMemberActions";
import {
  CREATE_SINGLE_FAMILYMEMBER_RESET,
  CREATE_SINGLE_FAMILYMEMBER_SUCCESS,
  FAMILYMEMBER_CREATE_RESET,
  FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_CREATE_RESET,
  GET_ALL_FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_RESET,
  GET_SINGLE_FAMILYMEMBER_RESET,
} from "./FamilyMemberConstants";
import ListFamilyMember from "../listComponent/ListFamilyMember";
import FamilyMemberForm from "./FamilyMemberForm";
import FamilyMemberTableCollapse from "./FamilyMemberTableCollapse";
import { getAllFamilyMemberCreateReducer } from "./FamilyMemberReducers";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "FullName", label: "Full Name" },
  { id: "Relationship", label: "Relationship" },
  { id: "Nationality", label: "Nationality" },
  { id: "Current_Address", label: "Current Address" },
  { id: "Mobile_no", label: "Mobile No." },
  { id: "Status", label: "Status" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

const FamilyMember = () => {
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

  const { getAllFamilyMember, error } = useSelector(
    (state) => state.getAllFamilyMember
  );
  const { familyMemberCreate, error: familyMemberCreateError } = useSelector(
    (state) => state.familyMemberCreate
  );
  const { createSingleFamilyMember, error: createSingleFamilyMemberError } = useSelector((state)=> state.createSingleFamilyMember)
  const { getAllFamilyMemberCreate, error: getAllFamilyMemberCreateError } = useSelector(
    (state) => state.getAllFamilyMemberCreate
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_FAMILYMEMBER_RESET });
  }
  
  if (getAllFamilyMemberCreateError) {
    setNotify({
      isOpen: true,
      message: getAllFamilyMemberCreateError,
      type: "error",
    });
    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_RESET });
  }

  if (familyMemberCreate) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({type: FAMILYMEMBER_CREATE_SUCCESS});
    dispatch({ type: FAMILYMEMBER_CREATE_RESET });
  }
  if (familyMemberCreateError) {
    setNotify({
      isOpen: true,
      message: familyMemberCreateError,
      type: "error",
    });
    dispatch({ type: FAMILYMEMBER_CREATE_RESET });
  }

  if (createSingleFamilyMember) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({type: CREATE_SINGLE_FAMILYMEMBER_SUCCESS})
    dispatch({ type: CREATE_SINGLE_FAMILYMEMBER_RESET });
    setOpenPopup(false);
  }
  if(createSingleFamilyMemberError){
    setNotify({
      isOpen: true,
      message: error,
      type : "error",
    });
    dispatch ({type: CREATE_SINGLE_FAMILYMEMBER_RESET});
  }

  const updateCollegeHandler = (id) => {
    dispatch(getAllFamilyMemberCreateReducer(id));
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
    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_RESET });
    dispatch(getAllFamilyMemberCreateAction())
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllFamilyMember) {
      dispatch(getAllFamilyMemberAction());
    }
    if (getAllFamilyMember) {
      setTableData(getAllFamilyMember.dbModelLst);
    }
  }, [dispatch, getAllFamilyMember]);
  useEffect(() => {
    dispatch(getAllFamilyMemberCreateAction());
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
        Add Family Member{" "}
      </Button>
      {getAllFamilyMember && (
        <ListFamilyMember
          list={getAllFamilyMember && getAllFamilyMember.staffSummary}
        />
      )}
 <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <FamilyMemberTableCollapse
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
        title="Family Member New Form"
      >
        {" "}
        <FamilyMemberForm
          familyMember={getAllFamilyMemberCreate && getAllFamilyMemberCreate}
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

export default FamilyMember;
