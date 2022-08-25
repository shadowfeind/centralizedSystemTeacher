import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import Popup from "../../components/Popup";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import useCustomTable from "../../customHooks/useCustomTable";
import {
  DELETE_LEAVE_REQUESTS_RESET,
  DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  GET_ALL_LEAVE_REQUESTS_RESET,
  GET_LIST_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_RESET,
} from "./LeaveRequestConstants";
import {
  downloadLeaveRequestAction,
  getListLeaveRequestAction,
  getSingleDeleteLeaveRequestAction,
  getSingleEditLeaveRequestAction,
} from "./LeaveRequestActions";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveRequestDeleteForm from "./LeaveRequestDeleteForm";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
  table: {
    margin: "10px 0",
    "& thead th": {
      fontWeight: "600",
      color: "#253053",
      backgroundColor: "#f7f7f7",
      fontSize: "12px",
      padding: "0.7vw",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const tableHeader = [
  { id: "recieverName", label: "Leave Request To" },
  { id: "leaveDescription", label: "Leave Description" },
  { id: "fromDate_toDate", label: "FromDate to ToDate" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const LeaveRequest = () => {
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
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const { TblHead, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, tableHeader, filterFn);

  const dispatch = useDispatch();
  const classes = useStyles();

  const { allLeaveRequest, error, loading } = useSelector(
    (state) => state.getAllLeaveRequest
  );

  const { singleCreateLeaveRequest, error: singleCreateLeaveRequestError } =
    useSelector((state) => state.getSingleCreateLeaveRequest);

  const { singleDeleteLeaveRequest, error: singleDeleteLeaveRequestError } =
    useSelector((state) => state.getSingleDeleteLeaveRequest);

  const { success: deleteLeaveRequestSuccess, error: deleteLeaveRequestError } =
    useSelector((state) => state.deleteLeaveRequest);

  const { singleEditLeaveRequest, error: singleEditLeaveRequestError } =
    useSelector((state) => state.getSingleEditLeaveRequest);

  // const { postLeaveRequestSuccess, error: postLeaveRequestError } =
  // useSelector((state) => state.postLeaveRequest);

  const { success: putLeaveRequestSuccess, error: putLeaveRequestError } =
    useSelector((state) => state.putLeaveRequest);

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );

  const {
    // success: downloadDocSuccess,
    // file: downloadFile,
    error: downloadDocError,
  } = useSelector((state) => state.downloadLeaveRequest);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_LEAVE_REQUESTS_RESET });
  }

  if (downloadDocError) {
    setNotify({
      isOpen: true,
      message: downloadDocError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_DOC_LEAVE_REQUESTS_RESET });
  }

  if (singleCreateLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleCreateLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: putLeaveRequestError,
      type: "error",
    });
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }

  if (putLeaveRequestSuccess) {
    dispatch(getListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Leave Request Edited Succesfully",
      type: "success",
    });
    setOpenPopUp(false);
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }

  if (deleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: deleteLeaveRequestError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_LEAVE_REQUESTS_RESET });
  }

  if (singleDeleteLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleDeleteLeaveRequestError,
      type: "error",
    });
    setOpenDeletePopup(false);
    dispatch({ type: GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET });
  }

  if (deleteLeaveRequestSuccess) {
    dispatch(getListLeaveRequestAction());
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "success",
    });
    setOpenDeletePopup(false);
    dispatch({ type: DELETE_LEAVE_REQUESTS_RESET });
  }

  if (singleEditLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  }

  if (listLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: listLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_RESET });
  }

  useEffect(() => {
    if (listLeaveRequest) {
      setTableData(listLeaveRequest.dbModelLst);
    }
  }, [dispatch, listLeaveRequest]);

  useEffect(() => {
    dispatch(getListLeaveRequestAction());
  }, []);

  const updateCollegeHandler = (id) => {
    dispatch(getSingleEditLeaveRequestAction(id));
    setOpenPopUp(true);
  };

  const deleteLeaveHandler = (id) => {
    dispatch(getSingleDeleteLeaveRequestAction(id));
    setOpenDeletePopup(true);
  };

  const downloadHandler = (id) => {
    dispatch(downloadLeaveRequestAction(id));
  };

  return (
    <>
      <Table className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((s) => (
            <StyledTableRow key={s.id}>
              <StyledTableCell component="th" scope="row">
                {s.FirsName} {s.MiddleName} {s.LastName}
              </StyledTableCell>
              <StyledTableCell align="left">
                {s.LeaveDecription?.slice(0, 20)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {s.FromDate?.slice(0, 10)} /<div>{s.ToDate?.slice(0, 10)}</div>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={
                  s.Status === "PENDING"
                    ? { color: "blue" }
                    : s.Status === "APPROVED"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {s.Status}
              </StyledTableCell>
              <StyledTableCell>
                {s.Status !== "APPROVED" && s.Status !== "CANCELED" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => updateCollegeHandler(s.IDLeaveRequest)}
                  >
                    <EditIcon style={{ fontSize: 12 }} />
                  </Button>
                )}{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => deleteLeaveHandler(s.IDLeaveRequest)}
                >
                  <DeleteIcon style={{ fontSize: 12 }} />
                </Button>{" "}
                {s.DocumentName !== null && (
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={() => downloadHandler(s.IDLeaveRequest)}
                  >
                    <CloudDownloadIcon style={{ fontSize: 12 }} />
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />
      <Popup
        openPopup={openPopUp}
        setOpenPopup={setOpenPopUp}
        title="Leave Request Form"
      >
        <LeaveRequestForm
          leaveRequestEdit={singleEditLeaveRequest && singleEditLeaveRequest}
          setOpenPopUp={setOpenPopUp}
        />
      </Popup>
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title="Leave Request Delete Form"
      >
        <LeaveRequestDeleteForm
          // leaveRequestEdit={
          //   singleEditLeaveRequest && singleEditLeaveRequest
          // }
          leaveRequestDelete={
            singleDeleteLeaveRequest && singleDeleteLeaveRequest
          }
          setOpenPopup={setOpenDeletePopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default LeaveRequest;
