import {
  GET_ALL_EXAM_DIVISION_REQUEST,
  GET_ALL_EXAM_DIVISION_FAIL,
  GET_ALL_EXAM_DIVISION_SUCCESS,
  GET_SINGLE_EXAM_DIVISION_REQUEST,
  GET_SINGLE_EXAM_DIVISION_SUCCESS,
  GET_SINGLE_EXAM_DIVISION_FAIL,
  GET_SINGLE_EXAM_DIVISION_RESET,
  GET_SINGLE_EXAM_DIVISION_EDIT_REQUEST,
  GET_SINGLE_EXAM_DIVISION_EDIT_SUCCESS,
  GET_SINGLE_EXAM_DIVISION_EDIT_FAIL,
  GET_SINGLE_EXAM_DIVISION_EDIT_RESET,
  CREATE_EXAM_DIVISION_REQUEST,
  CREATE_EXAM_DIVISION_SUCCESS,
  CREATE_EXAM_DIVISION_FAIL,
  CREATE_EXAM_DIVISION_RESET,
  UPDATE_SINGLE_EXAM_DIVISION_REQUEST,
  UPDATE_SINGLE_EXAM_DIVISION_SUCCESS,
  UPDATE_SINGLE_EXAM_DIVISION_FAIL,
  UPDATE_SINGLE_EXAM_DIVISION_RESET,
  GET_ALL_EXAM_DIVISION_RESET,
} from "./ExamDivisionConstants";

export const getAllExamDivisionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_DIVISION_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_DIVISION_SUCCESS:
      return { loading: false, examDivision: action.payload };
    case GET_ALL_EXAM_DIVISION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EXAM_DIVISION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleExamDivisionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EXAM_DIVISION_REQUEST:
      return { loading: true };
    case GET_SINGLE_EXAM_DIVISION_SUCCESS:
      return { loading: false, examDivisionSingle: action.payload };
    case GET_SINGLE_EXAM_DIVISION_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EXAM_DIVISION_RESET:
      return {};
    default:
      return state;
  }
};

export const createExamDivisionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EXAM_DIVISION_REQUEST:
      return { loading: true };
    case CREATE_EXAM_DIVISION_SUCCESS:
      return { loading: false, examDivision: action.payload, success: true };
    case CREATE_EXAM_DIVISION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_EXAM_DIVISION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleExamDivisionEditReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EXAM_DIVISION_EDIT_REQUEST:
      return { loading: true };
    case GET_SINGLE_EXAM_DIVISION_EDIT_SUCCESS:
      return { loading: false, singleExamDivision: action.payload };
    case GET_SINGLE_EXAM_DIVISION_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EXAM_DIVISION_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleExamDivisionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_EXAM_DIVISION_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_EXAM_DIVISION_SUCCESS:
      return {
        loading: false,
        updateExamDivision: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_EXAM_DIVISION_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_EXAM_DIVISION_RESET:
      return {};
    default:
      return state;
  }
};
