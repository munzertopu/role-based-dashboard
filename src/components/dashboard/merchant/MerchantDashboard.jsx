import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import ApprovePurchases from "./ApprovePurchases";
import Customers from "./Customers";
import Notifications from "./Notifications";
import SetContributionRate from "./SetContributionRate";

const MerchantDashboard = () => {
  return (
    <DashboardLayout role="merchant">
      <Routes>
        <Route path="/" element={<ApprovePurchases />} />
        <Route path="/purchases" element={<ApprovePurchases />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/contribution" element={<SetContributionRate />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </DashboardLayout>
  );
};

export default MerchantDashboard;
