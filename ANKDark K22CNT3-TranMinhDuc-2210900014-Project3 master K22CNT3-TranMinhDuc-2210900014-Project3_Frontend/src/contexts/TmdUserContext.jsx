import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TmdUserContext = createContext();

export const TmdUserProvider = ({ children }) => {
  const [tmdListUser, setTmdListUser] = useState([]);
  const [tmdMessage, setTmdMessage] = useState("");

  useEffect(() => {
    fetchTmdUsers();
    return () => setTmdListUser([]);
  }, []);

  const showTmdAlert = (message) => {
    setTmdMessage(message);
    setTimeout(() => {
      setTmdMessage("");
    }, 2000);
  };

  const fetchTmdUsers = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTmdListUser(data);
      } else {
        console.log("Lỗi lấy danh sách người dùng!");
        setTmdListUser([]);
      }
    } catch (error) {
      console.error("Lỗi fetchTmdUsers:", error);
      setTmdListUser([]);
    }
  };

  const tmdAddUser = async (tmdName, tmdEmail, tmdPasswordHash) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdName, tmdEmail, tmdPasswordHash }),
      });

      if (response.ok) {
        showTmdAlert("Người dùng đã được thêm thành công!");
        fetchTmdUsers();
      } else {
        showTmdAlert("Thêm người dùng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdAddUser:", error);
    }
  };

  const tmdUpdateUser = async (id, tmdName, tmdEmail, tmdPasswordHash) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdUsers/tmdUpdate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdName, tmdEmail, tmdPasswordHash }),
      });

      if (response.ok) {
        showTmdAlert("Người dùng đã được cập nhật thành công!");
        fetchTmdUsers();
      } else {
        showTmdAlert("Cập nhật người dùng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdUpdateUser:", error);
    }
  };

  const tmdDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdUsers/tmdDelete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showTmdAlert("Người dùng đã được xóa thành công!");
        fetchTmdUsers();
      } else {
        showTmdAlert("Xóa người dùng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdDeleteUser:", error);
    }
  };

  const tmdGetUserByName = (tmdName) => {
    if (!tmdName.trim()) return tmdListUser;

    return tmdListUser.filter((tmdUser) =>
      tmdUser.tmdName.toLowerCase().includes(tmdName.toLowerCase())
    );
  };

  return (
    <TmdUserContext.Provider value={{ tmdListUser, tmdAddUser, tmdUpdateUser, tmdDeleteUser, tmdGetUserByName }}>
      {children}
      {tmdMessage && (
        <div
          className="alert alert-warning text-center fixed-top w-50 mx-auto mt-2 bg-opacity-25"
          role="alert"
          style={{
            opacity: tmdMessage ? 1 : 0,
            transition: "opacity 1s ease-in, opacity 1.5s ease-out 0.5s",
          }}
        >
          {tmdMessage}
        </div>
      )}
    </TmdUserContext.Provider>
  );
};

TmdUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTmdUser = () => useContext(TmdUserContext);
