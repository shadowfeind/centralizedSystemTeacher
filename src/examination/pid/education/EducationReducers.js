import {
  CREATE_SINGLE_EDUCATION_FAIL,
  CREATE_SINGLE_EDUCATION_REQUEST,
  CREATE_SINGLE_EDUCATION_RESET,
  CREATE_SINGLE_EDUCATION_SUCCESS,
  GET_ALL_EDUCATION_CREATE_FAIL,
  GET_ALL_EDUCATION_CREATE_REQUEST,
  GET_ALL_EDUCATION_CREATE_RESET,
  GET_ALL_EDUCATION_CREATE_SUCCESS,
  GET_ALL_EDUCATION_FAIL,
  GET_ALL_EDUCATION_REQUEST,
  GET_ALL_EDUCATION_RESET,
  GET_ALL_EDUCATION_SUCCESS,
  EDUCATION_CREATE_REQUEST,
  EDUCATION_CREATE_SUCCESS,
  EDUCATION_CREATE_FAIL,
  EDUCATION_CREATE_RESET,
} from "./EducationConstants";

export const getAllEducation = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EDUCATION_REQUEST:
      return { loading: true };
    case GET_ALL_EDUCATION_SUCCESS:
      return { loading: false, getAllEducation: action.payload };
    case GET_ALL_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllEducationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EDUCATION_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_EDUCATION_CREATE_SUCCESS:
      return { loading: false, getAllEducationCreate: action.payload };
    case GET_ALL_EDUCATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EDUCATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_EDUCATION_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_EDUCATION_SUCCESS:
      return {
        loading: false,
        createdEducation: action.payload,
        success: true,
      };
    case CREATE_SINGLE_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const educationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EDUCATION_CREATE_REQUEST:
      return { loading: true };
    case EDUCATION_CREATE_SUCCESS:
      return { loading: false, educationCreate: action.payload, success: true };
    case EDUCATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EDUCATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
