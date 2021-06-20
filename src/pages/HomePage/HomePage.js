import React, { useEffect, useMemo } from "react";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// component app
import PostList from "../../components/Post/Post.List";
import PostRecent from "../../components/Post/Post.Recent";
import LoadingPage from "../../components/Loading";
//
import { useDispatch, useSelector } from "react-redux";
import { actFetchListPostAsync } from "../../store/post/actions";
import { usePostPaging } from "../../utilities/hook";
//

export default function HomePage() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.App.isLoading);

    const { posts, loadMore, handleLoadMore } = usePostPaging({
        actFetchAsync: actFetchListPostAsync,
        keyFieldReducer: "Posts",
    });

    useEffect(() => {
        if (posts.length > 0) return;
        dispatch(actFetchListPostAsync());
    }, [dispatch, posts]);

    const listPostActive = useMemo(() => {
        if (posts) {
            return posts.filter((post) => post.status === "1");
        }
        return [];
    }, [posts]);

    return (
        <main>
            <Container>
                <Row>
                    <Col lg={8}>
                        <PostList posts={listPostActive} />
                        <Button
                            variant='outline-primary'
                            className='load-more'
                            disabled={loadMore}
                            onClick={!loadMore ? handleLoadMore : null}
                        >
                            <span>
                                {loadMore ? "Đang tải ..." : "Xem thêm"}
                            </span>
                        </Button>
                    </Col>
                    <Col lg={4}>
                        <PostRecent />
                    </Col>
                </Row>
            </Container>
            <LoadingPage isLoading={isLoading} />
        </main>
    );
}
