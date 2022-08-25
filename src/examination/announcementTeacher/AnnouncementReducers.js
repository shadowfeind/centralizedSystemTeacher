import {
  ANNOUNCEMENT_TEACHER_FCM_FAIL,
  ANNOUNCEMENT_TEACHER_FCM_REQUEST,
  ANNOUNCEMENT_TEACHER_FCM_RESET,
  ANNOUNCEMENT_TEACHER_FCM_SUCCESS,
  GET_ALL_ANNOUNCEMENT_TEACHER_FAIL,
  GET_ALL_ANNOUNCEMENT_TEACHER_REQUEST,
  GET_ALL_ANNOUNCEMENT_TEACHER_RESET,
  GET_ALL_ANNOUNCEMENT_TEACHER_SUCCESS,
  GET_LIST_ANNOUNCEMENT_TEACHER_FAIL,
  GET_LIST_ANNOUNCEMENT_TEACHER_REQUEST,
  GET_LIST_ANNOUNCEMENT_TEACHER_RESET,
  GET_LIST_ANNOUNCEMENT_TEACHER_SUCCESS,
} from "./AnnouncementConstant";

export const getAllTeacherAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT_TEACHER_REQUEST:
      return { loading: true };
    case GET_ALL_ANNOUNCEMENT_TEACHER_SUCCESS:
      return { loading: false, announcement: action.payload };
    case GET_ALL_ANNOUNCEMENT_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ANNOUNCEMENT_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};


export const getListTeacherAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ANNOUNCEMENT_TEACHER_REQUEST:
      return { loading: true };
    case GET_LIST_ANNOUNCEMENT_TEACHER_SUCCESS:
      return { loading: false, announcementList: action.payload };
    case GET_LIST_ANNOUNCEMENT_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ANNOUNCEMENT_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};

export const getFCMForTeacherAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_TEACHER_FCM_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_TEACHER_FCM_SUCCESS:
      return { loading: false, announcementFCM: action.payload };
    case ANNOUNCEMENT_TEACHER_FCM_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_TEACHER_FCM_RESET:
      return {};
    default:
      return state;
  }
};
