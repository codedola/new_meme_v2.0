import { api } from "./api";

export const CommentService = {
    getList({ postid, ...restParams }) {
        return api.call().get("/comment/comments.php", {
            params: {
                postid,
                ...restParams,
            },
        });
    },
    createNewComment({ comment, postid }) {
        const headers = {
            accept: "multipart/form-data",
        };
        return api.callWithAuth({ headers }).post("/comment/add_new.php", {
            comment,
            postid,
        });
    },
};
