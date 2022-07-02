import { createStore, combineReducers } from "redux";

// Reducers
import user from "./Reducers/user";

export default createStore(combineReducers({ user }));