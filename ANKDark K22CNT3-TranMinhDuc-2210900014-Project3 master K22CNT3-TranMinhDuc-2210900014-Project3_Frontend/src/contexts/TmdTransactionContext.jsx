import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TmdTransactionContext = createContext();

export const TmdTransactionProvider = ({ children }) => {
    const [tmdMessage, setTmdMessage] = useState("");
    const [tmdListTransaction, setTmdListTransaction] = useState([]);
    const [tmdListCategory, setTmdListCategory] = useState([]);

    const showTmdAlert = (message) => {
        setTmdMessage(message);
        setTimeout(() => {
          setTmdMessage("");
        }, 2000);
      };

      useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
          fetchTmdTransaction();
          fetchTmdCategory();
        }
    
        return () => {
            setTmdListTransaction([]);
        };
      }, []);

      const fetchTmdTransaction = async () => {
        try {
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");
          if (!token) return;
    
          const response = await fetch("http://localhost:8080/tmdTransaction/tmdListTransaction", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const text = await response.text();
    
          if (response.ok && text) {
            const data = JSON.parse(text);
            setTmdListTransaction(data);
          } else {
            console.log("Token không hợp lệ hoặc đã hết hạn!");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            setTmdListTransaction([]);
          }
        } catch (error) {
          console.error("Lỗi fetchTmdTransaction:", error);
          setTmdListTransaction([]);
        }
      };

      const tmdAddTransaction = async (tmdAmount, tmdCategory, tmdTransactionDate, tmdNote) => {
        try {
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");
          if (!token) return;
    
          const response = await fetch("http://localhost:8080/tmdTransaction/tmdAddTransaction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({tmdAmount, tmdCategory, tmdTransactionDate, tmdNote}),
          });
    
          if (response.ok) {
            showTmdAlert("Thêm giao dịch thành công!");
            fetchTmdTransaction();
          } else {
            showTmdAlert("Thêm giao dịch thất bại!");
          }
        } catch (error) {
          console.error("Lỗi tmdAddTransaction:", error);
        }
      }

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

      const tmdDeleteTransaction = async (id) => {
        try {
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");
          if (!token) return;
    
          const response = await fetch(`http://localhost:8080/tmdTransaction/tmdDeleteTransaction/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            showTmdAlert("Giao dịch đã được xóa thành công!");
            fetchTmdTransaction();
          } else {
            showTmdAlert("Xóa giao dịch thất bại!");
          }
        } catch (error) {
          console.error("Lỗi tmdDeletmdDeleteTransactionteCategory:", error);
        }
      };

      const tmdEditTransaction = async (tmdId, tmdAmount, tmdCategory, tmdTransactionDate, tmdNote) => {
        try {
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");
          if (!token) return;
    
          const response = await fetch(`http://localhost:8080/tmdTransaction/tmdUpdateTransaction/${tmdId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ tmdAmount, tmdCategory, tmdTransactionDate, tmdNote }),
          });
    
          if (response.ok) {
            showTmdAlert("Giao dịch đã được cập nhật thành công!");
            fetchTmdTransaction();
          } else {
            showTmdAlert("Cập nhật giao dịch thất bại!");
          }
        } catch (error) {
          console.error("Lỗi tmdEditTransaction:", error);
        }
      }

    return (
        <TmdTransactionContext.Provider value={{ tmdListTransaction, tmdAddTransaction, tmdMessage, tmdListCategory, tmdDeleteTransaction, tmdEditTransaction }}>
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
        </TmdTransactionContext.Provider>
      );
};

TmdTransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTmdTransaction = () => useContext(TmdTransactionContext);