import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import uiReducer from "./uiReducer";
import allReducer from "./allReducer";
import eventReducer from "./eventReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  AR: allReducer,
  UI: uiReducer,
  ER: eventReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
