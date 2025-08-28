import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/auth/AdminLogin";
import MemberLogin from "./components/auth/MemberLogin";
import MerchantLogin from "./components/auth/MerchantLogin";
import { restoreSession } from "./store/slices/authSlice";

import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import MemberDashboard from "./components/dashboard/member/MemberDashboard";
import MerchantDashboard from "./components/dashboard/merchant/MerchantDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/admin" replace />} />

      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/merchant" element={<MerchantLogin />} />
      <Route path="/login/member" element={<MemberLogin />} />
      <Route
        path="/dashboard/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/merchant/*"
        element={
          <ProtectedRoute role="merchant">
            <MerchantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/member/*"
        element={
          <ProtectedRoute role="member">
            <MemberDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login/admin" replace />} />
    </Routes>
  );
}

export default App;
