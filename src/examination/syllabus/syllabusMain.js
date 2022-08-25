import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const SyllabusPg = lazy(() => import("./syllabusPg/Syllabus"));
const SyllabusNursery = lazy(() =>
  import("./syllabusNursery/SyllabusNursery")
);
const SyllabusLkg = lazy(() => import("./syllabusLkg/SyllabusLkg"));
const SyllabusUkg = lazy(() => import("./syllabusUkg/SyllabusUkg"));
const SyllabusOne = lazy(() => import("./syllabusOne/SyllabusOne.js"));
const SyllabusTwo = lazy(() => import("./syllabusTwo/SyllabusTwo"));
const SyllabusThree = lazy(() => import("./syllabusThree/SyllabusThree"));
const SyllabusFour = lazy(() => import("./syllabusFour/SyllabusFour"));
const SyllabusFive = lazy(() => import("./syllabusFive/SyllabusFive"));
const SyllabusSix = lazy(() => import("./syllabusSix/SyllabusSix"));
const SyllabusSeven = lazy(() => import("./syllabusSeven/SyllabusSeven.js"));
const SyllabusEight = lazy(() => import("./syllabusEight/SyllabusEight"));
const SyllabusNine = lazy(() => import("./syllabusNine/SyllabusNine"));
const SyllabusTen = lazy(() => import("./syllabusTen/SyllabusTen"));

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

const Syllabus = () => {
  const dispatch = useDispatch();
  const Syllabuses = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/syllabus" });
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
          TabIndicatorProps={{ SyllabusName: Syllabuses.indicator }}
        >
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="PG"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Nursery"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="LKG"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="UKG"
            {...a11yProps(3)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="One"
            {...a11yProps(4)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Two"
            {...a11yProps(5)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Three"
            {...a11yProps(6)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Four"
            {...a11yProps(7)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Five"
            {...a11yProps(8)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Six"
            {...a11yProps(9)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Seven"
            {...a11yProps(10)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Eight"
            {...a11yProps(11)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Nine"
            {...a11yProps(12)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Ten"
            {...a11yProps(13)}
          />
        </Tabs>
      </AppBar>
      <Suspense fallback={<div></div>}>
        <TabPanel value={value} index={0}>
          <SyllabusPg />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SyllabusNursery />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SyllabusLkg />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SyllabusUkg />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SyllabusOne />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <SyllabusTwo />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <SyllabusThree />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <SyllabusFour />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <SyllabusFive />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <SyllabusSix />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <SyllabusSeven />
        </TabPanel>
        <TabPanel value={value} index={11}>
          <SyllabusEight />
        </TabPanel>
        <TabPanel value={value} index={12}>
          <SyllabusNine />
        </TabPanel>
        <TabPanel value={value} index={13}>
          <SyllabusTen />
        </TabPanel>
      </Suspense>
    </div>
  );
};

export default Syllabus;
