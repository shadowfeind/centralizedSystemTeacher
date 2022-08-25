import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_JOBHISTORY_FAIL,
  CREATE_SINGLE_JOBHISTORY_REQUEST,
  CREATE_SINGLE_JOBHISTORY_SUCCESS,
  GET_ALL_JOBHISTORY_CREATE_FAIL,
  GET_ALL_JOBHISTORY_CREATE_REQUEST,
  GET_ALL_JOBHISTORY_CREATE_SUCCESS,
  GET_ALL_JOBHISTORY_FAIL,
  GET_ALL_JOBHISTORY_REQUEST,
  GET_ALL_JOBHISTORY_SUCCESS,
  JOBHISTORY_CREATE_FAIL,
  JOBHISTORY_CREATE_REQUEST,
  JOBHISTORY_CREATE_SUCCESS,
} from "./JobHistoryConstants";

export const getAllJobHistoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_JOBHISTORY_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_JobHistory/GetAllPIDJobHistiory`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_JOBHISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_JOBHISTORY_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllJobHistoryCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_JOBHISTORY_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDJobHistory`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_JOBHISTORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_JOBHISTORY_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleJobHistoryAction =
  (jobHistory) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_JOBHISTORY_REQUEST });

      const jsonData = JSON.stringify({ dbModel: jobHistory });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/PID_JobHistory/Put`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: CREATE_SINGLE_JOBHISTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_SINGLE_JOBHISTORY_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const jobHistoryCreateAction =
  (jobHistoryCreate) => async (dispatch) => {
    try {
      dispatch({ type: JOBHISTORY_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: jobHistoryCreate });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/PID_JobHistory/Post`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: JOBHISTORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: JOBHISTORY_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
