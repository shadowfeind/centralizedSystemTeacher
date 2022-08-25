import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const ExamMarkApproval = lazy(() =>
  import("../examMarkApprovalTeacher/examMarkApproval/ExamMarkApproval")
);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    indicator: {
      height: "50px",
      opacity: 0.5,
    },
  }));

  const ExamMarkApprovalTeacher = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    useEffect(() => {
      dispatch({ type: "GET_LINK", payload: "/examMarkApproval" });
    }, [dispatch]);
  
    return (
      <div>
        <AppBar position="static" style={{ background: "#253053" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            TabIndicatorProps={{ className: classes.indicator }}
          >
            <Tab
              style={{ fontSize: "11px", color: "#fff" }}
              label="Exam Mark Entry"
              {...a11yProps(0)}
            />
          </Tabs>
        </AppBar>
        <Suspense fallback={<div></div>}>
          <TabPanel value={value} index={0}>
            <ExamMarkApproval />
          </TabPanel>
          </Suspense>
      </div>
  )
  };
  
  export default ExamMarkApprovalTeacher;