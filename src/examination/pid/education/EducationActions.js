import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_EDUCATION_FAIL,
  CREATE_SINGLE_EDUCATION_REQUEST,
  CREATE_SINGLE_EDUCATION_SUCCESS,
  EDUCATION_CREATE_FAIL,
  EDUCATION_CREATE_REQUEST,
  EDUCATION_CREATE_SUCCESS,
  GET_ALL_EDUCATION_CREATE_FAIL,
  GET_ALL_EDUCATION_CREATE_REQUEST,
  GET_ALL_EDUCATION_CREATE_SUCCESS,
  GET_ALL_EDUCATION_FAIL,
  GET_ALL_EDUCATION_REQUEST,
  GET_ALL_EDUCATION_SUCCESS,
} from "./EducationConstants";

export const getAllEducationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EDUCATION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Education/GetAllPIDEducation`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EDUCATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleEducationAction = (education) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SINGLE_EDUCATION_REQUEST });

    const jsonData = JSON.stringify({ dbModel: education });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_Education/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: CREATE_SINGLE_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SINGLE_EDUCATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllEducationCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EDUCATION_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDEducation`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_EDUCATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EDUCATION_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const educationCreateAction = (educationCreate) => async (dispatch) => {
  try {
    dispatch({ type: EDUCATION_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: educationCreate });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/PID_Education/Post`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: EDUCATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EDUCATION_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
