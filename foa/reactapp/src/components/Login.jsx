import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  Stack
} from "@mui/material";

import FastfoodIcon from "@mui/icons-material/Fastfood";

const Login = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState(""); // username/email/phone
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9000/api/users/login", {
        loginId: loginId.trim(),
        password: password.trim(),
      });

      const { userId, username, role } = response.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      if (role === "APP_ADMIN") {
        navigate("/adminhome");
      } else if (role === "HOTEL_ADMIN") {
        navigate("/hoteladmin");
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setError(`❌ ${err.response.data}`);
      } else {
        setError("❌ Invalid credentials or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ p: 7, mt: 30 }} component="section" aria-labelledby="login-title" align="center">
        <FastfoodIcon sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
        <Typography variant="h4" align="center" gutterBottom id="login-title">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} alignItems="center" noValidate>
          <TextField
            fullWidth
            label="Username / Email / Phone"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            margin="normal"
            required
            autoComplete="username"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
              tabIndex={0}
            >
              Register
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              tabIndex={0}
            >
              Forgot Password?
            </Link>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
