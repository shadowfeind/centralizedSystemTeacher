import { GET_ALL_CONTACTADDRESS_FAIL,
     GET_ALL_CONTACTADDRESS_REQUEST,
      GET_ALL_CONTACTADDRESS_RESET,
       GET_ALL_CONTACTADDRESS_SUCCESS, 
       GET_SINGLE_CONTACTADDRESS_FAIL, 
       GET_SINGLE_CONTACTADDRESS_REQUEST,
       GET_SINGLE_CONTACTADDRESS_RESET,
       GET_SINGLE_CONTACTADDRESS_SUCCESS,
       UPDATE_SINGLE_CONTACTADDRESS_FAIL,
       UPDATE_SINGLE_CONTACTADDRESS_REQUEST,
       UPDATE_SINGLE_CONTACTADDRESS_RESET,
       UPDATE_SINGLE_CONTACTADDRESS_SUCCESS} from "./ContactAddressConstants";

export const getAllContactAddress = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_CONTACTADDRESS_REQUEST:
        return { loading: true };
      case GET_ALL_CONTACTADDRESS_SUCCESS:
        return { loading: false, getAllContactAddress: action.payload };
      case GET_ALL_CONTACTADDRESS_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_CONTACTADDRESS_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getSingleContactAddressReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_CONTACTADDRESS_REQUEST:
        return { loading: true };
      case GET_SINGLE_CONTACTADDRESS_SUCCESS:
        return { loading: false, singleContactAddress: action.payload };
      case GET_SINGLE_CONTACTADDRESS_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_CONTACTADDRESS_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const updateSingleContactAddressReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_SINGLE_CONTACTADDRESS_REQUEST:
        return { loading: true };
      case UPDATE_SINGLE_CONTACTADDRESS_SUCCESS:
        return { loading: false, updatedContactAddress: action.payload, success: true };
      case UPDATE_SINGLE_CONTACTADDRESS_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_SINGLE_CONTACTADDRESS_RESET:
        return {};
      default:
        return state;
    }
  };