import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const TmdAuthContext = createContext();

export const TmdAuthProvider = ({ children }) => {
  const [tmdUser, setTmdUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetchTmdUser();
    }
  }, []);

  const fetchTmdUser = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/api/auth/tmdStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      if (response.ok) {
        const data = JSON.parse(text);
        setTmdUser(data);
      } else {
        console.log("Token không hợp lệ hoặc đã hết hạn!");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTmdUser(null);
      }
    } catch (error) {
      console.log("Lỗi fetchTmdUser:", error);
    }
  };

  const tmdLogin = async (tmdEmail, tmdPassword, tmdRemember) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/tmdLogin?tmdEmail=${tmdEmail}&tmdPassword=${tmdPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const text = await response.text();

      if (response.ok) {
        const data = JSON.parse(text);
        const token = data.token;

        if (tmdRemember) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        setTmdUser(data.tmdUser);
        fetchTmdUser();
        return { success: true };
      } else {
        const errorData = JSON.parse(text);
        return { success: false, message: errorData.message || "Đăng nhập thất bại!" };
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại!" };
    }
  };

  const tmdRegister = async ( tmdName, tmdEmail, tmdPasswordHash ) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/tmdRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdName, tmdEmail, tmdPasswordHash }),
      });

      const text = await response.text();

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = JSON.parse(text);
        return { success: false, message: errorData.message || "Đăng ký thất bại!" };
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại!" };
    }
  }

  const tmdEditProfile = async ( tmdId ,tmdName, tmdEmail, tmdPasswordHash) => {
    try {
      const response = await fetch(`http://localhost:8080/tmdUsers/tmdUpdate/${tmdId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ tmdName, tmdEmail, tmdPasswordHash }),
      });

      const text = await response.text();

      if (response.ok) {
        const data = JSON.parse(text);
        setTmdUser(data);
        return { success: true };
      } else {
        const errorData = JSON.parse(text);
        return { success: false, message: errorData.message || "Cập nhật thông tin thất bại!" };
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại!" };
    }
  }

  const tmdLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTmdUser(null);
  };

  return (
    <TmdAuthContext.Provider value={{ tmdUser, tmdLogin, tmdLogout, tmdRegister, tmdEditProfile }}>
      {children}
    </TmdAuthContext.Provider>
  );
};

TmdAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(TmdAuthContext);
