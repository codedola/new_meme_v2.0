import {
    ACT_FETCH_CURRENT_USER,
    ACT_SET_USER_DETAIL,
    ACT_FETCH_LIST_MEMBER,
    ACT_ACTIVE_DEACTIVE_MEMBER,
    ACT_CHANGE_SEARCH_TEXT,
    ACT_ON_SELECT_SORT,
} from "./actions";
import { ACT_LOGOUT_SUCCESS } from "../auth/actions";
import { ACT_DELETE_POST, ACT_ACTIVE_DEACTIVE_POST } from "../post/actions";
const initState = {
    currentUser: null,
    userInfo: {},
    userPosts: {},

    members: {
        list: [],
        // pagination
        pagesize: 0,
        currPage: 1,
        total: 0,
        // Search Sort
        orderBy: "active",
        orderDir: "asc",
        searchText: "",
    },
};

export default function userReducer(stateUser = initState, action) {
    switch (action.type) {
        case ACT_FETCH_CURRENT_USER:
            return {
                ...stateUser,
                currentUser: action.payload.user,
            };
        case ACT_LOGOUT_SUCCESS:
            return {
                ...stateUser,
                currentUser: null,
            };
        case ACT_SET_USER_DETAIL:
            const { userInfo, userPosts } = action.payload;
            return {
                ...stateUser,
                userInfo: {
                    [userInfo.USERID]: userInfo,
                },
                userPosts: {
                    [userInfo.USERID]: userPosts
                        ? userPosts
                        : stateUser.userPosts[userInfo.USERID],
                },
            };
        case ACT_DELETE_POST:
            const postDeleteID = action.payload.postid;
            if (stateUser.currentUser) {
                const userID = stateUser.currentUser.USERID;
                const newPost = stateUser.userPosts[userID]?.filter(
                    (post) => post.PID !== postDeleteID
                );
                return {
                    ...stateUser,
                    userPosts: { [userID]: newPost },
                };
            } else {
                return {
                    ...stateUser,
                };
            }

        case ACT_ACTIVE_DEACTIVE_POST:
            if (stateUser.currentUser) {
                const postActive = action.payload.posts;
                return {
                    ...stateUser,
                    userPosts: {
                        [stateUser.currentUser.USERID]: postActive,
                    },
                };
            }
            return {
                ...stateUser,
            };

        case ACT_FETCH_LIST_MEMBER:
            const { users, pagesize, currPage, total } = action.payload;
            return {
                ...stateUser,
                members: {
                    ...stateUser.members,
                    list:
                        currPage === 1
                            ? users
                            : [...stateUser.members.list, ...users],
                    currPage,
                    pagesize,
                    total,
                },
            };
        case ACT_ACTIVE_DEACTIVE_MEMBER:
            const userIdActive = action.payload.userid;
            const currentStatus = action.payload.currentStatus;

            const newListMember = stateUser.members.list.map((member) => {
                if (member.USERID === userIdActive) {
                    member.status = currentStatus === "1" ? "0" : "1";
                }
                return member;
            });
            return {
                ...stateUser,
                members: {
                    ...stateUser.members,
                    list: newListMember,
                },
            };
        case ACT_CHANGE_SEARCH_TEXT:
            const { newText } = action.payload;
            return {
                ...stateUser,
                members: {
                    ...stateUser.members,
                    searchText: newText,
                },
            };
        case ACT_ON_SELECT_SORT:
            const { orderBy, orderDir } = action.payload;
            return {
                ...stateUser,
                members: {
                    ...stateUser.members,
                    orderBy,
                    orderDir,
                },
            };

        default:
            return stateUser;
    }
}
