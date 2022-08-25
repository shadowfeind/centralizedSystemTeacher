import {
  DOWNLOAD_OLD_QUESTIONS_FAIL,
  DOWNLOAD_OLD_QUESTIONS_REQUEST,
  DOWNLOAD_OLD_QUESTIONS_RESET,
  DOWNLOAD_OLD_QUESTIONS_SUCCESS,
  GET_ALL_OLD_QUESTIONS_TEACHER_FAIL,
  GET_ALL_OLD_QUESTIONS_TEACHER_REQUEST,
  GET_ALL_OLD_QUESTIONS_TEACHER_RESET,
  GET_ALL_OLD_QUESTIONS_TEACHER_SUCCESS,
  GET_LIST_OLD_QUESTIONS_TEACHER_FAIL,
  GET_LIST_OLD_QUESTIONS_TEACHER_REQUEST,
  GET_LIST_OLD_QUESTIONS_TEACHER_RESET,
  GET_LIST_OLD_QUESTIONS_TEACHER_SUCCESS,
  GET_SUBJECT_OF_OLD_QUESTIONS_FAIL,
  GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST,
  GET_SUBJECT_OF_OLD_QUESTIONS_RESET,
  GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS,
} from "./OldQuestionsConstants";

export const getAllOldQuestionsTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_OLD_QUESTIONS_TEACHER_REQUEST:
      return { loading: true };
    case GET_ALL_OLD_QUESTIONS_TEACHER_SUCCESS:
      return { loading: false, oldQuestionsTeacher: action.payload };
    case GET_ALL_OLD_QUESTIONS_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OLD_QUESTIONS_TEACHER_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubjectOldQuestionsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SUBJECT_OF_OLD_QUESTIONS_REQUEST:
        return { loading: true };
      case GET_SUBJECT_OF_OLD_QUESTIONS_SUCCESS:
        return { loading: false, subjectOldQuestions: action.payload };
      case GET_SUBJECT_OF_OLD_QUESTIONS_FAIL:
        return { loading: false, error: action.payload };
      case GET_SUBJECT_OF_OLD_QUESTIONS_RESET:
        return {};
      default:
        return state;
    }
  };


export const getListOldQuestionsTeacherReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_OLD_QUESTIONS_TEACHER_REQUEST:
        return { loading: true };
      case GET_LIST_OLD_QUESTIONS_TEACHER_SUCCESS:
        return { loading: false, listOldQuestionsTeacher: action.payload };
      case GET_LIST_OLD_QUESTIONS_TEACHER_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_OLD_QUESTIONS_TEACHER_RESET:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const downloadOldQuestionsReducer = (state = {}, action) => {
    switch (action.type) {
      case DOWNLOAD_OLD_QUESTIONS_REQUEST:
        return { loading: true };
      case DOWNLOAD_OLD_QUESTIONS_SUCCESS:
        return { loading: false, success: true };
      case DOWNLOAD_OLD_QUESTIONS_FAIL:
        return { loading: false, error: action.payload };
      case DOWNLOAD_OLD_QUESTIONS_RESET:
        return {};
      default:
        return state;
    }
  };
  