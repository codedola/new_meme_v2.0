import { CommentService } from "../../services/commentService";

const nameSpace = "comment:";

export const ACT_FETCH_COMMENTS = `${nameSpace}ACT_FETCH_COMMENTS`;
export const actFetchComments = ({ comments }) => {
    return {
        type: ACT_FETCH_COMMENTS,
        payload: {
            comments,
        },
    };
};

// Action Async
export const actFetchCommentAsync = ({
    postid,
    currPage = 1,
    pagesze = 3,
    ...restParams
}) => {
    return async (dispatch) => {
        try {
            const response = await CommentService.getList({
                postid,
                ...restParams,
            });
            if (response.data.status === 200) {
                const { comments, message } = response.data;
                dispatch(actFetchComments({ comments }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Error comments",
                };
            }
        } catch (error) {}
    };
};

export const actCreateNewCommentAsync = ({ comment, postid }) => {
    return async (dispatch, getState) => {
        try {
            const response = await CommentService.createNewComment({
                comment,
                postid,
            });
            if (response?.data?.status === 200) {
                const { message } = response.data;
                dispatch(actFetchCommentAsync({ postid }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Bình luận thất bại",
                };
            }
        } catch (error) {
            return {
                ok: false,
                message: "Bình luận thất bại trong catch",
            };
        }
    };
};
