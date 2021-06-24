import React, { useState, useCallback, useRef } from "react";
import "./Style.Upload.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { faImages, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCheckImageUrl, useAuth } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";
import PostUploadModal from "../../components/PostUpload/PostUpload.Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import { actCreateNewPostAsync } from "../../store/post/actions";
//
const initNewPost = {
    obj_image: "",
    post_content: "",
    category: "",
};
const imageNotAvailable = "/images/no_image_available.jpg";
export default function PostUpload() {
    useAuth();
    // custom hook
    const dispatch = useDispatch();
    const history = useHistory();
    const checkImageUrl = useCheckImageUrl;
    //useRef
    const inputFile = useRef(null);
    const previewImage = useRef(null);

    //useState
    const [show, setShow] = useState(false);
    const [newPost, setNewPost] = useState(initNewPost);
    const [categoriesNewPost, setCategoriesNewPost] = useState(null);

    const isLoading = useSelector((state) => state.App.isLoading);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeData = useCallback(
        (keyField) => (e) => {
            setNewPost({
                ...newPost,
                [keyField]: e.target.value,
            });
        },
        [newPost]
    );

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const preview = previewImage.current;
        const isImage = checkImageUrl(file?.name);
        if (isImage) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                preview.src = reader.result;
                setNewPost({
                    ...newPost,
                    obj_image: file,
                });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            e.target.value = "";
            preview.src = imageNotAvailable;
            NotificationManager.error("Hình ảnh không hợp lệ !", null, 600);
        }
    };

    const onShowInputFile = () => {
        if (inputFile && inputFile.current) {
            inputFile.current.click();
        }
    };

    const getCategoriesNewPost = (categories) => {
        if (typeof categories === "object" && categories !== null) {
            const listCategories = Object.entries(categories);
            const listNameCategoris = listCategories?.map(
                (category) => category[1]
            );
            const listIdCategories = listCategories?.map(
                (category) => category[0]
            );
            setNewPost({
                ...newPost,
                category: listIdCategories.join(","),
            });
            setCategoriesNewPost(listNameCategoris);
        }
    };

    const handleCreateNewPost = () => {
        const { category, post_content, obj_image } = newPost;
        dispatch(
            actCreateNewPostAsync({ category, post_content, obj_image })
        ).then((res) => {
            if (res.ok) {
                NotificationManager.success(res.message, null, 600);
                history.push(
                    PATHS.POST_DETAIL.replace(":post_id", res.post.PID)
                );
            } else {
                NotificationManager.error(res.message, null, 600);
            }
        });
    };

    return (
        <Container>
            <Row style={{ justifyContent: "center" }}>
                <Col lg={8}>
                    <div className='ass1-section ass1-section__edit-post'>
                        <div className='ass1-section__content'>
                            <Form className='post-upload__form'>
                                <Form.Group controlId='postUploadContent'>
                                    <Form.Control
                                        value={newPost.post_content}
                                        onChange={handleChangeData(
                                            "post_content"
                                        )}
                                        as='textarea'
                                        rows={3}
                                        placeholder='Bạn đang nghĩ gì ?'
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
                                <ListGroup.Item
                                    action
                                    variant='light'
                                    onClick={handleShow}
                                >
                                    <FontAwesomeIcon
                                        icon={faPaw}
                                        className='icon-cate'
                                    />
                                    <span>Chủ đề</span>
                                </ListGroup.Item>
                            </ListGroup>
                            <hr />
                            <div className='post-upload__categories'>
                                {categoriesNewPost?.map((category, index) => {
                                    return <span key={index}>#{category}</span>;
                                })}
                            </div>

                            <div className='post-upload__image'>
                                <img
                                    ref={previewImage}
                                    src={imageNotAvailable}
                                    alt='post'
                                />
                            </div>
                            <Button
                                variant='primary'
                                size='lg'
                                block
                                disabled={isLoading}
                                onClick={isLoading ? null : handleCreateNewPost}
                                className='post-upload__btn'
                            >
                                {isLoading
                                    ? "Đang đăng bài ..."
                                    : "Đăng bài viết"}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <PostUploadModal
                show={show}
                handleClose={handleClose}
                getCategoriesNewPost={getCategoriesNewPost}
            />
        </Container>
    );
}
