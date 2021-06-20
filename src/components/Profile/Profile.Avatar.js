import React from "react";
import { IMAGE_DEFAULT } from "../../constants";
import { useIcons } from "../../utilities/hook";
// data default
const avatarDefault = IMAGE_DEFAULT?.avatar[0];
//
export default function ProfileAvatar({ avatarUser, onShowInputFile }) {
    const Icons = useIcons();

    return (
        <div className='avatar' onClick={onShowInputFile}>
            <img
                src={avatarUser || avatarDefault}
                alt='avatar'
                id='avatar__profile'
            />
            <Icons.Camera />
        </div>
    );
}
