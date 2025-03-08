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
      } else {
        console.log("Đăng nhập thất bại:", text);
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
    }
  };

  const tmdLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTmdUser(null);
  };

  return (
    <TmdAuthContext.Provider value={{ tmdUser, tmdLogin, tmdLogout }}>
      {children}
    </TmdAuthContext.Provider>
  );
};

TmdAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(TmdAuthContext);
