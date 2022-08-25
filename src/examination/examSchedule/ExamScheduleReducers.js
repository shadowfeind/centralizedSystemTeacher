import {
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
  GET_EXAM_SCHEDULE_LIST_FAIL,
  GET_EXAM_SCHEDULE_LIST_REQUEST,
  GET_EXAM_SCHEDULE_LIST_SUCCESS,
} from "./ExamScheduleConstants";

export const getAllExamScheduleInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS:
      return { loading: false, examScheduleInitialData: action.payload };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamScheduleListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_SCHEDULE_LIST_REQUEST:
      return { loading: true };
    case GET_EXAM_SCHEDULE_LIST_SUCCESS:
      return { loading: false, examScheduleList: action.payload };
    case GET_EXAM_SCHEDULE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
