import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_FAIL,
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_REQUEST,
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_FAIL,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_REQUEST,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
} from "./ClassNotificationConstants";

export const getAllNotificationTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEACHER_NOTIFICATION_TEACHER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherInboxNotification/GetAllTeacherInboxNotification`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEACHER_NOTIFICATION_TEACHER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListNotificationTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_TEACHER_NOTIFICATION_TEACHER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherInboxNotification/GetListTeacherInboxNotification`,
      tokenConfig()
    );

    dispatch({
      type: GET_LIST_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_TEACHER_NOTIFICATION_TEACHER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
