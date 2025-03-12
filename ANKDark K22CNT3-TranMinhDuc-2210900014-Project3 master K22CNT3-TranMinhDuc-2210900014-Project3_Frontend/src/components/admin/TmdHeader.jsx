import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/TmdAuthContext";

export default function Header() {
  const [tmdIsOpen, setTmdIsOpen] = useState(true);
  const { tmdLogout } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      setTmdIsOpen(window.innerWidth >= 675);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-100 bg-dark text-white d-flex align-items-center justify-content-between shadow overflow-hidden" style={{ minHeight: "64px" }}>
      <h1 className="ps-5 m-0 fs-3">
        <strong>Quản lý chi tiêu cá nhân - ADMIN</strong>
      </h1>
      <div className="pe-5">
        <div
          className={`d-flex align-items-center ${tmdIsOpen ? "d-block" : "d-none"}`}
          style={{
            transition: "opacity 0.5s ease-in-out",
            opacity: tmdIsOpen ? 1 : 0,
          }}
        >
          <span>Xin chào, <strong>Admin ANK Dark</strong></span>
          <button className="btn btn-danger ms-3" onClick={tmdLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
