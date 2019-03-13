import _ from "lodash";
import {
  FETCH_GOAL,
  FETCH_GOALS,
  DELETE_GOAL,
  EDIT_GOAL,
  COMPLETE_GOAL
} from "../actions/type.js";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GOALS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_GOAL:
      return {
        ...state,
        [action.payload.id]: {
          goal: action.payload.answer,
          type: action.payload.type,
          completed: action.payload.completed
        }
      };
    case EDIT_GOAL:
      console.log(state, "payload");
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };
    case COMPLETE_GOAL:
      console.log(state, "payload");
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };

    case DELETE_GOAL:
      return _.omit(state, action.payload.id);
    default:
      return state;
  }
};
