import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";
import useToken from "../../utils/useToken";
import { toast } from "react-toastify";
import { AuthFormsContainer, FormCard } from "./AuthForms";
import {
  neumorphismButtonStyle,
  neumorphismInputStyle,
} from "../../utils/neumorphism";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useToken();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

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
      setIsLoading(false);
      console.log(err);
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormsContainer>
      <FormCard sx={{ background: "#346B92" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginBottom: "20px",
            color: "#d7c7bb",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => (window.location.href = "/auth/signup")}
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Sign Up
          </span>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: Boolean(email),
              },
              input: {
                style: neumorphismInputStyle,
              },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
                transition: "top 0.2s ease, font-size 0.2s ease",
                color: "#F0F0F0",
                top:
                  email ||
                  document.activeElement ===
                    document.querySelector('input[name="email"]')
                    ? "-10px"
                    : "40%",
                transform: "translateY(-40%)",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#F0F0F0",
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "1.5rem",
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
            slotProps={{
              inputLabel: {
                shrink: Boolean(password),
              },
              input: {
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
              },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
                transition: "top 0.2s ease, font-size 0.2s ease",
                color: "#F0F0F0",
                top:
                  password ||
                  document.activeElement ===
                    document.querySelector('input[name="password"]')
                    ? "-10px"
                    : "40%",
                transform: "translateY(-40%)",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#F0F0F0",
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "1rem",
            }}
          />

          {error && (
            <Alert variant="filled" severity="error" className="mb-3">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={neumorphismButtonStyle}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : null
            }
          >
            <span style={{ color: isLoading ? "white" : "" }}>
              {isLoading ? "Logging you in..." : "Login"}
            </span>
          </Button>
        </Box>
      </FormCard>
    </AuthFormsContainer>
  );
};

export default Login;
