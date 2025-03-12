import { useState } from "react";
import { useTmdUser } from '../../contexts/TmdUserContext'
import TmdListUser from "../../components/admin/user/TmdListUser";
import TmdAddUserForm from "../../components/admin/user/TmdAddUserForm";
import TmdEditUserForm from "../../components/admin/user/TmdEditUserForm";

export default function TmdUserManagement() {
    const [tmdShowAddModal, setTmdShowAddModal] = useState(false);
    const [tmdShowEditModal, setTmdShowEditModal] = useState(false);
    const { tmdListUser, tmdDeleteUser, tmdAddUser, tmdUpdateUser, tmdMessage } = useTmdUser();
    const [tmdName, setTmdName] = useState("");
    const [tmdEmail, setTmdEmail] = useState("");
    const [tmdPassword, setTmdPassword] = useState("");
    const [tmdPasswordOld, setTmdPasswordOld] = useState("");
    const [tmdError, setTmdError] = useState("");
    const [tmdId, setTmdId] = useState(null);

    const tmdResetForm = () => {
        setTmdName("");
        setTmdEmail("");
        setTmdPassword("");
    };
    const tmdHandleDelete = async (tmdId, e) => {
        e.preventDefault();
        if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
            await tmdDeleteUser(tmdId);
        }
    }

    const tmdHandleEdit = (user) => {
        setTmdId(user.id);
        setTmdName(user.tmdName);
        setTmdEmail(user.tmdEmail);
        setTmdPassword("");
        setTmdPasswordOld(user.tmdPasswordHash)
        setTmdShowEditModal(true);
    };

    const tmdHandleUpdate = async (e) => {
        e.preventDefault();

        if (!tmdName.trim()) {
            setTmdError("VUi lòng nhập họ tên!");
            return;
        }
        if (!tmdEmail.trim()) {
            setTmdError("Vui lòng nhập email!");
            return;
        }
        if (tmdPassword === "") {
            setTmdPassword(tmdPasswordOld);
        }

        await tmdUpdateUser(tmdId, tmdName, tmdEmail, tmdPassword);
        setTmdShowEditModal(false);
        tmdResetForm();
    };

    const tmdHandleSubmit = async (e) => {
        e.preventDefault();

        if (!tmdName.trim()) {
            setTmdError("VUi lòng nhập họ tên!");
            return;
        }
        if (!tmdEmail.trim()) {
            setTmdError("Vui lòng nhập email!");
            return;
        }
        if (!tmdPassword.trim()) {
            setTmdError("Vui lòng mật khẩu!");
            return;
        }

        await tmdAddUser(tmdName, tmdEmail, tmdPassword);
        setTmdShowAddModal(false);
        tmdResetForm();
    }

    return (
        <div className="container p-4 rounded-3" style={{ backgroundColor: "#343a40" }}>
            {tmdMessage && (
                <div className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2">
                    {tmdMessage}
                </div>
            )}
            <div className="mb-3 bg-dark p-3 rounded-3">
                <h2 className="text-center text-white">Quản lý tài khoản người dùng</h2>
            </div>
            <button
                className="btn btn-primary mb-3"
                onClick={() => setTmdShowAddModal(true)}
            >
                Thêm mới giao dịch
            </button>
            <TmdListUser
                tmdListUser={tmdListUser}
                tmdHandleDelete={tmdHandleDelete}
                tmdHandleEdit={tmdHandleEdit}
            />

            {tmdShowAddModal && (
                <TmdAddUserForm
                    tmdName={tmdName}
                    setTmdName={setTmdName}
                    tmdEmail={tmdEmail}
                    setTmdEmail={setTmdEmail}
                    tmdPassword={tmdPassword}
                    setTmdPassword={setTmdPassword}
                    tmdHandleSubmit={tmdHandleSubmit}
                    onClose={() => setTmdShowAddModal(false)}
                    error={tmdError}
                />
            )}

            {tmdShowEditModal && (
                <TmdEditUserForm
                    tmdName={tmdName}
                    setTmdName={setTmdName}
                    tmdEmail={tmdEmail}
                    setTmdEmail={setTmdEmail}
                    tmdPassword={tmdPassword}
                    setTmdPassword={setTmdPassword}
                    tmdHandleSubmit={tmdHandleUpdate}
                    onClose={() => setTmdShowEditModal(false)}
                    error={tmdError}
                />
            )}
        </div>
    )
}
