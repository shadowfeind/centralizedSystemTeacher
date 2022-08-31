import React from "react";
import { DialogActions } from "@material-ui/core";

const DialogFooter = ({ children }) => {
  return (
    <DialogActions style={{ paddingBottom: "14px" }}>{children}</DialogActions>
  );
};

export default DialogFooter;
