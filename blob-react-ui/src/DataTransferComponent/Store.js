// store.js
// import React from 'react';
import { createStore } from 'redux';
// import { Provider } from 'react-redux';

const initialState = { count: 0 };
function reducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
// export const store = createStore(reducer);
export default createStore(reducer);