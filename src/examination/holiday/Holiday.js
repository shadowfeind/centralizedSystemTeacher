import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Card, TableBody } from "@material-ui/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { months } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllHolidayAction } from "./HolidayActions";
import { GET_ALL_HOLIDAY_RESET } from "./HolidayConstants";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCustomTable from "../../customHooks/useCustomTable";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import HolidayTableCollapse from "./HolidayTableCollapse";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  cardStyle: {
    margin: "20px",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
}));

const tableHeader = [
  { id: "HolidayName", label: "Event Name" },
  { id: "Description", label: "Event Description" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "IsActive", label: "IsActive" },
];

const localizer = momentLocalizer(moment);

const Holiday = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const {
    holiday,
    error,
    loading,
    loading: table,
  } = useSelector((state) => state.holiday);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_HOLIDAY_RESET });
  }

  useEffect(() => {
    if (holiday) {
      setTableData(holiday.att_HRHolidayModelLst);
    }
  }, [holiday]);

  // useEffect(() => {
  //   if (!holiday) {
  //     dispatch(getAllHolidayAction());
  //   }
  // }, [dispatch, holiday]);
  useEffect(() => {
    dispatch(getAllHolidayAction());
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{
              margin: "20px",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "5px 5px 5px #d4d4d4",
            }}
          >
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <Calendar
                  localizer={localizer}
                  events={holiday && holiday.att_HRHolidayModelLst}
                  startAccessor="FromDate"
                  endAccessor="ToDate"
                  titleAccessor="HolidayName"
                  views={months}
                  style={{ height: "60vh" }}
                />
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.cardStyle}>
            <h4 style={{ textAlign: "center" }}>All Events</h4>
            {table ? (
              <LoadingComp />
            ) : (
              <>
                <TableContainer className={classes.table}>
                  <TblHead />

                  <TableBody>
                    {tableDataAfterPagingAndSorting().map((item) => (
                      <HolidayTableCollapse item={item} key={item.$id} />
                    ))}
                  </TableBody>
                </TableContainer>
                <TblPagination />
              </>
            )}
          </Card>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Holiday;
