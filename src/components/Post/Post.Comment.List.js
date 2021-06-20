import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actFetchCommentAsync } from "../../store/comment/actions";
import PostCommentItem from "./Post.Comment.Item";
export default function PostCommentList({ postid }) {
    const dispatch = useDispatch();
    const listComments = useSelector((state) => state.Comments.PostComments);
    const isHasComments = listComments && listComments.length > 0;
    useEffect(() => {
        dispatch(actFetchCommentAsync({ postid }));
    }, [postid, dispatch]);
    return (
        <div className='ass1-comments'>
            <div className='ass1-comments__head'>
                <div className='ass1-comments__title'>
                    {listComments.length || 0} Bình luận
                </div>
                <div className='ass1-comments__options'>
                    <span>Sắp xếp theo:</span>
                    <Link
                        to='/'
                        className='ass1-comments__btn-upvote ass1-btn-icon'
                    >
                        <i className='icon-Upvote' />
                    </Link>
                    <Link
                        to='/'
                        className='ass1-comments__btn-down ass1-btn-icon'
                    >
                        <i className='icon-Downvote' />
                    </Link>
                    <Link
                        to='/'
                        className='ass1-comments__btn-expand ass1-btn-icon'
                    >
                        <i className='icon-Expand_all' />
                    </Link>
                </div>
            </div>

            {isHasComments &&
                listComments.map((comment, index) => {
                    return <PostCommentItem key={index} comment={comment} />;
                })}
        </div>
    );
}
