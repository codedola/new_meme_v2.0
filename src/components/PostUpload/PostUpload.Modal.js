import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

//
export default function PostUploadModal({
    show,
    handleClose,
    categoriesPostEdit,
    getCategoriesNewPost,
}) {
    const [catePost, setCatePost] = useState({});
    const categories = useSelector((state) => state.Categories.listCategories);

    useEffect(() => {
        if (categoriesPostEdit) {
            let hashCategorisPostEdit = {};
            for (let catePostEdit of categoriesPostEdit) {
                let { tag_index, tag_value } = catePostEdit;
                hashCategorisPostEdit[tag_index] = tag_value;
            }
            setCatePost({ ...hashCategorisPostEdit });
        }
    }, [categoriesPostEdit]);

    const handleChangeCategories = (keyName) => (e) => {
        const valueChecked = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setCatePost({
                ...catePost,
                [e.target.value]: keyName,
            });
        } else {
            if (catePost.hasOwnProperty(valueChecked)) {
                delete catePost[valueChecked];
                setCatePost({ ...catePost });
            }
        }
    };

    const _getCategoriesNewPost = () => {
        getCategoriesNewPost &&
            typeof getCategoriesNewPost === "function" &&
            getCategoriesNewPost(catePost);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} animation={false} size='lg'>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Row>
                    {categories?.map((category) => {
                        const { text, id } = category;
                        return (
                            <Col xs={6} md={4} key={id} className='mb-3'>
                                <Form.Check
                                    onChange={handleChangeCategories(text)}
                                    checked={catePost[id] ? true : false}
                                    custom
                                    value={id}
                                    inline
                                    label={text}
                                    type='checkbox'
                                    id={`custom-inline-checkbox-${id}`}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={_getCategoriesNewPost}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
