import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";
import useToken from "../../useToken";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useToken();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const payload = {
        email,
        password,
      };

      const { data, status } = await axios.post(
        "https://le-travaille-server.onrender.com/auth/login",
        payload
      );
      setToken(data);

      if (status === 200) {
        toast.success("Login Successful!");
        window.location = "/user/dashboard";
      } else {
        toast.error(error.response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Typography color="error" sx={{ marginBottom: "16px" }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: Boolean(email),
        }}
        sx={{
          "& .MuiInputLabel-root": {
            position: "absolute",
            left: "14px",
            fontSize: "0.875rem",
            transition: "top 0.2s ease, font-size 0.2s ease",
            color: email ? "#F0F0F0" : "black",
            top:
              email ||
              document.activeElement ===
                document.querySelector('input[name="email"]')
                ? "-10px"
                : "40%",
            transform: "translateY(-40%)",
          },
          "& .Mui-focused .MuiInputLabel-root": {
            top: "-10px",
            fontSize: "0.75rem",
          },
          marginBottom: "1.5rem",
        }}
        InputProps={{
          style: neumorphismInputStyle,
        }}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: Boolean(password),
        }}
        sx={{
          "& .MuiInputLabel-root": {
            position: "absolute",
            left: "14px",
            fontSize: "0.875rem",
            transition: "top 0.2s ease, font-size 0.2s ease",
            color: email ? "#F0F0F0" : "black",
            top:
              password ||
              document.activeElement ===
                document.querySelector('input[name="password"]')
                ? "-10px"
                : "40%",
            transform: "translateY(-40%)",
          },
          "& .Mui-focused .MuiInputLabel-root": {
            top: "-10px",
            fontSize: "0.75rem",
          },
          marginBottom: "3rem",
        }}
        InputProps={{
          style: neumorphismInputStyle,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                style={{ padding: 0 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={neumorphismButtonStyle}
      >
        Login
      </Button>
    </Box>
  );
};

const neumorphismInputStyle = {
  backgroundColor: "#e0e5ec",
  borderRadius: "10px",
  border: "none",
  boxShadow: "inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff",
  width: "100%",
};

const neumorphismButtonStyle = {
  borderRadius: "10px",
  backgroundColor: "#4C85B7",
  padding: "10px 20px",
  boxShadow:
    "8px 8px 20px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.1)",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    boxShadow:
      "4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.1)",
    backgroundColor: "#346B92",
  },
};

export default Login;
