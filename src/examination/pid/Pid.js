import React, { Suspense, lazy } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

// const PersonalInformation = lazy(() =>
//   import("./personalinformation/PersonalInformation")
// );
const UploadPhoto = lazy(() => import("./uploadPhoto/UploadPhoto"));
// const ContactAddress = lazy(() => import("./contactAddress/ContactAddress"));
// const ContactNumber = lazy(() => import("./contactNumber/ContactNumber"));
// const Email = lazy(() => import("./email/Email"));
// const Guardian = lazy(() => import("./gurdian/Guardian"));
// const FamilyMember = lazy(() => import("./familyMember/FamilyMember"));
// const Education = lazy(() => import("./education/Education"));
// const JobHistory = lazy(() => import("./jobHistory/JobHistory"));
// const Hobby = lazy(() => import("./hobby/Hobby"));
// const Training = lazy(() => import("./training/Training"));
// const Skill = lazy(() => import("./skill/Skill"));

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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  indicator: {
    height: "50px",
    opacity: 0.5,
  },
}));

const Pid = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <div>
      {/* <AppBar position="static" style={{ background: "#253053" }}>
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
            label="Personal Information"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Upload Photo"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Contact Address"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Contact Number"
            {...a11yProps(3)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Email"
            {...a11yProps(4)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Guardian"
            {...a11yProps(5)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Family Member"
            {...a11yProps(6)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Education"
            {...a11yProps(7)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Job History"
            {...a11yProps(8)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Hobby"
            {...a11yProps(9)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Training"
            {...a11yProps(10)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Skills"
            {...a11yProps(11)}
          />
        </Tabs>
      </AppBar> */}
      <Suspense fallback={<div></div>}>
        {/* <TabPanel value={value} index={0}> */}
        {/* <PersonalInformation /> */}
        {/* </TabPanel> */}
        {/* <TabPanel value={value} index={1}> */}
        <UploadPhoto />
        {/* </TabPanel>
        <TabPanel value={value} index={2}>
          <ContactAddress />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ContactNumber />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Email />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Guardian />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <FamilyMember />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <Education />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <JobHistory />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <Hobby />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <Training />
        </TabPanel>
        <TabPanel value={value} index={11}>
          <Skill />
        </TabPanel> */}
      </Suspense>
    </div>
  );
};

export default Pid;
