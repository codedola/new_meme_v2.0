import { combineReducers } from "redux";
import postReducer from "./post/reducer";
import categoryReducer from "./category/reducer";
import commentReducer from "./comment/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import appReducer from "./app/reducer";
const rootReducers = combineReducers({
    Posts: postReducer,
    Categories: categoryReducer,
    Comments: commentReducer,
    Auth: authReducer,
    User: userReducer,
    App: appReducer,
});

export default rootReducers;
