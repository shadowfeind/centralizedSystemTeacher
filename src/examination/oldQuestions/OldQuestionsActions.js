import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  DOWNLOAD_OLD_QUESTIONS_FAIL,
  DOWNLOAD_OLD_QUESTIONS_REQUEST,
  DOWNLOAD_OLD_QUESTIONS_SUCCESS,
  GET_ALL_OLD_QUESTIONS_TEACHER_FAIL,
  GET_ALL_OLD_QUESTIONS_TEACHER_REQUEST,
  GET_ALL_OLD_QUESTIONS_TEACHER_SUCCESS,
  GET_LIST_OLD_QUESTIONS_TEACHER_FAIL,
  GET_LIST_OLD_QUESTIONS_TEACHER_REQUEST,
  GET_LIST_OLD_QUESTIONS_TEACHER_SUCCESS,
  GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
  GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST,
  GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_OLD_QUESTIONS_TEACHER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OldQuestionTeacher/GetAllOldQuestion`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_OLD_QUESTIONS_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_OLD_QUESTIONS_TEACHER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSubjectOldQuestionsAction = (classId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OldQuestionTeacher/GetSubjectByIDLevel?level=${classId}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
      payload: data,
      query: { classId },
    });
  } catch (error) {
    dispatch({
      type: GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListOldQuestionsTeacherAction =
  (classId, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_OLD_QUESTIONS_TEACHER_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/OldQuestionTeacher/GetListOldQuestion?level=${classId}&idAcademicSubject=${subject}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_OLD_QUESTIONS_TEACHER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_OLD_QUESTIONS_TEACHER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const downloadOldQuestionsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_OLD_QUESTIONS_REQUEST });

    const test = `${API_URL}/api/OldQuestionTeacher/DownloadOldQuestion/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_OLD_QUESTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_OLD_QUESTIONS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
