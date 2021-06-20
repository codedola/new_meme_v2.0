import { ACT_FETH_LOGIN, ACT_LOGOUT_SUCCESS } from "./actions";
import Storage from "../../utilities/Storage";
const initState = {
    token: Storage.getToken() || "",
};

export default function authReducer(stateAuth = initState, action) {
    switch (action.type) {
        case ACT_FETH_LOGIN:
            const { token } = action.payload;
            return {
                ...stateAuth,
                token,
            };
        case ACT_LOGOUT_SUCCESS:
            return {
                ...stateAuth,
                token: "",
            };
        default:
            return stateAuth;
    }
}
