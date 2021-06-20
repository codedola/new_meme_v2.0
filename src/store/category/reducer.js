import { ACT_FETCH_LIST_POST_CATEGORY, ACT_FETCH_CATEGORIES } from "./actions";
const initState = {
    PostPaging: {
        list: [],
        currPage: 0,
        pagesize: 1,
    },
    listCategories: [],
};

export default function categoryReducer(stateCategory = initState, action) {
    switch (action.type) {
        case ACT_FETCH_LIST_POST_CATEGORY:
            let { posts, currPage, pagesize } = action.payload;
            return {
                ...stateCategory,
                PostPaging: {
                    list:
                        currPage === 1
                            ? posts
                            : [...stateCategory.PostPaging.list, ...posts],
                    currPage,
                    pagesize,
                },
            };
        case ACT_FETCH_CATEGORIES:
            let { categories } = action.payload;
            return {
                ...stateCategory,
                listCategories: categories,
            };
        default:
            return {
                ...stateCategory,
            };
    }
}
