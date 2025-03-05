import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/TmdAuthContext";
import TmdHome from "./pages/users/TmdHome";
import TmdLogin from "./pages/users/TmdLogin";
import TmdMainLayout from "./layouts/TmdMainLayout";
import TmdAuthLayout from "./layouts/TmdAuthLayout";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
