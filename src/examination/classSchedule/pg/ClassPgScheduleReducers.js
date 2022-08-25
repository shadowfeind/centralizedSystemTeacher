import {
  GET_ALL_PG_CLASS_SCHEDULE_FAIL,
  GET_ALL_PG_CLASS_SCHEDULE_REQUEST,
  GET_ALL_PG_CLASS_SCHEDULE_RESET,
  GET_ALL_PG_CLASS_SCHEDULE_SUCCESS,
  GET_EDIT_CLASS_SCHEDULE_FAIL,
  GET_EDIT_CLASS_SCHEDULE_REQUEST,
  GET_EDIT_CLASS_SCHEDULE_RESET,
  GET_EDIT_CLASS_SCHEDULE_SUCCESS,
  GET_LIST_CLASS_SCHEDULE_FAIL,
  GET_LIST_CLASS_SCHEDULE_REQUEST,
  GET_LIST_CLASS_SCHEDULE_RESET,
  GET_LIST_CLASS_SCHEDULE_SUCCESS,
  PUT_CLASS_SCHEDULE_FAIL,
  PUT_CLASS_SCHEDULE_REQUEST,
  PUT_CLASS_SCHEDULE_RESET,
  PUT_CLASS_SCHEDULE_SUCCESS,
} from "./ClassPgScheduleConstants";

export const getAllPgClassScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PG_CLASS_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_ALL_PG_CLASS_SCHEDULE_SUCCESS:
      return { loading: false, pgClassSchedule: action.payload };
    case GET_ALL_PG_CLASS_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_PG_CLASS_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListClassScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_CLASS_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_LIST_CLASS_SCHEDULE_SUCCESS:
      return { loading: false, allClassScheduleList: action.payload };
    case GET_LIST_CLASS_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_CLASS_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

// export const getEditClassScheduleReducer = (state = {}, action) => {
//   switch (action.type) {
//     case GET_EDIT_CLASS_SCHEDULE_REQUEST:
//       return { loading: true };
//     case GET_EDIT_CLASS_SCHEDULE_SUCCESS:
//       return { loading: false, editClassSchedule: action.payload };
//     case GET_EDIT_CLASS_SCHEDULE_FAIL:
//       return { loading: false, error: action.payload };
//     case GET_EDIT_CLASS_SCHEDULE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const putClassScheduleReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PUT_CLASS_SCHEDULE_REQUEST:
//       return { loading: true };
//     case PUT_CLASS_SCHEDULE_SUCCESS:
//       return { loading: false, success: true };
//     case PUT_CLASS_SCHEDULE_FAIL:
//       return { loading: false, error: action.payload };
//     case PUT_CLASS_SCHEDULE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };
