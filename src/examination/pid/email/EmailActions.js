import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_EMAIL_FAIL,
  GET_ALL_EMAIL_REQUEST,
  GET_ALL_EMAIL_SUCCESS,
  GET_SINGLE_EMAIL_FAIL,
  GET_SINGLE_EMAIL_REQUEST,
  GET_SINGLE_EMAIL_SUCCESS,
  UPDATE_SINGLE_EMAIL_FAIL,
  UPDATE_SINGLE_EMAIL_REQUEST,
  UPDATE_SINGLE_EMAIL_SUCCESS,
} from "./EmailConstants";

export const getAllEmailAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMAIL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Email/GetAllPIDEmail`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMAIL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEmailAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMAIL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSinglePIDEmailForEdit`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMAIL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleEmailAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_EMAIL_REQUEST });

    const jsonData = JSON.stringify({ dbModel: email });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_Email/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: UPDATE_SINGLE_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_EMAIL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
