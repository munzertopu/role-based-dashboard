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
  ToggleButton,
  ToggleButtonGroup,
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

const MemberLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && role === "member") {
      navigate("/dashboard/member");
    }
  }, [isAuthenticated, role, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (loginMethod === "email") {
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
    } else {
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Phone number is invalid";
      }

      if (otpSent && !formData.otp) {
        newErrors.otp = "OTP is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (!formData.phone) {
      setErrors({ phone: "Phone number is required" });
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
    alert("OTP sent to your phone! Use: 123456");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      let isValid = false;

      if (loginMethod === "email") {
        isValid =
          formData.email === "member@example.com" &&
          formData.password === "password";
      } else {
        isValid = formData.phone === "+1234567890" && formData.otp === "123456";
      }

      if (isValid) {
        const token = "member-token";
        const user = {
          email: formData.email || `${formData.phone}@example.com`,
          name: "Member User",
          phone: formData.phone,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("role", "member");
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(loginSuccess({ user, role: "member", token }));
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
    setOtpSent(false);
  };

  const handleLoginMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setLoginMethod(newMethod);
      setErrors({});
      setOtpSent(false);
    }
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
            Member Portal
          </Typography>

          <Tabs
            value={isRegistering ? 1 : 0}
            onChange={handleTabChange}
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Login Method
            </Typography>
            <ToggleButtonGroup
              value={loginMethod}
              exclusive
              onChange={handleLoginMethodChange}
              aria-label="login method"
              fullWidth
            >
              <ToggleButton value="email" aria-label="email login">
                Email & Password
              </ToggleButton>
              <ToggleButton value="otp" aria-label="otp login">
                Phone & OTP
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {loginMethod === "email" ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoFocus
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="+1234567890"
                />

                {!otpSent ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSendOtp}
                    sx={{ mt: 2, mb: 1 }}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="otp"
                    label="Enter OTP"
                    id="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    error={!!errors.otp}
                    helperText={errors.otp}
                    placeholder="123456"
                  />
                )}
              </>
            )}

            {(loginMethod === "email" || otpSent) && (
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
                  "Register"
                ) : (
                  "Sign In"
                )}
              </Button>
            )}

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Demo credentials: member@example.com / password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Or phone: +1234567890 / OTP: 123456
              </Typography>
            </Box>

            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
            >
              <Button component={Link} to="/login/admin" variant="text">
                Admin Login
              </Button>
              <Button component={Link} to="/login/merchant" variant="text">
                Merchant Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default MemberLogin;
