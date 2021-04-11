import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    'login',
    'logout',
  ],
};

const appDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  data: appDataReducer
});