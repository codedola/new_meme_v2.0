import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
import { useSelector } from "react-redux";
export default function PostRecent() {
    const currentUser = useSelector((state) => state.User.currentUser);
    return (
        <aside className='ass1-aside'>
            <div className='ass1-content-head__t'>
                <div>Bài viết gần đây của bạn</div>
            </div>
            {!currentUser ? (
                <div>
                    Vui lòng đăng nhập để xem nội dung này
                    <Link to={PATHS.LOGIN}>Đăng nhập</Link>
                </div>
            ) : null}
        </aside>
    );
}
