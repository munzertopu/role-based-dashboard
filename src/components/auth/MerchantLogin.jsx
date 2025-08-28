// @ts-nocheck
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../store/slices/authSlice";

const MerchantLogin = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && role === "merchant") {
      navigate("/dashboard/merchant");
    }
  }, [isAuthenticated, role, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (isRegistering && !formData.storeName) {
      newErrors.storeName = "Store name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      if (
        formData.email === "merchant@example.com" &&
        formData.password === "password"
      ) {
        const token = "merchant-token";
        const user = {
          email: formData.email,
          name: "Merchant User",
          storeName: formData.storeName || "Demo Store",
        };

        localStorage.setItem("token", token);
        localStorage.setItem("role", "merchant");
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(loginSuccess({ user, role: "merchant", token }));
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setIsRegistering(newValue === 1);
    setErrors({});
    dispatch(clearError());
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Merchant Portal
          </Typography>

          <Tabs
            value={isRegistering ? 1 : 0}
            onChange={handleTabChange}
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {isRegistering && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="storeName"
                label="Store Name"
                name="storeName"
                autoFocus={isRegistering}
                value={formData.storeName}
                onChange={handleChange}
                error={!!errors.storeName}
                helperText={errors.storeName}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={!isRegistering}
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isRegistering ? (
                "Register Store"
              ) : (
                "Sign In"
              )}
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Demo credentials: merchant@example.com / password
              </Typography>
            </Box>

            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
            >
              <Button component={Link} to="/login/admin" variant="text">
                Admin Login
              </Button>
              <Button component={Link} to="/login/member" variant="text">
                Member Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default MerchantLogin;
