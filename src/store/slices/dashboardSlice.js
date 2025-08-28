import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Member",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Merchant",
        status: "Active",
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Member",
        status: "Inactive",
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "Merchant",
        status: "Pending",
      },
    ],
    merchants: [
      {
        id: 1,
        storeName: "Tech Store",
        email: "tech@store.com",
        status: "Approved",
        joinDate: "2024-01-15",
      },
      {
        id: 2,
        storeName: "Fashion Hub",
        email: "fashion@hub.com",
        status: "Pending",
        joinDate: "2024-02-10",
      },
      {
        id: 3,
        storeName: "Book Corner",
        email: "books@corner.com",
        status: "Approved",
        joinDate: "2024-01-20",
      },
    ],
  },
  merchant: {
    purchases: [
      {
        id: 1,
        customerName: "Alice Brown",
        amount: 150,
        status: "Pending",
        date: "2024-02-15",
        points: 15,
      },
      {
        id: 2,
        customerName: "Bob Davis",
        amount: 200,
        status: "Approved",
        date: "2024-02-14",
        points: 20,
      },
      {
        id: 3,
        customerName: "Charlie Wilson",
        amount: 75,
        status: "Pending",
        date: "2024-02-13",
        points: 8,
      },
      {
        id: 4,
        customerName: "Diana Miller",
        amount: 300,
        status: "Rejected",
        date: "2024-02-12",
        points: 30,
      },
    ],
    customers: [
      {
        id: 1,
        name: "Alice Brown",
        email: "alice@example.com",
        points: 250,
        totalPurchases: 5,
      },
      {
        id: 2,
        name: "Bob Davis",
        email: "bob@example.com",
        points: 180,
        totalPurchases: 3,
      },
      {
        id: 3,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        points: 420,
        totalPurchases: 8,
      },
      {
        id: 4,
        name: "Diana Miller",
        email: "diana@example.com",
        points: 90,
        totalPurchases: 2,
      },
    ],
    contributionRate: 10,
    notifications: [
      {
        id: 1,
        type: "Approval Request",
        message: "New purchase approval needed from Alice Brown",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "System Update",
        message: "Points calculation system updated",
        time: "1 day ago",
      },
      {
        id: 3,
        type: "Approval Request",
        message: "Purchase approval needed from Charlie Wilson",
        time: "3 hours ago",
      },
    ],
  },
  member: {
    points: {
      total: 1250,
      available: 890,
      pending: 360,
    },
  },
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    approvePurchase: (state, action) => {
      const purchaseId = action.payload;
      const purchase = state.merchant.purchases.find(
        (p) => p.id === purchaseId
      );
      if (purchase) {
        purchase.status = "Approved";
      }
    },
    rejectPurchase: (state, action) => {
      const purchaseId = action.payload;
      const purchase = state.merchant.purchases.find(
        (p) => p.id === purchaseId
      );
      if (purchase) {
        purchase.status = "Rejected";
      }
    },
    updateContributionRate: (state, action) => {
      state.merchant.contributionRate = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const user = state.admin.users.find((u) => u.id === userId);
      if (user) {
        user.status = status;
      }
    },
    updateMerchantStatus: (state, action) => {
      const { merchantId, status } = action.payload;
      const merchant = state.admin.merchants.find((m) => m.id === merchantId);
      if (merchant) {
        merchant.status = status;
      }
    },
  },
});

export const {
  setLoading,
  approvePurchase,
  rejectPurchase,
  updateContributionRate,
  updateUserStatus,
  updateMerchantStatus,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
