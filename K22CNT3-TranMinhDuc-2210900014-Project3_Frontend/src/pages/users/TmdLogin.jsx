import { useState } from "react";
import { useAuth } from "../../contexts/TmdAuthContext";
import { Link } from "react-router-dom";

export default function TmdLogin() {
  const { tmdLogin } = useAuth();
  const [tmdEmail, setTmdEmail] = useState("");
  const [tmdPassword, setTmdPassword] = useState("");
  const [tmdRemember, setTmdRemember] = useState(false);

  const tmdHandleSubmit = async (e) => {
    e.preventDefault();
    if (!tmdEmail || !tmdPassword) {
      console.log("Thiếu thông tin đăng nhập!");
      return;
    }
    await tmdLogin(tmdEmail, tmdPassword, tmdRemember);
  };

  return (
    <form onSubmit={tmdHandleSubmit}>
      <h1>Đăng nhập</h1>
      <div className="input_box">
        <input
          id="tmdEmail"
          type="email"
          name="tmdEmail"
          placeholder="Email"
          className="form-control my-3"
          value={tmdEmail}
          onChange={(e) => setTmdEmail(e.target.value)}
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
      <div className="rmk">
        <label htmlFor="tmdRemember">
          <input
            type="checkbox"
            id="tmdRemember"
            name="tmdRemember"
            checked={tmdRemember}
            onChange={(e) => setTmdRemember(e.target.checked)}
          />
          <span>Ghi nhớ tôi</span>
        </label>
        <Link to="/password/reset" className="text-sm text-gray-600 underline">
          Bạn quên mật khẩu?
        </Link>
      </div>
      <button type="submit" className="btn_sub">
        Đăng nhập
      </button>
    </form>
  );
}
