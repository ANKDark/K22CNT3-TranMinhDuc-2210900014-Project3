import { useEffect, useState } from "react";
import TmdListTransaction from "../components/transaction/TmdListTransaction";
import { useTmdTransaction } from "../contexts/TmdTransactionContext";
import TmdAddTransactionForm from "../components/transaction/TmdAddTransactionForm";
import TmdEditTransactionForm from "../components/transaction/TmdEditTransactionForm";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
export default function TmdTransaction() {
  const {
    tmdListTransaction,
    tmdAddTransaction,
    tmdEditTransaction,
    tmdDeleteTransaction,
    tmdMessage,
    tmdListCategory,
  } = useTmdTransaction();

  const [tmdShowAddModal, setTmdShowAddModal] = useState(false);
  const [tmdShowEditModal, setTmdShowEditModal] = useState(false);
  const [tmdAmount, setTmdAmount] = useState("");
  const [tmdCategoryId, setTmdCategoryId] = useState("");
  const [tmdTransactionDate, setTmdTransactionDate] = useState("");
  const [tmdNote, setTmdNote] = useState("");
  const [tmdTransactionId, setTmdTransactionId] = useState("");
  const [tmdError, setTmdError] = useState(null);
  const [tmdIncome, setTmdIncome] = useState(0);
  const [tmdExpense, setTmdExpense] = useState(0);

  const [tmdMonth, setTmdMonth] = useState(new Date().getMonth() + 1);
  const [tmdYear, setTmdYear] = useState(new Date().getFullYear());

  const tmdDataChart = [
    { name: "Thu nhập", value: tmdIncome },
    { name: "Chi tiêu", value: tmdExpense },
  ];

  const tmdColors = ["#00C49F", "#FF4444"];

  const tmdResetForm = () => {
    setTmdAmount("");
    setTmdCategoryId("");
    setTmdTransactionDate("");
    setTmdNote("");
    setTmdError(null);
    setTmdTransactionId("");
  };

  const tmdHandleSubmit = async (e) => {
    e.preventDefault();

    if (!tmdAmount.trim()) {
      setTmdError("Vui lòng nhập giá tiền!");
      return;
    }
    if (!tmdCategoryId.trim()) {
      setTmdError("Vui lòng chọn danh mục!");
      return;
    }
    if (!tmdTransactionDate.trim()) {
      setTmdError("Vui lòng chọn ngày giao dịch!");
      return;
    }

    await tmdAddTransaction(tmdAmount, { id: tmdCategoryId }, tmdTransactionDate, tmdNote);
    setTmdShowAddModal(false);
    tmdResetForm();
  };

  const tmdHandleEdit = (tmdTrans) => {
    setTmdTransactionId(tmdTrans.id);
    setTmdAmount(tmdTrans.tmdAmount);
    setTmdCategoryId(tmdTrans.tmdCategory.id);
    setTmdTransactionDate(tmdTrans.tmdTransactionDate);
    setTmdNote(tmdTrans.tmdNote);
    setTmdShowEditModal(true);
  };

  const tmdHandleUpdate = async (e) => {
    e.preventDefault();

    if (!tmdAmount.toString().trim()) {
      setTmdError("Vui lòng nhập giá tiền!");
      return;
    }
    if (!String(tmdCategoryId).trim()) {
      setTmdError("Vui lòng chọn danh mục!");
      return;
    }
    if (!tmdTransactionDate.trim()) {
      setTmdError("Vui lòng chọn ngày giao dịch!");
      return;
    }

    await tmdEditTransaction(tmdTransactionId, tmdAmount, { id: tmdCategoryId }, tmdTransactionDate, tmdNote);
    setTmdShowEditModal(false);
    tmdResetForm();
  };

  const tmdHandleDelete = async (id, e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xóa giao dịch này?")) {
      await tmdDeleteTransaction(id);
    }
  };

  const tmdFilteredTransaction = tmdListTransaction.filter((tmdTrans) => {
    const date = new Date(tmdTrans.tmdTransactionDate);
    return date.getMonth() + 1 === parseInt(tmdMonth) && date.getFullYear() === parseInt(tmdYear);
  });

  useEffect(() => {
    tmdListTransaction.map((tmdTrans) => {
      if (tmdTrans.tmdCategory.tmdType === true) {
        setTmdIncome((prev) => prev + tmdTrans.tmdAmount);
      } else {
        setTmdExpense((prev) => prev + tmdTrans.tmdAmount);
      }
    });
  }, [tmdListTransaction]);

  return (
    <div className="container mt-4 p-4 rounded-3" style={{ backgroundColor: "#343a40" }}>
      {tmdMessage && (
        <div className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2">
          {tmdMessage}
        </div>
      )}

      <div className="mb-3 bg-dark p-3 rounded-3">
        <h2 className="text-center text-white">Danh sách giao dịch</h2>
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setTmdShowAddModal(true)}
      >
        Thêm mới giao dịch
      </button>

      <div className="gap-3 mb-3 w-50 d-flex flex-column align-items-center mx-auto">
        <span className="text-white fs-5">Lọc giao dịch theo tháng năm</span>

        <div className="d-flex gap-3 w-100 justify-content-center">
          <select
            className="form-select bg-dark text-white"
            value={tmdMonth}
            onChange={(e) => setTmdMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>

          <select
            className="form-select bg-dark text-white"
            value={tmdYear}
            onChange={(e) => setTmdYear(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={2022 + i}>
                {2022 + i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <PieChart width={250} height={250}>
          <Pie
            data={tmdDataChart}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="#343a40"
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={200}
            animationBegin={0}
          >
            {tmdDataChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={tmdColors[index % tmdColors.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `${value.toLocaleString("vi-VN")} VND`}
            contentStyle={{ backgroundColor: "#343a40", color: "#fff", fontSize: "12px", borderRadius: "10px", padding: "6px" }}
            itemStyle={{ color: "#00C49F" }}
            cursor={{ fill: "transparent" }}
          />

          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ marginTop: "1rem" }}
          />
        </PieChart>
      </div>

      <TmdListTransaction
        tmdListTransaction={tmdFilteredTransaction}
        tmdHandleEdit={tmdHandleEdit}
        tmdHandleDelete={tmdHandleDelete}
      />

      {tmdShowAddModal && (
        <TmdAddTransactionForm
          tmdAmount={tmdAmount}
          setTmdAmount={setTmdAmount}
          tmdCategoryId={tmdCategoryId}
          setTmdCategoryId={setTmdCategoryId}
          tmdCategories={tmdListCategory}
          tmdTransactionDate={tmdTransactionDate}
          setTmdTransactionDate={setTmdTransactionDate}
          tmdNote={tmdNote}
          setTmdNote={setTmdNote}
          tmdHandleSubmit={tmdHandleSubmit}
          onClose={() => {
            setTmdShowAddModal(false);
            tmdResetForm();
          }}
          error={tmdError}
        />
      )}

      {tmdShowEditModal && (
        <TmdEditTransactionForm
          tmdAmount={tmdAmount}
          setTmdAmount={setTmdAmount}
          tmdCategoryId={tmdCategoryId}
          setTmdCategoryId={setTmdCategoryId}
          tmdCategories={tmdListCategory}
          tmdTransactionDate={tmdTransactionDate}
          setTmdTransactionDate={setTmdTransactionDate}
          tmdNote={tmdNote}
          setTmdNote={setTmdNote}
          tmdHandleEdit={tmdHandleUpdate}
          onClose={() => {
            setTmdShowEditModal(false);
            tmdResetForm();
          }}
          error={tmdError}
        />
      )}
    </div>
  );
}
