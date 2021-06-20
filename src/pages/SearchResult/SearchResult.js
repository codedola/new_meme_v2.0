import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { PATHS } from "../../constants";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { actFetchListSearchAsync } from "../../store/post/actions";
//
// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// component app
import PostList from "../../components/Post/Post.List";
import LoadingPage from "../../components/Loading";
//
//
export default function SearchResult() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [loadPage, setLoadPage] = useState(false);
    const [posts, setPosts] = useState(null);

    const querySearch = useMemo(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.q) {
            return parsed.q;
        } else {
            history.push(PATHS.HOMEPAGE);
        }
    }, [location, history]);

    useEffect(() => {
        if (querySearch) {
            setLoadPage(true);
            dispatch(actFetchListSearchAsync({ query: querySearch })).then(
                (res) => {
                    if (res.ok) {
                        setPosts(res.posts);
                        NotificationManager.success(res.message, null, 1800);
                    } else {
                        NotificationManager.error(res.message, null, 600);
                    }
                    setLoadPage(false);
                }
            );
        }
    }, [querySearch, dispatch]);

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
                    </Col>
                </Row>
            </Container>
            <LoadingPage isLoading={loadPage} />
        </main>
    );
}
