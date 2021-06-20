import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector } from "react-redux";
//
export default function useNotAuth() {
    const history = useHistory();
    const location = useLocation();
    const token = useSelector((state) => state.Auth.token);

    useEffect(() => {
        if (token) {
            history.push(PATHS.HOMEPAGE);
        }
    }, [location, history, token]);
}
