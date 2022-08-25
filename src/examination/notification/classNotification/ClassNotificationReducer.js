import {
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_REQUEST,
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_FAIL,
  GET_ALL_TEACHER_NOTIFICATION_TEACHER_RESET,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_REQUEST,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_SUCCESS,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_FAIL,
  GET_LIST_TEACHER_NOTIFICATION_TEACHER_RESET
} from "./ClassNotificationConstants";

export const getAllNotificationTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_NOTIFICATION_TEACHER_REQUEST:
      return { loading: true };
    case GET_ALL_TEACHER_NOTIFICATION_TEACHER_SUCCESS:
      return { loading: false, classNotificationTeacher: action.payload };
    case GET_ALL_TEACHER_NOTIFICATION_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TEACHER_NOTIFICATION_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};

export const getListNotificationTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_TEACHER_NOTIFICATION_TEACHER_REQUEST:
      return { loading: true };
    case GET_LIST_TEACHER_NOTIFICATION_TEACHER_SUCCESS:
      return { loading: false, listClassNotificationTeacher: action.payload };
    case GET_LIST_TEACHER_NOTIFICATION_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_TEACHER_NOTIFICATION_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};
