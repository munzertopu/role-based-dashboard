// @ts-nocheck

import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { customers } = useSelector((state) => state.dashboard.merchant);
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {" "}
      <Box>
        <Typography variant="h5" gutterBottom>
          Lookup Customer
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {filteredCustomers.map((customer) => (
            <Grid item xs={12} md={6} key={customer.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {customer.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {customer.email}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Points: <strong>{customer.points}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Total Purchases:{" "}
                      <strong>{customer.totalPurchases}</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Customers;
