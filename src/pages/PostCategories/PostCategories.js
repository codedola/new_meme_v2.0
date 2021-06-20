import React, { useEffect, useState } from "react";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// component app
import LoadingPage from "../../components/Loading";
import PostList from "../../components/Post/Post.List";
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
                <Row>
                    <Col lg={8}>
                        <PostList posts={posts} />
                        {!isLoadMore ? (
                            <Button
                                variant='outline-primary'
                                className='load-more'
                                disabled={loadMore}
                                onClick={!loadMore ? handleLoadMore : null}
                            >
                                <span>
                                    {loadMore ? "Đang tải ..." : "Xem thêm"}{" "}
                                </span>
                            </Button>
                        ) : null}
                    </Col>
                </Row>
            </Container>
            <LoadingPage isLoading={loadPage} />
        </main>
    );
}
