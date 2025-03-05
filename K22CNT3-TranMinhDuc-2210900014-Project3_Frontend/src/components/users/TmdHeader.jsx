import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/TmdAuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { tmdUser, tmdLogout } = useAuth();
  const [tmdIsOpen, setTmdIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 675) {
        setTmdIsOpen(false);
      } else {
        setTmdIsOpen(true);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="w-100 bg-dark text-white d-flex align-items-center justify-content-between shadow overflow-hidden" style={{ minHeight: "64px" }}>
      <h1 className="ps-5 m-0 fs-3">
        <span>
          <strong>Quản lý chi tiêu cá nhân</strong>
        </span>
      </h1>
      <div className="pe-5">
        {tmdUser ? (
          <div
            className={`d-flex align-items-center ${tmdIsOpen ? "d-block" : "d-none"}`}
            style={{
              transition: "opacity 0.5s ease-in-out",
              opacity: tmdIsOpen ? 1 : 0,
            }}
          >
            <span>Xin chào, <strong>{tmdUser.tmdName}</strong></span>
            <button className="btn btn-danger ms-3" onClick={tmdLogout}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/tmdlogin" className={`btn btn-primary ${tmdIsOpen ? "d-block" : "d-none"}`}>
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
