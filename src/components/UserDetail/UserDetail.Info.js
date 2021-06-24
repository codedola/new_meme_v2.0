import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { useUserID } from "../../utilities/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faPaperPlane,
    faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
//
export default function UserDetailInfo({ userInfo, countPost }) {
    const currentUserID = useUserID();
    return (
        <div className='ass1-head-user'>
            <div className='ass1-head-user__content'>
                <div className='ass1-head-user__image'>
                    <img
                        src={
                            userInfo?.profilepicture ||
                            "/images/cat-1634369_1920.jpg"
                        }
                        alt='avatar'
                    />
                </div>
                <div className='ass1-head-user__info'>
                    <div className='ass1-head-user__info-head'>
                        <div className='ass1-head-user__name'>
                            <span>{userInfo?.fullname || "Secret User"}</span>
                            <i>
                                <img
                                    src='/fonts/emotion/svg/Verified.svg'
                                    alt='Verified'
                                />
                            </i>
                        </div>
                        <div className='w-100' />

                        {currentUserID !== userInfo?.USERID ? (
                            <Link
                                to='###'
                                className='ass1-head-user__btn-follow ass1-btn'
                            >
                                Theo dõi
                            </Link>
                        ) : (
                            <>
                                {" "}
                                <Link
                                    to={PATHS.CHANGE_PASSWORD}
                                    className='ass1-head-user__btn-follow ass1-btn'
                                >
                                    Đổi mật khẩu
                                </Link>
                                <Link
                                    to={PATHS.USER_PROFILE}
                                    className='ass1-head-user__btn-follow ass1-btn'
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                    </div>
                    <div className='ass1-head-user__info-statistic'>
                        <div className='ass1-btn-icon'>
                            <i>
                                <FontAwesomeIcon icon={faBook} />
                            </i>
                            <span>Bài viết: {countPost}</span>
                        </div>
                        <div className='ass1-btn-icon'>
                            <i>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </i>
                            <span>Theo dõi: 0</span>
                        </div>
                        <div className='ass1-btn-icon'>
                            <i>
                                <FontAwesomeIcon icon={faUserCheck} />
                            </i>
                            <span>Đang theo dõi: 0</span>
                        </div>
                    </div>
                    <p>{userInfo?.description || "No description"}</p>
                </div>
            </div>
        </div>
    );
}
