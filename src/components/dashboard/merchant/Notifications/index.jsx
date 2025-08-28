// @ts-nocheck

import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { notifications } = useSelector((state) => state.dashboard.merchant);

  return (
    <div>
      {" "}
      <Box>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} divider>
              <Paper sx={{ width: "100%", p: 2 }}>
                <ListItemText
                  primary={notification.message}
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Chip
                        label={notification.type}
                        size="small"
                        color={
                          notification.type === "Approval Request"
                            ? "warning"
                            : "info"
                        }
                      />
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Notifications;
