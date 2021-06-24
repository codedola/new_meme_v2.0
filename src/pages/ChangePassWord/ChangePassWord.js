import React, { useState, useCallback } from "react";
import "./Style.Password.scss";
import Button from "react-bootstrap/Button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { actChangePasswordAsync } from "../../store/auth/actions";
import { useAuth } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATOR } from "../../constants/FormValidator";
export default function ChangePassWord() {
    useAuth();
    const dispatch = useDispatch();
    const [showValue, setShowValue] = useState({
        old: false,
        new: false,
        reNew: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleShowValue = useCallback(
        (keyField) => () => {
            setShowValue({
                ...showValue,
                [keyField]: !showValue[keyField],
            });
        },
        [showValue]
    );

    const handleChangePassword = useCallback(
        (passwordInfo) => {
            const { oldPassword, newPassword, reNewPassword } = passwordInfo;

            dispatch(
                actChangePasswordAsync({
                    oldPassword,
                    newPassword,
                    reNewPassword,
                })
            ).then((res) => {
                if (res.ok) {
                    NotificationManager.success(res.message, null, 1000);
                } else {
                    NotificationManager.error(res.message, null, 1000);
                }
            });
        },
        [dispatch]
    );

    //
    return (
        <main>
            <div className='ass1-login'>
                <div className='ass1-login__content'>
                    <p>Đổi mật khẩu</p>
                    <div className='ass1-login__form'>
                        <form action='#'>
                            <div className='form__group'>
                                <input
                                    type={showValue.old ? "text" : "password"}
                                    className='form-control'
                                    placeholder='Mật khẩu cũ'
                                    {...register("oldPassword", {
                                        required: true,
                                    })}
                                />
                                {errors?.oldPassword?.type === "required" && (
                                    <span className='message'>
                                        {PASSWORD_VALIDATOR.messRequired}
                                    </span>
                                )}

                                <FontAwesomeIcon
                                    onClick={handleShowValue("old")}
                                    icon={showValue.old ? faEyeSlash : faEye}
                                />
                            </div>
                            <div className='form__group'>
                                <input
                                    type={showValue.new ? "text" : "password"}
                                    className='form-control'
                                    placeholder='Mật khẩu mới'
                                    {...register("newPassword", {
                                        required: true,
                                    })}
                                />
                                {errors?.newPassword?.type === "required" && (
                                    <span className='message'>
                                        {PASSWORD_VALIDATOR.messRequired}
                                    </span>
                                )}
                                <FontAwesomeIcon
                                    onClick={handleShowValue("new")}
                                    icon={showValue.new ? faEyeSlash : faEye}
                                />
                            </div>

                            <div className='form__group'>
                                <input
                                    type={showValue.reNew ? "text" : "password"}
                                    className='form-control'
                                    placeholder='Xác nhận mật khẩu mới'
                                    {...register("reNewPassword", {
                                        required: true,
                                    })}
                                />
                                {errors?.reNewPassword?.type === "required" && (
                                    <span className='message'>
                                        {PASSWORD_VALIDATOR.messRequired}
                                    </span>
                                )}
                                <FontAwesomeIcon
                                    onClick={handleShowValue("reNew")}
                                    icon={showValue.reNew ? faEyeSlash : faEye}
                                />
                            </div>

                            <div className='ass1-login__send justify-content-center'>
                                <Button
                                    variant='primary'
                                    onClick={handleSubmit(handleChangePassword)}
                                >
                                    Đổi mật khẩu
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
