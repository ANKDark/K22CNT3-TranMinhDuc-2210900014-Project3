import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTmdTransaction } from "../../contexts/TmdTransactionContext";
import { useTmdSaving } from "../../contexts/TmdSavingContext";
import { useState, useEffect } from "react";
import "../../styles/chart.css";
import { useTmdBudgets } from "../../contexts/TmdBudgetsContext";

export default function BarAnimation() {
  const { tmdListTransaction } = useTmdTransaction();
  const [tmdIncome, setTmdIncome] = useState(Array(12).fill(0));
  const [tmdExpense, setTmdExpense] = useState(Array(12).fill(0));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!tmdListTransaction || tmdListTransaction.length === 0) {
      setTmdIncome(Array(12).fill(0));
      setTmdExpense(Array(12).fill(0));
      return;
    }

    const incomeByMonth = Array(12).fill(0);
    const expenseByMonth = Array(12).fill(0);

    tmdListTransaction.forEach((transaction) => {
      if (!transaction.tmdTransactionDate || !transaction.tmdAmount || !transaction.tmdCategory) return;

      const date = new Date(transaction.tmdTransactionDate);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const monthIndex = date.getMonth();

      if (year === selectedYear) {
        if (transaction.tmdCategory.tmdType === true || transaction.tmdCategory.tmdType === 1) {
          incomeByMonth[monthIndex] += transaction.tmdAmount;
        } else {
          expenseByMonth[monthIndex] += transaction.tmdAmount;
        }
      }
    });

    setTmdIncome([...incomeByMonth]);
    setTmdExpense([...expenseByMonth]);
  }, [tmdListTransaction, selectedYear]);

  const uniqueYears = [...new Set(tmdListTransaction.map((t) => new Date(t.tmdTransactionDate).getFullYear()))].sort((a, b) => b - a);

  const dataFinance = Array.from({ length: 12 }, (_, i) => ({
    month: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ][i],
    income: tmdIncome[i] || 0,
    expense: tmdExpense[i] || 0,
  }));

  const seriesFinance = [
    {
      data: dataFinance.map((d) => d.income),
      label: "Thu nhập",
      color: "#A1E3F9",
    },
    {
      data: dataFinance.map((d) => d.expense),
      label: "Chi tiêu",
      color: "#E8F9FF",
    },
  ];

  const { tmdListSaving } = useTmdSaving();
  let tmdDataFinanceSaving = [];
  let tmdSeriesFinanceSaving = [];

  if (tmdListSaving.length > 0) {
    tmdDataFinanceSaving = tmdListSaving.map((saving) => ({
      goalName: saving.tmdGoalName,
      savedAmount: saving.tmdSavedAmount || 0,
      targetAmount: saving.tmdTargetAmount || 0,
    }));

    tmdSeriesFinanceSaving = [
      {
        data: tmdDataFinanceSaving.map((d) => d.targetAmount),
        label: "Mục tiêu tiết kiệm",
        color: "#7C00FE",
      },
      {
        data: tmdDataFinanceSaving.map((d) => d.savedAmount),
        label: "Số tiền đã tiết kiệm",
        color: "#FF7EE2",
      },
    ];
  }

  const { tmdListBudgets } = useTmdBudgets();
  let budgetData = [];

  if (tmdListBudgets.length > 0 && tmdListTransaction.length > 0) {
    budgetData = tmdListBudgets
      .filter((budget) => budget.tmdCategory.tmdType !== true)
      .map((budget) => {
        const transactionsInBudget = tmdListTransaction.filter((transaction) => {
          const transactionDate = new Date(transaction.tmdTransactionDate);
          const startDate = new Date(budget.tmdStartDate);
          const endDate = new Date(budget.tmdEndDate);
  
          return (
            transactionDate >= startDate &&
            transactionDate <= endDate &&
            transaction.tmdCategory.tmdName === budget.tmdCategory.tmdName
          );
        });
  
        const totalSpent = transactionsInBudget.reduce((sum, transaction) => sum + transaction.tmdAmount, 0);
  
        return {
          category: budget.tmdCategory.tmdName,
          amountLimit: budget.tmdAmountLimit,
          spentAmount: totalSpent,
        };
      });
  }

  const budgetSeries = [
    {
      data: budgetData.map((d) => d.amountLimit),
      label: "Hạn mức ngân sách",
      color: "#8B5DFF",
    },
    {
      data: budgetData.map((d) => d.spentAmount),
      label: "Số tiền đã chi tiêu",
      color: "#C3FF93",
    },
  ];


  return (
    <div className="col p-4 mx-3 mt-5 d-flex flex-column align-items-center justify-content-center text-white" style={{ backgroundColor: "#343a40" }}>
      <Box sx={{ width: "100%", p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ Thu nhập & Chi tiêu ({selectedYear})
        </Typography>

        <Select
          value={selectedYear}
          className="text-white bg-dark"
          onChange={(event) => setSelectedYear(event.target.value)}
          sx={{ mb: 2, width: 150, color: "white" }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "black",
                color: "white",
              },
            },
          }}
        >
          {uniqueYears.map((year) => (
            <MenuItem key={year} value={year} sx={{ bgcolor: "black", color: "white" }}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <BarChart
          height={300}
          series={seriesFinance}
          xAxis={[{ scaleType: "band", data: dataFinance.map((d) => d.month) }]}
          highlightScope={{ highlight: "series", fade: "global" }}
          tooltip={{ trigger: "axis" }}
          sx={{
            "& .MuiChartsLegend-root text": { fill: "white !important" },
            "& .MuiChartsAxis-root text": { fill: "white !important" },
            "& .MuiChartsAxis-tickLabel": { fill: "white !important" },
            "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "white !important" },
            "& .MuiBarElement-root": { transition: "opacity 0.3s ease" },
            "& .MuiBarElement-root:hover": { opacity: 1 },
            "& .MuiBarElement-root:not(:hover)": { opacity: 0.5 },
          }}
        />
      </Box>

      <Box sx={{ width: "100%", p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ các khoản tiết kiệm
        </Typography>

        <BarChart
          height={300}
          series={tmdSeriesFinanceSaving}
          xAxis={[{ scaleType: "band", data: tmdDataFinanceSaving.map((d) => d.goalName) }]}
          highlightScope={{ highlight: "series", fade: "global" }}
          tooltip={{ trigger: "axis" }}
          sx={{
            "& .MuiChartsLegend-root text": { fill: "white !important" },
            "& .MuiChartsAxis-root text": { fill: "white !important" },
            "& .MuiChartsAxis-tickLabel": { fill: "white !important" },
            "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "white !important" },
            "& .MuiBarElement-root": { transition: "opacity 0.3s ease" },
            "& .MuiBarElement-root:hover": { opacity: 1 },
            "& .MuiBarElement-root:not(:hover)": { opacity: 0.5 },
          }}
        />
      </Box>
      <Box sx={{ width: "100%", p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ Ngân sách & Chi tiêu
        </Typography>

        <BarChart
          height={300}
          series={budgetSeries}
          xAxis={[{ scaleType: "band", data: budgetData.map((d) => d.category) }]}
          highlightScope={{ highlight: "series", fade: "global" }}
          tooltip={{ trigger: "axis" }}
          sx={{
            "& .MuiChartsLegend-root text": { fill: "white !important" },
            "& .MuiChartsAxis-root text": { fill: "white !important" },
            "& .MuiChartsAxis-tickLabel": { fill: "white !important" },
            "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "white !important" },
            "& .MuiBarElement-root": { transition: "opacity 0.3s ease" },
            "& .MuiBarElement-root:hover": { opacity: 1 },
            "& .MuiBarElement-root:not(:hover)": { opacity: 0.5 },
          }}
        />
      </Box>
    </div>
  );
}
