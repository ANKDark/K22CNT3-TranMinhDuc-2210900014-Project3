import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TmdSavingContext = createContext();

export const TmdSavingProvider = ({ children }) => {
    const [tmdListSaving, setTmdListSaving] = useState([]);
    const [tmdMessage, setTmdMessage] = useState("");

    const showTmdAlert = (message) => {
        setTmdMessage(message);
        setTimeout(() => setTmdMessage(""), 2000);
    };

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) fetchTmdSaving();
    }, []);

    const fetchTmdSaving = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:8080/tmdSaving/tmdListSaving", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const text = await response.text();
            if (response.ok && text) {
                setTmdListSaving(JSON.parse(text));
            } else {
                console.log("Token không hợp lệ hoặc đã hết hạn!");
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                setTmdListSaving([]);
            }
        } catch (error) {
            console.error("Lỗi fetchTmdSaving:", error);
            setTmdListSaving([]);
        }
    };

    const tmdAddSaving = async (tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:8080/tmdSaving/tmdAddSaving", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate }),
            });

            if (response.ok) {
                showTmdAlert("Thêm khoản tiết kiệm thành công!");
                fetchTmdSaving();
            } else {
                showTmdAlert("Thêm khoản tiết kiệm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi tmdAddSaving:", error);
        }
    };

    const tmdEditSaving = async (tmdId, tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`http://localhost:8080/tmdSaving/tmdUpdateSaving/${tmdId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate }),
            });

            if (response.ok) {
                showTmdAlert("Khoản tiết kiệm đã được cập nhật thành công!");
                fetchTmdSaving();
            } else {
                showTmdAlert("Cập nhật khoản tiết kiệm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi tmdEditSaving:", error);
        }
    };

    const tmdDeleteSaving = async (id) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`http://localhost:8080/tmdSaving/tmdDeleteSaving/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                showTmdAlert("Khoản tiết kiệm đã được xóa thành công!");
                fetchTmdSaving();
            } else {
                showTmdAlert("Xóa khoản tiết kiệm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi tmdDeleteSaving:", error);
        }
    };

    return (
        <TmdSavingContext.Provider value={{ tmdListSaving, tmdAddSaving, tmdEditSaving, tmdDeleteSaving, tmdMessage }}>
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
        </TmdSavingContext.Provider>
    );
};

TmdSavingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useTmdSaving = () => useContext(TmdSavingContext);
