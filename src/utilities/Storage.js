import parseJwt from "./parseJwt";
export const KEY_TOKEN = "MEME_TOKEN";

const Storage = {
    setToken(token) {
        localStorage.setItem(KEY_TOKEN, token);
    },
    getToken() {
        const token = localStorage.getItem(KEY_TOKEN);
        try {
            const parseObj = parseJwt(token);
            if (parseObj && parseObj.id) {
                return token;
            } else {
                localStorage.removeItem(KEY_TOKEN);
                return "";
            }
        } catch (error) {
            localStorage.removeItem(KEY_TOKEN);
            return "";
        }
    },

    removeToken() {
        const token = localStorage.getItem(KEY_TOKEN);
        if (token) {
            localStorage.setItem(KEY_TOKEN, "");
        }
    },
};

export default Storage;
