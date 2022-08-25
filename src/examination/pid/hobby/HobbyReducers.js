import {
  CREATE_SINGLE_HOBBY_FAIL,
  CREATE_SINGLE_HOBBY_REQUEST,
  CREATE_SINGLE_HOBBY_RESET,
  CREATE_SINGLE_HOBBY_SUCCESS,
  GET_ALL_HOBBY_CREATE_FAIL,
  GET_ALL_HOBBY_CREATE_REQUEST,
  GET_ALL_HOBBY_CREATE_RESET,
  GET_ALL_HOBBY_CREATE_SUCCESS,
  GET_ALL_HOBBY_FAIL,
  GET_ALL_HOBBY_REQUEST,
  GET_ALL_HOBBY_RESET,
  GET_ALL_HOBBY_SUCCESS,
  HOBBY_CREATE_FAIL,
  HOBBY_CREATE_REQUEST,
  HOBBY_CREATE_RESET,
  HOBBY_CREATE_SUCCESS,
} from "./HobbyConstants";

export const getAllHobby = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOBBY_REQUEST:
      return { loading: true };
    case GET_ALL_HOBBY_SUCCESS:
      return { loading: false, getAllHobby: action.payload };
    case GET_ALL_HOBBY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HOBBY_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllHobbyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOBBY_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_HOBBY_CREATE_SUCCESS:
      return { loading: false, getAllHobbyCreate: action.payload };
    case GET_ALL_HOBBY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HOBBY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleHobbyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_HOBBY_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_HOBBY_SUCCESS:
      return { loading: false, createdHobby: action.payload, success: true };
    case CREATE_SINGLE_HOBBY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_HOBBY_RESET:
      return {};
    default:
      return state;
  }
};

export const hobbyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOBBY_CREATE_REQUEST:
      return { loading: true };
    case HOBBY_CREATE_SUCCESS:
      return { loading: false, hobbyCreate: action.payload, success: true };
    case HOBBY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HOBBY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

