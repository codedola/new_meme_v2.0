import React, { useEffect, useMemo, useState } from "react";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// component app
import PostList from "../../components/Post/Post.List";
import PostRecent from "../../components/Post/Post.Recent";
import LoadingPage from "../../components/Loading";
import OnToTop from "../../components/OnToTop";
//
import { useDispatch } from "react-redux";
import { actFetchListPostAsync } from "../../store/post/actions";
import { usePostPaging } from "../../utilities/hook";
//

export default function HomePage() {
    const dispatch = useDispatch();
    const [loadingFirst, setLoadingFirst] = useState(false);

    const { posts, loadMore, handleLoadMore, isLoadMore } = usePostPaging({
        actFetchAsync: actFetchListPostAsync,
        keyFieldReducer: "Posts",
    });

    useEffect(() => {
        if (posts.length > 0) return;
        setLoadingFirst(true);
        dispatch(actFetchListPostAsync()).finally(() => {
            setLoadingFirst(false);
        });
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
                        {!isLoadMore ? (
                            <Button
                                variant='outline-secondary'
                                className='load-more'
                                disabled={loadMore}
                                onClick={!loadMore ? handleLoadMore : null}
                            >
                                {/* <span>
                                    {loadMore ? "Đang tải ..." : "Xem thêm"}
                                </span> */}
                                {loadMore ? (
                                    <>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />{" "}
                                        Đang tải ...
                                    </>
                                ) : (
                                    "Xem thêm"
                                )}
                            </Button>
                        ) : null}
                    </Col>
                    <Col lg={4}>
                        <PostRecent />
                    </Col>
                </Row>
            </Container>
            <OnToTop />
            <LoadingPage isLoading={loadingFirst} />
        </main>
    );
}
