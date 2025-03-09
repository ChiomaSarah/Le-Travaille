import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Collapse,
  IconButton,
  Card,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthFormsContainer } from "../AuthForms";
import { neumorphismInputStyle } from "../../../../utils/neumorphism";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://le-travaille-server.onrender.com/auth/forgot-password",
        { email }
      );
      toast.success(data.message);
      sessionStorage.setItem("forgot-email", email);
      navigate("/auth/email-sent");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
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
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#B0B0B0", marginBottom: "1.5rem" }}
          >
            Not a problem! We will send you a link to reset your password.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
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
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FFD700",
                  fontWeight: "bold",
                  marginBottom: 2,
                  "&:hover": { backgroundColor: "#FFB800" },
                }}
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : null
                }
              >
                <span style={{ color: isLoading ? "white" : "" }}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </span>
              </Button>
            </motion.div>
          </Box>
        </Card>
      </motion.div>
    </AuthFormsContainer>
  );
};

export default ForgotPassword;
