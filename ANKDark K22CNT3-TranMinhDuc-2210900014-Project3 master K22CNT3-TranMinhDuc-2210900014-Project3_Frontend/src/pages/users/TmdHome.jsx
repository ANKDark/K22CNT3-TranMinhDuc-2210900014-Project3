import { useState, useEffect } from "react";
import { useTmdTransaction } from "../../contexts/TmdTransactionContext";
import { PieChart } from "@mui/x-charts/PieChart";

export default function TmdHome() {
  const { tmdListTransaction } = useTmdTransaction();

  const [tmdIncome, setTmdIncome] = useState(0);
  const [tmdExpense, setTmdExpense] = useState(0);
  const [tmdYearlyIncome, setTmdYearlyIncome] = useState(0);
  const [tmdYearlyExpense, setTmdYearlyExpense] = useState(0);

  useEffect(() => {
    if (!tmdListTransaction || tmdListTransaction.length === 0) {
      setTmdIncome(0);
      setTmdExpense(0);
      setTmdYearlyIncome(0);
      setTmdYearlyExpense(0);
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let monthlyIncome = 0,
      monthlyExpense = 0,
      yearlyIncome = 0,
      yearlyExpense = 0;

    tmdListTransaction.forEach((tmdTrans) => {
      if (!tmdTrans.tmdTransactionDate) return;

      const transactionDate = new Date(tmdTrans.tmdTransactionDate);
      if (isNaN(transactionDate.getTime())) return;

      const isSameYear = transactionDate.getFullYear() === currentYear;
      const isSameMonth = transactionDate.getMonth() === currentMonth;

      if (isSameYear) {
        if (tmdTrans.tmdCategory?.tmdType === true) {
          yearlyIncome += tmdTrans.tmdAmount;
          if (isSameMonth) monthlyIncome += tmdTrans.tmdAmount;
        } else {
          yearlyExpense += tmdTrans.tmdAmount;
          if (isSameMonth) monthlyExpense += tmdTrans.tmdAmount;
        }
      }
    });

    setTmdIncome(monthlyIncome - monthlyExpense);
    setTmdExpense(monthlyExpense);
    setTmdYearlyIncome(yearlyIncome - yearlyExpense);
    setTmdYearlyExpense(yearlyExpense);
  }, [tmdListTransaction]);

  const tmdMonthlyData = [
    { id: 0, value: tmdIncome > 0 ? tmdIncome : 0, label: "Thu nhập còn lại", color: "#A1E3F9" },
    { id: 1, value: tmdExpense > 0 ? tmdExpense : 0, label: "Chi tiêu", color: "#8E1616" },
  ];

  const tmdYearlyData = [
    { id: 0, value: tmdYearlyIncome > 0 ? tmdYearlyIncome : 0, label: "Thu nhập cả năm (Còn lại)", color: "#4CAF50" },
    { id: 1, value: tmdYearlyExpense > 0 ? tmdYearlyExpense : 0, label: "Chi tiêu cả năm", color: "#FF5733" },
  ];

  const valueFormatter = (item) => {
    if (typeof item !== "object" || !item.value || isNaN(item.value)) return "0$";
    return `${item.value.toLocaleString()}$`;
  };

  return (
    <div className="container mt-4 text-white mt-5">
      <div className="container text-center">
        <h2 className="text-center mb-5">
          Tài chính cá nhân tháng {new Date().getMonth() + 1}
        </h2>
        <div className="row d-flex justify-content-between">
          <div className="col p-4 mx-3 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#343a40" }}>
            <span className="fs-5 fw-bold" style={{ color: "#A1E3F9" }}>
              {tmdIncome.toLocaleString()}
              <i className="bi bi-currency-dollar"></i>
            </span>
            <p className="mt-2">Thu nhập còn lại</p>
          </div>
          <div className="col p-4 mx-3 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#343a40" }}>
            <span className="fs-5 fw-bold" style={{ color: "#8E1616" }}>
              {tmdExpense.toLocaleString()}
              <i className="bi bi-currency-dollar"></i>
            </span>
            <p className="mt-2">Chi tiêu</p>
          </div>
          <div className="col p-4 mx-3 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#343a40" }}>
            <span className="fs-5 fw-bold" style={{ color: "#4CAF50" }}>
              {tmdYearlyIncome.toLocaleString()}
              <i className="bi bi-currency-dollar"></i>
            </span>
            <p className="mt-2">Thu nhập cả năm</p>
          </div>
          <div className="col p-4 mx-3 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#343a40" }}>
            <span className="fs-5 fw-bold" style={{ color: "#FF5733" }}>
              {tmdYearlyExpense.toLocaleString()}
              <i className="bi bi-currency-dollar"></i>
            </span>
            <p className="mt-2">Chi tiêu cả năm</p>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5 p-4" style={{ backgroundColor: "#343a40" }}>
        <div className="row g-2">
          <div className="col-6">
            <h2 className="mb-3">Biểu đồ Thu Nhập & Chi Tiêu Tháng</h2>
            <PieChart
              series={[
                {
                  data: tmdMonthlyData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  valueFormatter,
                },
              ]}
              height={250}
              margin={{ top: 10, bottom: 50, left: 10, right: 10 }}
              legend={{
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                labelStyle: { fill: "white" },
              }}
            />
          </div>
          <div className="col-6">
            <h2 className="mb-3">Biểu đồ Thu Nhập & Chi Tiêu Cả Năm</h2>
            <PieChart
              series={[
                {
                  data: tmdYearlyData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  valueFormatter,
                },
              ]}
              height={250}
              margin={{ top: 10, bottom: 50, left: 10, right: 10 }}
              legend={{
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                labelStyle: { fill: "white" },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
