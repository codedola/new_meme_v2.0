import React from "react";
import "../ChangePassWord/Style.Password.scss";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";
import { actDeletePostAsync } from "../../store/post/actions";
import { useParams, useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import { EMAIL_VALIDATOR } from "../../constants/FormValidator";
import { useForm } from "react-hook-form";
import LoadingChange from "../../components/LoadingChange";
// default value init

export default function PostDelete() {
    useAuth();
    const postid = useParams().post_id;
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const isLoading = useSelector((state) => state.App.isLoading);
    const currentUser = useSelector((state) => state.User.currentUser);
    const email = currentUser?.email;
    const userid = currentUser?.USERID;

    const handleDeletePost = ({ email: emailConfirm }) => {
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
            NotificationManager.error("Email không chính xác", null, 1000);
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
                                    className='form-control'
                                    placeholder='Nhập email của bạn'
                                    {...register("email", {
                                        required: true,
                                        pattern: EMAIL_VALIDATOR.pattern,
                                    })}
                                />
                                {errors?.email?.type === "required" && (
                                    <span className='message'>
                                        {EMAIL_VALIDATOR.messInvalid}
                                    </span>
                                )}
                                {errors?.email?.type === "pattern" && (
                                    <span className='message'>
                                        {EMAIL_VALIDATOR.messInvalid}
                                    </span>
                                )}
                            </div>

                            <div className='ass1-login__send justify-content-center'>
                                <Button
                                    variant='success'
                                    onClick={handleSubmit(handleDeletePost)}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <LoadingChange isLoading={isLoading} text={"Đang xóa ..."} />
        </main>
    );
}
