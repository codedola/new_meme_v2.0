import { AuthService } from "../../services/authService";
import { actFetchCurrentUser } from "../user/actions";
import Storage from "../../utilities/Storage";
import { actHideLoading, actShowLoading } from "../app/actions";
//
const nameSpace = "auth:";

export const ACT_FETH_LOGIN = `${nameSpace}ACT_FETH_LOGIN`;
export const ACT_LOGOUT_SUCCESS = `${nameSpace}ACT_LOGOUT_SUCCESS`;

//ACTION
export const actFetchLogin = ({ token }) => {
    return {
        type: ACT_FETH_LOGIN,
        payload: {
            token,
        },
    };
};

export const actLogoutSuccess = () => {
    Storage.removeToken();
    return {
        type: ACT_LOGOUT_SUCCESS,
    };
};

// ACTION ASYNC
export const actFetchLoginAsync = ({ email, password }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await AuthService.Login({ email, password });
            dispatch(actHideLoading());
            if (response?.data?.status === 200) {
                const { user, token, message } = response.data;
                dispatch(actFetchLogin({ token }));
                dispatch(actFetchCurrentUser({ user }));
                Storage.setToken(token);

                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: response.data.error.join(" "),
                };
            }
        } catch (error) {
            return {
                message: "Error Login!",
            };
        }
    };
};

export const actChangePasswordAsync = ({
    oldPassword,
    newPassword,
    reNewPassword,
}) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());

            const response = await AuthService.changePassword({
                oldPassword,
                newPassword,
                reNewPassword,
            });
            console.log("response changepassword", response);
            dispatch(actHideLoading());

            if (response?.data?.status === 200) {
                const { message } = response.data;
                dispatch(actLogoutSuccess());
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: response.data.error,
                };
            }
        } catch (error) {
            return {
                ok: false,
                message: "Có lỗi xảy ra. Xin nhập lại mật khẩu",
            };
        }
    };
};

export const actRegisterAsync = ({ email, fullname, password, repassword }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await AuthService.register({
                email,
                fullname,
                password,
                repassword,
            });
            dispatch(actHideLoading());
            if (response?.data?.status === 200) {
                const { message } = response.data;
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Đăng nhập thất bại!",
                };
            }
        } catch (error) {
            return {
                ok: false,
                message: "Có lỗi xảy ra",
            };
        }
    };
};
