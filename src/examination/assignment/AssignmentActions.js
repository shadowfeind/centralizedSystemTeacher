import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  DOWNLOAD_ASSIGNMENT_FAIL,
  DOWNLOAD_ASSIGNMENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS,
  GET_ALL_ASSIGNMENT_TEACHER_FAIL,
  GET_ALL_ASSIGNMENT_TEACHER_REQUEST,
  GET_ALL_ASSIGNMENT_TEACHER_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_TEACHER_ASSIGNMENT_FAIL,
  GET_LIST_TEACHER_ASSIGNMENT_REQUEST,
  GET_LIST_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
  GET_TEACHER_ASSIGNMENT_CONTENT_FAIL,
  GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST,
  GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS,
  POST_TEACHER_ASSIGNMENT_FAIL,
  POST_TEACHER_ASSIGNMENT_REQUEST,
  POST_TEACHER_ASSIGNMENT_SUCCESS,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
} from "./AssignmentConstants";

export const getAllAssignmentTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGNMENT_TEACHER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherAssignment/GetAllTeacherAssignment`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_ASSIGNMENT_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGNMENT_TEACHER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllOtherOptionsForSelectAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST });

      const year = await axiosInstance.get(
        `/api/TeacherAssignment/GetAttendanceForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}
        `,
        tokenConfig()
      );

      const section = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axiosInstance.get(
        `/api/TeacherAssignment/GetCurseDeliveryPlanForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const data = {
        year: year.data,
        program: program.data,
        classId: classId.data,
        section: section.data,
        shift: shift.data,
      };

      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getListAssignmentTeacherAction =
  (year, program, classId, subject, section, shift, currentDate) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetListTeacherAssignment?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}&assignmentDate=${currentDate}
        `,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_TEACHER_ASSIGNMENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getEnglishDateAction = (year, month) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENGLISH_DATE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/TeacherAssignment/GetEngDate?year=${year}&month=${month}
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_ENGLISH_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ENGLISH_DATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateTeacherAssignmentAction =
  (year, program, classId, section, shift, subject, currentDate) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetSingleToCreateTeacherAssignment?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}&assignmentDate=${currentDate}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.Message && error.response.data.Message
            ? error.response.data.Message
            : error.message,
      });
    }
  };

export const postTeacherAssignmentAction =
  (image, assignment, students) => async (dispatch) => {
    try {
      dispatch({ type: POST_TEACHER_ASSIGNMENT_REQUEST });
      let documentName;

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data: documentsName } = await axiosInstance.post(
          `/api/TeacherAssignment/FileUpload`,
          formData,
          tokenConfig()
        );
        documentName = documentsName || "";
      }

      if (documentName) {
        const newData = {
          ...assignment,
          DocumentName: documentName,
        };
        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: newData,
          dbModelLstForStudentSection: students,
        });

        await axiosInstance.post(
          `/api/TeacherAssignment/Post`,
          jsonData,
          tokenConfig()
        );
      } else {
        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: assignment,
          dbModelLstForStudentSection: students,
        });
        console.log("without image", jsonData);
        await axiosInstance.post(
          `/api/TeacherAssignment/Post`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: POST_TEACHER_ASSIGNMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_TEACHER_ASSIGNMENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getTeacherAssignmentContentAction =
  (year, program, classId, section, shift, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetAssignmentContent?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicFacultySubjectLink=${subject}`,
        tokenConfig()
      );

      dispatch({
        type: GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TEACHER_ASSIGNMENT_CONTENT_FAIL,
        payload:
          error.Message && error.response.data.Message
            ? error.response.data.Message
            : error.message,
      });
    }
  };

export const getSingleToEditTeacherAssignmentAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/TeacherAssignment/GetSingleToEditTeacherAssignment/${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.Message && error.response.data.Message
            ? error.response.data.Message
            : error.message,
      });
    }
  };

export const putSingleToEditTeacherAssignmentAction =
  (image, singleAssignment) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data: imageData } = await axiosInstance.post(
          `/api/TeacherAssignment/FileUpload`,
          formData,
          tokenConfig()
        );
        //renaming data as it was undefined when consoled

        if (imageData !== undefined) {
          debugger;
          const jsonData = JSON.stringify({
            dbTeacherAssignmentModel: {
              ...singleAssignment,
              DocumentName: imageData,
            },
          });
          console.log(data);
          debugger;
          console.log(jsonData);
          debugger;

          const { data } = await axiosInstance.put(
            `/api/TeacherAssignment/PutTeacherAssignment`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const jsonData = JSON.stringify({
          dbTeacherAssignmentModel: singleAssignment,
        });
        await axiosInstance.put(
          `/api/TeacherAssignment/PutTeacherAssignment`,
          jsonData,
          tokenConfig()
        );
      }
      dispatch({
        type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
        payload:
          error.Message && error.response.data.Message
            ? error.response.data.Message
            : error.message,
      });
    }
  };

export const downloadAssignmentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_ASSIGNMENT_REQUEST });

    const test = `${API_URL}/api/TeacherAssignment/DownloadTEacherAssignmentDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_ASSIGNMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const downloadSubmittedAssignmentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST });

    const test = `${API_URL}/api/TeacherAssignment/DownloadSubmittedDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
