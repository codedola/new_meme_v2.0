import { api } from "./api";

export const AuthService = {
    Login({ email, password }) {
        return api.call().post("/member/login.php", {
            email,
            password,
        });
    },
    register({ email, fullname, password, repassword }) {
        return api.call().post("/member/register.php", {
            email,
            fullname,
            password,
            repassword,
        });
    },
    checkToken({ token }) {
        return api.call().post("/member/checktoken.php", {
            token,
        });
    },
    changePassword({ oldPassword, newPassword, reNewPassword }) {
        return api.callWithAuth().post("/member/password.php", {
            oldPassword,
            newPassword,
            reNewPassword,
        });
    },
};
