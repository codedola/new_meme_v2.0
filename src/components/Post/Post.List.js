import React from "react";
import "./Post.scss";
import PostItem from "./Post.Item";

export default function PostList({ posts, ...restProps }) {
    return (
        <div className={`ass1-section__list ${restProps.classRow || ""}`}>
            {posts?.map((post, index) => {
                return (
                    <div
                        key={index}
                        className={`ass1-section__item ${
                            restProps.classCol || ""
                        }`}
                    >
                        {post ? <PostItem post={post} /> : null}
                    </div>
                );
            })}
        </div>
    );
}
