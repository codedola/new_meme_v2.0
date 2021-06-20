import { SHOW_LOADING, HIDE_LOADING } from "./actions";

const initState = {
    isLoading: false,
};

export default function appReducer(stateApp = initState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...stateApp,
                isLoading: true,
            };

        case HIDE_LOADING:
            return {
                ...stateApp,
                isLoading: false,
            };

        default:
            return stateApp;
    }
}
