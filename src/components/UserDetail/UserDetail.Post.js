import React from "react";
import Container from "react-bootstrap/Container";
import PostList from "../Post/Post.List";
export default function UserDetailPost({ userPosts }) {
    return (
        <Container>
            <PostList posts={userPosts} classCol='col-lg-6' classRow='row' />;
        </Container>
    );
}
