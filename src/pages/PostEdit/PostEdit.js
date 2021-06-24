import React, { useEffect, useState, useCallback, useRef } from "react";
import "../PostUpload/Style.Upload.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    actFetchPostDetailAsync,
    actEditPostAsync,
} from "../../store/post/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCheckImageUrl, useAuth, useUserID } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";
import PostUploadModal from "../../components/PostUpload/PostUpload.Modal";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import PostEditForm from "../../components/PostEdit/PostEdit.Form";

//
export default function PostEdit() {
    useAuth();
    const currUserID = useUserID();
    const dispatch = useDispatch();
    const history = useHistory();
    const checkImageUrl = useCheckImageUrl;
    //useRef
    const inputFile = useRef(null);
    const previewImage = useRef(null);
    const postid = useParams().post_id;

    // useState
    const [show, setShow] = useState(false);
    const [postEdit, setPostEdit] = useState({});
    const [categoriesPostEdit, setCategoriesPostEdit] = useState([]);

    // useSelector
    const isLoading = useSelector((state) => state.App.isLoading);
    const PostDetail = useSelector((state) => state.Posts.PostDetail);
    const post = PostDetail.post;
    const categories = PostDetail.categories;

    // Show/Close modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Get State from Reducer
    useEffect(() => {
        if (!currUserID) return;
        dispatch(actFetchPostDetailAsync({ postid }));
    }, [dispatch, postid, currUserID]);

    // Setup local state
    useEffect(() => {
        const cateID = categories?.map((category) => {
            return category.tag_index;
        });
        const catePostEdit = categories?.map((category) => {
            let { tag_index, tag_value } = category;
            return { tag_index, tag_value };
        });
        setCategoriesPostEdit(catePostEdit);

        setPostEdit({
            postid,
            url_image: post?.url_image,
            obj_image: null,
            category: cateID?.join(","),
            post_content: post?.post_content,
        });
    }, [post, categories, postid]);

    const handleChangeData = useCallback(
        (keyField) => (e) => {
            setPostEdit({
                ...postEdit,
                [keyField]: e.target.value,
            });
        },
        [postEdit]
    );
    //
    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const preview = previewImage.current;
        const isImage = checkImageUrl(file?.name);
        if (isImage) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                preview.src = reader.result;
                setPostEdit({
                    ...postEdit,
                    obj_image: file,
                });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            e.target.value = "";
            preview.src = postEdit?.url_image;
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
            const newCategoriesPostEdit = listCategories?.map((category) => {
                return { tag_index: category[0], tag_value: category[1] };
            });
            const listNewIdCates = listCategories?.map(
                (category) => category[0]
            );
            setPostEdit({
                ...postEdit,
                category: listNewIdCates.join(","),
            });
            setCategoriesPostEdit(newCategoriesPostEdit);
        }
    };

    const handleUploadEditPost = () => {
        const { postid, category, post_content, obj_image, url_image } =
            postEdit;
        dispatch(
            actEditPostAsync({
                postid,
                category,
                post_content,
                obj_image,
                url_image,
            })
        ).then((res) => {
            if (res.ok) {
                NotificationManager.success(res.message, null, 600);
                history.push(PATHS.POST_DETAIL.replace(":post_id", postid));
            } else {
                NotificationManager.error(res.message, null, 600);
            }
        });
    };

    const injectedPropsEditForm = {
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
    };
    return (
        <Container>
            <Row style={{ justifyContent: "center" }}>
                <Col lg={8}>
                    <PostEditForm {...injectedPropsEditForm} />
                </Col>
            </Row>
            <PostUploadModal
                show={show}
                handleClose={handleClose}
                categoriesPostEdit={categoriesPostEdit}
                getCategoriesNewPost={getCategoriesNewPost}
            />
        </Container>
    );
}
