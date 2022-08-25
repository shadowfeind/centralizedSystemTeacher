import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./combineReducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
