import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_FAIL,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_REQUEST,
  GET_LIST_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
} from "./TotalStudentAttendanceConstant";

export const getAllTotalStudentAttendanceAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TotalStudentAttendance/GetAllTotalStudentAttendance`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListTotalStudentAttendanceAction =
  (year, program, classId, subject, section, shift, startDate, endDate) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_TOTAL_STUDENT_ATTENDANCE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TotalStudentAttendance/GetListTotalStudentAttendance?startDate=${startDate}&endDate=${endDate}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idSubject=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_TOTAL_STUDENT_ATTENDANCE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
