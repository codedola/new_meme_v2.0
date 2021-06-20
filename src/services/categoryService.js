import { api } from "./api";

export const CategoryService = {
    getListPost({ currPage = 1, pagesize = 3, tagIndex, ...restParams } = {}) {
        return api.call().get("/post/getListByCategory.php", {
            params: {
                currPage,
                pagesize,
                tagIndex,
                ...restParams,
            },
        });
    },

    getList() {
        return api.call().get("/categories/index.php");
    },
};
