import React, { useEffect } from "react";
import "../../components/UserDetail/Style.UserDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../utilities/hook";
import LoadingPage from "../../components/Loading";
import { actFetchPostUserByIDAsync } from "../../store/user/actions";
//
import { UserDetailPost, UserDetailInfo } from "../../components/UserDetail";
export default function UserDetail() {
    useAuth();
    const dispatch = useDispatch();
    const userid = useParams()?.user_id;
    const isLoading = useSelector((state) => state.App.isLoading);
    const userPosts = useSelector((state) => state.User.userPosts);
    const userInfo = useSelector((state) => state.User.userInfo);

    useEffect(() => {
        dispatch(actFetchPostUserByIDAsync({ userid }));
    }, [userid, dispatch]);

    return (
        <main>
            <div className='container'>
                <UserDetailInfo
                    userInfo={userInfo[userid]}
                    countPost={userPosts[userid]?.length}
                />
                <UserDetailPost userPosts={userPosts[userid]} />
            </div>
            <LoadingPage isLoading={isLoading} />
        </main>
    );
}
