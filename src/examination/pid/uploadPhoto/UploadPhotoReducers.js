import {
  GET_ALL_UPLOADPHOTO_FAIL,
  GET_ALL_UPLOADPHOTO_REQUEST,
  GET_ALL_UPLOADPHOTO_RESET,
  GET_ALL_UPLOADPHOTO_SUCCESS,
  UPLOADPHOTO_FAIL,
  UPLOADPHOTO_REQUEST,
  UPLOADPHOTO_RESET,
  UPLOADPHOTO_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_UPLOADPHOTO_REQUEST:
      return { loading: true };
    case GET_ALL_UPLOADPHOTO_SUCCESS:
      return { loading: false,allUploadPhoto: action.payload };
    case GET_ALL_UPLOADPHOTO_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_UPLOADPHOTO_RESET:
      return {};
    default:
      return state;
  }
};

export const uploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOADPHOTO_REQUEST:
      return { loading: true };
    case UPLOADPHOTO_SUCCESS:
      return { loading: false, success: true };
    case UPLOADPHOTO_FAIL:
      return { loading: false, error: action.payload };
    case UPLOADPHOTO_RESET:
      return {};
    default:
      return state;
  }
};
