import axios from "axios";
import history from "../history";
import { SIGNIN_API, LOGIN_API, THANKFUL_API, GOAL_API } from "../api/apis.js";
import { config } from "../api/config.js";
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_THANKFULS,
  FETCH_THANKFUL,
  ADD_THANKFUL,
  EDIT_THANKFUL,
  DELETE_THANKFUL,
  FETCH_GOALS,
  FETCH_GOAL,
  ADD_GOAL,
  EDIT_GOAL,
  DELETE_GOAL
} from "./type.js";

//-------------------Journal api calls---------------------//
export const addThankful = formValues => async dispatch => {
  let data = {
    answer: formValues.thankful
  };
  const response = await axios.post(THANKFUL_API, data, config);
  dispatch({ type: ADD_THANKFUL, payload: response.data });
};

export const fetchThankfuls = () => async dispatch => {
  const response = await axios.get(THANKFUL_API, config);
  dispatch({ type: FETCH_THANKFULS, payload: response.data });
};

export const fetchThankful = id => async dispatch => {
  const response = await axios.get(`${THANKFUL_API}/${id}`, config);
  dispatch({ type: FETCH_THANKFUL, payload: response.data });
};
//-------------------Goal api calls---------------------//
export const addGoal = formValues => async dispatch => {
  let data = {
    answer: formValues.goal,
    type: formValues.type
  };
  const response = await axios.post(GOAL_API, data, config);
  dispatch({ type: ADD_GOAL, payload: response.data });
};

export const fetchGoals = () => async dispatch => {
  const response = await axios.get(GOAL_API, config);
  dispatch({ type: FETCH_GOALS, payload: response.data });
};

export const fetchGoal = id => async dispatch => {
  const response = await axios.get(`${GOAL_API}/${id}`, config);
  dispatch({ type: FETCH_GOAL, payload: response.data });
};
//-------------------Authorization-----------------------//
export const signup = formProps => async dispatch => {
  try {
    const response = await axios.post(SIGNIN_API, {
      username: formProps.email,
      password: formProps.password,
      firstName: formProps.firstname,
      lastName: formProps.lastname
    });
    dispatch({ type: AUTH_USER, payload: response.data });
    history.push("/login");
    alert("Success! Please Login!");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email is taken" });
  }
};

export const signin = formProps => async dispatch => {
  try {
    const response = await axios.post(LOGIN_API, {
      username: formProps.email,
      password: formProps.password
    });
    dispatch({ type: AUTH_USER, payload: response.data.authToken });
    localStorage.setItem("token", response.data.authToken);
    history.push("/journal");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid email or password" });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem("token");

  dispatch({
    type: AUTH_USER,
    payload: ""
  });
};
