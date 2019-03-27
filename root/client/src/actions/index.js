import axios from "axios";
import _ from "lodash";
import history from "../history";
import {
  SIGNIN_API,
  LOGIN_API,
  THANKFUL_API,
  GOAL_API,
  JOURNAL_API,
  RESET_API,
  FORGOT_API,
  COMFIRM_API
} from "../api/apis.js";
import { config } from "../api/config.js";
import {
  AUTH_USER,
  AUTH_ERROR,
  USER_SIGNUP,
  FETCH_THANKFULS,
  FETCH_THANKFUL,
  ADD_THANKFUL,
  EDIT_THANKFUL,
  DELETE_THANKFUL,
  FETCH_GOALS,
  FETCH_GOAL,
  ADD_GOAL,
  EDIT_GOAL,
  DELETE_GOAL,
  COMPLETE_GOAL,
  FETCH_JOURNALS,
  FETCH_JOURNAL,
  ADD_JOURNAL,
  EDIT_JOURNAL,
  DELETE_JOURNAL,
  USER_RESET,
  FORGOT_RESET,
  COMFIRM_EMAIL
} from "./type.js";

//-------------------Thankful api calls---------------------//
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

export const editThankful = (id, formValues) => async dispatch => {
  let data = {
    id: id,
    answer: formValues.answer,
    type: formValues.type,
    Completed: formValues.completed
  };
  const response = await axios.put(`${THANKFUL_API}/${id}`, data, config);
  dispatch({
    type: EDIT_THANKFUL,
    payload: _.pick(data, "answer", "type", "id")
  });
};

export const deleteThankful = id => async dispatch => {
  const response = await axios.delete(`${THANKFUL_API}/${id}`, config);
  dispatch({ type: DELETE_THANKFUL, payload: { id } });
};

//-------------------journal api calls---------------------//
export const addJournal = formValues => async dispatch => {
  let data = {
    daily: formValues.daily,
    great: formValues.great
  };
  const response = await axios.post(JOURNAL_API, data, config);
  dispatch({ type: ADD_JOURNAL, payload: response.data });
};

export const fetchJournals = () => async dispatch => {
  const response = await axios.get(JOURNAL_API, config);

  dispatch({ type: FETCH_JOURNALS, payload: response.data });
};

export const fetchJournal = id => async dispatch => {
  const response = await axios.get(`${JOURNAL_API}/${id}`, config);
  dispatch({ type: FETCH_JOURNAL, payload: response.data });
};

export const editJournal = (id, formValues) => async dispatch => {
  let data = {
    id: id,
    daily: formValues.daily,
    great: formValues.great
  };
  const response = await axios.put(`${JOURNAL_API}/${id}`, data, config);
  dispatch({
    type: EDIT_JOURNAL,
    payload: _.pick(data, "great", "daily", "id")
  });
};

export const deleteJournal = id => async dispatch => {
  const response = await axios.delete(`${JOURNAL_API}/${id}`, config);
  dispatch({ type: DELETE_JOURNAL, payload: { id } });
};

//-------------------Goal api calls---------------------//
export const addGoal = formValues => async dispatch => {
  let data = {
    answer: formValues.answer,
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

export const editGoal = (id, formValues) => async dispatch => {
  let data = {
    id: id,
    answer: formValues.answer,
    type: formValues.type,
    Completed: formValues.completed
  };
  const response = await axios.put(`${GOAL_API}/${id}`, data, config);
  dispatch({ type: EDIT_GOAL, payload: _.pick(data, "answer", "type", "id") });
};

export const deleteGoal = id => async dispatch => {
  const response = await axios.delete(`${GOAL_API}/${id}`, config);
  dispatch({ type: DELETE_GOAL, payload: { id } });
};

export const completeGoal = (id, formValues) => async dispatch => {
  let data = {
    id: id,
    completed: true
  };
  const response = await axios.put(`${GOAL_API}/${id}`, data, config);
  dispatch({
    type: COMPLETE_GOAL,
    payload: _.pick(data, "answer", "type", "id", "completed")
  });
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
    dispatch({ type: COMFIRM_EMAIL, payload: response.data });
    const comfirm = await axios.post(COMFIRM_API, {
      username: formProps.email
    });
    dispatch({ type: USER_SIGNUP, payload: comfirm.data });
    history.push("/");
    alert("Success! Please check your email!");
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
    console.log(response);
    dispatch({ type: AUTH_USER, payload: response.data.authToken });
    localStorage.setItem("token", response.data.authToken);
    history.push("/journal");
  } catch (e) {
    if (e.response.status === 403) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Please comfirm your account, check your email"
      });
    } else {
      dispatch({ type: AUTH_ERROR, payload: "Invalid email or password" });
    }
  }
};

export const resetPassword = (token, formProps) => async dispatch => {
  console.log(RESET_API, token);
  try {
    const response = await axios.put(`${RESET_API}/${token}`, {
      password: formProps.password
    });

    dispatch({ type: USER_RESET, payload: response.data });
    history.push("/login");
    alert("Success! Please check your email!");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Sorry your password did not work" });
  }
};

export const forgortPassword = formProps => async dispatch => {
  try {
    console.log(FORGOT_API);
    const response = await axios.post(FORGOT_API, {
      username: formProps.email
    });
    dispatch({ type: FORGOT_RESET, payload: response.data });
    history.push("/login");
    alert("Success! Please check your email!");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Sorry your email did not work" });
  }
};

export const signout = state => dispatch => {
  localStorage.removeItem("token");
  state = undefined;
  dispatch({
    type: AUTH_USER,
    payload: ""
  });
};
