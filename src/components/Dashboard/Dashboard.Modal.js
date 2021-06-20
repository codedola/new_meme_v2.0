import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { actActiveDeactiveUserAsync } from "../../store/user/actions";
export default function DashboardModal({ userEdit, setInfoUserEdit }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const isActiveUser = userEdit?.status === "1";

    const isLoading = useSelector((state) => state.App.isLoading);

    useEffect(() => {
        if (userEdit) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [userEdit]);

    const closeMoldalUserEdit = () => {
        setInfoUserEdit(null)();
    };

    const handleActiveDeactiveUser = () => {
        if (userEdit) {
            dispatch(
                actActiveDeactiveUserAsync({
                    userid: userEdit.USERID,
                    currentStatus: userEdit.status,
                })
            ).then((res) => {
                if (res.ok) {
                    NotificationManager.success(res.message, null, 800);
                } else {
                    NotificationManager.error(res.message, null, 800);
                }
                closeMoldalUserEdit();
            });
        }
    };

    return (
        <Modal
            show={showModal}
            onHide={closeMoldalUserEdit}
            animation={false}
            size='sm'
            centered
        >
            <Modal.Header style={{ padding: "8px" }} closeButton></Modal.Header>
            <Modal.Body style={{ textAlign: "center", padding: "10px 0px" }}>
                <Alert variant={isActiveUser ? "danger" : "success"}>
                    {isActiveUser ? "Deactive" : "Active"}: {userEdit?.fullname}
                </Alert>
                <Button
                    size='sm'
                    variant={isActiveUser ? "danger" : "success"}
                    onClick={isLoading ? null : handleActiveDeactiveUser}
                    disabled={isLoading}
                >
                    {isActiveUser ? "Deactive" : "Active"}
                </Button>
            </Modal.Body>
        </Modal>
    );
}
