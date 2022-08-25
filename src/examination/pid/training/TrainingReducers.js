import {
  CREATE_SINGLE_TRAINING_FAIL,
  CREATE_SINGLE_TRAINING_REQUEST,
  CREATE_SINGLE_TRAINING_RESET,
  CREATE_SINGLE_TRAINING_SUCCESS,
  GET_ALL_TRAINING_CREATE_FAIL,
  GET_ALL_TRAINING_CREATE_REQUEST,
  GET_ALL_TRAINING_CREATE_RESET,
  GET_ALL_TRAINING_CREATE_SUCCESS,
  GET_ALL_TRAINING_FAIL,
  GET_ALL_TRAINING_REQUEST,
  GET_ALL_TRAINING_RESET,
  GET_ALL_TRAINING_SUCCESS,
  TRAINING_CREATE_FAIL,
  TRAINING_CREATE_REQUEST,
  TRAINING_CREATE_RESET,
  TRAINING_CREATE_SUCCESS,
} from "./TrainingConstants";

export const getAllTraining = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TRAINING_REQUEST:
      return { loading: true };
    case GET_ALL_TRAINING_SUCCESS:
      return { loading: false, getAllTraining: action.payload };
    case GET_ALL_TRAINING_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TRAINING_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllTrainingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TRAINING_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_TRAINING_CREATE_SUCCESS:
      return { loading: false, getAllTrainingCreate: action.payload };
    case GET_ALL_TRAINING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TRAINING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_TRAINING_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_TRAINING_SUCCESS:
      return { loading: false, createdTraining: action.payload, success: true };
    case CREATE_SINGLE_TRAINING_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_TRAINING_RESET:
      return {};
    default:
      return state;
  }
};


export const trainingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINING_CREATE_REQUEST:
      return { loading: true };
    case TRAINING_CREATE_SUCCESS:
      return { loading: false, trainingCreate: action.payload, success: true };
    case TRAINING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

