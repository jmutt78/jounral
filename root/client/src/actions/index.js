import axios from "axios";
import history from "../history";
import { SIGNIN_API, LOGIN_API } from "../api/apis.js";
import { config } from "../api/config.js";
import { AUTH_USER, AUTH_ERROR } from "./type.js";

//-------------------api calls-----------------------

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
    history.push("/course");
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
