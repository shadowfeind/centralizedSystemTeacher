import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_TRAINING_FAIL,
  CREATE_SINGLE_TRAINING_REQUEST,
  CREATE_SINGLE_TRAINING_SUCCESS,
  GET_ALL_TRAINING_CREATE_FAIL,
  GET_ALL_TRAINING_CREATE_REQUEST,
  GET_ALL_TRAINING_CREATE_SUCCESS,
  GET_ALL_TRAINING_FAIL,
  GET_ALL_TRAINING_REQUEST,
  GET_ALL_TRAINING_SUCCESS,
  TRAINING_CREATE_FAIL,
  TRAINING_CREATE_REQUEST,
  TRAINING_CREATE_SUCCESS,
} from "./TrainingConstants";

export const getAllTrainingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRAINING_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Training/GetAllPIDTraining`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_TRAINING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TRAINING_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllTrainingCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRAINING_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDTraining`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_TRAINING_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TRAINING_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleTrainingAction = (training) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SINGLE_TRAINING_REQUEST });

    const jsonData = JSON.stringify({ dbModel: training });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_Training/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: CREATE_SINGLE_TRAINING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SINGLE_TRAINING_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const trainingCreateAction = (trainingCreate) => async (dispatch) => {
  try {
    dispatch({ type: TRAINING_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: trainingCreate });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/PID_Training/Post`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: TRAINING_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRAINING_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
