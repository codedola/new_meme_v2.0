import React, { useState, useCallback } from "react";
import "../ChangePassWord/Style.Password.scss";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";
import { actDeletePostAsync } from "../../store/post/actions";
import LoadPage from "../../components/Loading";
import { useParams, useHistory } from "react-router-dom";
import { PATHS } from "../../constants";

export default function PostDelete() {
    useAuth();
    const postid = useParams().post_id;
    const dispatch = useDispatch();
    const history = useHistory();
    const [emailConfirm, setEmailConfirm] = useState("");

    const isLoading = useSelector((state) => state.App.isLoading);
    const currentUser = useSelector((state) => state.User.currentUser);
    const email = currentUser?.email;
    const userid = currentUser?.USERID;

    const onChangeData = useCallback((e) => {
        setEmailConfirm(e.target.value);
    }, []);

    const handleDeletePost = () => {
        if (emailConfirm.trim() === email) {
            dispatch(actDeletePostAsync({ postid })).then((res) => {
                if (res.ok) {
                    NotificationManager.success("Xóa thành công", null, 1000);
                    history.push(PATHS.USER_DETAIL.replace(":user_id", userid));
                } else {
                    NotificationManager.success(
                        "Có lỗi xảy ra, yêu cầu nhập lại email",
                        null,
                        1200
                    );
                }
            });
        } else {
            NotificationManager.error("Email không hợp lệ", null, 1000);
        }
    };

    return (
        <main>
            <div className='ass1-login'>
                <div className='ass1-login__content'>
                    <p>Xác nhận email</p>
                    <div className='ass1-login__form'>
                        <form action='#'>
                            <div className='form__group'>
                                <input
                                    type='text'
                                    value={emailConfirm}
                                    onChange={onChangeData}
                                    className='form-control'
                                    placeholder='Nhập email của bạn'
                                    required
                                />
                            </div>

                            <div className='ass1-login__send justify-content-center'>
                                <Button
                                    variant='success'
                                    onClick={handleDeletePost}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <LoadPage isLoading={isLoading} />
        </main>
    );
}
