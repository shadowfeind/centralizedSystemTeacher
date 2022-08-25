import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_PERSONALINFORMATION_FAIL,
  GET_ALL_PERSONALINFORMATION_REQUEST,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_FAIL,
  GET_SINGLE_PERSONALINFORMATION_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_SUCCESS,
  UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
  UPDATE_SINGLE_PERSONALINFORMATION_REQUEST,
  UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
} from "./PersonalInformationConstants";

export const getAllPersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/PID_PersonalInformation/GetAllPIDPersonalInformation?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PERSONALINFORMATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSinglePersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/PID_PersonalInformation/GetSingleEdit?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PERSONALINFORMATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSinglePersonalInformationAction =
  (personalInformation) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: personalInformation });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `/api/PID_PersonalInformation/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
