import {
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_FAIL,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_REQUEST,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_RESET,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
} from "./TotalStudentAttendanceConstant";

export const getAllTotalStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        allTotalStudentAttendanceData: action.payload,
      };
    case GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListTotalStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_TOTAL_STUDENT_ATTENDANCE_REQUEST:
      return { loading: true };
    case GET_LIST_TOTAL_STUDENT_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        listTotalStudentAttendanceData: action.payload,
      };
    case GET_LIST_TOTAL_STUDENT_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_TOTAL_STUDENT_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};
