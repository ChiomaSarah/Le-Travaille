import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const Logout = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    sessionStorage.clear();
    toast.success("You have been logged out!");

    setTimeout(() => {
      navigate("/job_seeker");
    }, 2000);
  };

  const handleCancelLogout = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            maxWidth: 500,
            padding: 3,
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: "8px",
            textAlign: "center",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Logout Confirmation
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3, color: "#555" }}>
              Are you sure you want to logout?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmLogout}
                sx={{
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                Yes, Log Me Out
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelLogout}
                sx={{
                  color: "#B0B0B0",
                  borderColor: "#B0B0B0",
                  padding: "10px 20px",
                  "&:hover": { borderColor: "#1976d2", color: "#1976d2" },
                  transition: "border-color 0.3s, color 0.3s",
                }}
              >
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Logout;
