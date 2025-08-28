import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route path="/" element={<ManageUsers />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
