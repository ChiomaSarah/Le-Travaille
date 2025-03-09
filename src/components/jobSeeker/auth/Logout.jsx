import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { AuthFormsContainer } from "./AuthForms";
import { useDispatch } from "react-redux";
import { logout } from "../../../app-store/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmLogout = () => {
    dispatch(logout());
    toast.success("You have been logged out!");

    setTimeout(() => {
      navigate("/job-seeker");
    }, 2000);
  };

  const handleCancelLogout = () => {
    navigate(-1); // Go back to the previous page.
  };

  return (
    <AuthFormsContainer>
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
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Are you sure you want to logout?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmLogout}
                sx={{
                  padding: "10px 20px",
                  fontWeight: "bold",
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
                  color: "#FFF",
                  backgroundColor: "#4C85B7",
                  boxShadow:
                    "8px 8px 20px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "#346B92",
                    boxShadow:
                      "4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </AuthFormsContainer>
  );
};

export default Logout;
