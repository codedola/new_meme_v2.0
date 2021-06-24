import {
    ACT_FETCH_LIST_POST,
    ACT_FETCH_POST_DETAIL,
    ACT_SET_POSTS_RECENTS,
} from "./actions";
const initState = {
    PostPaging: {
        list: [],
        currPage: 0,
        pagesize: 1,
    },
    PostRecentCurrUser: [],
    PostDetail: {},
    PostEdit: {},
};

export default function postReducer(statePost = initState, action) {
    switch (action.type) {
        case ACT_FETCH_LIST_POST:
            let { posts, currPage, pagesize } = action.payload;
            return {
                ...statePost,
                PostPaging: {
                    list:
                        currPage === 1
                            ? posts
                            : [...statePost.PostPaging.list, ...posts],
                    currPage,
                    pagesize,
                },
            };
        case ACT_FETCH_POST_DETAIL:
            let { post, user, categories } = action.payload;

            return {
                ...statePost,
                PostDetail: {
                    post,
                    user,
                    categories,
                },
            };
        case ACT_SET_POSTS_RECENTS:
            let postRecent = [];
            const postLength = action.payload.posts.length;

            if (postLength > 5) {
                postRecent = action.payload.posts.slice(0, 4);
            } else {
                postRecent = action.payload.posts;
            }

            return {
                ...statePost,
                PostRecentCurrUser: postRecent,
            };

        default:
            return statePost;
    }
}
