import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducers";
import logger from "redux-logger";
import thunkMiddle from "redux-thunk";

const Store = createStore(rootReducers, applyMiddleware(thunkMiddle, logger));

export default Store;
