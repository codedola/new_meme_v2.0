import { api } from "./api";

export const PostService = {
    getList({ currPage = 1, pagesize = 3, ...restParams } = {}) {
        return api.call().get("/post/getListPagination.php", {
            params: {
                currPage,
                pagesize,
                ...restParams,
            },
        });
    },
    getPostDetail({ postid, ...restParams }) {
        return api.call().get("/post/post.php", {
            params: {
                postid,
                ...restParams,
            },
        });
    },
    getPostByUserID({ userid, ...restParams }) {
        return api.call().get("/post/getListPostUserID.php", {
            params: {
                userid,
                ...restParams,
            },
        });
    },
    searchListNews({ query }) {
        return api.call().get("/post/search.php", {
            params: {
                query,
            },
        });
    },
    getListPostUserID({ userid }) {
        const headers = {
            accept: "multipart/form-data",
        };
        return api
            .callWithAuth({ headers })
            .get("/post/getListPostUserID.php", {
                params: {
                    userid,
                },
            });
    },
    createNewPost(formData) {
        const headers = {
            accept: "multipart/form-data",
        };
        return api.callWithAuth({ headers }).post("/post/addNew.php", formData);
    },

    editPost(formData) {
        const headers = {
            accept: "multipart/form-data",
        };
        return api.callWithAuth({ headers }).post("/post/edit.php", formData);
    },
    deletePost({ postid }) {
        return api.callWithAuth().post("/post/delete.php", { postid });
    },
    activeDeactivePost({ postid }) {
        return api.callWithAuth().post("/post/activeDeactive.php", { postid });
    },
};
