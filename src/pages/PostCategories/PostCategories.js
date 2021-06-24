import React, { useEffect, useState } from "react";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// component app
import LoadingPage from "../../components/Loading";
import PostList from "../../components/Post/Post.List";
import OnToTop from "../../components/OnToTop";
import PageNotFound from "../../components/PageNotFound";
//
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchListPostCategoryAsync } from "../../store/category/actions";
import { usePostPaging } from "../../utilities/hook";
//
export default function PostCategories() {
    const { category_id } = useParams();
    const [loadPage, setLoadPage] = useState(false);
    const dispatch = useDispatch();
    const { loadMore, isLoadMore, posts, handleLoadMore } = usePostPaging({
        actFetchAsync: actFetchListPostCategoryAsync,
        keyFieldReducer: "Categories",
        restParams: { tagIndex: category_id },
    });
    useEffect(() => {
        setLoadPage(true);
        dispatch(
            actFetchListPostCategoryAsync({ tagIndex: category_id })
        ).finally(() => {
            setLoadPage(false);
        });
    }, [dispatch, category_id]);

    return (
        <main>
            <Container>
                {posts?.length > 0 ? (
                    <Row>
                        <Col lg={8}>
                            <PostList posts={posts} />
                            {!isLoadMore ? (
                                <Button
                                    variant='outline-secondary'
                                    className='load-more'
                                    disabled={loadMore}
                                    onClick={!loadMore ? handleLoadMore : null}
                                >
                                    {/* <span>
                                        {loadMore ? "Đang tải ..." : "Xem thêm"}{" "}
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
                    </Row>
                ) : (
                    <PageNotFound />
                )}
            </Container>

            <OnToTop />
            <LoadingPage isLoading={loadPage} />
        </main>
    );
}
