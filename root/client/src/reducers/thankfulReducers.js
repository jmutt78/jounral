import _ from "lodash";
import {
  FETCH_THANKFUL,
  FETCH_THANKFULS,
  DELETE_THANKFUL,
  EDIT_THANKFUL,
  ADD_THANKFUL
} from "../actions/type.js";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_THANKFULS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_THANKFUL:
      return {
        ...state,
        [action.payload.id]: {
          thankful: action.payload.thankful
        }
      };

    case ADD_THANKFUL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };

    case EDIT_THANKFUL:
      console.log(state, "payload");
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };

    case DELETE_THANKFUL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
