import '../styles/auth.css';
import { Outlet } from "react-router-dom";

export default function TmdAuthLayout() {
  return (
    <div className="auth_layout">
      <div className="login">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
