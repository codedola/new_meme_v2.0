import { PostService } from "../../services/postService";
import { UserService } from "../../services/userService";
import { actShowLoading, actHideLoading } from "../app/actions";
import { actSetUserDetailData } from "../user/actions";
const nameSpace = "post:";
export const ACT_FETCH_LIST_POST = `${nameSpace}ACT_FETCH_LIST_POST`;
export const ACT_FETCH_POST_DETAIL = `${nameSpace}ACT_FETCH_POST_DETAIL`;
export const ACT_GET_INFO_POST_EDIT = `${nameSpace}ACT_GET_INFO_POST_EDIT`;
export const ACT_DELETE_POST = `${nameSpace}ACT_DELETE_POST`;
export const ACT_ACTIVE_DEACTIVE_POST = `${nameSpace}ACT_ACTIVE_DEACTIVE_POST`;
export const ACT_SET_POSTS_RECENTS = `${nameSpace}ACT_SET_POSTS_RECENTS`;
/**ACTION Creator */


export const actSetPostRecent = (posts) => {
    return {
        type: ACT_SET_POSTS_RECENTS,
        payload: {
            posts,
        },
    };
};
export const actFetchListPost = ({ posts, currPage, pagesize }) => {
    return {
        type: ACT_FETCH_LIST_POST,
        payload: {
            posts,
            currPage,
            pagesize,
        },
    };
};

export const actFetchPostDetail = ({ post, user, categories }) => {
    return {
        type: ACT_FETCH_POST_DETAIL,
        payload: {
            post,
            user,
            categories,
        },
    };
};

export const actDeletePost = ({ postid }) => {
    return {
        type: ACT_DELETE_POST,
        payload: { postid },
    };
};

export const actActiveDeactivePost = ({ posts }) => {
    return {
        type: ACT_ACTIVE_DEACTIVE_POST,
        payload: { posts },
    };
};

/**Action ASYNC */

export const actFetchListPostAsync = ({ currPage = 1, pagesize = 5 } = {}) => {
    return async (dispatch) => {
        try {
            // dispatch(actShowLoading());
            const response = await PostService.getList({ currPage, pagesize });
            // dispatch(actHideLoading());
            if (response.status === 200) {
                const posts = response.data.posts;
                const message = response.data.message;
                dispatch(actFetchListPost({ posts, currPage, pagesize }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Error list posts",
                };
            }
        } catch (error) {
            dispatch(actHideLoading());
        }
    };
};

export const actFetchPostDetailAsync = ({ postid }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const resPost = await PostService.getPostDetail({ postid });
            dispatch(actHideLoading());

            if (resPost.data.status === 200) {
                const message = resPost.data.message;
                const { post, categories } = resPost.data.data;
                dispatch(actShowLoading());
                const resUser = await UserService.getUserByID({
                    userid: post.USERID,
                });
                dispatch(actHideLoading());
                if (resUser.data.status === 200) {
                    const user = resUser.data.user;
                    dispatch(actFetchPostDetail({ post, categories, user }));
                    return {
                        ok: true,
                        message,
                    };
                } else {
                    return {
                        ok: false,
                        message: "Có lỗi xảy ra",
                    };
                }
            } else {
                return {
                    ok: false,
                    message: resPost.data.error,
                };
            }
        } catch (error) {
            dispatch(actHideLoading());
            return {
                ok: false,
                message:
                    error?.response?.data?.error || "Không tìm thấy bài viết",
            };
        }
    };
};

export const actFetchListSearchAsync = ({ query } = {}) => {
    return async (dispatch) => {
        try {
            const response = await PostService.searchListNews({ query });
            if (response?.data?.status === 200) {
                const { posts } = response.data;
                return {
                    ok: true,
                    message: `Có ${posts.length || 0} bài viết cho "${query}"`,
                    posts,
                };
            } else {
                return {
                    ok: false,
                    message: "Có lỗi xảy ra !",
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

export const actCreateNewPostAsync = ({
    category,
    post_content,
    obj_image,
    ...resData
}) => {
    return async (dispatch, getState) => {
        try {
            dispatch(actShowLoading());

            const formData = new FormData();

            formData.append("category", category);
            formData.append("post_content", post_content);

            if (obj_image) {
                formData.append("obj_image", obj_image);
            }

            const response = await PostService.createNewPost(formData);
            await dispatch(actFetchListPostAsync());
            dispatch(actHideLoading());

            if (response?.data?.status === 200) {
                const { message, data } = response.data;
                const { post, categories } = data;

                const res = await PostService.getListPostUserID({
                    userid: post?.USERID,
                });

                dispatch(
                    actSetUserDetailData({
                        userInfo: getState().User.userInfo[post?.USERID],
                        userPosts:
                            res?.data?.status === 200 ? res.data.posts : null,
                    })
                );

                return {
                    ok: true,
                    message,
                    post,
                    categories,
                };
            } else {
                return {
                    ok: false,
                    message: "Có lỗi xảy ra !",
                };
            }
        } catch (error) {
            return {
                ok: false,
                message: "Có lỗi xảy ra !",
            };
        }
    };
};

export const actEditPostAsync = ({
    postid,
    category,
    post_content,
    obj_image,
    url_image,
}) => {
    return async (dispatch, getState) => {
        try {
            dispatch(actShowLoading());

            const formData = new FormData();

            formData.append("postid", postid);
            formData.append("category", category);
            formData.append("post_content", post_content);
            formData.append("url_image", url_image);

            if (obj_image) {
                formData.append("obj_image", obj_image);
            }

            const response = await PostService.editPost(formData);
            await dispatch(actFetchListPostAsync());

            dispatch(actHideLoading());

            if (response?.data?.status === 200) {
                const { message, data } = response.data;
                const { post, categories } = data;

                const res = await PostService.getListPostUserID({
                    userid: post?.USERID,
                });

                dispatch(
                    actSetUserDetailData({
                        userInfo: getState().User.userInfo[post?.USERID],
                        userPosts:
                            res?.data?.status === 200 ? res.data.posts : null,
                    })
                );

                return {
                    ok: true,
                    message,
                    post,
                    categories,
                };
            } else {
                return {
                    ok: false,
                    message: "Có lỗi xảy ra !",
                };
            }
        } catch (error) {
            dispatch(actHideLoading());
            return {
                ok: false,
                message: "Có lỗi xảy ra catch ee!",
            };
        }
    };
};

export const actDeletePostAsync = ({ postid }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await PostService.deletePost({ postid });
            await dispatch(actFetchListPostAsync());
            dispatch(actHideLoading());

            if (response?.data?.status === 200) {
                await Promise.all([dispatch(actFetchListPostAsync())]);
                const { message } = response;
                dispatch(actDeletePost({ postid }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Có lỗi xảy ra !",
                };
            }
        } catch (error) {
            dispatch(actHideLoading());
            return {
                ok: false,
                message: "Có lỗi xảy ra catch!",
            };
        }
    };
};

export const actActiveDeactivePostAsync = ({ postid, userid }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await PostService.activeDeactivePost({ postid });

            const [resPostUserID, resPostList] = await Promise.all([
                PostService.getListPostUserID({
                    userid,
                }),
                dispatch(actFetchListPostAsync()),
            ]);

            dispatch(actHideLoading());

            if (
                response?.data?.status === 200 &&
                resPostUserID?.data?.status === 200 &&
                resPostList.ok
            ) {
                const { message } = response.data;
                const { posts } = resPostUserID.data;

                dispatch(actActiveDeactivePost({ posts }));

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
            dispatch(actHideLoading());
            return {
                ok: false,
                message: "Có lỗi xảy ra catch!",
            };
        }
    };
};

export const actFetchPostRecentAsync = () => {
    return async (dispatch, getState) => {
        const userid = getState().User.currentUser.USERID;
        if (userid) {
            dispatch(actShowLoading());
            const response = await PostService.getListPostUserID({ userid });
            dispatch(actHideLoading());
            if (response.data.status === 200) {
                const { posts } = response.data;
                dispatch(actSetPostRecent(posts));
            }
        }
    };
};
