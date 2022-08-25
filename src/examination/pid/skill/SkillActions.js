import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_SKILL_FAIL,
  CREATE_SINGLE_SKILL_REQUEST,
  CREATE_SINGLE_SKILL_SUCCESS,
  GET_ALL_SKILL_CREATE_FAIL,
  GET_ALL_SKILL_CREATE_REQUEST,
  GET_ALL_SKILL_CREATE_SUCCESS,
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_REQUEST,
  GET_ALL_SKILL_SUCCESS,
  SKILL_CREATE_FAIL,
  SKILL_CREATE_REQUEST,
  SKILL_CREATE_SUCCESS,
} from "./SkillConstants";

export const getAllSkillAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SKILL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Skill/GetAllPIDSkill`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SKILL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllSkillCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SKILL_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSingleCreatePIDSkill
      `,
      tokenConfig
    );

    dispatch({ type: GET_ALL_SKILL_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SKILL_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const createSingleSkillAction = (skill) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SINGLE_SKILL_REQUEST });

    const jsonData = JSON.stringify({ dbModel: skill });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    const { data } = await axios.put(
      `${API_URL}/api/PID_Skill/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: CREATE_SINGLE_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SINGLE_SKILL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const skillCreateAction = (skillCreate) => async (dispatch) => {
  try {
    dispatch({ type: SKILL_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: skillCreate });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/PID_Skill/Post`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: SKILL_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SKILL_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
