import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function usePostPaging({
    actFetchAsync = () => {},
    restParams = {},
    keyFieldReducer = "Posts",
} = {}) {
    const [loadMore, setLoadMore] = useState(false);
    const dispatch = useDispatch();
    const PostPaging = useSelector(
        (state) => state[keyFieldReducer].PostPaging
    );
    const posts = PostPaging.list;
    const page = PostPaging.currPage;
    const pagesize = PostPaging.pagesize;
    const isLoadMore = page * pagesize > posts.length;

    const handleLoadMore = useCallback(() => {
        if (loadMore) return;
        setLoadMore(true);
        dispatch(actFetchAsync({ currPage: page + 1, ...restParams })).finally(
            () => {
                setLoadMore(false);
            }
        );
    }, [actFetchAsync, loadMore, page, dispatch, restParams]);

    return {
        posts,
        loadMore,
        isLoadMore,
        handleLoadMore,
    };
}
