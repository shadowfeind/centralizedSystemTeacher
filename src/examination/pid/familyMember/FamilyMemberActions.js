import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_FAMILYMEMBER_FAIL,
  CREATE_SINGLE_FAMILYMEMBER_REQUEST,
  CREATE_SINGLE_FAMILYMEMBER_SUCCESS,
  FAMILYMEMBER_CREATE_FAIL,
  FAMILYMEMBER_CREATE_REQUEST,
  FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_CREATE_FAIL,
  GET_ALL_FAMILYMEMBER_CREATE_REQUEST,
  GET_ALL_FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_FAIL,
  GET_ALL_FAMILYMEMBER_REQUEST,
  GET_ALL_FAMILYMEMBER_SUCCESS,
} from "./FamilyMemberConstants";

export const getAllFamilyMemberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAMILYMEMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetAllPIDFamilyMember`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_FAMILYMEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYMEMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleFamilyMemberAction =
  (familyMember) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_FAMILYMEMBER_REQUEST });

      const jsonData = JSON.stringify({ dbModel: familyMember });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/PID_FamilyMember/Put`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: CREATE_SINGLE_FAMILYMEMBER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_SINGLE_FAMILYMEMBER_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAllFamilyMemberCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDFamilyMember
        `,
      tokenConfig
    );

    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYMEMBER_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const familyMemberCreateAction =
  (familyMemberCreate) => async (dispatch) => {
    try {
      dispatch({ type: FAMILYMEMBER_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: familyMemberCreate });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/PID_FamilyMember/Post`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: FAMILYMEMBER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FAMILYMEMBER_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
