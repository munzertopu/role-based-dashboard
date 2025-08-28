/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
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
import { updateUserStatus } from "../../../../store/slices/dashboardSlice";

const ManageUsers = () => {
  const { users } = useSelector((state) => state.dashboard.admin);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState("");

  const dispatch = useDispatch();

  const handleActionClick = (item, action, type) => {
    setSelectedItem(item);
    setActionType(action);
    setOpenDialog(true);
  };

  const handleConfirmAction = () => {
    // User action
    dispatch(
      updateUserStatus({
        userId: selectedItem.id,
        status: actionType === "activate" ? "Active" : "Inactive",
      })
    );
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
      case "approved":
        return "success";
      case "inactive":
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Manage Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleActionClick(user, "activate", "user")}
                    disabled={user.status === "Active"}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      handleActionClick(user, "deactivate", "user")
                    }
                    disabled={user.status === "Inactive"}
                  >
                    <Cancel />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {actionType} {selectedItem?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmAction} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
