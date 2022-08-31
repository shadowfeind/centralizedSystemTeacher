import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";
export const ZOOM_API_KEY = "pjaQwxmzQHqA4rW_FzHHFg";
export const ZOOM_API_SCERET = "X5xHThKpuovnXozmtZOhCQ2fni5cbllE5tXx";
export const ZOOM_JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InBqYVF3eG16UUhxQTRyV19GekhIRmciLCJleHAiOjE2NjIyODMxOTIsImlhdCI6MTY2MTY3ODM5Mn0.tCFN36DZF3bjBFQ2jWmhm2MxEQcyskMaFLm0ho7dFuY";

export const API_URL = "https://school.vidyacube.com";
export const USER_SESSION = sessionStorage.getItem("blueberrytoken");

//for fcm token
export const tokenHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=AAAACB9i9IE:APA91bEuqomtN9gss5UOVzngtIofWkWo9tUWAZ_2LYBNeKbuZXXns-S6NuBWEgYCnQj8gsI6YbvlbxKIByeYvHjgf2U-GjTTPCB44_K6yjcPhvDHqQD5WaUCshNEDzAuz3r91MeBJe3D`,
  },
};

export const tokenConfig = () => {
  const user = sessionStorage.getItem("blueberrytoken");

  if (user) {
    const tokenReturn = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };
    return tokenReturn;
  } else {
    return {};
  }
};

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (req) => {
  const userSession = sessionStorage.getItem("blueberrytoken");
  const userRefreshToken = sessionStorage.getItem("blueberryrefreshtoken");
  const user = jwt_decode(userSession);
  const isExpired = user.exp - moment().unix() < 1;
  console.log(user.exp);
  console.log(moment.unix(user.exp));
  console.log(moment().unix());
  console.log("isExpired", isExpired);

  if (!isExpired) return req;

  const dataForRefreshToken = {
    AccessToken: userSession,
    RefreshToken: userRefreshToken,
  };

  const JSONdata = JSON.stringify(dataForRefreshToken);
  const config = { headers: { "Content-Type": "application/json" } };

  console.log(JSONdata);

  try {
    const { data } = await axios.post(
      `${API_URL}/api/RefreshTokenGenerator/RefreshToken`,
      JSONdata,
      config
    );
    console.log(data);

    sessionStorage.setItem("blueberrytoken", data.AccessToken);
    sessionStorage.setItem("blueberryrefreshtoken", data.RefreshToken);
    req.headers.Authorization = `Bearer ${data.AccessToken}`;
  } catch (error) {
    console.log(
      error.response.data.Message ? error.response.data.Message : error.message
    );
  }

  return req;
});
