import React, { useEffect, useCallback } from "react";
import "./style.header.scss";
import { Link, useRouteMatch } from "react-router-dom";
import { PATHS } from "../../constants";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import HeaderNav from "./Header.Nav";
import HeaderSearch from "./Header.Search";
import LogoApp from "../LogoApp";
import { actFetchUserByIDAsync } from "../../store/user/actions";
import { actLogoutSuccess } from "../../store/auth/actions";
import { useUserID, useIcons } from "../../utilities/hook";
import { useDispatch, useSelector } from "react-redux";
export default function Header() {
    const userid = useUserID();
    const Icons = useIcons();
    const dispatch = useDispatch();
    const matchAdmin = useRouteMatch(PATHS.ADMIN_DASHBOARD);
    const currentUser = useSelector((state) => state.User.currentUser);
    const isAdmin = currentUser?.permission === "admin";
    useEffect(() => {
        if (userid) {
            dispatch(actFetchUserByIDAsync({ userid }));
        }
    }, [userid, dispatch]);

    const handleLogout = useCallback(() => {
        dispatch(actLogoutSuccess());
    }, [dispatch]);

    return (
        <header>
            <div className='ass1-header'>
                <Container className='header__container'>
                    <LogoApp />
                    {!matchAdmin ? (
                        <>
                            <HeaderNav />
                            <HeaderSearch />

                            <Link
                                to={PATHS.POST_CREATE}
                                className='header__btn'
                            >
                                <Icons.Upload /> Upload
                            </Link>
                        </>
                    ) : null}

                    {isAdmin ? (
                        <Link
                            to={PATHS.ADMIN_DASHBOARD}
                            className='header__btn'
                        >
                            <Icons.Tasks /> Members
                        </Link>
                    ) : null}

                    {!currentUser ? (
                        <Link to={PATHS.LOGIN} className='header__btn'>
                            Login
                        </Link>
                    ) : (
                        <div className='wrapper__user'>
                            <Link
                                className='post_item_avatar'
                                to={PATHS.USER_DETAIL.replace(
                                    ":user_id",
                                    currentUser?.USERID
                                )}
                            >
                                <img src={currentUser?.profilepicture} alt='' />
                            </Link>
                            <Link
                                to={PATHS.USER_DETAIL.replace(
                                    ":user_id",
                                    currentUser?.USERID
                                )}
                            >
                                {currentUser?.fullname}
                            </Link>
                            <ListGroup className='user__info' variant='light'>
                                <ListGroup.Item className='user__info-profile'>
                                    <Link to={PATHS.USER_PROFILE}>Profile</Link>
                                </ListGroup.Item>
                                <ListGroup.Item onClick={handleLogout}>
                                    Logout
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    )}
                </Container>
            </div>
        </header>
    );
}
