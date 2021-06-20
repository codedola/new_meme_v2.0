import React from "react";
import PostCommentForm from "./Post.Comment.Form";
import PostCommentList from "./Post.Comment.List";

export default function PostItemComment() {
    return (
        <React.Fragment>
            <PostCommentForm />
            <PostCommentList />
        </React.Fragment>
    );
}
