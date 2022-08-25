import {
  GET_ACTIVE_SUBJECT_FAIL,
  GET_ACTIVE_SUBJECT_REQUEST,
    GET_ACTIVE_SUBJECT_RESET,
    GET_ACTIVE_SUBJECT_SUCCESS,
    GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL,
    GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST,
    GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_RESET,
  GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS,
  GET_BULK_EXAM_MARK_APPROVAL_FAIL,
  GET_BULK_EXAM_MARK_APPROVAL_REQUEST,
  GET_BULK_EXAM_MARK_APPROVAL_RESET,
  GET_BULK_EXAM_MARK_APPROVAL_SUCCESS,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_RESET,
  GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_RESET,
  GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS,
  POST_BULK_EXAM_MARK_APPROVAL_FAIL,
  POST_BULK_EXAM_MARK_APPROVAL_REQUEST,
  POST_BULK_EXAM_MARK_APPROVAL_RESET,
  POST_BULK_EXAM_MARK_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstant";

export const getExamMarkApprovalInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_MARK_APPROVAL_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_EXAM_MARK_APPROVAL_INITIAL_DATA_SUCCESS:
      return { loading: false, examMarkApprovalInitialDatas: action.payload };
    case GET_EXAM_MARK_APPROVAL_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_MARK_APPROVAL_INITIAL_DATA_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getExamMarkApprovalSearchDataReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_REQUEST:
        return { loading: true };
      case GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_SUCCESS:
        return { loading: false, searchData: action.payload, success: true };
      case GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_FAIL:
        return { loading: false, error: action.payload };
        case GET_ALL_EXAM_MARK_APPROVAL_SEARCHDATA_RESET:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getExamMarkApprovalScheduleHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_REQUEST:
        return { loading: true };
      case GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_SUCCESS:
        return { loading: false, scheduleHeader: action.payload, success: true };
      case GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case GET_EXAM_MARK_APPROVAL_SCHEULE_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getBulkExamMarkApprovalSearchDataReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_BULK_EXAM_MARK_APPROVAL_REQUEST:
        return { loading: true };
      case GET_BULK_EXAM_MARK_APPROVAL_SUCCESS:
        return { loading: false, bulkData: action.payload, success: true };
      case GET_BULK_EXAM_MARK_APPROVAL_FAIL:
        return { loading: false, error: action.payload };
      case GET_BULK_EXAM_MARK_APPROVAL_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const postBulkExamMarkApprovalReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_BULK_EXAM_MARK_APPROVAL_REQUEST:
        return { loading: true };
      case POST_BULK_EXAM_MARK_APPROVAL_SUCCESS:
        return { loading: false, success: true };
      case POST_BULK_EXAM_MARK_APPROVAL_FAIL:
        return { loading: false, error: action.payload };
      case POST_BULK_EXAM_MARK_APPROVAL_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getAllOtherOptionsForSelectTeacherReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_REQUEST:
        return { loading: true };
      case GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_SUCCESS:
        return {
          loading: false,
          allOtherOptions: action.payload,
        };
      case GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_OTHER_OPTIONS_FOR_SELECT_TEACHER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getActiveSubjectReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ACTIVE_SUBJECT_REQUEST:
        return { loading: true };
      case GET_ACTIVE_SUBJECT_SUCCESS:
        return {
          loading: false,
         activeSubject: action.payload,
        };
      case GET_ACTIVE_SUBJECT_FAIL:
        return { loading: false, error: action.payload };
      case GET_ACTIVE_SUBJECT_RESET:
        return {};
      default:
        return state;
    }
  };