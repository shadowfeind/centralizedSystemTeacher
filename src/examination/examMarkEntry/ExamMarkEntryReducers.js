import {
  GET_ALL_ACADEMIC_STUDENT_EXAMDATA_FAIL,
  GET_ALL_ACADEMIC_STUDENT_EXAMDATA_REQUEST,
  GET_ALL_ACADEMIC_STUDENT_EXAMDATA_SUCCESS,
  GET_ALL_EXAM_ENTRY_BULK_FAIL,
  GET_ALL_EXAM_ENTRY_BULK_REQUEST,
  GET_ALL_EXAM_ENTRY_BULK_SUCCESS,
  GET_ALL_EXAM_ENTRY_SEARCHDATA_FAIL,
  GET_ALL_EXAM_ENTRY_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_ENTRY_SEARCHDATA_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_RESET,
  GET_EVENT_SUCCESS,
  GET_EXAM_SCHEDULE_HEADER_FAIL,
  GET_EXAM_SCHEDULE_HEADER_REQUEST,
  GET_EXAM_SCHEDULE_HEADER_RESET,
  GET_EXAM_SCHEDULE_HEADER_SUCCESS,
} from "./ExamMarkEntryConstants";

export const getAllAcademicStudentExamdataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_STUDENT_EXAMDATA_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_STUDENT_EXAMDATA_SUCCESS:
      return { loading: false, allAcademicStudentExamData: action.payload };
    case GET_ALL_ACADEMIC_STUDENT_EXAMDATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return { loading: true };
    case GET_EVENT_SUCCESS:
      return { loading: false, allEvents: action.payload, success: true };
    case GET_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getEventScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_SCHEDULE_HEADER_REQUEST:
      return { loading: true };
    case GET_EXAM_SCHEDULE_HEADER_SUCCESS:
      return { loading: false, allSchedule: action.payload, success: true };
    case GET_EXAM_SCHEDULE_HEADER_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXAM_SCHEDULE_HEADER_RESET:
      return {};
    default:
      return state;
  }
};

export const getExamEntrySearchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_ENTRY_SEARCHDATA_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_ENTRY_SEARCHDATA_SUCCESS:
      return { loading: false, searchData: action.payload, success: true };
    case GET_ALL_EXAM_ENTRY_SEARCHDATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getExamEntryBulkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXAM_ENTRY_BULK_REQUEST:
      return { loading: true };
    case GET_ALL_EXAM_ENTRY_BULK_SUCCESS:
      return { loading: false, bulkData: action.payload };
    case GET_ALL_EXAM_ENTRY_BULK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
