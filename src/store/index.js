import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducers";
import logger from "redux-logger";
import thunkMiddle from "redux-thunk";

let thunkItems = [];
if (process.env.NODE_ENV === "development") {
    thunkItems.push(logger);
    if (window.location.href.includes("herokuapp")) {
        thunkItems = [];
    }
} else {
    thunkItems = [];
}
const Store = createStore(
    rootReducers,
    applyMiddleware(thunkMiddle, ...thunkItems)
);

export default Store;
