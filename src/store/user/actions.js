import { UserService } from "../../services/userService";
import { PostService } from "../../services/postService";
import { actHideLoading, actShowLoading } from "../app/actions";
//
const nameSpace = "user:";
export const ACT_FETCH_CURRENT_USER = `${nameSpace}ACT_FETCH_CURRENT_USER`;
export const ACT_FETCH_USER_BY_ID = `${nameSpace}ACT_FETCH_USER_BY_ID`;
export const ACT_SET_USER_DETAIL = `${nameSpace}ACT_SET_USER_DETAIL`;
export const ACT_FETCH_LIST_MEMBER = `${nameSpace}ACT_FETCH_LIST_MEMBER`;
export const ACT_ACTIVE_DEACTIVE_MEMBER = `${nameSpace}ACT_ACTIVE_DEACTIVE_MEMBER`;
export const ACT_CHANGE_SEARCH_TEXT = `${nameSpace}ACT_CHANGE_SEARCH_TEXT`;
export const ACT_ON_SELECT_SORT = `${nameSpace}ACT_ON_SELECT_SORT`;

// Action
export const actHandleChangeSearchText = (newText) => {
    return {
        type: ACT_CHANGE_SEARCH_TEXT,
        payload: {
            newText,
        },
    };
};

export const actionHandleOnSelectSort = ({ orderBy, orderDir }) => {
    return {
        type: ACT_ON_SELECT_SORT,
        payload: {
            orderBy,
            orderDir,
        },
    };
};

export const actActiveDeactiveMember = ({ userid, currentStatus }) => {
    return {
        type: ACT_ACTIVE_DEACTIVE_MEMBER,
        payload: { userid, currentStatus },
    };
};

export const actFetchCurrentUser = ({ user }) => {
    return {
        type: ACT_FETCH_CURRENT_USER,
        payload: {
            user,
        },
    };
};

export const actSetUserDetailData = ({ userInfo, userPosts }) => {
    return {
        type: ACT_SET_USER_DETAIL,
        payload: {
            userInfo,
            userPosts,
        },
    };
};

export const actFetchListMember = ({ users, pagesize, currPage, total }) => {
    return {
        type: ACT_FETCH_LIST_MEMBER,
        payload: { users, pagesize, currPage, total },
    };
};
// Action Async
export const actFetchUserByIDAsync = ({ userid }) => {
    return async (dispatch) => {
        try {
            const response = await UserService.getUserByID({ userid });

            if (response.data.status === 200) {
                const { user, message } = response.data;
                dispatch(actFetchCurrentUser({ user }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Co loi xay ra",
                };
            }
        } catch (error) {}
    };
};

export const actUpdateProfileAsync = ({
    avatar,
    fullname,
    gender,
    description,
}) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();

            formData.append("fullname", fullname);
            formData.append("gender", gender);
            formData.append("description", description);
            if (avatar) {
                formData.append("avatar", avatar);
            }

            const response = await UserService.updateProfile(formData);
            if (response?.data?.status === 200) {
                const { user } = response.data;
                dispatch(actFetchCurrentUser({ user }));
                dispatch(actSetUserDetailData({ userInfo: user }));
                return {
                    ok: true,
                    message: "Update thành công",
                };
            } else {
                return {
                    ok: false,
                    message: "Update thất bại",
                };
            }
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    };
};

export const actFetchPostUserByIDAsync = ({ userid }) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            if (state.User.userInfo[userid] && state.User.userPosts[userid]) {
                return {
                    ok: true,
                    user: state.User.userInfo[userid],
                    posts: state.User.userPosts[userid],
                };
            } else {
                // dispatch(actShowLoading());
                const [resPostUser, resInfoUser] = await Promise.all([
                    PostService.getListPostUserID({ userid }),
                    UserService.getUserByID({ userid }),
                ]);
                // dispatch(actHideLoading());

                if (
                    resPostUser?.data?.status === 200 &&
                    resInfoUser?.data?.status === 200
                ) {
                    const user = resInfoUser.data.user;
                    const posts = resPostUser.data.posts;
                    dispatch(
                        actSetUserDetailData({
                            userInfo: user,
                            userPosts: posts,
                        })
                    );
                    return {
                        ok: true,
                        user,
                        posts,
                    };
                } else {
                    return {
                        ok: false,
                        message: "Có lỗi xảy ra",
                    };
                }
            }
        } catch (error) {
            console.log("chay vao catch error");
        }
    };
};

export const actFetchListMemberAsync = ({
    pagesize = 10,
    currPage = 1,
    ...restParams
} = {}) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await UserService.getListMember({
                pagesize,
                currPage,
                ...restParams,
            });
            dispatch(actHideLoading());

            if (response?.data?.status === 200) {
                const { users, total } = response.data.body;
                const totalMember = Number(total);
                dispatch(
                    actFetchListMember({
                        users,
                        total: totalMember,
                        pagesize,
                        currPage,
                    })
                );
            }
        } catch (error) {
            dispatch(actHideLoading());
        }
    };
};

export const actActiveDeactiveUserAsync = ({ userid, currentStatus }) => {
    return async (dispatch) => {
        try {
            dispatch(actShowLoading());
            const response = await UserService.activeDeactiveUser({ userid });
            dispatch(actHideLoading());
            if (response?.data?.status === 200) {
                dispatch(actActiveDeactiveMember({ userid, currentStatus }));
                return {
                    ok: true,
                    message: response.data.message,
                };
            } else {
                return {
                    ok: false,
                    message: response.data?.error,
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
