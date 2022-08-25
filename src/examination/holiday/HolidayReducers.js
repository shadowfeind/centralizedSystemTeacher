import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_RESET,
  GET_ALL_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHoliday = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOLIDAY_REQUEST:
      return { loading: true };
    case GET_ALL_HOLIDAY_SUCCESS:
      return { loading: false, holiday: action.payload };
    case GET_ALL_HOLIDAY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HOLIDAY_RESET:
      return {};
    default:
      return state;
  }
};
