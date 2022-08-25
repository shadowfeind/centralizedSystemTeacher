import { TrafficRounded } from "@material-ui/icons";
import {
  GET_ALL_ACADEMIC_GRADING_REQUEST,
  GET_ALL_ACADEMIC_GRADING_SUCCESS,
  GET_ALL_ACADEMIC_GRADING_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_REQUEST,
  GET_SINGLE_ACADEMIC_GRADING_SUCCESS,
  GET_SINGLE_ACADEMIC_GRADING_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_RESET,
  CREATE_ACADEMIC_GRADING_REQUEST,
  CREATE_ACADEMIC_GRADING_SUCCESS,
  CREATE_ACADEMIC_GRADING_FAIL,
  CREATE_ACADEMIC_GRADING_RESET,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL,
  GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET,
  UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST,
  UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_GRADING_FAIL,
  UPDATE_SINGLE_ACADEMIC_GADING_RESET,
  GET_ALL_ACADEMIC_GRADING_RESET,
} from "./AcademicGradingConstants";

export const getAllAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload };
    case GET_ALL_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_GRADING_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload, success: true };
    case GET_SINGLE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_GRADING_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case CREATE_ACADEMIC_GRADING_SUCCESS:
      return { loading: false, academicGrading: action.payload, success: true };
    case CREATE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ACADEMIC_GRADING_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicGradingforEditReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_GRADING_EDIT_REQUEST:
      return { loading: false };
    case GET_SINGLE_ACADEMIC_GRADING_EDIT_SUCCESS:
      return { loading: false, academicGradingEdit: action.payload };
    case GET_SINGLE_ACADEMIC_GRADING_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_GRADING_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicGradingReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_GRADING_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_GRADING_SUCCESS:
      return {
        loading: false,
        updateAcademicGrading: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_GRADING_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_GADING_RESET:
      return {};
    default:
      return state;
  }
};
