// @ts-nocheck
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  approvePurchase,
  rejectPurchase,
} from "../../../../store/slices/dashboardSlice";

const ApprovePurchases = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const { purchases } = useSelector((state) => state.dashboard.merchant);
  const handleApprovePurchase = (purchaseId) => {
    dispatch(approvePurchase(purchaseId));
    setSnackbar({
      open: true,
      message: "Purchase approved successfully!",
      severity: "success",
    });
  };

  const handleRejectPurchase = (purchaseId) => {
    dispatch(rejectPurchase(purchaseId));
    setSnackbar({
      open: true,
      message: "Purchase rejected successfully!",
      severity: "info",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <div>
      {" "}
      <Box>
        <Typography variant="h5" gutterBottom>
          Approve Purchases
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.customerName}</TableCell>
                  <TableCell>${purchase.amount}</TableCell>
                  <TableCell>{purchase.points}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={purchase.status}
                      color={getStatusColor(purchase.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {purchase.status === "Pending" && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleApprovePurchase(purchase.id)}
                          sx={{ mr: 1 }}
                          startIcon={<CheckCircle />}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleRejectPurchase(purchase.id)}
                          startIcon={<Cancel />}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default ApprovePurchases;
