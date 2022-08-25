import {
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_SUCCESS,
  GET_TEACHER_DASHBOARD_FAIL,
  GET_TEACHER_DASHBOARD_REQUEST,
  GET_TEACHER_DASHBOARD_SUCCESS,
} from "./DashboardConstants";
import { API_URL, axiosInstance, tokenConfig } from "../../constants";

export const getHeaderContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_CONTENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Home/GetHeaderContent
      `,
      tokenConfig()
    );

    dispatch({ type: GET_HEADER_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_CONTENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getDashboardContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHER_DASHBOARD_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherDashboard/GetAllTeacherDashboard`,
      tokenConfig()
    );

    dispatch({ type: GET_TEACHER_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TEACHER_DASHBOARD_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
