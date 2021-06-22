import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import PostItem from "./Post.Item";
import { actFetchPostUserByIDAsync } from "../../store/user/actions";
export default function PostRecent() {
    const dispatch = useDispatch();
    const [postsRecent, setPostsRecent] = useState([]);
    const currentUser = useSelector((state) => state.User.currentUser);

    useEffect(() => {
        if (!currentUser) return;
        dispatch(
            actFetchPostUserByIDAsync({ userid: currentUser.USERID })
        ).then((res) => {
            if (res.ok) {
                const currPosts = res.posts;
                if (currPosts.length < 5) {
                    setPostsRecent(currPosts);
                } else {
                    const [post1, post2, post3, post4] = currPosts;
                    setPostsRecent([post1, post2, post3, post4]);
                }
            }
        });
    }, [dispatch, currentUser]);

    return (
        <>
            {!currentUser ? (
                <aside className='ass1-aside'>
                    <div className='ass1-content-head__t'>
                        <div>Bài viết gần đây của bạn</div>
                    </div>
                    <div>
                        Vui lòng đăng nhập để xem nội dung này
                        <Link to={PATHS.LOGIN}>Đăng nhập</Link>
                    </div>
                </aside>
            ) : (
                <div className='ass1-section__list'>
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
