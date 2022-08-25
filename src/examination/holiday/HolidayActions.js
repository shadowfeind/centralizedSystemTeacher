import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHolidayAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOLIDAY_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Att_HRHoliday/GetAtt_HRHoliday`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOLIDAY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
