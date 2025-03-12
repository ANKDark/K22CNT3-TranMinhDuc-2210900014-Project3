import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TmdAuthProvider, useAuth } from "./contexts/TmdAuthContext";
import TmdHome from "./pages/users/TmdHome";
import TmdLogin from "./pages/users/TmdLogin";
import TmdMainLayout from "./layouts/TmdMainLayout";
import TmdAuthLayout from "./layouts/TmdAuthLayout";
import TmdCategory from "./pages/users/TmdCategory";
import { TmdCategoryProvider } from "./contexts/TmdCategoryContext";
import { TmdTransactionProvider } from "./contexts/TmdTransactionContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import TmdTransaction from "./pages/users/TmdTransaction";
import TmdRegister from "./pages/users/TmdRegister";
import { TmdBudgetsProvider } from "./contexts/TmdBudgetsContext";
import TmdBudgets from "./pages/users/TmdBudgets";
import { TmdSavingProvider } from "./contexts/TmdSavingContext";
import TmdSaving from "./pages/users/TmdSaving";
import TmdProfileUser from "./pages/users/TmdProfileUser";
import TmdStatisticalChart from "./pages/users/TmdStatisticalChart";
import TmdAdminLayout from "./layouts/TmdAdminLayout";
import TmdUserManagement from "./pages/admin/TmdUserManagement";
import { TmdUserProvider } from "./contexts/TmdUserContext";

function App() {
  const { tmdUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TmdAuthLayout />}>
          <Route path="/tmdlogin" element={tmdUser ? <Navigate to="/" /> : <TmdLogin />} />
          <Route path="/tmdRegister" element={tmdUser ? <Navigate to="/" /> : <TmdRegister />} />
        </Route>

        <Route element={<TmdMainLayout />}>
          <Route path="/" element={<TmdTransactionProvider><TmdHome /></TmdTransactionProvider>} />
          <Route path="/tmdCategory" element={<TmdCategoryProvider><TmdCategory /></TmdCategoryProvider>} />
          <Route path="/tmdTransaction" element={<TmdTransactionProvider><TmdTransaction /></TmdTransactionProvider>} />
          <Route path="/tmdBudgets" element={<TmdBudgetsProvider><TmdBudgets /></TmdBudgetsProvider>} />
          <Route path="/tmdSaving" element={<TmdSavingProvider><TmdSaving /></TmdSavingProvider>} />
          <Route path="/tmdEditProfile" element={<TmdAuthProvider><TmdProfileUser /></TmdAuthProvider>} />
          <Route path="/tmdChart" element={
            <TmdTransactionProvider>
              <TmdSavingProvider>
                <TmdBudgetsProvider>
                  <TmdStatisticalChart />
                </TmdBudgetsProvider>
              </TmdSavingProvider>
            </TmdTransactionProvider>
          } />
        </Route>
        <Route element={<TmdAdminLayout />}>
          <Route path="/tmdAdmin" element={<TmdUserProvider><TmdUserManagement /></TmdUserProvider>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
