// @ts-nocheck
import { AccountBalance, TrendingUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
const PointsSummary = () => {
  const { points } = useSelector((state) => state.dashboard.member);

  console.log("points", points);

  const progressValue = (points?.available / points?.total) * 100;
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Points Summary
      </Typography>

      {/* Points Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <AccountBalance sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="h6">Total Points</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                {points.total.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lifetime earned points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ mr: 2, color: "success.main" }} />
                <Typography variant="h6">Available Points</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {points.available.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ready to redeem
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {progressValue.toFixed(1)}% of total points
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsSummary;
