import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_GUARDIAN_FAIL,
  GET_ALL_GUARDIAN_REQUEST,
  GET_ALL_GUARDIAN_SUCCESS,
  GET_SINGLE_GUARDIAN_FAIL,
  GET_SINGLE_GUARDIAN_REQUEST,
  GET_SINGLE_GUARDIAN_SUCCESS,
  UPDATE_SINGLE_GUARDIAN_FAIL,
  UPDATE_SINGLE_GUARDIAN_REQUEST,
  UPDATE_SINGLE_GUARDIAN_SUCCESS,
} from "./GuardianConstants";

export const getAllGuardianAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_GUARDIAN_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Guardian/GetAllPIDGuardian`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_GUARDIAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_GUARDIAN_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleGuardianAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_GUARDIAN_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSinglePIDGUardianForEdit`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_GUARDIAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_GUARDIAN_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleGuardianAction = (guardian) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_GUARDIAN_REQUEST });

    const jsonData = JSON.stringify({ dbModel: guardian });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_Guardian/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: UPDATE_SINGLE_GUARDIAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_GUARDIAN_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
