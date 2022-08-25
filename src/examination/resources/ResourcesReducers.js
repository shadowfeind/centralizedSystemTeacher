import {
  DOWNLOAD_RESOURCES_FAIL,
  DOWNLOAD_RESOURCES_REQUEST,
  DOWNLOAD_RESOURCES_RESET,
  DOWNLOAD_RESOURCES_SUCCESS,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_FAIL,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_REQUEST,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_RESET,
  GET_ALL_INITIAL_DATA_FROM_SUBJECT_SUCCESS,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_FAIL,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_REQUEST,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_SUCCESS,
  GET_ALL_RESOURCES_INITIAL_DATA_FAIL,
  GET_ALL_RESOURCES_INITIAL_DATA_REQUEST,
  GET_ALL_RESOURCES_INITIAL_DATA_RESET,
  GET_ALL_RESOURCES_INITIAL_DATA_SUCCESS,
  GET_ALL_RESOURCES_LIST_FAIL,
  GET_ALL_RESOURCES_LIST_REQUEST,
  GET_ALL_RESOURCES_LIST_RESET,
  GET_ALL_RESOURCES_LIST_SUCCESS,
  GET_CREATE_RESOURCES_FAIL,
  GET_CREATE_RESOURCES_REQUEST,
  GET_CREATE_RESOURCES_RESET,
  GET_CREATE_RESOURCES_SUCCESS,
  POST_RESOURCES_FAIL,
  POST_RESOURCES_REQUEST,
  POST_RESOURCES_RESET,
  POST_RESOURCES_SUCCESS,
} from "./ResourcesConstants";

export const getAllInitialResourcesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RESOURCES_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_RESOURCES_INITIAL_DATA_SUCCESS:
      return {
        loading: false,
        allInitialData: action.payload,
      };
    case GET_ALL_RESOURCES_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_RESOURCES_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllInitialDataFromSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_INITIAL_DATA_FROM_SUBJECT_REQUEST:
      return { loading: true };
    case GET_ALL_INITIAL_DATA_FROM_SUBJECT_SUCCESS:
      return {
        loading: false,
        allInitialDataFromSubject: action.payload,
      };
    case GET_ALL_INITIAL_DATA_FROM_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_INITIAL_DATA_FROM_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllOtherOptionsForResourcesSelectReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_REQUEST:
      return { loading: true };
    case GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_SUCCESS:
      return {
        loading: false,
        allOtherResourcesOptions: action.payload,
      };
    case GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllResourcesListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RESOURCES_LIST_REQUEST:
      return { loading: true };
    case GET_ALL_RESOURCES_LIST_SUCCESS:
      return {
        loading: false,
        allResources: action.payload,
      };
    case GET_ALL_RESOURCES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_RESOURCES_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getCreateResourceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CREATE_RESOURCES_REQUEST:
      return { loading: true };
    case GET_CREATE_RESOURCES_SUCCESS:
      return {
        loading: false,
        getCreateResource: action.payload,
      };
    case GET_CREATE_RESOURCES_FAIL:
      return { loading: false, error: action.payload };
    case GET_CREATE_RESOURCES_RESET:
      return {};
    default:
      return state;
  }
};

export const postResourceReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_RESOURCES_REQUEST:
      return { loading: true };
    case POST_RESOURCES_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_RESOURCES_FAIL:
      return { loading: false, error: action.payload };
    case POST_RESOURCES_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadResourceReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_RESOURCES_REQUEST:
      return { loading: true };
    case DOWNLOAD_RESOURCES_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DOWNLOAD_RESOURCES_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_RESOURCES_RESET:
      return {};
    default:
      return state;
  }
};

