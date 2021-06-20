import React, { useEffect, useState } from "react";
import "../../components/Profile/profile.scss";
import {
    ProfileTitle,
    ProfileForm,
    ProfileAvatar,
} from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
    actUpdateProfileAsync,
    actFetchUserByIDAsync,
} from "../../store/user/actions";
import { useAuth, useCheckImageUrl, useUserID } from "../../utilities/hook";
import { NotificationManager } from "react-notifications";

//
export default function UserProfile() {
    useAuth();
    const dispatch = useDispatch();
    const userid = useUserID();
    const checkImageUrl = useCheckImageUrl;
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [objFileAvatar, setObjFileAvatar] = useState(null);
    const currentUser = useSelector((state) => state.User.currentUser);

    //
    useEffect(() => {
        setUserInfo(currentUser);
    }, [currentUser]);
    //
    useEffect(() => {
        if (userid && !currentUser) {
            dispatch(actFetchUserByIDAsync({ userid }));
        }
    }, [userid, dispatch, currentUser]);

    const onChangeData = (keyField) => (e) => {
        setUserInfo({
            ...userInfo,
            [keyField]: e.target.value,
        });
    };

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        const preview = document.getElementById("avatar__profile");
        const isImage = checkImageUrl(file?.name);

        if (isImage) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                preview.src = reader.result;
                setObjFileAvatar(file);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            e.target.value = "";
            preview.src = userInfo?.profilepicture;
            NotificationManager.error("Hình ảnh không hợp lệ !", null, 600);
        }
    };

    const onShowInputFile = () => {
        const inputFile = document.getElementById("input_file");
        if (inputFile && inputFile.click) {
            inputFile.click();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;
        setLoading(true);
        const { gender, fullname, description } = userInfo;
        const data = {
            avatar: objFileAvatar,
            gender,
            fullname,
            description,
        };

        dispatch(actUpdateProfileAsync(data))
            .then((res) => {
                if (res.ok) {
                    NotificationManager.success(res.message, null, 600);
                } else {
                    NotificationManager.error(res.message, null, 600);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const injectedPropsForm = {
        isLoading,
        userInfo,
        onChangeData,
        onChangeImage,
        handleSubmit,
    };
    const injectedPropsAvatar = {
        avatarUser: userInfo?.profilepicture,
        onShowInputFile: onShowInputFile,
    };
    //
    return (
        <main>
            <div className='ass1-login'>
                <div className='ass1-login__content'>
                    <ProfileTitle />
                    <div className='ass1-login__form'>
                        <ProfileAvatar {...injectedPropsAvatar} />
                        <ProfileForm {...injectedPropsForm} />
                    </div>
                </div>
            </div>
        </main>
    );
}
