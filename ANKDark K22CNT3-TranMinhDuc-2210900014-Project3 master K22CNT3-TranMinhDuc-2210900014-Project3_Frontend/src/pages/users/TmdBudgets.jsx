import { useState, useEffect } from "react";
import { useTmdBudgets } from "../../contexts/TmdBudgetsContext";
import TmdListBudgets from "../../components/budgets/TmdListBudgets";
import TmdAddBudgetsForm from "../../components/budgets/TmdAddBudgetsForm";
import TmdEditBudgetsForm from "../../components/budgets/TmdEditBudgetsForm";

export default function TmdBudgets() {
    const { tmdListBudgets, tmdAddBudget, tmdDeleteBudget, tmdEditBudget, tmdMessage } = useTmdBudgets();
    const [tmdFilteredBudget, setTmdFilteredBudget] = useState(tmdListBudgets);
    const [tmdShowAddModal, setTmdShowAddModal] = useState(false);
    const [tmdShowEditModal, setTmdShowEditModal] = useState(false);
    const [tmdCategoryId, setTmdCategoryId] = useState("");
    const [tmdBudgetId, setTmdBudgetId] = useState("");
    const [tmdAmountLimit, setTmdAmountLimit] = useState("");
    const [tmdStartDate, setTmdStartDate] = useState("");
    const [tmdEndDate, setTmdEndDate] = useState("");
    const [tmdError, setTmdError] = useState(null);

    useEffect(() => {
        setTmdFilteredBudget(tmdListBudgets);
    }, [tmdListBudgets]);

    const tmdResetForm = () => {
        setTmdCategoryId("");
        setTmdAmountLimit("");
        setTmdStartDate("");
        setTmdEndDate("");
        setTmdError(null);
    };

    const tmdHandleSubmit = async (e) => {
        e.preventDefault();
        if (!tmdCategoryId) {
            setTmdError("Vui lòng chọn danh mục!");
            return;
        } else if (!tmdAmountLimit) {
            setTmdError("Vui lòng nhập số tiền!");
            return;
        } else if (!tmdStartDate) {
            setTmdError("Vui lòng chọn ngày bắt đầu!");
            return;
        }
        else if (!tmdEndDate) {
            setTmdError("Vui lòng chọn ngày kết thúc!");
            return;
        }
        setTmdError(null);
        await tmdAddBudget({ id: tmdCategoryId }, tmdAmountLimit, tmdStartDate, tmdEndDate);
        setTmdShowEditModal(false);
        tmdResetForm();
    };

    const tmdHandleEdit = (tmdBudget) => {
        setTmdBudgetId(tmdBudget.id);
        setTmdCategoryId(tmdBudget.tmdCategory.id);
        setTmdAmountLimit(tmdBudget.tmdAmountLimit);
        setTmdStartDate(tmdBudget.tmdStartDate);
        setTmdEndDate(tmdBudget.tmdEndDate);
        setTmdShowEditModal(true);
    }

    const tmdHandleUpdate = async (e) => {
        e.preventDefault();
        if (!tmdCategoryId) {
            setTmdError("Vui lòng chọn danh mục!");
            return;
        } else if (!tmdAmountLimit) {
            setTmdError("Vui lòng nhập số tiền!");
            return;
        } else if (!tmdStartDate) {
            setTmdError("Vui lòng chọn ngày bắt đầu!");
            return;
        }
        else if (!tmdEndDate) {
            setTmdError("Vui lòng chọn ngày kết thúc!");
            return;
        }
        setTmdError(null);
        await tmdEditBudget(tmdBudgetId ,{ id: tmdCategoryId }, tmdAmountLimit, tmdStartDate, tmdEndDate);
        setTmdShowEditModal(false);
        tmdResetForm();
    }
    const tmdHandleDelete = async (id, e) => {
        e.preventDefault();
        if (window.confirm("Bạn có chắc muốn xóa ngân sách này?")) {
            await tmdDeleteBudget(id);
        }
    }
    return (
        <div className="container mt-4 p-4 rounded-3" style={{ backgroundColor: "#343a40" }}>
            {tmdMessage && (
                <div className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2">
                    {tmdMessage}
                </div>
            )}
            <div className="mb-3 bg-dark p-3 rounded-3">
                <h2 className="text-center text-white">Danh sách ngân sách</h2>
            </div>
            <button className="btn btn-primary mb-3" onClick={() => setTmdShowAddModal(true)}>
                Thêm mới ngân sách
            </button>

            <TmdListBudgets
                tmdListBudgets={tmdFilteredBudget}
                tmdHandleEdit={tmdHandleEdit}
                tmdHandleDelete={tmdHandleDelete}
            />

            {tmdShowAddModal && (
                <TmdAddBudgetsForm
                    onClose={() => {
                        setTmdShowAddModal(false);
                        tmdResetForm();
                    }}
                    onSubmit={tmdHandleSubmit}
                    tmdCategoryId={tmdCategoryId}
                    setTmdCategoryId={setTmdCategoryId}
                    tmdAmountLimit={tmdAmountLimit}
                    setTmdAmountLimit={setTmdAmountLimit}
                    tmdStartDate={tmdStartDate}
                    setTmdStartDate={setTmdStartDate}
                    tmdEndDate={tmdEndDate}
                    setTmdEndDate={setTmdEndDate}
                    tmdError={tmdError}
                />
            )}
            {tmdShowEditModal && (
                <TmdEditBudgetsForm
                    onClose={() => {
                        setTmdShowEditModal(false);
                        tmdResetForm();
                    }}
                    tmdHandleEdit={tmdHandleUpdate}
                    tmdCategoryId={tmdCategoryId}
                    setTmdCategoryId={setTmdCategoryId}
                    tmdAmountLimit={tmdAmountLimit}
                    setTmdAmountLimit={setTmdAmountLimit}
                    tmdStartDate={tmdStartDate}
                    setTmdStartDate={setTmdStartDate}
                    tmdEndDate={tmdEndDate}
                    setTmdEndDate={setTmdEndDate}
                    tmdError={tmdError}
                />
            )}
        </div>
    );
}
