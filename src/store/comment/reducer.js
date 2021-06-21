import { ACT_FETCH_COMMENTS, ACT_ON_SELECT_SORT_COMMENT } from "./actions";

const initState = {
    PostComments: {
        list: [],
        //  Sort
        orderBy: "latest", // or name
        orderDir: "asc",
    },
};

export default function commentReducer(stateComment = initState, action) {
    switch (action.type) {
        case ACT_FETCH_COMMENTS:
            return {
                ...stateComment,
                PostComments: {
                    ...stateComment.PostComments,
                    list: action.payload.comments,
                },
            };
        case ACT_ON_SELECT_SORT_COMMENT:
            const { orderBy, orderDir } = action.payload;
            return {
                ...stateComment,
                PostComments: {
                    ...stateComment.PostComments,
                    orderBy,
                    orderDir,
                },
            };
        default:
            return stateComment;
    }
}
