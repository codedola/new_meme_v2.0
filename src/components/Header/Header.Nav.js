import React, { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { PATHS } from "../../constants";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderNav() {
    const history = useHistory();
    const matchCategory = useRouteMatch(PATHS.POST_LIST_CATEGORY);
    const [modalShow, setModalShow] = useState(false);
    const categories = useSelector((state) => state.Categories.listCategories);

    const handleOnChangeCategory = useCallback(
        (id) => () => {
            setModalShow(false);
            history.push(PATHS.POST_LIST_CATEGORY.replace(":category_id", id));
        },
        [history]
    );
    return (
        <div className='header__nav'>
            <Button
                variant='outline-light'
                className='header__btn'
                onClick={() => setModalShow(true)}
            >
                Categories
            </Button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                animation={false}
                size='lg'
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Row>
                        {categories?.map((category) => {
                            const { text, id } = category;
                            const currCateID = Number(
                                matchCategory?.params?.category_id
                            );
                            return (
                                <Col xs={6} md={4} key={id} className='mb-4'>
                                    <Form.Check
                                        onChange={handleOnChangeCategory(id)}
                                        checked={
                                            id === currCateID ? true : false
                                        }
                                        custom
                                        value={id}
                                        inline
                                        label={text}
                                        type='radio'
                                        id={`custom-inline-checkbox-${id}`}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
