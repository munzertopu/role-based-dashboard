import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import PointsSummary from "./PointsSummary";

const MemberDashboard = () => {
  return (
    <DashboardLayout role="member">
      <Routes>
        <Route path="/" element={<PointsSummary />} />
      </Routes>
    </DashboardLayout>
  );
};

export default MemberDashboard;
