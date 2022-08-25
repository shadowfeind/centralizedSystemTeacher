import {
  DOWNLOAD_ASSIGNMENT_FAIL,
  DOWNLOAD_ASSIGNMENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_RESET,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_RESET,
  DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS,
  GET_ALL_ASSIGNMENT_TEACHER_FAIL,
  GET_ALL_ASSIGNMENT_TEACHER_REQUEST,
  GET_ALL_ASSIGNMENT_TEACHER_RESET,
  GET_ALL_ASSIGNMENT_TEACHER_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_RESET,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_TEACHER_ASSIGNMENT_FAIL,
  GET_LIST_TEACHER_ASSIGNMENT_REQUEST,
  GET_LIST_TEACHER_ASSIGNMENT_RESET,
  GET_LIST_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_RESET,
  GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET,
  GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
  GET_TEACHER_ASSIGNMENT_CONTENT_FAIL,
  GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST,
  GET_TEACHER_ASSIGNMENT_CONTENT_RESET,
  GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS,
  POST_TEACHER_ASSIGNMENT_FAIL,
  POST_TEACHER_ASSIGNMENT_REQUEST,
  POST_TEACHER_ASSIGNMENT_RESET,
  POST_TEACHER_ASSIGNMENT_SUCCESS,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET,
  PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS,
} from "./AssignmentConstants";

export const getAllAssignmentTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGNMENT_TEACHER_REQUEST:
      return { loading: true };
    case GET_ALL_ASSIGNMENT_TEACHER_SUCCESS:
      return {
        loading: false,
        allAssignmentTeacherData: action.payload,
      };
    case GET_ALL_ASSIGNMENT_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ASSIGNMENT_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllOtherOptionsForAssignmentSelectReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_OTHER_OPTIONS_FOR_SELECT_REQUEST:
      return { loading: true };
    case GET_ALL_OTHER_OPTIONS_FOR_SELECT_SUCCESS:
      return {
        loading: false,
        allOtherOptions: action.payload,
      };
    case GET_ALL_OTHER_OPTIONS_FOR_SELECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OTHER_OPTIONS_FOR_SELECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListTeacherAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_TEACHER_ASSIGNMENT_REQUEST:
      return { loading: true };
    case GET_LIST_TEACHER_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        getListTeacherAssignment: action.payload,
      };
    case GET_LIST_TEACHER_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_TEACHER_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getEnglishDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENGLISH_DATE_REQUEST:
      return { loading: true };
    case GET_ENGLISH_DATE_SUCCESS:
      return {
        loading: false,
        engDate: action.payload,
      };
    case GET_ENGLISH_DATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ENGLISH_DATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateTeacherAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_SUCCESS:
      return { loading: false, teacherAssignmentSingleCreate: action.payload };
    case GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CREATE_TEACHER_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const postTeacherAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TEACHER_ASSIGNMENT_REQUEST:
      return { loading: true };
    case POST_TEACHER_ASSIGNMENT_SUCCESS:
      return { loading: false, success: true };
    case POST_TEACHER_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case POST_TEACHER_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getTeacherAssignmentContentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEACHER_ASSIGNMENT_CONTENT_REQUEST:
      return { loading: true };
    case GET_TEACHER_ASSIGNMENT_CONTENT_SUCCESS:
      return { loading: false, assignmentContent: action.payload };
    case GET_TEACHER_ASSIGNMENT_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_TEACHER_ASSIGNMENT_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleToEditTeacherAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS:
      return { loading: false, singleTeacherAssignment: action.payload };
    case GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const putSingleToEditTeacherAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_REQUEST:
      return { loading: true };
    case PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_SUCCESS:
      return { loading: false, success: true };
    case PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case PUT_SINGLE_TO_EDIT_TEACHER_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_ASSIGNMENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_ASSIGNMENT_SUCCESS:
      return { loading: false, success: true };
    case DOWNLOAD_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};


export const downloadSubmittedAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_REQUEST:
      return { loading: true };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_SUCCESS:
      return { loading: false, success: true };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_SUBMITTED_ASSIGNMENT_RESET:
      return {};
    default:
      return state;
  }
};
