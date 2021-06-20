import { CategoryService } from "../../services/categoryService";

const nameSpace = "category:";

export const ACT_FETCH_LIST_POST_CATEGORY = `${nameSpace}ACT_FETCH_LIST_POST_CATEGORY`;
export const ACT_FETCH_CATEGORIES = `${nameSpace}ACT_FETCH_CATEGORIES`;

export const actFetchListPostCategory = ({ posts, currPage, pagesize }) => {
    return {
        type: ACT_FETCH_LIST_POST_CATEGORY,
        payload: {
            posts,
            currPage,
            pagesize,
        },
    };
};

export const actFetchCategories = ({ categories }) => {
    return {
        type: ACT_FETCH_CATEGORIES,
        payload: {
            categories,
        },
    };
};
/** Action Async */
export const actFetchCategoriesAsync = () => {
    return async (dispatch) => {
        try {
            const response = await CategoryService.getList();
            if (response?.data?.status === 200) {
                const categories = response.data.categories;
                const message = response.data.message;
                dispatch(actFetchCategories({ categories }));
                return {
                    ok: true,
                    message,
                };
            } else {
                return {
                    ok: false,
                    message: "Error Categories",
                };
            }
        } catch (error) {}
    };
};

export const actFetchListPostCategoryAsync = ({
    currPage = 1,
    pagesize = 3,
    tagIndex = 1,
} = {}) => {
    return async (dispatch) => {
        try {
            const response = await CategoryService.getListPost({
                currPage,
                pagesize,
                tagIndex,
            });
            console.log("response post category = ", response);
            if (response.data.status === 200) {
                const posts = response.data.posts;

                dispatch(
                    actFetchListPostCategory({ posts, currPage, pagesize })
                );
            }
        } catch (error) {}
    };
};
