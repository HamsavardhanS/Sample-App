import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  TextField, 
  Typography, 
  Button, 
  Box, 
  Alert, 
  Paper 
} from "@mui/material";

export default function Forget() {
  const [identifier, setIdentifier] = useState(""); // username/email/phone
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.put("http://localhost:9000/api/users/forgot-password", {
        identifier,  // matches backend's request DTO
        newPassword
      });
      alert("✅ Password changed successfully!");
      navigate("/"); // Redirect to login after successful password change
      // setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Password reset failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot / Change Password
        </Typography>

        {message && (
          <Alert severity={message.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username / Phone"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button 
            variant="contained" 
            color="warning" 
            type="submit" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
