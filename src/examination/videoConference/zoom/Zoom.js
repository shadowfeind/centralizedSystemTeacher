import React, { useState, useEffect } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import CustomContainer from "../../../components/CustomContainer";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { ZOOM_API_KEY, ZOOM_API_SCERET, ZOOM_JWT } from "../../../constants";
import * as base64JS from "js-base64";
import * as hmacSha256 from "crypto-js/hmac-sha256";
import * as encBase64 from "crypto-js/enc-base64";
// import { ZoomMtg } from "@zoomus/websdk";

const Zoom = () => {
  const [zoomData, setZoomData] = useState({
    sdkKey: ZOOM_API_KEY,
    signature: "",
    meetingNumber: "",
    password: "",
    userName: "",
  });
  const [errors, setErrors] = useState({});

  const client = ZoomMtgEmbedded.createClient();
  let meetingSDKElement = document.getElementById("meetingSDKElement");

  const validate = (fieldValues = zoomData) => {
    let temp = { ...errors };
    temp.meetingNumber = !fieldValues.meetingNumber
      ? "This feild is required"
      : !fieldValues.meetingNumber.trim()
      ? "This feild is required"
      : "";

    temp.password = !fieldValues.password
      ? "This feild is required"
      : !fieldValues.password.trim()
      ? "This feild is required"
      : "";

    temp.userName = !fieldValues.userName
      ? "This feild is required"
      : !fieldValues.userName.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    let signature = "";
    // Prevent time sync issue between client signature generation and zoom
    const ts = new Date().getTime() - 30000;
    try {
      const msg = base64JS.Base64.encode(apiKey + meetingNumber + ts + role);
      const hash = hmacSha256.default(msg, apiSecret);
      signature = base64JS.Base64.encodeURI(
        `${apiKey}.${meetingNumber}.${ts}.${role}.${encBase64.stringify(hash)}`
      );
    } catch (e) {
      console.log("error");
    }
    return signature;
  }

  // useEffect(() => {}, []);

  const handleClick = async () => {
    client.init({ zoomAppRoot: meetingSDKElement, language: "en-US" });
    if (validate()) {
      const data = generateSignature(
        ZOOM_API_KEY,
        ZOOM_API_SCERET,
        zoomData.meetingNumber,
        0
      );
      console.log(data);
      client.join({
        apiKey: zoomData.sdkKey,
        signature: data,
        meetingNumber: zoomData.meetingNumber,
        password: zoomData.password,
        userName: zoomData.userName,
      });
    }
  };

  const handleCreate = async () => {
    const data = generateSignature(
      ZOOM_API_KEY,
      ZOOM_API_SCERET,
      zoomData.meetingNumber,
      0
    );
    debugger;
    client.init({
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      leaveUrl: "https://school.vidyacube.com/",
      isSupportAV: true,
      debug: true,
    });
    client.join({
      apiKey: zoomData.sdkKey,
      signature: data,
      meetingNumber: zoomData.meetingNumber,
      password: zoomData.password,
      userName: zoomData.userName,
    });
    debugger;
  };

  return (
    <>
      <CustomContainer>
        <Grid container>
          <Grid item xs={3}>
            <InputControl
              name="meetingNumber"
              label="Meeting Number"
              onChange={(e) =>
                setZoomData((prev) => {
                  return { ...prev, meetingNumber: e.target.value };
                })
              }
              value={zoomData.meetingNumber}
              errors={errors.meetingNumber}
            />
          </Grid>
          <Grid item xs={3}>
            <InputControl
              name="password"
              label="Meeting Password"
              onChange={(e) =>
                setZoomData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              value={zoomData.password}
              errors={errors.password}
            />
          </Grid>
          <Grid item xs={3}>
            <InputControl
              name="userName"
              label="Alias"
              onChange={(e) =>
                setZoomData((prev) => {
                  return { ...prev, userName: e.target.value };
                })
              }
              value={zoomData.userName}
              errors={errors.userName}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px 0 0 10px" }}
              onClick={handleClick}
            >
              Join Meeting
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px 0 0 10px" }}
              onClick={handleCreate}
            >
              Create Meeting
            </Button> */}
          </Grid>
        </Grid>
        <div id="meetingSDKElement" height="400px" width="400px"></div>
        {/* <div id="zmmtg-root"></div> */}
      </CustomContainer>
    </>
  );
};

export default Zoom;
