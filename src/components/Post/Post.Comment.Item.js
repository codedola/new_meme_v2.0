import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { useDateTime, useIcons } from "../../utilities/hook";
export default function PostCommentItem({ comment }) {
    const dateTimeHook = useDateTime;
    const Icons = useIcons();

    if (!comment) return null;

    const {
        // CID: commentID,
        // PID: postID,
        USERID: userID,
        fullname: userName,
        profilepicture: userAvatar,
        comment: contentComment,
        time_added: timeCreated,
    } = comment;

    const { relativeTimeStr } = dateTimeHook({ date_time: timeCreated });
    const linkUser = PATHS.USER_DETAIL.replace(":user_id", userID);
    return (
        <div className='ass1-comments__section'>
            <Link to={linkUser} className='post_item_avatar'>
                <img src={userAvatar || "/images/avatar1.jpg"} alt='' />
            </Link>
            <div className='ass1-comments__content'>
                <Link to={linkUser} className='ass1-comments__name'>
                    {userName}
                </Link>
                <span className='ass1-comments__passed'>{relativeTimeStr}</span>
                <Link to='/' className='ass1-comments__btn-reply ass1-btn-icon'>
                    <Icons.Reply /> <span>Trả lời</span>
                </Link>
                <p>{contentComment}</p>
                <div className='ass1-comments__info'>
                    <Link
                        to='/'
                        className='ass1-comments__btn-upvote ass1-btn-icon'
                    >
                        <Icons.ThumbsUp />
                        <span>901</span>
                    </Link>
                    <Link
                        to='/'
                        className='ass1-comments__btn-down ass1-btn-icon'
                    >
                        <Icons.ThumbsDown />
                        <span>36</span>
                    </Link>
                    {/* <Link
                        to='/'
                        className='ass1-comments__btn-flag ass1-btn-icon'
                    >
                        <Icons.Flag />
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
