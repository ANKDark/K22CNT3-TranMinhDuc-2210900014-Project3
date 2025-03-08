import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TmdCategoryContext = createContext();

export const TmdCategoryProvider = ({ children }) => {
  const [tmdListCategory, setTmdListCategory] = useState([]);
  const [tmdMessage, setTmdMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetchTmdCategory();
    }

    return () => {
      setTmdListCategory([]);
    };
  }, []);

  const showTmdAlert = (message) => {
    setTmdMessage(message);
    setTimeout(() => {
      setTmdMessage("");
    }, 2000);
  };

  const fetchTmdCategory = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdCategory/tmdListCategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      if (response.ok && text) {
        const data = JSON.parse(text);
        setTmdListCategory(data);
      } else {
        console.log("Token không hợp lệ hoặc đã hết hạn!");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTmdListCategory([]);
      }
    } catch (error) {
      console.error("Lỗi fetchTmdCategory:", error);
      setTmdListCategory([]);
    }
  };

  const tmdAddCategory = async (tmdName, tmdType) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdCategory/tmdAddCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdName, tmdType }),
      });

      if (response.ok) {
        showTmdAlert("Danh mục đã được thêm thành công!");
        fetchTmdCategory();
      } else {
        showTmdAlert("Thêm danh mục thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdAddCategory:", error);
    }
  };

  const tmdUpdateCategory = async (id, tmdName, tmdType) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdCategory/tmdUpdateCategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdName, tmdType }),
      });

      if (response.ok) {
        showTmdAlert("Danh mục đã được cập nhật thành công!");
        fetchTmdCategory();
      } else {
        showTmdAlert("Cập nhật danh mục thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdUpdateCategory:", error);
    }
  };

  const tmdDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdCategory/tmdDeleteCategory/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showTmdAlert("Danh mục đã được xóa thành công!");
        fetchTmdCategory();
      } else {
        showTmdAlert("Xóa danh mục thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdDeleteCategory:", error);
    }
  };

  const tmdGetCategoryByName = (tmdName) => {
    if (!tmdName.trim()) return tmdListCategory;

    return tmdListCategory.filter((tmdCate) =>
      tmdCate.tmdName.toLowerCase().includes(tmdName.toLowerCase())
    );
  };

  return (
    <TmdCategoryContext.Provider value={{ tmdListCategory, tmdAddCategory, tmdUpdateCategory, tmdMessage, tmdDeleteCategory, tmdGetCategoryByName }}>
      {children}
      {tmdMessage && (
        <div
          className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2 bg-opacity-25"
          role="alert"
          style={{
            opacity: tmdMessage ? 1 : 0,
            transition: "opacity 1s ease-in, opacity 1.5s ease-out 0.5s",
          }}
        >
          {tmdMessage}
        </div>
      )}
    </TmdCategoryContext.Provider>
  );
};

TmdCategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTmdCategory = () => useContext(TmdCategoryContext);
