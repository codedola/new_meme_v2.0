import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShare,
    faReply,
    faFlag,
    faThumbsDown,
    faThumbsUp,
    faGlobeAmericas,
    faCommentAlt,
    faCamera,
    faUpload,
    faEllipsisH,
    faEdit,
    faTrashAlt,
    faLock,
    faTasks,
    faSortAmountUp,
    faSortAmountDown,
    faUnlock,
    faUserCog,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

//
function useIcons() {
    return {
        Reply() {
            return <FontAwesomeIcon icon={faReply} />;
        },

        ThumbsUp() {
            return <FontAwesomeIcon icon={faThumbsUp} />;
        },
        ThumbsDown() {
            return <FontAwesomeIcon icon={faThumbsDown} />;
        },
        Flag() {
            return <FontAwesomeIcon icon={faFlag} />;
        },
        GlobeAmericas() {
            return <FontAwesomeIcon icon={faGlobeAmericas} />;
        },
        Share() {
            return <FontAwesomeIcon icon={faShare} />;
        },
        CommentAlt() {
            return <FontAwesomeIcon icon={faCommentAlt} />;
        },
        Camera() {
            return <FontAwesomeIcon icon={faCamera} />;
        },
        Upload() {
            return <FontAwesomeIcon icon={faUpload} />;
        },
        EllipsisH() {
            return <FontAwesomeIcon icon={faEllipsisH} />;
        },
        Edit() {
            return <FontAwesomeIcon icon={faEdit} />;
        },

        TrashAlt() {
            return <FontAwesomeIcon icon={faTrashAlt} />;
        },
        Lock() {
            return <FontAwesomeIcon icon={faLock} />;
        },
        Tasks() {
            return <FontAwesomeIcon icon={faTasks} />;
        },
        SortAmountUp() {
            return <FontAwesomeIcon icon={faSortAmountUp} />;
        },
        SortAmountDown() {
            return <FontAwesomeIcon icon={faSortAmountDown} />;
        },
        Unlock() {
            return <FontAwesomeIcon icon={faUnlock} />;
        },
        UsersCog() {
            return <FontAwesomeIcon icon={faUserCog} />;
        },
        SettingUser() {
            return <FontAwesomeIcon icon={faCog} />;
        },
    };
}

export default useIcons;
