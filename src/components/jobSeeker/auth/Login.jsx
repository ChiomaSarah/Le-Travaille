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
  Collapse,
  Card,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthFormsContainer } from "./AuthForms";
import { neumorphismInputStyle } from "../../../utils/neumorphism";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../app-store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { email, password };
      const { data, status } = await axios.post(
        "https://le-travaille-server.onrender.com/auth/login",
        payload
      );

      if (status === 200) {
        toast.success(data.message);
        sessionStorage.setItem("user id", data.user.userId);
        dispatch(setAuth({ token: data.token, userId: data.user.userId }));
        navigate("/user/dashboard");
      } else {
        toast.error(error.response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormsContainer>
      <Card
        sx={{
          maxWidth: 400,
          padding: 3,
          backgroundColor: "#346B92",
          color: "#fff",
          boxShadow: 4,
          textAlign: "center",
          marginTop: "-11rem",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#FFD700" }}
        >
          Welcome Back!
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
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            slotProps={{
              inputLabel: {
                shrink: Boolean(email),
              },
              input: {
                style: neumorphismInputStyle,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "40px",
                "& input": {
                  padding: "8px 14px",
                  fontSize: "14px",
                },
              },
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.8rem",
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
                color: "#F0F0F0",
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "0.75rem",
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            required
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
              "& .MuiOutlinedInput-root": {
                height: "40px",
                "& input": {
                  padding: "8px 14px",
                  fontSize: "14px",
                },
              },
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.8rem",
                transition: "top 0.2s ease, font-size 0.2s ease",
                color: password ? "#F0F0F0" : "black",
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
              marginBottom: "1.5rem",
            }}
          />

          <Typography
            variant="body2"
            align="right"
            sx={{
              marginTop: "-10px",
              marginBottom: "10px",
              color: "#d7c7bb",
              textTransform: "none",
            }}
          >
            <span
              onClick={() => (window.location.href = "/auth/forgot-password")}
              style={{
                color: "#fff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Forgot Password?
            </span>
          </Typography>

          {error && (
            <Collapse in={Boolean(error)}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setError("")}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            </Collapse>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#FFD700",
              fontWeight: "bold",
              my: 2,
              "&:hover": {
                backgroundColor: "#FFB800",
                transform: "scale(1.05)",
              },
              transition: "transform 0.2s ease-in-out",
            }}
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
      </Card>
    </AuthFormsContainer>
  );
};

export default Login;
