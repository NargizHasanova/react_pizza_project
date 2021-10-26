import { combineReducers } from "redux";
import { counterReducer } from "./Reducers";

export const rootReducer = combineReducers({
    counter: counterReducer
})