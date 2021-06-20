import React, { useCallback, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useSelector, useDispatch } from "react-redux";
import {
    actHandleChangeSearchText,
    actionHandleOnSelectSort,
} from "../../store/user/actions";
import { useIcons } from "../../utilities/hook";

export default function DashboardForm({ isEdit, handleSetEdit }) {
    const Icons = useIcons();
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.User.members.searchText);
    const orderBy = useSelector((state) => state.User.members.orderBy);
    const orderDir = useSelector((state) => state.User.members.orderDir);

    const [localText, setLocalText] = useState(searchText);
    const [orderDirLocal, setOrderDirLocal] = useState(orderDir);
    const [orderByLocal, setOrderByLocal] = useState(orderBy);

    // SEARCH VALUE
    useEffect(() => {
        dispatch(actHandleChangeSearchText(localText));
    }, [dispatch, localText]);

    const handleChangeData = useCallback((e) => {
        setLocalText(e.target.value);
    }, []);
    const handleClearText = useCallback(() => {
        setLocalText("");
    }, []);

    // SORT VALUE
    useEffect(() => {
        dispatch(
            actionHandleOnSelectSort({
                orderBy: orderByLocal,
                orderDir: orderDirLocal,
            })
        );
    }, [orderByLocal, orderDirLocal, dispatch]);

    const onChangeSelect = useCallback((e) => {
        setOrderByLocal(e.target.value);
    }, []);

    const onChangeTypeSort = (keyField) => () => {
        setOrderDirLocal(keyField);
    };

    return (
        <Form className='dashboard__form'>
            <Form.Row>
                <Col xs={6}>
                    <InputGroup>
                        <FormControl
                            value={localText}
                            onChange={handleChangeData}
                            placeholder='Search members ...'
                            aria-label='Search members'
                            aria-describedby='basic-addon2'
                        />
                        <InputGroup.Append>
                            <Button
                                onClick={handleClearText}
                                variant='outline-secondary'
                            >
                                Clear
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col xs={3} md={2}>
                    <Form.Control
                        as='select'
                        onChange={onChangeSelect}
                        value={orderBy}
                    >
                        <option value='name'>Name</option>
                        <option value='active'>Active</option>
                    </Form.Control>
                </Col>
                <Col xs={3} className='dashboard__form-icon'>
                    <div
                        className={`form-icon form-icon__sortUp ${
                            orderDirLocal === "asc" ? "active" : ""
                        }`}
                        onClick={onChangeTypeSort("asc")}
                    >
                        <Icons.SortAmountUp />
                    </div>
                    <div
                        className={`form-icon form-icon__sortDown ${
                            orderDirLocal === "desc" ? "active" : ""
                        }`}
                        onClick={onChangeTypeSort("desc")}
                    >
                        <Icons.SortAmountDown />
                    </div>
                    <div
                        className={`form-icon form-icon__setting ${
                            isEdit ? "isEdit" : ""
                        }`}
                        onClick={handleSetEdit}
                    >
                        <Icons.UsersCog />
                    </div>
                </Col>
            </Form.Row>
        </Form>
    );
}
