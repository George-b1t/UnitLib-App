import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "./contexts/redux/slices/userSlice";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

import { Register } from "./pages/Register";
import { api } from "./services/api";
import { getUserCookie } from "./utils/UserCookies";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authRoutes = ["/dashboard"];

  useEffect(() => {
    const userData = getUserCookie();

    if (!userData) {
      dispatch(setUser(null));
      if (authRoutes.includes(location.pathname)) navigate("/login");
    } else {
      dispatch(setUser(userData));
      api.defaults.headers.common["Authorization"] = "Bearer " + userData.token;
      if (!authRoutes.includes(location.pathname)) navigate("/dashboard");
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export { App };
