import React from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { faImages, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
export default function PostEditForm({
    post,
    isLoading,
    postEdit,
    inputFile,
    handleShow,
    previewImage,
    categoriesPostEdit,
    onShowInputFile,
    handleChangeData,
    handleChangeImage,
    handleUploadEditPost,
}) {
    return (
        <div className='ass1-section ass1-section__edit-post'>
            <div className='ass1-section__content'>
                <Form className='post-upload__form'>
                    <Form.Group controlId='postUploadContent'>
                        <Form.Control
                            value={postEdit.post_content}
                            onChange={handleChangeData("post_content")}
                            as='textarea'
                            rows={3}
                            placeholder={postEdit.post_content}
                        />
                        <Form.File
                            id='postUploadFile'
                            ref={inputFile}
                            onChange={handleChangeImage}
                        />
                    </Form.Group>
                </Form>
                <ListGroup horizontal className='post-upload__list'>
                    <ListGroup.Item
                        action
                        variant='light'
                        onClick={onShowInputFile}
                    >
                        <FontAwesomeIcon
                            icon={faImages}
                            className='icon-image'
                        />
                        <span>Tải ảnh lên</span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant='light' onClick={handleShow}>
                        <FontAwesomeIcon icon={faPaw} className='icon-cate' />
                        <span>Chủ đề</span>
                    </ListGroup.Item>
                </ListGroup>
                <hr />
                <div className='post-upload__categories'>
                    {categoriesPostEdit?.map((category, index) => {
                        return <span key={index}>#{category.tag_value}</span>;
                    })}
                </div>

                <div className='post-upload__image'>
                    <img
                        ref={previewImage}
                        src={
                            post?.url_image || "/images/no_image_available.jpg"
                        }
                        alt='post'
                    />
                </div>
                <Button
                    block
                    size='lg'
                    variant='primary'
                    className='post-upload__btn'
                    disabled={isLoading}
                    onClick={!isLoading ? handleUploadEditPost : null}
                >
                    {isLoading ? "Đăng đang bài ..." : "Đăng bài chỉnh sửa"}
                </Button>
            </div>
        </div>
    );
}
