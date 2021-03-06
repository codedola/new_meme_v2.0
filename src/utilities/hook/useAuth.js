import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector } from "react-redux";
//
export default function useAuth() {
    const history = useHistory();
    const location = useLocation();
    const token = useSelector((state) => state.Auth.token);

    useEffect(() => {
        if (token === "" || !token) {
            history.push(PATHS.LOGIN);
        }
    }, [location, history, token]);
}
