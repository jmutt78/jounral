import _ from "lodash";
import {
  FETCH_JOURNAL,
  FETCH_JOURNALS,
  DELETE_JOURNAL,
  EDIT_JOURNAL,
  ADD_JOURNAL
} from "../actions/type.js";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_JOURNALS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_JOURNAL:
      return {
        ...state,
        [action.payload.id]: {
          journal: action.payload.journal
        }
      };

    case ADD_JOURNAL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };

    case EDIT_JOURNAL:
      console.log(state, "payload");
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };

    case DELETE_JOURNAL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
