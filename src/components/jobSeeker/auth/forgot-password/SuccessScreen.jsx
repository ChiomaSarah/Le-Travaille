import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion"; // For animations
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Success checkmark icon
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f0f0",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
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
          <CardContent>
            {/* Animate Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <CheckCircleIcon fontSize="large" sx={{ color: "#FFD700" }} />
            </motion.div>

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Password Reset Successful
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginBottom: 3, color: "#B0B0B0" }}
            >
              Your password has been successfully reset. You can now login with
              your new password.
            </Typography>

            <Button
              variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor: "#FFD700",
                "&:hover": { backgroundColor: "#FFB800" },
              }}
            >
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default SuccessScreen;
