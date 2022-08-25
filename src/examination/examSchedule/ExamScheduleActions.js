import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
  GET_EXAM_SCHEDULE_LIST_FAIL,
  GET_EXAM_SCHEDULE_LIST_REQUEST,
  GET_EXAM_SCHEDULE_LIST_SUCCESS,
} from "./ExamScheduleConstants";

export const getAllExamScheduleInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AcademicExamSchedule/GetAll
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getExamScheduleListAction =
  (year, program, classId, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_SCHEDULE_LIST_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/GetListAcademicExamSchedule/${year}/${program}/${classId}/${event}/0
          `,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_SCHEDULE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_SCHEDULE_LIST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
