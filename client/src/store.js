import { createStore, combineReducers } from "redux";

// Reducers
import user from "./reducers/user";
import notes from "./reducers/note";

export default createStore(combineReducers({ user, notes }));