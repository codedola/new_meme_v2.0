import React, { useMemo, useRef } from "react";
import "./Post.scss";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { IMAGE_DEFAULT } from "../../constants";
import { useDateTime, useIcons, useUserID } from "../../utilities/hook";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { actActiveDeactivePostAsync } from "../../store/post/actions";
import Skeleton from "react-loading-skeleton";
//
export default function PostItem({
    post,
    isPostDetail = false,
    isPostRecent = false,
    isSkeletonCard = false,
    userInfo,
    ...restProps
}) {
    const dateTime = useDateTime;
    const Icons = useIcons();
    const currentUserID = useUserID();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const avatarElement = useRef(null);
    const match = useRouteMatch(PATHS.SEARCH_RESULT);
    const currentUser = useSelector((state) => state.User.currentUser);

    const fullnamePost = post?.fullname || userInfo?.fullname;
    const idxDefaultAvatar = post?.PID % IMAGE_DEFAULT.avatar.length;
    const linkPostDetail = PATHS.POST_DETAIL.replace(":post_id", post?.PID);
    const linkUserDetail = PATHS.USER_DETAIL.replace(":user_id", post?.USERID);
    //

    //

    const query = useMemo(() => {
        const parsed = queryString.parse(location.search);
        if (parsed.q) {
            return parsed.q.toLowerCase();
        }
    }, [location]);

    //
    const renderFullName = useMemo(() => {
        if (match && query) {
            return (
                <Link
                    to={linkUserDetail}
                    className='ass1-section__name'
                    dangerouslySetInnerHTML={{
                        __html: fullnamePost
                            .toLowerCase()
                            .split(query)
                            .join(`<mark>${query}</mark>`),
                    }}
                ></Link>
            );
        }
        return (
            <Link to={linkUserDetail} className='ass1-section__name'>
                {fullnamePost}
            </Link>
        );
    }, [fullnamePost, query, match, linkUserDetail]);

    const renderContent = useMemo(() => {
        if (match && query) {
            return (
                <p
                    className='ass1-section__text'
                    dangerouslySetInnerHTML={{
                        __html: post?.post_content
                            .toLowerCase()
                            .split(query)
                            .join(`<mark>${query}</mark>`),
                    }}
                />
            );
        }
        return (
            <p
                className='ass1-section__text'
                onClick={
                    isPostRecent
                        ? () => {
                              history.push(linkPostDetail);
                          }
                        : null
                }
            >
                {post?.post_content}
            </p>
        );
    }, [post, query, match, history, isPostRecent, linkPostDetail]);

    const handleActiveDeactive = () => {
        const postid = post?.PID;
        const userid = currentUserID;

        if (postid && userid) {
            dispatch(actActiveDeactivePostAsync({ postid, userid })).then(
                (res) => {
                    if (res.ok) {
                        NotificationManager.success(res.message, null, 600);
                    } else {
                        NotificationManager.error(res.message, null, 600);
                    }
                }
            );
        }
    };

    //

    //
    if (!post) return null;
    const {
        time_added: created,
        USERID: userID,
        profilepicture: userAvatar,
        url_image: blogImg,
        PID: postID,
        status: activePost,
        tag_value: categoryValue,
    } = post;
    // categories post-detail

    const categories = restProps.categories;
    //image default

    const idxDefaultPost = postID % IMAGE_DEFAULT.post.length;
    const avatar =
        userAvatar ||
        userInfo?.profilepicture ||
        IMAGE_DEFAULT.avatar[idxDefaultAvatar];

    const urlImg = blogImg || IMAGE_DEFAULT.post[idxDefaultPost];

    const { relativeTimeStr } = dateTime({ date_time: created });

    return (
        <div className='ass1-section'>
            {!isPostRecent ? (
                <div
                    className={`ass1-section__head ${match ? "read-only" : ""}`}
                >
                    <Link to={linkUserDetail} className='post_item_avatar'>
                        <img
                            ref={avatarElement}
                            src={avatar}
                            alt='avatar'
                            className={`post__avatar-meme${postID}`}
                        />
                    </Link>
                    <div className='post_item_info'>
                        {renderFullName}
                        <span className='ass1-section__passed'>
                            <span>{relativeTimeStr}.</span>
                            {activePost === "0" ? (
                                <Icons.Lock />
                            ) : (
                                <Icons.GlobeAmericas />
                            )}
                        </span>
                    </div>
                    <div className='post_item-more'>
                        <span>
                            <Icons.EllipsisH />
                        </span>
                        <ListGroup className='post_item-list'>
                            <ListGroup.Item>
                                <Link
                                    to={PATHS.POST_EDIT.replace(
                                        ":post_id",
                                        postID
                                    )}
                                >
                                    <Icons.Edit />
                                    Chỉnh sửa bài viết
                                </Link>
                            </ListGroup.Item>
                            {/* Active Post */}
                            {currentUser?.USERID === userID ? (
                                <ListGroup.Item onClick={handleActiveDeactive}>
                                    {activePost === "1" ? (
                                        <>
                                            <Icons.Lock />
                                            Chỉ mình tôi
                                        </>
                                    ) : (
                                        <>
                                            <Icons.GlobeAmericas />
                                            Cộng đồng
                                        </>
                                    )}
                                </ListGroup.Item>
                            ) : null}

                            {/* ---- */}
                            {currentUser?.USERID === userID ? (
                                <ListGroup.Item>
                                    <Link
                                        to={PATHS.POST_DELETE.replace(
                                            ":post_id",
                                            postID
                                        )}
                                    >
                                        <Icons.TrashAlt />
                                        Xóa bài viết
                                    </Link>
                                </ListGroup.Item>
                            ) : null}
                        </ListGroup>
                    </div>
                </div>
            ) : null}

            <div
                className={`ass1-section__content${
                    isPostRecent ? "--post-recent" : ""
                }`}
            >
                {!isSkeletonCard ? renderContent : <Skeleton count={2} />}
                {categoryValue && (
                    <Badge variant='secondary'>#{categoryValue}</Badge>
                )}

                {categories &&
                    categories.map((category) => {
                        let { tag_index, tag_value } = category;
                        let linkCategory = PATHS.POST_LIST_CATEGORY.replace(
                            ":category_id",
                            tag_index
                        );
                        return (
                            <Link
                                to={linkCategory}
                                key={tag_index}
                                className='post__category'
                            >
                                <Badge variant='secondary'>#{tag_value}</Badge>
                            </Link>
                        );
                    })}

                <div className='ass1-section__image'>
                    <Link to={linkPostDetail}>
                        {!isSkeletonCard ? (
                            <img src={urlImg} alt='' />
                        ) : (
                            <Skeleton width={"110px"} height={"64px"} />
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}
