import React, { useEffect, useState } from "react";
import "../../components/Post/Post.scss";
//
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PATHS, IMAGE_DEFAULT } from "../../constants";
// Components Library
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { NotificationManager } from "react-notifications";

// Components App
import LoadingPage from "../../components/Loading";
import PostItem from "../../components/Post/Post.Item";
import PostCommentForm from "../../components/Post/Post.Comment.Form";
import PostCommentList from "../../components/Post/Post.Comment.List";
// Service
import { actFetchPostDetailAsync } from "../../store/post/actions";
import { actCreateNewCommentAsync } from "../../store/comment/actions";
export default function PostDetail() {
    const { post_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadPage, setLoadPage] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const PostDetail = useSelector((state) => state.Posts.PostDetail);
    const currentUser = useSelector((state) => state.User.currentUser);
    const post = PostDetail?.post;
    const userInfo = PostDetail?.user;
    const categories = PostDetail?.categories;

    //
    const idxDefaultAvatar = post?.USERID % IMAGE_DEFAULT.avatar.length;
    const avatar =
        userInfo?.profilepicture || IMAGE_DEFAULT.avatar[idxDefaultAvatar];
    const userLink = PATHS.USER_DETAIL.replace(":user_id", post?.USERID);

    //
    useEffect(() => {
        setLoadPage(true);
        dispatch(actFetchPostDetailAsync({ postid: post_id })).then((res) => {
            if (!res.ok) {
                NotificationManager.error(res.message, null, 1000);
                setLoadPage(false);
                history.push(PATHS.HOMEPAGE);
            } else {
                setLoadPage(false);
            }
        });
    }, [dispatch, post_id, history]);

    const handleCreateComment = (comment) => {
        setLoading(true);
        if (comment && post_id) {
            dispatch(
                actCreateNewCommentAsync({ comment, postid: post_id })
            ).then((res) => {
                if (res.ok) {
                    NotificationManager.success(res.message, null, 1000);
                } else {
                    NotificationManager.error(res.message, null, 1000);
                }
                setLoading(false);
            });
        }
    };
    return (
        <main>
            <Container>
                <Row>
                    <Col lg={8}>
                        <div className='ass1-section__list'>
                            <PostItem
                                post={post}
                                categories={categories}
                                isPostDetail={true}
                                userInfo={userInfo}
                            />
                            {currentUser ? (
                                <PostCommentForm
                                    handleCreateComment={handleCreateComment}
                                    isLoading={isLoading}
                                    avatarUser={currentUser?.profilepicture}
                                />
                            ) : (
                                <div className='ass1-add-comment'>
                                    <Link to={PATHS.LOGIN}>
                                        Đăng nhập để bình luận
                                    </Link>
                                </div>
                            )}

                            <PostCommentList postid={post_id} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='ass1-section__list'>
                            <Card className='post__info-author'>
                                <Link to={userLink}>
                                    <Card.Img
                                        variant='top'
                                        src={avatar}
                                        className='post_item_avatar'
                                    />
                                </Link>

                                <hr />
                                <Card.Body>
                                    <Card.Title>
                                        {userInfo?.fullname}
                                    </Card.Title>
                                    <Card.Text>
                                        <span>Email:</span> {userInfo?.email}
                                    </Card.Text>
                                    <Card.Text>
                                        <span>Description:</span>{" "}
                                        {userInfo?.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <LoadingPage isLoading={loadPage} />
        </main>
    );
}
