import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ACTIVE_SUBJECT_FAIL,
  GET_ACTIVE_SUBJECT_REQUEST,
  GET_ACTIVE_SUBJECT_SUCCESS,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS,
  GET_BULK_EXAM_MARK_APPROVAL_FAIL,
  GET_BULK_EXAM_MARK_APPROVAL_REQUEST,
  GET_BULK_EXAM_MARK_APPROVAL_SUCCESS,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS,
  POST_BULK_EXAM_MARK_APPROVAL_FAIL,
  POST_BULK_EXAM_MARK_APPROVAL_REQUEST,
  POST_BULK_EXAM_MARK_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstant";

export const getInitialExamMarkApprovalDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/ApproveAcademicStudentExamDataTeacher/GetAllApproveAcademicStudentExamDataTeacher?searchKey=1
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getExamMarkApprovalScheduleHeaderAction =
  (year, program, classId, section, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/GetActiveExamScheduleListForExamMarkEntry?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idAcademicYearCalendar=${event}&roleID=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getExamMarkApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/GetListApproveAcademicStudentExamDataTeacher?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicFacultySubjectLink=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkExamMarkApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EXAM_MARK_APPROVAL_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/GetBulkApproveAcademicStudentExamDataTeacher?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicFacultySubjectLink=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EXAM_MARK_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EXAM_MARK_APPROVAL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBulkExamMarkApprovalAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLsts: students,
        searchFilterModel: search,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axiosInstance.post(
        `/api/ApproveAcademicStudentExamDataTeacher/PostApproveAcademicStudentExamData`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_EXAM_MARK_APPROVAL_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_EXAM_MARK_APPROVAL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAllOtherOptionsForSelectTeacherAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST });

      const year = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/ActionForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/ActionForForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/ActionForForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const section = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/ActionForForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/ActionForForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const event = await axiosInstance.get(
        `/api/ApproveAcademicStudentExamDataTeacher/GetActiveAcademicYearCalendar?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const data = {
        year: year.data,
        program: program.data,
        classId: classId.data,
        section: section.data,
        shift: shift.data,
        event: event.data,
      };

      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

// export const getActiveSubjectAction =
// (subject, id) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_ACTIVE_SUBJECT_REQUEST });

//     const { data } = await axiosInstance.get(
//       `/api/ApproveAcademicStudentExamDataTeacher/GetActiveAcademicYearCalendar?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
//       tokenConfig()
//     );

//     dispatch({
//       type: GET_ACTIVE_SUBJECT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ACTIVE_SUBJECT_FAIL,
//       payload: error?.response?.data?.Message
// ? error?.response?.data?.Message
// : error?.message,
//     });
//   }
// };
