import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
  Collapse,
  Card,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthFormsContainer } from "../AuthForms";
import { neumorphismInputStyle } from "../../../../utils/neumorphism";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Extract token from URL when component mounts.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const { status } = await axios.patch(
        "https://le-travaille-server.onrender.com/auth/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      if (status === 200) {
        toast.success("Password reset successful");
        navigate("/auth/success");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormsContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            maxWidth: 400,
            padding: 3,
            backgroundColor: "#346B92",
            color: "#fff",
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#FFD700" }}
          >
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#B0B0B0", marginBottom: "1.5rem" }}
          >
            Kindly set a new password that you haven't used before.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TextField
                label="New Password"
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
                  marginBottom: "0.75rem",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(confirmPassword),
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
                    color: confirmPassword ? "#F0F0F0" : "black",
                    top:
                      confirmPassword ||
                      document.activeElement ===
                        document.querySelector('input[name="confirmPassword"]')
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
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FFD700",
                  fontWeight: "bold",
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
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </motion.div>
          </Box>
        </Card>
      </motion.div>
    </AuthFormsContainer>
  );
};

export default ResetPassword;
