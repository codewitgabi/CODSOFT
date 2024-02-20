import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyOTP from "./pages/VerifyOTP";
import { AppContext } from "./contexts";

function ShopApp() {
  return (
    <>
      <AppContext.Provider value={{ cart: [], user: null, products: [] }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="auth/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default ShopApp;
