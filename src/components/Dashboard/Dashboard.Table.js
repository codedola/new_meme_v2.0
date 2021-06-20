import React from "react";
import Table from "react-bootstrap/Table";
import { useIcons } from "../../utilities/hook";
import { useSelector } from "react-redux";
import listMemberSearchSort from "../../store/user/selector/listMemberSearchSort";
export default function DashboardTable({ isEdit = false, setInfoUserEdit }) {
    const Icons = useIcons();
    const listMembers = useSelector((state) =>
        listMemberSearchSort(state.User.members)
    );

    return (
        <Table striped bordered hover className='dashboard__table'>
            <thead>
                <tr>
                    <th style={{ textAlign: "center" }}>
                        {isEdit ? "" : "Stt"}
                    </th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {listMembers?.map((member, index) => {
                    return (
                        <tr key={index}>
                            <td
                                className={
                                    !isEdit
                                        ? "dashboard__table-stt"
                                        : "dashboard__table-edit--user"
                                }
                                onClick={
                                    isEdit ? setInfoUserEdit(member) : null
                                }
                            >
                                {!isEdit ? index : <Icons.SettingUser />}
                            </td>
                            <td>{member.fullname}</td>
                            <td>{member.email}</td>
                            <td className='dashboard__table-active'>
                                {member.status === "1" ? (
                                    <span className='user__active'>
                                        <Icons.Unlock /> Active
                                    </span>
                                ) : (
                                    <span className='user__deactive'>
                                        <Icons.Lock /> Deactive
                                    </span>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
