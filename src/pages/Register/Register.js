import React, { useState, useCallback } from "react";
import "./Style.Register.scss";
import Button from "react-bootstrap/Button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actRegisterAsync } from "../../store/auth/actions";
import { PATHS } from "../../constants";
import LoadPage from "../../components/Loading";
import { NotificationManager } from "react-notifications";
import { useForm } from "react-hook-form";

const reEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
export default function Register() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showValue, setShowValue] = useState({
        new: false,
        reNew: false,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const isLoading = useSelector((state) => state.App.isLoading);

    const handleShowValue = useCallback(
        (keyField) => () => {
            setShowValue({
                ...showValue,
                [keyField]: !showValue[keyField],
            });
        },
        [showValue]
    );

    const handleRegister = useCallback(
        (registerInfo) => {
            const { email, fullname, password, repassword } = registerInfo;

            dispatch(
                actRegisterAsync({ email, fullname, password, repassword })
            ).then((res) => {
                if (res.ok) {
                    NotificationManager.success(
                        "Đăng ký thành công",
                        null,
                        600
                    );
                    history.push(PATHS.LOGIN);
                } else {
                    NotificationManager.error(res.message, null, 600);
                }
            });
        },
        [dispatch, history]
    );

    //
    return (
        <main>
            <div className='ass1-login'>
                <div className='ass1-login__content'>
                    <p>Đăng ký một tài khoản</p>
                    <div className='ass1-login__form'>
                        <form action='#'>
                            <div className='form__group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Tên hiển thị'
                                    {...register("fullname", {
                                        required: true,
                                    })}
                                />
                                {errors?.fullname?.type === "required" && (
                                    <span className='message'>
                                        Yêu cầu nhập trường này !
                                    </span>
                                )}
                            </div>
                            <div className='form__group'>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
                                    {...register("email", {
                                        required: true,
                                        pattern: reEmail,
                                    })}
                                />
                                {errors?.email?.type === "required" && (
                                    <span className='message'>
                                        Yêu cầu nhập trường này !
                                    </span>
                                )}
                                {errors?.email?.type === "pattern" && (
                                    <span className='message'>
                                        email không hợp lệ !
                                    </span>
                                )}
                            </div>
                            <div className='form__group'>
                                <input
                                    type={showValue.new ? "text" : "password"}
                                    className='form-control'
                                    placeholder='Mật khẩu'
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                />
                                {errors?.password?.type === "required" && (
                                    <span className='message'>
                                        Yêu cầu nhập trường này !
                                    </span>
                                )}
                                {errors?.password?.type === "minLength" && (
                                    <span className='message'>
                                        Mật khẩu ít nhất 6 ký tự !
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
                                    placeholder='Nhập lại mật khẩu'
                                    {...register("repassword", {
                                        required: true,
                                    })}
                                />
                                {errors?.repassword?.type === "required" && (
                                    <span className='message'>
                                        Yêu cầu nhập trường này !
                                    </span>
                                )}
                                <FontAwesomeIcon
                                    onClick={handleShowValue("reNew")}
                                    icon={showValue.reNew ? faEyeSlash : faEye}
                                />
                            </div>

                            <div className='ass1-login__send'>
                                <Link to={PATHS.LOGIN}>Đăng nhập</Link>
                                <Button
                                    variant='primary'
                                    onClick={handleSubmit(handleRegister)}
                                >
                                    Đăng ký
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
