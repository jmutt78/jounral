import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import combineReducers from "./reducers/index";

export default function configureStore(initialState) {
  return createStore(
    combineReducers,
    { auth: { authenticated: localStorage.getItem("token") } },
    applyMiddleware(reduxThunk)
  );
}
