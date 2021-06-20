import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function PostCommentForm({
    handleCreateComment,
    isLoading = false,
    avatarUser,
}) {
    const [comment, setComment] = useState("");
    const onChangeData = (e) => {
        setComment(e.target.value);
    };
    const onSubmitData = (e) => {
        e.preventDefault();
        if (handleCreateComment && typeof handleCreateComment === "function") {
            handleCreateComment(comment);
        }
        setComment("");
    };
    return (
        <div className='ass1-add-comment'>
            <Form.Group>
                <Form.Row>
                    <Link to='' className='post_item_avatar'>
                        <img src={avatarUser} alt='avatar' />
                    </Link>
                    <Form.Control
                        type='text'
                        value={comment}
                        onChange={onChangeData}
                        placeholder='comment ...'
                    />
                </Form.Row>
            </Form.Group>

            <div className='ass1-add-comment__content'>
                <Button
                    variant='primary'
                    type='submit'
                    disabled={isLoading}
                    onClick={!isLoading ? onSubmitData : null}
                    className='ass1-add-comment__btn-save ass1-btn-icon'
                >
                    {isLoading ? "Loading…" : "Bình luận"}
                </Button>
            </div>
        </div>
    );
}
