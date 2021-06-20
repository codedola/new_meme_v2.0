import React, { useCallback } from "react";
import "../../components/Login/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import LoginForm from "../../components/Login/Login.Form";
import LoadingPage from "../../components/Loading";
import { actFetchLoginAsync } from "../../store/auth/actions";
import { NotificationManager } from "react-notifications";
import { useNotAuth } from "../../utilities/hook";

//
export default function Login() {
    useNotAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector((state) => state.App.isLoading);

    const handleLogin = useCallback(
        ({ email, password }) => {
            dispatch(actFetchLoginAsync({ email, password })).then((res) => {
                if (res.ok) {
                    NotificationManager.success(res.message);
                    history.push(PATHS.HOMEPAGE);
                } else {
                    NotificationManager.error(res.message);
                }
            });
        },
        [dispatch, history]
    );

    const injectedPropsLoginFrom = {
        handleLogin,
    };
    return (
        <main>
            <div className='ass1-login'>
                <LoginForm {...injectedPropsLoginFrom} />
            </div>
            <LoadingPage isLoading={isLoading} />
        </main>
    );
}
