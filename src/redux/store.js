import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";

import userReducer from "./reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({userReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;



