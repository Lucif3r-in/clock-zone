import { combineReducers } from "redux";
import Cookies from "js-cookie";
import { arrayMove } from "react-sortable-hoc";

import {
  ADD_TIMEZONE,
  DELETE_TIMEZONE,
  LOAD_COOKIE,
  SORT_TIMEZONES,
} from "../timezone/index";

const COOKIE_EXPIRES = 365 * 5;

const timezonesReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TIMEZONE: {
      const updatedTimezones = [payload, ...state];
      Cookies.set("timezones", updatedTimezones, { expires: COOKIE_EXPIRES });
      return updatedTimezones;
    }

    case DELETE_TIMEZONE: {
      const updatedTimezones = state.filter((name) => name !== payload);
      Cookies.set("timezones", updatedTimezones, { expires: COOKIE_EXPIRES });
      return updatedTimezones;
    }

    case LOAD_COOKIE: {
      return payload || state;
    }

    case SORT_TIMEZONES: {
      const { oldIndex, newIndex } = payload;
      const updatedTimezones = arrayMove(state, oldIndex, newIndex);
      Cookies.set("timezones", updatedTimezones, { expires: COOKIE_EXPIRES });
      return updatedTimezones;
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  timezones: timezonesReducer,
});

export default rootReducer;
