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
//
const initRegister = { email: "", fullname: "", password: "", repassword: "" };
export default function Register() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showValue, setShowValue] = useState({
        new: false,
        reNew: false,
    });

    const [registerInfo, setRegisterInfo] = useState(initRegister);

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

    const onChangeData = useCallback(
        (keyField) => (e) => {
            setRegisterInfo({
                ...registerInfo,
                [keyField]: e.target.value,
            });
        },
        [registerInfo]
    );

    const handleRegister = useCallback(() => {
        const { email, fullname, password, repassword } = registerInfo;
        dispatch(
            actRegisterAsync({ email, fullname, password, repassword })
        ).then((res) => {
            setRegisterInfo(initRegister);
            if (res.ok) {
                NotificationManager.success("Đăng ký thành công", null, 600);
                history.push(PATHS.LOGIN);
            } else {
                NotificationManager.error(res.message, null, 600);
            }
        });
    }, [registerInfo, dispatch, history]);

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
                                    value={registerInfo.fullname}
                                    onChange={onChangeData("fullname")}
                                    className='form-control'
                                    placeholder='Tên hiển thị'
                                    required
                                />
                            </div>
                            <div className='form__group'>
                                <input
                                    type='email'
                                    value={registerInfo.email}
                                    onChange={onChangeData("email")}
                                    className='form-control'
                                    placeholder='Email'
                                    required
                                />
                            </div>
                            <div className='form__group'>
                                <input
                                    type={showValue.new ? "text" : "password"}
                                    value={registerInfo.password}
                                    onChange={onChangeData("password")}
                                    className='form-control'
                                    placeholder='Mật khẩu'
                                    required
                                />
                                <FontAwesomeIcon
                                    onClick={handleShowValue("new")}
                                    icon={showValue.new ? faEyeSlash : faEye}
                                />
                            </div>
                            <div className='form__group'>
                                <input
                                    type={showValue.reNew ? "text" : "password"}
                                    value={registerInfo.repassword}
                                    onChange={onChangeData("repassword")}
                                    className='form-control'
                                    placeholder='Nhập lại mật khẩu'
                                    required
                                />
                                <FontAwesomeIcon
                                    onClick={handleShowValue("reNew")}
                                    icon={showValue.reNew ? faEyeSlash : faEye}
                                />
                            </div>

                            <div className='ass1-login__send'>
                                <Link to={PATHS.LOGIN}>Đăng nhập</Link>
                                <Button
                                    variant='primary'
                                    onClick={handleRegister}
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
