import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "2vw 0.5vw",
    padding: "24px 0",

    "& thead th": {
      fontWeight: "600",
      color: "#272c34",
      backgroundColor: "#e3e1f5",
      fontSize: "12px",
      padding: "0.7vw",
    },
    "& tbody td": {
      fontWeight: "300",
      fontSize: "12px",
      padding: "0.7vw",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const useCustomTable = (tableData, tableHeader, filterFn) => {
  const classes = useStyles();
  const pages = [10, 15, 25, 50, 100];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableContainer = ({ children }) => (
    <Table className={classes.table}>{children}</Table>
  );

  const handleSortRequest = (id) => {
    const isAscending = orderBy === id && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(id);
  };
  const TblHead = () => (
    <TableHead>
      <TableRow>
        {tableHeader.map((item) => (
          <TableCell
            key={item.id}
            sortDirection={orderBy === item.id ? order : "asc"}
          >
            {item.disableSorting ? (
              item.label
            ) : (
              <TableSortLabel
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : "asc"}
                onClick={() => handleSortRequest(item.id)}
              >
                {item.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      page={page}
      count={tableData.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  const tableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const tableDataAfterPagingAndSorting = () => {
    return tableSort(
      filterFn.fn(tableData),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  };
};
export default useCustomTable;
