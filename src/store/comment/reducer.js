import { ACT_FETCH_COMMENTS } from "./actions";

const initState = {
    PostComments: [],
};

export default function commentReducer(stateComment = initState, action) {
    switch (action.type) {
        case ACT_FETCH_COMMENTS:
            return {
                ...stateComment,
                PostComments: action.payload.comments,
            };
        default:
            return stateComment;
    }
}
