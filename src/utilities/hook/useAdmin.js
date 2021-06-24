import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector } from "react-redux";
//
export default function useAdmin() {
    const history = useHistory();
    const location = useLocation();
    const token = useSelector((state) => state.Auth.token);
    const currentUser = useSelector((state) => state.User.currentUser);
    const isAdmin = currentUser?.permission === "admin";
    useEffect(() => {
        if (token === "" || !token || !isAdmin) {
            history.push(PATHS.LOGIN);
        }
    }, [location, history, token, isAdmin]);
}
