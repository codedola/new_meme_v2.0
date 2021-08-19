import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import PostItem from "./Post.Item";
import { actFetchPostRecentAsync } from "../../store/post/actions";
export default function PostRecent() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.User.currentUser);
    const postsRecent = useSelector((state) => state.Posts.PostRecentCurrUser);
    const isLoading = useSelector((state) => state.App.isLoading);
    const matchHomepage = useRouteMatch(PATHS.HOMEPAGE)?.isExact;
    useEffect(() => {
        if (!currentUser) return;
        dispatch(actFetchPostRecentAsync());
    }, [dispatch, currentUser]);

    return (
        <>
            {!currentUser ? (
                <aside className='ass1-aside'>
                    <div className='ass1-content-head__t'>
                        <div>Bài viết gần đây của bạn</div>
                    </div>
                    <div>
                        <p>
                            Vui lòng{" "}
                            <b>
                                <Link to={PATHS.LOGIN}>đăng nhập</Link>
                            </b>{" "}
                            để xem nội dung này !
                        </p>
                    </div>
                </aside>
            ) : (
                <div
                    className={`ass1-section__list ${
                        matchHomepage ? "stickySidebar" : ""
                    }`}
                >
                    <Card className='post__info-author'>
                        <Card.Body>
                            <Card.Text>
                                Bài viết gần đây của {currentUser?.fullname}
                            </Card.Text>
                            <hr />
                            {postsRecent.map((post, index) => {
                                return (
                                    <PostItem
                                        key={index}
                                        post={post}
                                        isPostRecent={true}
                                        isSkeletonCard={isLoading}
                                    />
                                );
                            })}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
}
