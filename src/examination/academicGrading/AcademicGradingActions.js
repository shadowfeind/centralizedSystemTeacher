import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ACADEMIC_GRADING_REQUEST,
  GET_ALL_ACADEMIC_GRADING_SUCCESS,
  GET_ALL_ACADEMIC_GRADING_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_REQUEST,
  GET_SINGLE_ACADEMIC_GRADING_SUCCESS,
  GET_SINGLE_ACADEMIC_GRADING_FAIL,
  CREATE_ACADEMIC_GRADING_REQUEST,
  CREATE_ACADEMIC_GRADING_SUCCESS,
  CREATE_ACADEMIC_GRADING_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET,
  UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST,
  UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
  UPDATE_SINGLE_ACADEMIC_GRADING_RESET,
  GET_SINGLE_ACADEMIC_GRADING_RESET,
} from "./AcademicGradingConstants";

export const getAllAcademicGradingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_GRADING_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FacultyGradingSystem/GetAllAcademicGrading`,
      tokenConfig()
    );
    dispatch({ type: GET_ALL_ACADEMIC_GRADING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_GRADING_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleAcademicGradingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/GetToCreateFacultyGradingSystem/6/singleGetToCreate/`,
      tokenConfig()
    );
    dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_GRADING_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAcademicGradingAction =
  (academicGrading) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ACADEMIC_GRADING_REQUEST });
      const jsonData = JSON.stringify({ dbModel: academicGrading });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `/api/FacultyGradingSystem/PostFacultyGradingSystem`,
        jsonData,
        tokenConfig()
      );
      dispatch({ type: CREATE_ACADEMIC_GRADING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ACADEMIC_GRADING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleAcademicGradingforEditAction =
  (IDFacultyGradingSystem) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/GetToEditSingleFacultyGradingSystem/${IDFacultyGradingSystem}/6/singleEdit`,
        tokenConfig()
      );
      dispatch({
        type: GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSingleAcademicGradingAction =
  (academicGradingEdit) => async (dispatch) => {
    try {
      console.log("Mandar", academicGradingEdit);
      academicGradingEdit.Created_On = "2021-09-23";
      academicGradingEdit.Updated_On = "2021-09-23";
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicGradingEdit });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `/api/FacultyGradingSystem/PutFacultyGradingSystem`,
        jsonData,
        tokenConfig()
      );
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
