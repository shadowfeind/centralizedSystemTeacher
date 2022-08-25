import { GET_ALL_GUARDIAN_FAIL,
     GET_ALL_GUARDIAN_REQUEST,
      GET_ALL_GUARDIAN_RESET,
       GET_ALL_GUARDIAN_SUCCESS, 
       GET_SINGLE_GUARDIAN_FAIL, 
       GET_SINGLE_GUARDIAN_REQUEST,
       GET_SINGLE_GUARDIAN_RESET,
       GET_SINGLE_GUARDIAN_SUCCESS,
       UPDATE_SINGLE_GUARDIAN_FAIL,
       UPDATE_SINGLE_GUARDIAN_REQUEST,
       UPDATE_SINGLE_GUARDIAN_RESET,
       UPDATE_SINGLE_GUARDIAN_SUCCESS} from "./GuardianConstants";

export const getAllGuardian = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_GUARDIAN_REQUEST:
        return { loading: true };
      case GET_ALL_GUARDIAN_SUCCESS:
        return { loading: false, getAllGuardian: action.payload };
      case GET_ALL_GUARDIAN_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_GUARDIAN_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getSingleGuardianReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_GUARDIAN_REQUEST:
        return { loading: true };
      case GET_SINGLE_GUARDIAN_SUCCESS:
        return { loading: false, singleGuardian: action.payload };
      case GET_SINGLE_GUARDIAN_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_GUARDIAN_RESET:
        return {};
      default:
        return state;
    }
  };

  export const updateSingleGuardianReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_SINGLE_GUARDIAN_REQUEST:
        return { loading: true };
      case UPDATE_SINGLE_GUARDIAN_SUCCESS:
        return { loading: false, updatedGuardian: action.payload, success: true };
      case UPDATE_SINGLE_GUARDIAN_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_SINGLE_GUARDIAN_RESET:
        return {};
      default:
        return state;
    }
  };
  