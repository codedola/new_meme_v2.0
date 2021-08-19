import axios from "axios";
import Storage from "../utilities/Storage";

let BASE_URL = "https://api-meme-zendvn-01.herokuapp.com/api";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    BASE_URL = "http://api-meme-zendvn-01.herokuapp.com/api";
}
const api = {
    call() {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

    callWithAuth({ headers = {} } = {}) {
        const token = Storage.getToken();
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
    },
};

export { api };
