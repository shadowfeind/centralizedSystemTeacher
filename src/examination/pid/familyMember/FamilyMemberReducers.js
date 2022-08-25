import { GET_ALL_FAMILYMEMBER_FAIL, 
    GET_ALL_FAMILYMEMBER_REQUEST, 
    GET_ALL_FAMILYMEMBER_RESET, 
    GET_ALL_FAMILYMEMBER_SUCCESS,
    CREATE_SINGLE_FAMILYMEMBER_REQUEST,
    CREATE_SINGLE_FAMILYMEMBER_SUCCESS,
    CREATE_SINGLE_FAMILYMEMBER_FAIL,
    CREATE_SINGLE_FAMILYMEMBER_RESET,
    GET_ALL_FAMILYMEMBER_CREATE_REQUEST,
    GET_ALL_FAMILYMEMBER_CREATE_SUCCESS,
    GET_ALL_FAMILYMEMBER_CREATE_FAIL,
    GET_ALL_FAMILYMEMBER_CREATE_RESET,
    FAMILYMEMBER_CREATE_REQUEST,
    FAMILYMEMBER_CREATE_SUCCESS,
    FAMILYMEMBER_CREATE_FAIL,
    FAMILYMEMBER_CREATE_RESET,  
  } from "./FamilyMemberConstants";

export const getAllFamilyMember = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_FAMILYMEMBER_REQUEST:
        return { loading: true };
      case GET_ALL_FAMILYMEMBER_SUCCESS:
        return { loading: false, getAllFamilyMember: action.payload };
      case GET_ALL_FAMILYMEMBER_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_FAMILYMEMBER_RESET:
        return {};
      default:
        return state;
    }
  };

  export const createSingleFamilyMemberReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_SINGLE_FAMILYMEMBER_REQUEST:
        return { loading: true };
      case CREATE_SINGLE_FAMILYMEMBER_SUCCESS:
        return { loading: false, createdFamilyMember: action.payload, success: true };
      case CREATE_SINGLE_FAMILYMEMBER_FAIL:
        return { loading: false, error: action.payload };
      case CREATE_SINGLE_FAMILYMEMBER_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getAllFamilyMemberCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_FAMILYMEMBER_CREATE_REQUEST:
        return { loading: true };
      case GET_ALL_FAMILYMEMBER_CREATE_SUCCESS:
        return { loading: false, getAllFamilyMemberCreate: action.payload };
      case GET_ALL_FAMILYMEMBER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_FAMILYMEMBER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };


export const familyMemberCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILYMEMBER_CREATE_REQUEST:
      return { loading: true };
    case FAMILYMEMBER_CREATE_SUCCESS:
      return { loading: false, familyMemberCreate: action.payload, success: true };
    case FAMILYMEMBER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FAMILYMEMBER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

  