import { Outlet } from 'react-router-dom'
import TmdHeader from '../components/admin/TmdHeader'
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/TmdAuthContext";
import { useEffect } from 'react';

export default function TmdAdminLayout() {
    const tmdNavigate = useNavigate();
    const { tmdUser } = useAuth();

    useEffect(() => {
        if (!tmdUser || !tmdUser.tmdEmail || !tmdUser.tmdPasswordHash) {
            tmdNavigate("/tmdlogin");
            return;
        }

        const tmdCheckPassword = bcrypt.compareSync("Duc123", tmdUser.tmdPasswordHash);
        if (tmdUser.tmdEmail !== "dinhhoangducdbp2004@gmail.com" || !tmdCheckPassword) {
            tmdNavigate("/tmdlogin");
        } else {
            console.log("Đăng nhập thành công");
        }
    }, [tmdUser, tmdNavigate]);

    if (!tmdUser) return null;
    return (
        <div className="d-flex flex-row bg-dark">
            <div className="w-100 vh-100 d-flex flex-column">
                <TmdHeader />
                <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
