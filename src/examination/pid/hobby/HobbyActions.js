import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_HOBBY_FAIL,
  CREATE_SINGLE_HOBBY_REQUEST,
  CREATE_SINGLE_HOBBY_SUCCESS,
  GET_ALL_HOBBY_CREATE_FAIL,
  GET_ALL_HOBBY_CREATE_REQUEST,
  GET_ALL_HOBBY_CREATE_SUCCESS,
  GET_ALL_HOBBY_FAIL,
  GET_ALL_HOBBY_REQUEST,
  GET_ALL_HOBBY_SUCCESS,
  HOBBY_CREATE_FAIL,
  HOBBY_CREATE_REQUEST,
  HOBBY_CREATE_SUCCESS,
} from "./HobbyConstants";

export const getAllHobbyAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOBBY_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Hobby/GetAllPIDHobby`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_HOBBY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOBBY_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllHobbyCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOBBY_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDHobby`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_HOBBY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOBBY_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleHobbyAction = (hobby) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SINGLE_HOBBY_REQUEST });

    const jsonData = JSON.stringify({ dbModel: hobby });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_Hobby/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: CREATE_SINGLE_HOBBY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SINGLE_HOBBY_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const hobbyCreateAction = (hobbyCreate) => async (dispatch) => {
  try {
    dispatch({ type: HOBBY_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: hobbyCreate });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/PID_Hobby/Post`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: HOBBY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOBBY_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
