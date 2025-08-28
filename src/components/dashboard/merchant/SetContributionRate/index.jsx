// @ts-nocheck

import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContributionRate } from "../../../../store/slices/dashboardSlice";

const SetContributionRate = () => {
  const [newContributionRate, setNewContributionRate] = useState("");
  const { contributionRate } = useSelector((state) => state.dashboard.merchant);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const handleUpdateContributionRate = () => {
    if (newContributionRate && !isNaN(newContributionRate)) {
      dispatch(updateContributionRate(parseFloat(newContributionRate)));
      setSnackbar({
        open: true,
        message: "Contribution rate updated successfully!",
        severity: "success",
      });
      setNewContributionRate("");
    }
  };

  return (
    <div>
      {" "}
      <Box>
        <Typography variant="h5" gutterBottom>
          Set Contribution Rate
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            Current contribution rate: <strong>{contributionRate}%</strong>
          </Typography>
          <Box sx={{ mt: 3, display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="New Contribution Rate (%)"
              type="number"
              value={newContributionRate}
              onChange={(e) => setNewContributionRate(e.target.value)}
              inputProps={{ min: 0, max: 100, step: 0.1 }}
              sx={{ width: 200 }}
            />
            <Button
              variant="contained"
              onClick={handleUpdateContributionRate}
              disabled={!newContributionRate}
            >
              Update Rate
            </Button>
          </Box>
        </Paper>
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

export default SetContributionRate;
