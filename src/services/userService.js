import { api } from "./api";
export const UserService = {
    getUserByID({ userid, ...restParams }) {
        return api.call().get("/member/member.php", {
            params: {
                userid,
                ...restParams,
            },
        });
    },

    updateProfile(formData) {
        const headers = {
            accept: "multipart/form-data",
        };
        return api
            .callWithAuth({ headers })
            .post("/member/update.php", formData);
    },
    getListMember({ pagesize = 10, currPage = 1, ...restParams } = {}) {
        return api.callWithAuth().get("/member/getListPaging.php", {
            params: {
                pagesize,
                currPage,
                ...restParams,
            },
        });
    },
    activeDeactiveUser({ userid }) {
        return api
            .callWithAuth()
            .post("/member/activeDeactive.php", { userid });
    },
};
