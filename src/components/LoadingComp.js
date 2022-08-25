import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    height: "10vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

const LoadingComp = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      {/* <CircleLoader />
      <ClimbingBoxLoader />
      <BounceLoader />
      <BeatLoader />
      <BarLoader width={100} />
      <ClipLoader /> */}
      <CircularProgress color="primary" style={{ fontSize: 70 }} />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
};

export default LoadingComp;
