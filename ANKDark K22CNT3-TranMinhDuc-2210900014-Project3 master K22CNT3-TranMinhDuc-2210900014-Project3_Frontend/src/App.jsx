import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/TmdAuthContext";
import TmdHome from "./pages/users/TmdHome";
import TmdLogin from "./pages/users/TmdLogin";
import TmdMainLayout from "./layouts/TmdMainLayout";
import TmdAuthLayout from "./layouts/TmdAuthLayout";
import TmdCategory from "./pages/users/TmdCategory";
import { TmdCategoryProvider } from "./contexts/TmdCategoryContext";
import { TmdTransactionProvider } from "./contexts/TmdTransactionContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import TmdTransaction from "./pages/TmdTransaction";

function App() {
  const { tmdUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TmdAuthLayout />}>
          <Route path="/tmdlogin" element={tmdUser ? <Navigate to="/" /> : <TmdLogin />} />
        </Route>

        <Route element={<TmdMainLayout />}>
          <Route path="/" element={<TmdHome />} />
          <Route path="/tmdCategory" element={<TmdCategoryProvider><TmdCategory /></TmdCategoryProvider>} />
          <Route path="/tmdTransaction" element={<TmdTransactionProvider><TmdTransaction /></TmdTransactionProvider>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
