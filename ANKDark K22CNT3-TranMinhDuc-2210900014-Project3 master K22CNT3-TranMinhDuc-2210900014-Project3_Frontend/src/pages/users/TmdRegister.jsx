import { useState } from "react";
import { useAuth } from "../../contexts/TmdAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function TmdRegister() {
    const { tmdRegister } = useAuth();
    const [tmdEmail, setTmdEmail] = useState("");
    const [tmdName, setTmdName] = useState("");
    const [tmdPassword, setTmdPassword] = useState("");
    const [tmdError, setTmdError] = useState("");
    const tmdNavigate = useNavigate();

    const tmdHandleSubmit = async (e) => {
        e.preventDefault();
        setTmdError("");

        if (!tmdEmail || !tmdPassword || !tmdName) {
            setTmdError("Thiếu thông tin đăng ký!");
            return;
        }

        const result = await tmdRegister(tmdName, tmdEmail, tmdPassword);
        if (!result.success) {
            setTmdError(result.message);
        }
        tmdNavigate("/tmdlogin");
    };

    return (
        <form onSubmit={tmdHandleSubmit}>
            <h1>Đăng ký</h1>
            <div className="input_box">
                <input
                    id="tmdName"
                    type="text"
                    name="tmdName"
                    placeholder="Họ và tên"
                    className="form-control my-3"
                    value={tmdName}
                    onChange={(e) => setTmdName(e.target.value)}
                    autoComplete="name"
                    autoFocus
                />
                <i className="bx bx-user"></i>
            </div>
            <div className="input_box">
                <input
                    id="tmdEmail"
                    type="email"
                    name="tmdEmail"
                    placeholder="Email"
                    className="form-control my-3"
                    value={tmdEmail}
                    onChange={(e) => setTmdEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                />
                <i className="bx bx-user"></i>
            </div>
            <div className="input_box">
                <input
                    id="tmdPassword"
                    type="password"
                    name="tmdPassword"
                    placeholder="Mật khẩu"
                    className="form-control my-3"
                    value={tmdPassword}
                    onChange={(e) => setTmdPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <i className="bx bx-lock"></i>
            </div>

            <button type="submit" className="btn_sub">
                Đăng ký
            </button>
            <div className="register_link">
                <p>Bạn có tài khoản? <Link to="/tmdlogin">Đăng nhập</Link></p>
            </div>
            {tmdError && <div className="error pt-1 text-center fs-6"><strong>{tmdError}</strong></div>}
        </form>
    );
}
