import React, { useState, useEffect, useCallback } from "react";
import "./dashboard.scss";
//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// component app
import DashboardForm from "../../components/Dashboard/Dashboard.Form";
import DashboardTable from "../../components/Dashboard/Dashboard.Table";
import DashboardModal from "../../components/Dashboard/Dashboard.Modal";
import LoadPage from "../../components/Loading";
import OnToTop from "../../components/OnToTop";
//
import { useDispatch, useSelector } from "react-redux";
import { actFetchListMemberAsync } from "../../store/user/actions";
import { useAdmin } from "../../utilities/hook";
export default function Dashboard() {
    useAdmin();
    const dispatch = useDispatch();
    const [isLoadPage, setIsLoadPage] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [userEdit, setUserEdit] = useState(null);
    //
    const isLoading = useSelector((state) => state.App.isLoading);
    const members = useSelector((state) => state.User.members);
    const list = members.list;
    const page = members.currPage;
    const total = members.total;

    useEffect(() => {
        if (list.length > 0) return;
        setIsLoadPage(true);
        dispatch(actFetchListMemberAsync()).finally(() => {
            setIsLoadPage(false);
        });
    }, [dispatch, list]);

    const handleLoadMoreMember = useCallback(() => {
        if (isLoading) return;
        dispatch(actFetchListMemberAsync({ currPage: page + 1 }));
    }, [page, dispatch, isLoading]);

    //

    const handleSetEdit = () => {
        setIsEdit(!isEdit);
    };

    const setInfoUserEdit = (userInfo) => () => {
        setUserEdit(userInfo);
    };
    //

    const propsDashboardForm = { isEdit, handleSetEdit };
    const propsDashboardTable = { isEdit, setInfoUserEdit };
    const propsDashboardModal = {
        userEdit,
        setInfoUserEdit,
    };
    return (
        <Container className='dashboard'>
            <Row>
                <DashboardForm {...propsDashboardForm} />
            </Row>

            <Row>
                <DashboardTable {...propsDashboardTable} />

                {total !== list.length ? (
                    <div className='dashboard__load-more'>
                        <Button
                            variant='outline-secondary'
                            disabled={isLoading}
                            onClick={isLoading ? null : handleLoadMoreMember}
                        >
                            {isLoading ? "Đang tải ..." : "Xem thêm"}
                        </Button>
                    </div>
                ) : null}
            </Row>

            <DashboardModal {...propsDashboardModal} />
            <OnToTop />
            <LoadPage isLoading={isLoadPage} />
        </Container>
    );
}
