import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TmdBudgetsContext = createContext();

export const TmdBudgetsProvider = ({ children }) => {
  const [tmdListBudgets, setTmdListBudgets] = useState([]);
  const [tmdMessage, setTmdMessage] = useState("");

  const showTmdAlert = (message) => {
    setTmdMessage(message);
    setTimeout(() => setTmdMessage(""), 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetchTmdBudgets();
    }
    return () => setTmdListBudgets([]);
  }, []);

  const fetchTmdBudgets = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdBudget/tmdListBudgets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await response.text();
      if (response.ok && text) {
        setTmdListBudgets(JSON.parse(text));
      } else {
        console.log("Token không hợp lệ hoặc đã hết hạn!");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTmdListBudgets([]);
      }
    } catch (error) {
      console.error("Lỗi fetchTmdBudgets:", error);
      setTmdListBudgets([]);
    }
  };

  const tmdAddBudget = async (tmdCategory, tmdAmountLimit, tmdStartDate, tmdEndDate) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/tmdBudget/tmdAddBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdCategory, tmdAmountLimit, tmdStartDate, tmdEndDate }),
      });

      if (response.ok) {
        showTmdAlert("Thêm ngân sách thành công!");
        fetchTmdBudgets();
      } else {
        showTmdAlert("Thêm ngân sách thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdAddBudget:", error);
    }
  };

  const tmdDeleteBudget = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdBudget/tmdDeleteBudget/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        showTmdAlert("Xóa ngân sách thành công!");
        fetchTmdBudgets();
      } else {
        showTmdAlert("Xóa ngân sách thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdDeleteBudget:", error);
    }
  };

  const tmdEditBudget = async (tmdId, tmdCategory, tmdAmountLimit, tmdStartDate, tmdEndDate) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/tmdBudget/tmdUpdateBudget/${tmdId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tmdCategory, tmdAmountLimit, tmdStartDate, tmdEndDate }),
      });

      if (response.ok) {
        showTmdAlert("Cập nhật ngân sách thành công!");
        fetchTmdBudgets();
      } else {
        showTmdAlert("Cập nhật ngân sách thất bại!");
      }
    } catch (error) {
      console.error("Lỗi tmdEditBudget:", error);
    }
  };

  return (
    <TmdBudgetsContext.Provider value={{ tmdListBudgets, tmdAddBudget, tmdDeleteBudget, tmdEditBudget, tmdMessage }}>
      {children}
      {tmdMessage && (
        <div className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2 bg-opacity-25"
          role="alert"
          style={{ opacity: tmdMessage ? 1 : 0, transition: "opacity 1s ease-in, opacity 1.5s ease-out 0.5s" }}>
          {tmdMessage}
        </div>
      )}
    </TmdBudgetsContext.Provider>
  );
};

TmdBudgetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook để sử dụng context
export const useTmdBudgets = () => useContext(TmdBudgetsContext);
