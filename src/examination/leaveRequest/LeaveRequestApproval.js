import React, { useEffect, useState } from "react";
import {
  withStyles,
  makeStyles,
  Button,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import EditIcon from "@material-ui/icons/Edit";
import Popup from "../../components/Popup";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {
  DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  GET_LIST_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_RESET,
} from "./LeaveRequestConstants";
import {
  downloadLeaveRequestAction,
  getListLeaveRequestAction,
  getSingleEditSentLeaveRequestAction,
} from "./LeaveRequestActions";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveRequestSentForm from "./LeaveRequestSentForm";

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
  { id: "recieverName", label: "Leave Request By" },
  { id: "leaveDescription", label: "Leave Description" },
  { id: "fromDate_toDate", label: "FromDate to ToDate" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const LeaveRequestApproval = () => {
  const [approvalPopUp, setApprovalPopUp] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
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
  const { TblHead, TblPagination, tableDataAfterPagingAndSorting } =
    useCustomTable(tableData, tableHeader, filterFn);

  const classes = useStyles();
  const dispatch = useDispatch();

  const dateInPast = (firstDate, secondDate) => {
    if (
      new Date(firstDate).setHours(0, 0, 0, 0) <=
      new Date(secondDate).setHours(0, 0, 0, 0)
    ) {
      return true;
    }

    return false;
  };

  const { listLeaveRequest, listLeaveRequestError } = useSelector(
    (state) => state.getListLeaveRequest
  );

  const { singleEditSentLeaveRequest, error: singleEditSentLeaveRequestError } =
    useSelector((state) => state.getSingleEditSentLeaveRequest);

  const { success: putLeaveRequestSuccess, error: putLeaveRequestError } =
    useSelector((state) => state.putLeaveRequest);

  const {
    //   success: downloadDocSuccess,
    //   file: downloadFile,
    error: downloadDocError,
  } = useSelector((state) => state.downloadLeaveRequest);

  if (singleEditSentLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: singleEditSentLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  }

  if (downloadDocError) {
    setNotify({
      isOpen: true,
      message: downloadDocError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_DOC_LEAVE_REQUESTS_RESET });
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
      message: "Leave Approval Edited Succesfully",
      type: "success",
    });
    setApprovalPopUp(false);
    dispatch({ type: PUT_LEAVE_REQUESTS_RESET });
  }

  if (listLeaveRequestError) {
    setNotify({
      isOpen: true,
      message: listLeaveRequestError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleEditSentLeaveRequestAction(id));
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET });
    setApprovalPopUp(true);
  };

  useEffect(() => {
    if (listLeaveRequest) {
      setTableData(listLeaveRequest.dbModelReceiverLst);
    }
  }, [dispatch, listLeaveRequest]);

  useEffect(() => {
    dispatch(getListLeaveRequestAction());
  }, []);

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
              <StyledTableCell align="left">
                {dateInPast(s.ToDate?.slice(0, 10), Date.now() + 1) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <LockIcon style={{ fontSize: 12 }} />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => updateCollegeHandler(s.IDLeaveRequest)}
                  >
                    <EditIcon style={{ fontSize: 12 }} />
                  </Button>
                )}{" "}
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
        openPopup={approvalPopUp}
        setOpenPopup={setApprovalPopUp}
        title="Leave Request Form"
      >
        <LeaveRequestSentForm
          leaveRequestEditApproval={
            singleEditSentLeaveRequest && singleEditSentLeaveRequest
          }
          setApprovalPopUp={setApprovalPopUp}
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

export default LeaveRequestApproval;
