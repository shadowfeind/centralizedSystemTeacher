import {
  CREATE_SINGLE_SKILL_FAIL,
  CREATE_SINGLE_SKILL_REQUEST,
  CREATE_SINGLE_SKILL_RESET,
  CREATE_SINGLE_SKILL_SUCCESS,
  GET_ALL_SKILL_CREATE_FAIL,
  GET_ALL_SKILL_CREATE_REQUEST,
  GET_ALL_SKILL_CREATE_RESET,
  GET_ALL_SKILL_CREATE_SUCCESS,
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_REQUEST,
  GET_ALL_SKILL_RESET,
  GET_ALL_SKILL_SUCCESS,
  SKILL_CREATE_FAIL,
  SKILL_CREATE_REQUEST,
  SKILL_CREATE_RESET,
  SKILL_CREATE_SUCCESS,
} from "./SkillConstants";

export const getAllSkill = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SKILL_REQUEST:
      return { loading: true };
    case GET_ALL_SKILL_SUCCESS:
      return { loading: false, getAllSkill: action.payload };
    case GET_ALL_SKILL_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SKILL_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllSkillCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SKILL_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_SKILL_CREATE_SUCCESS:
      return { loading: false, getAllSkillCreate: action.payload };
    case GET_ALL_SKILL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SKILL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_SKILL_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_SKILL_SUCCESS:
      return { loading: false, createdSkill: action.payload, success: true };
    case CREATE_SINGLE_SKILL_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_SKILL_RESET:
      return {};
    default:
      return state;
  }
};


export const skillCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILL_CREATE_REQUEST:
      return { loading: true };
    case SKILL_CREATE_SUCCESS:
      return { loading: false, skillCreate: action.payload, success: true };
    case SKILL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

