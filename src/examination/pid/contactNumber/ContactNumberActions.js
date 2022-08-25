import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_CONTACTNUMBER_FAIL,
  GET_ALL_CONTACTNUMBER_REQUEST,
  GET_ALL_CONTACTNUMBER_SUCCESS,
  GET_SINGLE_CONTACTNUMBER_FAIL,
  GET_SINGLE_CONTACTNUMBER_REQUEST,
  GET_SINGLE_CONTACTNUMBER_SUCCESS,
  UPDATE_SINGLE_CONTACTNUMBER_FAIL,
  UPDATE_SINGLE_CONTACTNUMBER_REQUEST,
  UPDATE_SINGLE_CONTACTNUMBER_SUCCESS,
} from "./ContactNumberConstants";

export const getAllContactNumberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CONTACTNUMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_ContactNumber/GetAllPIDContactNumber`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_CONTACTNUMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CONTACTNUMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleContactNumberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CONTACTNUMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleEditContactNo`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_CONTACTNUMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CONTACTNUMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleContactNumberAction =
  (contactNumber) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_CONTACTNUMBER_REQUEST });

      const jsonData = JSON.stringify({ dbModel: contactNumber });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/PID_ContactNumber/Put`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: UPDATE_SINGLE_CONTACTNUMBER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_CONTACTNUMBER_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
