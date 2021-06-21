import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
    actFetchCommentAsync,
    actOnSelectSortCommnet,
} from "../../store/comment/actions";
import listCommentSort from "../../store/comment/selector/listCommentSort";
import PostCommentItem from "./Post.Comment.Item";
import { useIcons } from "../../utilities/hook";

//
export default function PostCommentList({ postid }) {
    const dispatch = useDispatch();
    const Icons = useIcons();
    const orderBy = useSelector((state) => state.Comments.PostComments.orderBy);
    const orderDir = useSelector(
        (state) => state.Comments.PostComments.orderDir
    );
    const listComments = useSelector((state) =>
        listCommentSort(state.Comments.PostComments)
    );

    const isHasComments = listComments && listComments.length > 0;

    const [orderDirLocal, setOrderDirLocal] = useState(orderDir);
    const [orderByLocal, setOrderByLocal] = useState(orderBy);

    //
    useEffect(() => {
        dispatch(actFetchCommentAsync({ postid }));
    }, [postid, dispatch]);

    useEffect(() => {
        dispatch(
            actOnSelectSortCommnet({
                orderBy: orderByLocal,
                orderDir: orderDirLocal,
            })
        );
    }, [orderByLocal, orderDirLocal, dispatch]);

    const onChangeSelect = useCallback((e) => {
        setOrderByLocal(e.target.value);
    }, []);

    const onChangeTypeSort = useCallback(
        (keyField) => () => {
            setOrderDirLocal(keyField);
        },
        []
    );

    return (
        <div className='ass1-comments'>
            <div className='ass1-comments__head'>
                <div className='ass1-comments__title'>
                    <span>{listComments.length || 0} Bình luận</span>
                </div>
                <div className='ass1-comments__options'>
                    <Form.Control
                        as='select'
                        onChange={onChangeSelect}
                        value={orderBy}
                    >
                        <option value='name'>Name</option>
                        <option value='latest'>Latest</option>
                    </Form.Control>
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
                </div>
            </div>

            {isHasComments &&
                listComments.map((comment, index) => {
                    return <PostCommentItem key={index} comment={comment} />;
                })}
        </div>
    );
}
