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
  CREATE_SINGLE_SKILL_RESET,
  CREATE_SINGLE_SKILL_SUCCESS,
  GET_ALL_SKILL_CREATE_RESET,
  GET_ALL_SKILL_RESET,
  GET_SINGLE_SKILL_RESET,
  SKILL_CREATE_RESET,
  SKILL_CREATE_SUCCESS,
} from "./SkillConstants";
import { getAllSkillAction, getAllSkillCreateAction } from "./SkillActions";
import ListSkills from "../listComponent/ListSkills";
import SkillForm from "./SkillForm";
import SkillTableCollapse from "./SkillTablecollapse";
import { getAllSkillCreateReducer } from "./SkillReducers";
import ConfirmDialog from "../../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "Skill", label: "Skill" },
  { id: "SkillProficiency", label: "Skill Proficiency" },
  { id: "Actions", label: "Actions", disableSorting: true },
];

const Skill = () => {
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

  const { getAllSkill, error } = useSelector((state) => state.getAllSkill);
  const { getAllSkillCreate, error: getAllSkillCreateError } = useSelector(
    (state) => state.getAllSkillCreate
  );
  const { success: createSingleSkillSuccess, error: createSingleSkillError } =
    useSelector((state) => state.createSingleSkill);
  const { skillCreate, error: skillCreateError } = useSelector(
      (state) => state.skillCreate
    );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SKILL_RESET });
  }
  if (getAllSkillCreateError) {
    setNotify({
      isOpen: true,
      message: getAllSkillCreateError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SKILL_CREATE_RESET });
    setOpenPopup(false);
  }
  if (skillCreate) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({type: SKILL_CREATE_SUCCESS});
    dispatch({ type: SKILL_CREATE_RESET });
  }

  if (skillCreateError) {
    setNotify({
      isOpen: true,
      message: skillCreateError,
      type: "error",
    });
    dispatch({ type: SKILL_CREATE_RESET });
  }

  if (createSingleSkillSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: CREATE_SINGLE_SKILL_SUCCESS });
    dispatch({ type: CREATE_SINGLE_SKILL_RESET });
    setOpenPopup(false);
  }
  if (createSingleSkillError) {
    setNotify({
      isOpen: true,
      message: createSingleSkillError,
      type: "error",
    });
    dispatch({ type: CREATE_SINGLE_SKILL_RESET });
    setOpenPopup(false);
  }

  const updateCollegeHandler = (id) => {
    dispatch(getAllSkillCreateAction());
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
    // dispatch({ type: GET_ALL_SKILL_CREATE_RESET });
    dispatch(getAllSkillCreateAction());
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllSkill) {
      dispatch(getAllSkillAction());
    }
      if (getAllSkill) {
        setTableData(getAllSkill.dbModelLst);
      }
  }, [dispatch, getAllSkill]);


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
        Add Skill{" "}
      </Button>
      {getAllSkill && (
        <ListSkills list={getAllSkill && getAllSkill.staffSummary} />
      )}
      <TableContainer className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((item) => (
            <SkillTableCollapse
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
        title="Skill New Form"
      >
        {" "}
        <SkillForm
          skillForm={getAllSkillCreate && getAllSkillCreate}
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

export default Skill;
