import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const ClassPgSchedule = lazy(() => import("./pg/ClassPgSchedule"));
const ClassNurserySchedule = lazy(() =>
  import("./nursery/ClassNurserySchedule")
);
const ClassLkgSchedule = lazy(() => import("./lkg/ClassLkgSchedule"));
const ClassUkgSchedule = lazy(() => import("./ukg/ClassUkgSchedule"));
const ClassOneSchedule = lazy(() => import("./one/ClassOneSchedule"));
const ClassTwoSchedule = lazy(() => import("./two/ClassTwoSchedule"));
const ClassThreeSchedule = lazy(() => import("./three/ClassThreeSchedule"));
const ClassFourSchedule = lazy(() => import("./four/ClassFourSchedule"));
const ClassFiveSchedule = lazy(() => import("./five/ClassFiveSchedule"));
const ClassSixSchedule = lazy(() => import("./six/ClassSixSchedule"));
const ClassSevenSchedule = lazy(() => import("./seven/ClassSevenSchedule"));
const ClassEightSchedule = lazy(() => import("./eight/ClassEightSchedule"));
const ClassNineSchedule = lazy(() => import("./nine/ClassNineSchedule"));
const ClassTenSchedule = lazy(() => import("./ten/ClassTenSchedule"));

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

const ClassSchedule = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
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
          <ClassPgSchedule />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClassNurserySchedule />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ClassLkgSchedule />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ClassUkgSchedule />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ClassOneSchedule />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ClassTwoSchedule />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <ClassThreeSchedule />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <ClassFourSchedule />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <ClassFiveSchedule />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <ClassSixSchedule />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <ClassSevenSchedule />
        </TabPanel>
        <TabPanel value={value} index={11}>
          <ClassEightSchedule />
        </TabPanel>
        <TabPanel value={value} index={12}>
          <ClassNineSchedule />
        </TabPanel>
        <TabPanel value={value} index={13}>
          <ClassTenSchedule />
        </TabPanel>
      </Suspense>
    </div>
  );
};

export default ClassSchedule;
