import {
  CREATE_SINGLE_JOBHISTORY_FAIL,
  CREATE_SINGLE_JOBHISTORY_REQUEST,
  CREATE_SINGLE_JOBHISTORY_RESET,
  CREATE_SINGLE_JOBHISTORY_SUCCESS,
  GET_ALL_JOBHISTORY_CREATE_FAIL,
  GET_ALL_JOBHISTORY_CREATE_REQUEST,
  GET_ALL_JOBHISTORY_CREATE_RESET,
  GET_ALL_JOBHISTORY_CREATE_SUCCESS,
  GET_ALL_JOBHISTORY_FAIL,
  GET_ALL_JOBHISTORY_REQUEST,
  GET_ALL_JOBHISTORY_RESET,
  GET_ALL_JOBHISTORY_SUCCESS,
  JOBHISTORY_CREATE_FAIL,
  JOBHISTORY_CREATE_REQUEST,
  JOBHISTORY_CREATE_RESET,
  JOBHISTORY_CREATE_SUCCESS,
} from "./JobHistoryConstants";

export const getAllJobHistory = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_JOBHISTORY_REQUEST:
      return { loading: true };
    case GET_ALL_JOBHISTORY_SUCCESS:
      return { loading: false, getAllJobHistory: action.payload };
    case GET_ALL_JOBHISTORY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_JOBHISTORY_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleJobHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_JOBHISTORY_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_JOBHISTORY_SUCCESS:
      return {
        loading: false,
        createdJobHistory: action.payload,
        success: true,
      };
    case CREATE_SINGLE_JOBHISTORY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_JOBHISTORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllJobHistoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_JOBHISTORY_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_JOBHISTORY_CREATE_SUCCESS:
      return { loading: false, getAllJobHistoryCreate: action.payload };
    case GET_ALL_JOBHISTORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_JOBHISTORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const jobHistoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOBHISTORY_CREATE_REQUEST:
      return { loading: true };
    case JOBHISTORY_CREATE_SUCCESS:
      return { loading: false, jobHistoryCreate: action.payload, success: true };
    case JOBHISTORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case JOBHISTORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
