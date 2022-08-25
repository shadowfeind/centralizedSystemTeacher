import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  DOWNLOAD_RESOURCES_FAIL,
  DOWNLOAD_RESOURCES_REQUEST,
  DOWNLOAD_RESOURCES_SUCCESS,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_FAIL,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_REQUEST,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_SUCCESS,
  GET_ALL_RESOURCES_INITIAL_DATA_FAIL,
  GET_ALL_RESOURCES_INITIAL_DATA_REQUEST,
  GET_ALL_RESOURCES_INITIAL_DATA_SUCCESS,
  GET_ALL_RESOURCES_LIST_FAIL,
  GET_ALL_RESOURCES_LIST_REQUEST,
  GET_ALL_RESOURCES_LIST_SUCCESS,
  GET_CREATE_RESOURCES_FAIL,
  GET_CREATE_RESOURCES_REQUEST,
  GET_CREATE_RESOURCES_SUCCESS,
  POST_RESOURCES_FAIL,
  POST_RESOURCES_REQUEST,
  POST_RESOURCES_SUCCESS,
} from "./ResourcesConstants";

export const getAllInitialResourcesDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RESOURCES_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/CourseDeliveryPlanTeacher/GetAllCourseDeliveryPlan`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_RESOURCES_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESOURCES_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllInitialDataFromSubjectAction =
  (subject, id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_INITIAL_DATA_FROM_SUBJECT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetAttendanceForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_INITIAL_DATA_FROM_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_INITIAL_DATA_FROM_SUBJECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAllOtherOptionsForResourcesSelectAction =
  (id, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_REQUEST });

      const year = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetAttendanceForAcademicYear?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const program = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetCurseDeliveryPlanForFacultyProgram?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const classId = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetCurseDeliveryPlanForLevel?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const section = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetCurseDeliveryPlanForSection?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
        tokenConfig()
      );

      const shift = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetCurseDeliveryPlanForShift?idAcademicFacultySubjectLink=${subject}&idTeacher=${id}`,
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
        type: GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAllResourcesListAction =
  (subject, year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_RESOURCES_LIST_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetListCourseDeliveryPlan?idAcademicFacultySubjectLink=${subject}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_RESOURCES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_RESOURCES_LIST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getCreateResourceAction =
  (subject, year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_CREATE_RESOURCES_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/CourseDeliveryPlanTeacher/GetSingleCreateCourseDeliveryPlan?idAcademicFacultySubjectLink=${subject}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_CREATE_RESOURCES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CREATE_RESOURCES_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postResourceAction =
  (image, resource, searchFilterModel, model) => async (dispatch) => {
    try {
      dispatch({ type: POST_RESOURCES_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);
      const { data } = await axiosInstance.post(
        `/api/CourseDeliveryPlanTeacher/FileUpload`,
        formData,
        tokenConfig()
      );

      const {
        IDTeacher,
        IDYearFacultyLink,
        IDAcademicFacultySubjectLink,
        Level,
        Section,
        IDAcademicShift,
      } = model;

      if (data) {
        const newData = {
          ...resource,
          DocumentFile: data,
          IDTeacher,
          IDYearFacultyLink,
          IDAcademicFacultySubjectLink,
          Level,
          Section,
          IDAcademicShift,
        };
        const jsonData = JSON.stringify({
          dbModel: newData,
          searchFilterModel,
        });

        console.log(jsonData);

        await axiosInstance.post(
          `/api/CourseDeliveryPlanTeacher/Post`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: POST_RESOURCES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_RESOURCES_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const downloadResourceAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_RESOURCES_REQUEST });

    const test = `${API_URL}/api/CourseDeliveryPlanTeacher/DownloadDoc/${id}`;

    window.open(test, "_blank");
    dispatch({
      type: DOWNLOAD_RESOURCES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_RESOURCES_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
