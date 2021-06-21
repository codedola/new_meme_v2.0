import React, { useEffect } from "react";
import "../../components/UserDetail/Style.UserDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth, useUserID } from "../../utilities/hook";
import { actFetchPostUserByIDAsync } from "../../store/user/actions";
// component
import LoadingPage from "../../components/Loading";
import { UserDetailPost, UserDetailInfo } from "../../components/UserDetail";
import OnToTop from "../../components/OnToTop";
//
export default function UserDetail() {
    useAuth();
    const currUserID = useUserID();
    const dispatch = useDispatch();
    const userid = useParams()?.user_id;
    const isLoading = useSelector((state) => state.App.isLoading);
    const userPosts = useSelector((state) => state.User.userPosts);
    const userInfo = useSelector((state) => state.User.userInfo);

    useEffect(() => {
        if (currUserID) {
            dispatch(actFetchPostUserByIDAsync({ userid }));
        }
    }, [userid, currUserID, dispatch]);

    return (
        <main>
            <div className='container'>
                <UserDetailInfo
                    userInfo={userInfo[userid]}
                    countPost={userPosts[userid]?.length}
                />
                <UserDetailPost userPosts={userPosts[userid]} />
            </div>
            <OnToTop />
            <LoadingPage isLoading={isLoading} />
        </main>
    );
}
